const config = {
  db: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'toor',
    database: 'exadel-team-db',
    itemsPerPage: 10,
  },
  web: {
    port: process.env.PORT || 3300,
    frontendOrigin: 'http://localhost:3000',
  },
};

module.exports = config;
