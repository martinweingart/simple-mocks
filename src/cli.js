const { program } = require("commander");
const generator = require("./generator");
const server = require("./server");
const file = require("./file");
const { printError } = require("./utils/log");
const { CONFIG_FILE_ERROR } = require("./constants/errors");
const { collectionNotFound } = require("./errors");

module.exports.cli = async function () {
  program
    .requiredOption("-c, --config <config>", "Path to configuration json file")
    .option("-o, --output <path>", "Path of output json file", "")
    .option(
      "--collection <name>",
      "Write to file only the specified collection"
    )
    .option(
      "-s, --serve",
      "Serve the generated collections from http://localhost:<port>/<collection_name>"
    )
    .option("-p, --port <port>", "Port configuration for the server", "3030")
    .parse();

  const cliOptions = program.opts();
  const port = cliOptions.port;
  let config;

  try {
    process.stdout.write("\nReading config file... ");
    config = await file.read(cliOptions.config);
    process.stdout.write("done");
  } catch (e) {
    printError(CONFIG_FILE_ERROR);
  }

  process.stdout.write("\nGenerating random data... ");
  const collections = generator.create(config);
  process.stdout.write("done\n");

  if (cliOptions.serve) {
    process.stdout.write("Starting server... ");
    server.start(collections, port);
    process.stdout.write("done\n");
  } else if (cliOptions.output.length > 0) {
    if (cliOptions.collection) {
      if (!collections[cliOptions.collection]) {
        printError(collectionNotFound(cliOptions.collection));
      } else {
        file.write(cliOptions.output, collections[cliOptions.collection]);
      }
    } else {
      file.write(cliOptions.output, collections);
    }
  } else {
    console.log("\n", collections);
  }
};
