const router = require('express').Router();
const controller = require('../controller');

router.post('/', controller.insertpro);
router.get('/', controller.getProduct);
router.get('/dist', controller.distinproduct);
router.get('/count', controller.countProduct);
router.get('/total', controller.totalaboutspent);
router.get('/:customer', controller.getcustomertotal);

module.exports = router;
