const { URL } = require('url');
const defaultConfig = require('./../config.json');

function parseDatabaseURL(url) {
  if (typeof url === 'object') {
    return url;
  }
  const dbURL = new URL(url);
  return {
    port: dbURL.port,
    host: dbURL.hostname,
    user: dbURL.username,
    password: dbURL.password,
    database: dbURL.pathname.slice(1),
  }
}

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
  db: process.env.JAWSDB_URL ? parseDatabaseURL(process.env.JAWSDB_URL) : defaultConfig.db,
  web: {
    port: process.env.PORT || defaultConfig.web.port,
    frontendOrigin: defaultConfig.web.frontendOrigin,
    backendOrigin: defaultConfig.web.backendOrigin,
  },
  pageSettings: defaultConfig.pageSettings,
};

if (myDbConfig.mode === 'test') config.db = myDbConfig;

module.exports = config;
