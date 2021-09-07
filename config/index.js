require('dotenv').config();

module.exports = {
  dbUrl: process.env.APP_DB,
  secret: process.env.APP_SECRET,
};