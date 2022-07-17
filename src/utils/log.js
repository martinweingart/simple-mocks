module.exports.printText = function (text) {
  process.stdout.write(`\n${text}\n`);
};

module.exports.printError = function (error) {
  module.exports.printText("Ups, something failed!");
  module.exports.printText(error);
  process.exit(1);
};
