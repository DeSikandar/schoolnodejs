const router = require('express').Router();
const { IsAuthenticated, checkuser } = require('../config/auth');
const Student = require('../models/student');
const Marks = require('../models/marks');

router.get('/', checkuser, async (req, res) => {
  const student = await Student.find();

  res.render('student', { student: student });
});

router.get('/marks', IsAuthenticated, async (req, res) => {
  const studnet = await Student.find({ user: req.user.id });
  const marks = await Marks.find({ student: studnet });

  res.render('stmarks', { marks: marks, student: studnet });
});
module.exports = router;
