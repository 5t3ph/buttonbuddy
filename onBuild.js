const fs = require("fs");
const util = require("util");
const md5 = require("md5");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let hashJs;

const readJsFile = () => {
  return readFile("public/index.js", (err, data) => {
    if (err) console.log(err);
  });
};

readJsFile()
  .then((data) => {
    hashJs = md5(data).slice(0, 16);
    console.log(hashJs);
  })
  .then(() => {
    const versionObject = {
      js: hashJs,
    };

    writeFile("src/_data/version.json", JSON.stringify(versionObject), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .then(() => {
    fs.rename("public/index.js", `public/index${hashJs}.js`, function (err) {
      if (err) return console.log("ERROR: " + err);
      console.log(`public/index.js > public/index${hashJs}.js`);
    });
  });
