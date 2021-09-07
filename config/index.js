require('dotenv').config();

module.exports = {
  dbUrl: process.env.MONGODB_URL || process.env.APP_DB,
  secret: process.env.APP_SECRET,
};
