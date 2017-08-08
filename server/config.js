const defaultConfig = require('./../config.json');

const myDbConfig = {
  host: process.env.npm_config_host,
  port: process.env.npm_config_port,
  user: process.env.npm_config_user,
  password: process.env.npm_config_password,
  database: process.env.npm_config_database,
  multipleStatements: true,
  mode: process.env.npm_config_mode,
};

const config = {
  db: process.env.JAWSDB_URL || defaultConfig.db,
  web: {
    port: process.env.PORT || defaultConfig.web.port,
    frontendOrigin: defaultConfig.web.frontendOrigin,
    backendOrigin: defaultConfig.web.backendOrigin,
  },
  pageSettings: defaultConfig.pageSettings,
};

if (myDbConfig.mode === 'test') config.db = myDbConfig;

console.log(config.db);
console.log(process.env.JAWSDB_URL);

module.exports = config;
