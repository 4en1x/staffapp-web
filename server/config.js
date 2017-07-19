const defaultConfig = require('./../config.json');

const config = {
  db: process.env.DATABASE_URL || defaultConfig.db,
  web: {
    port: process.env.PORT || defaultConfig.web.port,
    frontendOrigin: defaultConfig.web.frontendOrigin,
  },
  pageSettings: defaultConfig.pageSettings,
};

module.exports = config;
