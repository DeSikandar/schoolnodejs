const { response } = require('../helper');
const Joi = require('joi');
const { Student } = require('../models');

const controller = {
  async studentregister(req, res) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      class: Joi.string().required(),
      address: Joi.string().required(),
      dob: Joi.date().required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
      return response.validationFail(res, error, error.message);
    } else {
      const st = new Student(value);
      await st.save();
      if (st) {
        return response.success(res, st, 'student register success');
      }
    }
  },
  async studentdetails(req, res) {
    const schema = Joi.object().keys({
      dob: Joi.date().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      return response.validationFail(res, error, error.message);
    } else {
      Student.find(value)
        .then((ress) => {
          if (ress.length) {
            return response.send(res, ress);
          }
          return response.validationFail(
            res,
            'student not found',
            'student not found'
          );
        })
        .catch((error) => {
          return response.validationFail(res, error, 'student not found');
        });
    }
  },
};

module.exports = controller;
