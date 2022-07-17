const Chance = require("chance");
const { getRandomNum } = require("./utils");
const { printError } = require("./utils/log");
const { MISSING_COLLECTIONS_CONFIG_ERROR } = require("./constants/errors");
const { LIST_MAX_DEFAULT, LIST_MIN_DEFAULT } = require("./constants/defaults");
const {
  invalidChance,
  missingCollectionTemplate,
  missingObjectTemplate,
  missingPropType,
  badPropType,
  missingChance,
} = require("./errors");

const chance = new Chance();

function createValue(chanceConfig) {
  const args = chanceConfig.args || [];
  return chance[chanceConfig.name](...args);
}

module.exports.create = function (config) {
  if (!config.collections || config.collections.length === 0) {
    printError(MISSING_COLLECTIONS_CONFIG_ERROR);
  }

  // Initialize collections object
  const collections = {};

  function createObject(templateName) {
    const template = config.templates[templateName];
    const item = {};

    for (let prop in template) {
      const propConfig = template[prop];

      if (!propConfig.type) {
        printError(missingPropType(templateName, prop));
      }

      if (propConfig.type === "value") {
        if (!template[prop].chance) {
          printError(missingChance(templateName, prop));
        }

        try {
          item[prop] = createValue(template[prop].chance);
        } catch (e) {
          printError(invalidChance(templateName, prop));
        }
      } else if (propConfig.type === "object") {
        if (!config.templates[template[prop].template]) {
          printError(
            missingObjectTemplate(templateName, prop, template[prop].template)
          );
        }

        item[prop] = createObject(config.templates[template[prop].template]);
      } else if (propConfig.type === "array") {
        const size =
          propConfig.count ||
          getRandomNum(
            propConfig.min || LIST_MIN_DEFAULT,
            propConfig.max || LIST_MAX_DEFAULT
          );

        item[prop] = createList(template[prop].template, size);
      } else {
        printError(badPropType(templateName, prop));
      }
    }

    return item;
  }

  function createList(templateName, count) {
    const items = [];

    for (let i = 0; i < count; i++) {
      const item = createObject(templateName);
      items.push(item);
    }

    return items;
  }

  for (let collectionConfig of config.collections) {
    if (!collectionConfig.template) {
      printError(missingCollectionTemplateProp(collectionConfig.name));
    } else if (!config.templates[collectionConfig.template]) {
      printError(
        missingCollectionTemplate(
          collectionConfig.name,
          collectionConfig.template
        )
      );
    } else if (!collectionConfig.name) {
      printError(MISSING_COLLECTION_NAME_ERROR);
    }

    const size =
      collectionConfig.count ||
      getRandomNum(
        collectionConfig.min || LIST_MIN_DEFAULT,
        collectionConfig.max || LIST_MAX_DEFAULT
      );

    const collectionItems = createList(collectionConfig.template, size);

    collections[collectionConfig.name] = collectionItems;
  }

  return collections;
};
