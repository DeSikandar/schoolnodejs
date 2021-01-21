const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = Schema(
  {
    name: {
      type: String,
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
