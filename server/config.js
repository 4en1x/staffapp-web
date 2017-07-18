const config = {
  db: {
    host: process.env.npm_config_host || 'mysql5.gear.host',
    port: process.env.npm_config_port || 3306,
    user: process.env.npm_config_user || 'exadelteamdb',
    password: process.env.npm_config_password || 'Fd94Lbm8U-_3',
    database: process.env.npm_config_database || 'exadelteamdb',
    itemsPerPage: 10,
  },
  web: {
    port: process.env.PORT || 3300,
    frontendOrigin: 'http://localhost:3000',
  },
};

module.exports = config;
