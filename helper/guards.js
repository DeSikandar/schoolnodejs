const jwt = require('jsonwebtoken');
const response = require('./response');

const jwtsecret = process.env.jwt_secrete;

const verifyJWT = (req, res) => {
  const token = req.headers.authorization;
  try {
    const userinfo = jwt.verify(token, jwtsecret);
    req.user = userinfo;
    return 1;
  } catch (error) {
    response.unAuthentication(res, {});
    return 0;
  }
};

const allowOnly = (allowUsers) => (req, res, next) => {
  if (
    verifyJWT(req, res) &&
    req.user &&
    req.user.type &&
    allowUsers.includes(req.user.type)
  ) {
    next();
    return 1;
  }
  return response.notAllowUser(res);
};

const verifyJWTHeader = () => (req, res, next) => {
  const isVerify = verifyJWT(req, res);
  if (isVerify) {
    next();
    return 1;
  }
  response.unAuthentication(res, {});
  return 0;
};

const createToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    type: user.type,
  };
  const token = jwt.sign(payload, jwtsecret, { expiresIn: '7d' });
  payload.token = token;
  return payload;
};

const checkUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    response.validationFail(res, 'Auth Token required', 'Auth Token required');
  } else {
    const ress = verifyJWT(req, res);
    if (ress) {
      next();
    }
  }
};

module.exports = {
  allowOnly,
  verifyJWTHeader,
  createToken,
  checkUser,
};
