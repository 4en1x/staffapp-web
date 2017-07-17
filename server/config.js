const config = {
  db: {
    host: 'mysql5.gear.host',
    port: 3306,
    user: 'exadelteamdb',
    password: 'Fd94Lbm8U-_3',
    database: 'exadelteamdb',
    itemsPerPage: 10,
  },
  web: {
    port: process.env.PORT || 3300,
    frontendOrigin: 'http://localhost:3000',
  },
};

module.exports = config;
