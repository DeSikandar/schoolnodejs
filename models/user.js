const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student',
  },
});

module.exports = mongoose.model('User', UserSchema);
