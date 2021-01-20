const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { IsAuthenticated } = require('../config/auth');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true,
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logout');
  res.redirect('/user/login');
});

router.get('/register', (req, res) => res.render('register'));

//register to database
router.post('/register', async (req, res) => {
  let errors = [];
  if (req.body.role == 'student') {
    const { email, password, name, role, semester } = req.body;

    const user = await User.findOne({ username: email });

    if (user) {
      errors.push({ msg: 'User already Exist' });
      res.render('register', {
        errors,
        email,
        name,
      });
    } else {
      const soltpass = await bcrypt.hash(password, 12);
      const newUser = new User({
        username: email,
        password: soltpass,
        rol: role,
      });
      newUser
        .save()
        .then((resutl) => {
          const student = new Student({
            name: name,
            semeseter: semester,
            user: resutl,
          });

          student
            .save()
            .then((ress) => {
              req.flash('success_msg', 'register success');
              res.redirect('/user/login');
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    }
  } else {
    const { email, password, name, role } = req.body;
    const user = await User.findOne({ username: email });
    if (user) {
      errors.push({ msg: 'User already Exist' });
      res.render('register', {
        errors,
        email,
        name,
      });
    } else {
      const soltpass = await bcrypt.hash(password, 12);
      const newUser = new User({
        username: email,
        password: soltpass,
        rol: role,
      });
      newUser
        .save()
        .then((resutl) => {
          const teacher = new Teacher({
            name: name,

            user: resutl,
          });

          teacher
            .save()
            .then((ress) => {
              req.flash('success_msg', 'register success');
              res.redirect('/user/login');
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    }
  }
});

module.exports = router;
