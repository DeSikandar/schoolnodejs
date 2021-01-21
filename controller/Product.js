const { Product } = require('../models');
const Joi = require('joi');
const response = require('../helper');

const controller = {
  async insertpro(req, res) {
    const schma = Joi.object().keys({
      product: Joi.string().required(),
      total: Joi.number().positive().required(),
      customer: Joi.string().required(),
    });

    const { error, value } = schma.validate(req.body);
    if (error) {
      response.response.validationFail(res, error.message, error.message);
    } else {
      const product = new Product(value);
      await product.save();
      response.response.success(res, product, 'product inserted');
    }
    // res.send(value);
  },

  async getProduct(req, res) {
    const product = await Product.find();
    if (product.length) {
      response.response.success(res, product, 'Products');
    }
    response.response.validationFail(
      res,
      'product not found',
      'product not found'
    );
  },

  async distinproduct(req, res) {
    const product = await Product.distinct('product');
    if (product.length) {
      response.response.success(res, product, 'Products');
    }
    response.response.validationFail(
      res,
      'product not found',
      'product not found'
    );
  },
  async countProduct(req, res) {
    const schema = Joi.object().keys({
      product: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      response.response.validationFail(res, error.message, error.message);
    } else {
      const product = await Product.count(value);
      response.response.success(res, product);
    }
  },

  async totalaboutspent(req, res) {
    const product = await Product.aggregate([
      {
        $project: {
          _id: 0,
          customer: 1,
          total: 1,
          product: 1,
        },
      },
    ]);
    if (product.length) {
      response.response.success(res, product, 'Products');
    } else {
      response.response.validationFail(
        res,
        'product not found',
        'product not found'
      );
    }
  },

  async getcustomertotal(req, res) {
    const schema = Joi.object().keys({
      customer: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.params);

    if (error) {
      response.response.validationFail(res, error.message, error.message);
    } else {
      const product = await Product.aggregate([
        { $match: value },
        { $group: { _id: '$customer', total: { $sum: '$total' } } },
      ]);
      response.response.success(res, product);
    }
  },
};

module.exports = controller;
