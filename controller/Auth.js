const { User } = require('../models');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const controller = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email })
      .select('+password')
      .exec();
    if (!user) {
      res.send('user not found');
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        res.send('password not match');
      }

      res.send(isMatch);
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
