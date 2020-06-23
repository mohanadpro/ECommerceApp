const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
      name:{type:String,required:true},
      price:{type:Number,required:true,default:0},
      category:{type:String,required:true},
      image:{type:String,required:true},
      countInStock:{type:String,required:true,default:0},
      description:{type:String,required:true},
      brand:{type:String,required:true},
      rate:{type:Number,required:true,default:0},
      numReviews:{type:Number,required:true,default:0}
})

module.exports=mongoose.model('product',productSchema);