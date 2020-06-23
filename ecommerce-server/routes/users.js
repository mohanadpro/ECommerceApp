var express = require('express');
var router = express.Router();
var userController=require('../controllers/user-controller');
/* GET users listing. */

router.post('/signin',userController.signIn);

router.post('/signup',userController.signUp);

router.post('/createUser',userController.createAdminUser); 

router.get('/',userController.getAllUsers);



module.exports = router;
