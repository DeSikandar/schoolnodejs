const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarksSchema = Schema({
  semester: {
    type: String,
    required: true,
  },
  math: {
    type: Number,
    required: true,
  },
  science: {
    type: Number,
    required: true,
  },
  english: {
    type: Number,
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
});

module.exports = mongoose.model('Marks', MarksSchema);
