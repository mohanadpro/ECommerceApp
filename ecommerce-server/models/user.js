const mongoose =require('mongoose');

const userSchema=new mongoose.Schema({
      username:{type:String,required:true},
      email:{type:String,required:true,unique:true,dropDups:true},
      password:{type:String,required:true},
      isAdmin:{type:Boolean,required:true,default:false},
      canCreateProduct:{type:Boolean,required:true,default:false},
      canEditProduct:{type:Boolean,required:true,default:false},
      canDeleteProduct:{type:Boolean,required:true,default:false}
})

userSchema.methods.hashPassword=function(password)
{
      return bcrypt.hashSync(password,bcrypt.genSaltSync(5));
}

userSchema.methods.comparePassword=function(password)
{
      return becrypt.compareSync(password,this.password);
}

module.exports=mongoose.model('Users',userSchema)