const fs = require("fs");
const { printError, printText } = require("./utils/log");
const { WRITE_FILE_ERROR } = require("./constants/errors");

module.exports.write = function (path, content) {
  process.stdout.write("Writing json file... ");

  fs.writeFile(path, JSON.stringify(content), "utf8", (err) => {
    if (err) printError(WRITE_FILE_ERROR);

    process.stdout.write("done\n");
    printText("File created successfully!");
  });
};

module.exports.read = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (error, data) => {
      if (error) throw reject(error);
      resolve(JSON.parse(data));
    });
  });
};
