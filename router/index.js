const router = require('express').Router();
const { IsAuthenticated } = require('../config/auth');
const User = require('../models/user');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/dashboard', IsAuthenticated, async (req, res) => {
  let data = [];
  if (req.user.rol == 'student') {
    data = await Student.find({ user: req.user });
  } else {
    data = await Teacher.find({ user: req.user });
  }
  res.render('dashboard', { data: data });
});

module.exports = router;
