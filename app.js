require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressEjsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

const passport = require('passport');
require('./config/passport')(passport);

app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const MemoryStore = session.MemoryStore;
app.use(cookieParser());

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore(),
    cookie: {},
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.set('layout form', false);
app.set('layout data', false);

app.use('/', require('./router/index'));
app.use('/user', require('./router/user'));
app.use('/marks', require('./router/marks'));
app.use('/student', require('./router/student'));

//connect db and start server
mongoose
  .connect(process.env.monog_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is runing port 3000');
    });
  })
  .catch((error) => {
    throw error;
  });
