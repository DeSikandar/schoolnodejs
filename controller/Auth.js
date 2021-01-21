const { User } = require('../models');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const response = require('../helper');

const controller = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email })
      .select('+password')
      .exec();
    if (!user) {
      const resData = {
        message: 'user not found',
        statusCode: 203,
        success: false,
        data: {},
      };
      response.response.send(res, resData);
      // res.send('user not found');
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        const resData = {
          message: 'password not match',
          statusCode: 203,
          success: false,
          data: {},
        };
        response.response.send(res, resData);
        // res.send('password not match');
      } else {
        const token = response.gards.createToken(user);
        response.response.success(res, token);
      }
    });
    // res.send(user);
  },
  async signup(req, res) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (!error) {
      const user = new User(value);
      await user.save();
      res.send(user);
    } else {
      res.send(error);
    }
  },
};

module.exports = controller;
