const mongoose = require('mongoose');

const { Schema } = mongoose;
const ProductSchema = Schema(
  {
    product: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
