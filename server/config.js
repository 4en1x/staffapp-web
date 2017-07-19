const defaultConfig = require('./../config.json');

const myDbConfig = {
  host: process.env.npm_config_host,
  port: process.env.npm_config_port,
  user: process.env.npm_config_user,
  password: process.env.npm_config_password,
  database: process.env.npm_config_database,
  multipleStatements: true,
};

const config = {
  db: process.env.DATABASE_URL || myDbConfig || defaultConfig.db,
  web: {
    port: process.env.PORT || defaultConfig.web.port,
    frontendOrigin: defaultConfig.web.frontendOrigin,
  },
  pageSettings: defaultConfig.pageSettings,
};

module.exports = config;
