const { response } = require('../helper');
const Joi = require('joi');
const { Student, User } = require('../models');
const { autoInject, auto, parallel, waterfall } = require('async');

const task = (req, res) => {
  //     //autoinject
  //     autoInject(
  //     {
  //       get_student: function (callback) {
  //         // async code to get some data
  //         Student.find()
  //           .then((resss) => {
  //             callback(null, 'data', resss);
  //           })
  //           .catch((err) => {
  //             callback(err);
  //           });
  //       },
  //       get_user: function (callback) {
  //         User.find()
  //           .then((resu) => {
  //             callback(null, 'data', resu);
  //           })
  //           .catch((error) => {
  //             callback(error);
  //           });
  //       },
  //     },
  //     function (err, results) {
  //       if (err) {
  //         res.send(err);
  //       }
  //       res.send(results);
  //     }
  //   );
  //parallel
  parallel(
    {
      get_student: function (callback) {
        //         // async code to get some data
        Student.find()
          .then((resss) => {
            callback(null, 'data', resss);
          })
          .catch((err) => {
            callback(err);
          });
      },
      get_user: function (callback) {
        User.find()
          .then((resu) => {
            callback(null, 'data', resu);
          })
          .catch((error) => {
            callback(error);
          });
      },
    },
    function (err, results) {
      if (err) {
        res.send(err);
      }
      res.send(results);
    }
  );
  //   waterfall(
  //     {
  //       get_student: function (callback) {
  //         //         //         // async code to get some data
  //         Student.find()
  //           .then((resss) => {
  //             callback(null, 'data', resss);
  //           })
  //           .catch((err) => {
  //             callback(err);
  //           });
  //       },
  //       get_user: function (callback) {
  //         User.find()
  //           .then((resu) => {
  //             callback(null, 'data', resu);
  //           })
  //           .catch((error) => {
  //             callback(error);
  //           });
  //       },
  //     },
  //     function (err, results) {
  //       if (err) {
  //         res.send(err);
  //       }
  //       res.send(results);
  //     }
  //   );
  //   waterfall(
  //     [
  //       function (callback) {
  //         callback(null, 'one', 'two');
  //       },
  //       function (arg1, arg2, callback) {
  //         // arg1 now equals 'one' and arg2 now equals 'two'
  //         callback(null, 'three');
  //       },
  //       function (arg1, callback) {
  //         // arg1 now equals 'three'
  //         callback(null, 'done');
  //       },
  //     ],
  //     function (err, result) {
  //       res.send(result);
  //       // result now equals 'done'
  //     }
  //   );
};

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
  task,
};

module.exports = controller;
