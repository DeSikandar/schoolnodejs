const router = require('express').Router();
const controller = require('../controller');
const helper = require('../helper');

router.post('/', helper.gards.checkUser, controller.studentregister);
router.get('/', helper.gards.checkUser, controller.studentdetails);

module.exports = router;
