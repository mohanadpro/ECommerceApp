const User =require('../models/user');
const tokenGenerator = require('../utilities/utilities');

const createAdminUser= async(req,res,next)=>{
      try
      {
        const user=new User({
          username:req.body.user.username,
          email:req.body.user.email,
          password:req.body.user.password,
          isAdmin:req.body.user.isAdmin,
          canCreateProduct:req.body.user.canCreateProduct,
          canEditProduct:req.body.user.canEditProduct,
          canDeleteProduct:req.body.user.canDeleteProduct
        })
      
        const newUser=await user.save();
        console.log('user has been saved successfully')
        res.send(newUser);
      }
      catch(error)
      {
        res.send(error.message)
      }
}

const signIn=(req,res,next)=>
{
      User.findOne({email:req.body.email,password:req.body.password},(err,user)=>{
            if(err)
            {
                  res.status(401).json({
                        message:'invalid Email or password'
                  })                  
            }
            else
            if(user)
            {
                  res.status(200).json({
                        _id:user._id,
                        username:user.username,
                        email:user.email,
                        isAdmin:user.isAdmin,
                        canCreateProduct:user.canCreateProduct,
                        canEditProduct:user.canEditProduct,
                        canDeleteProduct:user.canDeleteProduct,
                        token:tokenGenerator.getToken(user)
                  })
            }
            else
            {
                  res.status(404).json({
                        message:'user is not found'
                  })
            }
      })
}

const signUp=(req,res,next)=>
{
      try
      {
            const user=new User({
                  username:req.body.username,
                  email:req.body.email,
                  password:req.body.password                  
            })
            user.save((err,user)=>
            {
                  if(err)
                  {
                        res.status(500).json(err.message)
                  }
                  else
                  {
                        res.status(200).json({message:'user has been saved successfully.... '})
                  }
            })
      }
      catch(error)
      {

      }
}

const getAllUsers=(req,res,next)=>{
      User.find({},(err,users)=>{
            if(err)
                  res.status(500).json({message:err});
            res.status(200).json(users);
      })
}

module.exports={
      createAdminUser:createAdminUser,
      signIn:signIn,
      signUp:signUp,
      getAllUsers:getAllUsers
}