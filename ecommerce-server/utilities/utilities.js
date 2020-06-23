const jwt=require('jsonwebtoken');
const config=require('../config');

const getToken=(user)=>
{
      // toJSON to convert user to payload
      return jwt.sign(user.toJSON(),config.JWT_SECRET,{expiresIn:'48h'});
}

const isAuth=(req,res,next)=>{
      const token=req.headers.authorization;
      if(token)
      {
            const onlyToken=token.slice(7,token.length);
            jwt.verify(onlyToken,config.JWT_SECRET,(err,decode)=>
            {
                  if(err)
                  {
                        res.status(401).json({message:err})
                  }
                  req.user=decode;
                  next();
                  return
            });
      }
      else
      {
            return res.status(401).json({message:'User is not authorized'})
      }
}

const isAdmin=(req,res,next)=>{
      if(req.user && req.user.isAdmin)
      {
            return next();
      }
      return res.status(401).json({message:'token is not supplied'})
}

module.exports= {getToken:getToken,isAuth:isAuth,isAdmin:isAdmin};
// export{getToken}