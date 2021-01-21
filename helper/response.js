module.exports = {
  success(res, data, message = '') {
    const resData = {
      success: true,
      message: message || 'success',
      statusCode: 200,
      data,
    };
    return res.status(200).send(resData);
  },
  validationFail(res, err, message = '') {
    const resData = {
      success: false,
      message: message || 'Invalid request data',
      statusCode: 400,
      data: {},
      error: err,
    };
    return res.status(400).send(resData);
  },
  notAllowUser(res, message = '') {
    const resData = {
      success: false,
      message: message || 'unauthorized',
      statusCode: 403,
      data: {},
    };
    return res.status(403).send(resData);
  },
  unAuthentication(res, data, message) {
    const resData = {
      success: false,
      statusCode: 401,
      message: message || 'user is not authenticated',
      data,
    };
    return res.status(401).send(resData);
  },
  internalServerError(res, err) {
    const resData = {
      success: false,
      statusCode: 500,
      message: 'internal server error',
      data: err,
    };
    return res.status(500).send(resData);
  },
  send(res, data) {
    const status = data.statusCode || 200;
    return res.status(status).send(data);
  },

  //end of export
};
