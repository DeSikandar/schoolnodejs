const router = require('express').Router();
const controller = require('../controller');

// console.log(controller.controller.login);
router.post('/signin', controller.login);
router.post('/signup', controller.signup);

router.get('/all', controller.testArg);

module.exports = router;
