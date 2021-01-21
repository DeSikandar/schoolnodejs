const router = require('express').Router();
const controller = require('../controller');
const helper = require('../helper');

router.post('/', controller.studentregister);
router.get('/', controller.studentdetails);
router.get('/all', controller.task);

module.exports = router;
