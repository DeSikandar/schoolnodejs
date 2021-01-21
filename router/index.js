const authrouter = require('./auth');
const studentroute = require('./student');

const initailize = (app) => {
  app.use('/api/auth', authrouter);
  app.use('/api/student', studentroute);
};

module.exports = {
  initailize,
};
