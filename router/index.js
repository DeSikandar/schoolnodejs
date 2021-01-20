const authrouter = require('./auth');

const initailize = (app) => {
  app.use('/api/auth', authrouter);
};

module.exports = {
  initailize,
};
