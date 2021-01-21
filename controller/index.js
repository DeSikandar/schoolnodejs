const { login, signup } = require('./Auth');
const { studentregister, studentdetails, task } = require('./Student');
const {
  insertpro,
  getProduct,
  distinproduct,
  countProduct,
  totalaboutspent,
  getcustomertotal,
} = require('./Product');

module.exports = {
  login,
  signup,
  studentregister,
  studentdetails,
  task,
  insertpro,
  getProduct,
  distinproduct,
  countProduct,
  totalaboutspent,
  getcustomertotal,
};
