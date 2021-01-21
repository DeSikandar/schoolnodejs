require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./config');
const router = require('./router');

const app = express();
app.use(express.json());
db.initialize();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// app.get('/', (req, res) => {
//   res.send('he');
// });
// app.use(initialize);
router.initailize(app);

app.listen(3000, () => {
  console.log('server is runing 3000');
});
