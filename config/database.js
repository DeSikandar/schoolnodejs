const mongoose = require('mongoose');

const initialize = () => {
  const uri =
    'mongodb+srv://sikandar:sublime@app.jh4nj.mongodb.net/school2?retryWrites=true&w=majority';

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('database connected');
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  initialize,
};
