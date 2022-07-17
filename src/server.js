const express = require("express");
const { printText } = require("./utils/log");

module.exports.start = function (collections, port) {
  const app = express();

  for (let collectionName in collections) {
    app.get(`/${collectionName}`, (_req, res) => {
      res.json(collections[collectionName]);
    });
  }

  app.listen(port, () => {
    printText("Server running!");
    printText(
      `You can fetch the generated collections in http://localhost:${port}/<collection_name>`
    );
  });
};
