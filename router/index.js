const authrouter = require('./auth');
const studentroute = require('./student');
const helper = require('../helper');
const productrout = require('./product');

const initailize = (app) => {
  app.use('/api/auth', authrouter);
  app.use('/api/student', helper.gards.checkUser, studentroute);
  app.use('/api/product', helper.gards.checkUser, productrout);
};

module.exports = {
  initailize,
};
