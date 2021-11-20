const fs = require("fs");
const path = require("path");
const Sequelize = require('sequelize').Sequelize;

const config = require("../../config/sequelize");


// function getFiles() {
//   const files =  [];
//   const baseDir = __dirname;
//   fs.readdirSync(baseDir).forEach((fileName) => {
//     if (fileName.endsWith(".model.js")) {
//       const filePath = path.resolve(baseDir, fileName);
//       files.push(filePath);
//     }
//   });
//   return files;
// }

// function importInitFunctions(files) {
//   return files
//     .map((file) => require(file).init)
//     .filter((init) => Boolean(init));
// }

//  function connectModels(sequelize) {
//   const files = getFiles();
//   const inits = importInitFunctions(files);
//   for (const init of inits) {
//     init.connectModelAttrs(sequelize);
//   }
//   for (const init of inits) {
//     init.connectModelAssocs();
//   }
// }


const sequelize = new Sequelize(config.url, config);
const database = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    /* eslint-disable import/no-dynamic-require */
    /* eslint-disable global-require */
    const model = require(`./${file}`).init(sequelize);
    database[model.name] = model;
  });

Object.keys(database).forEach((model) => {
  if (database[model].associate) {
    database[model].associate(database);
  }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;


module.exports = database;
