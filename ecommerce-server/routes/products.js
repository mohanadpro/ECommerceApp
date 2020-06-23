var express = require('express');
var router = express.Router();
var productController = require('../controllers/product-controller');
var {isAuth,isAdmin}=require('../utilities/utilities');
/* GET home page. */
router.get('/:id',productController.productDetails);

router.post('/',productController.productList);

router.post('/create',isAuth,isAdmin,productController.createProduct);

router.patch('/:id',isAuth,isAdmin,productController.updateProduct);

router.delete('/:id',isAuth,isAdmin,productController.deteteProduct)

module.exports = router;
