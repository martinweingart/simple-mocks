module.exports.collectionNotFound = (collection) =>
  `Collection not found ('${collection}')`;

module.exports.missingChance = (template, prop) =>
  `Missing chance configuration (template: '${template}', prop: '${prop}')`;

module.exports.invalidChance = (template, prop) =>
  `Invalid chance configuration (template: '${template}', prop: '${prop}')`;

module.exports.missingCollectionTemplateProp = (collection) =>
  `Missing template prop definition of collection ('${collection}')`;

module.exports.missingCollectionTemplate = (collection, missing) =>
  `Missing template definition in configuration file (collection: ${collection}, missing: '${missing}')`;

module.exports.missingObjectTemplate = (template, prop, missing) =>
  `Missing template definition in configuration file (template: '${template}', prop: '${prop}', missing: '${missing}')`;

module.exports.missingPropType = (template, prop) =>
  `Missing prop type definition in configuration file (template: '${template}', prop: '${prop}')`;

module.exports.badPropType = (template, prop) =>
  `Bad prop type definition in configuration file (template: '${template}', prop: '${prop}')`;
