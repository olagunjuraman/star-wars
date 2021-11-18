const getEnv = require('dotenv').config;

getEnv();

const databaseUrls = {
  development: process.env.DB_URL,
  staging: process.env.DB_URL,
  test: process.env.DB_URL,
  production: process.env.DB_URL,
};

const environment = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
const url = databaseUrls[environment];
const devMode = environment === 'development' || environment === 'test';

const config = {
  url,
  dialect,
  logging: devMode ? log => log : false,
  dialectOptions: {
    multipleStatements: true,
  },
  operatorsAliases: false,
  seederStorage: 'sequelize',
  seederStorageTableName: 'SequelizeSeeders',
};

if (!devMode) {
  config.ssl = true;
  config.dialectOptions.ssl = {
    require: true,
  };
}

module.exports = config


