const router = require('express').Router();
const { IsAuthenticated, checkuser } = require('../config/auth');
const Student = require('../models/student');
const Marks = require('../models/marks');

router.get('/', checkuser, (req, res) => {
  res.render('marks');
});

router.get('/addmarks', checkuser, async (req, res) => {
  const student = await Student.find();
  res.render('addmarks', { student: student });
});

router.get('/delet/:id', checkuser, (req, res) => {
  Marks.deleteOne({ _id: req.params.id })
    .then((rs) => {
      req.flash('success_msg', 'marks deleted success');
      res.redirect('/marks');
    })
    .catch((error) => {
      throw error;
    });
});

router.post('/addmarks', checkuser, async (req, res) => {
  let marks = [];
  Object.keys(req.body.marks).forEach((value) => {
    // console.log(req.body.marks[value]);
    marks.push({
      semester: req.body.marks[value].semester,
      math: +req.body.marks[value].math,
      science: +req.body.marks[value].science,
      english: +req.body.marks[value].english,
      student: value,
    });
  });
  Marks.insertMany(marks)
    .then((rss) => {
      req.flash('success_msg', 'marks addes success');
      res.redirect('/marks');
    })
    .catch((err) => {
      throw err;
    });

  // res.send(req.body.marks);
});

router.get('/form', checkuser, async (req, res) => {
  const student = await Student.find({ semeseter: req.query.semster });
  res.render('form', { student: student, layout: 'form' });
});

router.get('/data', checkuser, async (req, res) => {
  const student = await Marks.find({ semester: req.query.semsters }).populate(
    'student'
  );
  res.render('data', { student: student, layout: 'data' });
});
module.exports = router;
