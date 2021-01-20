const IsAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;

    return next();
  }
  req.flash('error_msg', 'please login to view the page');
  res.redirect('/user/login');
};

const checkuser = (req, res, next) => {
  if (req.isAuthenticated() && req.user.rol == 'teacher') {
    res.locals.user = req.user;

    return next();
  }
  req.flash('error_msg', "you don't have permission to access this resource");
  res.redirect('/dashboard');
};

module.exports = {
  checkuser,
  IsAuthenticated,
};
