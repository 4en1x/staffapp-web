const config = {};

config.db = {};
config.web = {};

config.db.host = 'localhost';
config.db.port = 3306;
config.db.user = 'root';
config.db.password = 'toor';
config.db.database = 'exadel-team-db';
config.db.itemsPerPage = 10;

config.web.port = process.env.PORT || 3300;
config.web.frontendOrigin = 'http://localhost:3000';

module.exports = config;
