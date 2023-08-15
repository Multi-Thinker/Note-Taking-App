require('dotenv').config();
const db = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
};
const config = {
  jwtSecret: process.env.JWT_SECRET ?? 'blah',
  development: db,
  test: db,
  prod: db,
  production: db, // to demo, different env need different index
  // not required as of dotenv
  // test: {
  //   username: 'root',
  //   password: null,
  //   database: 'database_test',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  // },
  // production: {
  //   username: 'root',
  //   password: null,
  //   database: 'database_production',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  // },
};

module.exports = config;
