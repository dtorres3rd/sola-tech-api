const mongoose = require('mongoose');
const keys = require('../config/keys');

const { mongoURI } = keys;
// connect to db
mongoose
  .connect(mongoURI, {})
  .then(() => console.log('DB Connected...'))
  .catch((err) => console.log(`DB Connection Error : ${err}`));
