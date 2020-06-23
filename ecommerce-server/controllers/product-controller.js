
var {data}=require('../data/products');
var Product=require('../models/product');
const products = require('../data/products');
const productList=(req,res,next)=>{   
      var totalDocs=0;

      currentPage=req.body.currentPage;
      documentsPerPage=req.body.documentsPerPage;

      skipDocs=currentPage*documentsPerPage;

      Product.find({},(err,products)=>{

            if(err)
            {
                  res.status(500).json({message:error})
            }
            else
            {
                  Product.find().count((err,count)=>{
                        totalDocs=count;
                  
                  res.status(200).json({products:products,totalDocs:totalDocs});
            });
            }
      }).skip(skipDocs).limit(documentsPerPage);  

}

const productDetails=(req,res,next)=>{    
      Product.findById(req.body.product.id,(err,product)=>
      {
            if(err)
            {
                  res.status(500).json({message:err});
            }
            else
            {
                  res.status(200).json(product);
            }
      })  
}

const createProduct=(req,res,next)=>{
      const product=new Product({
            name:req.body.product.name,
            price:req.body.product.price,
            image:req.body.product.image,
            countInStock:req.body.product.countInStock,
            description:req.body.product.description,
            brand:req.body.product.brand,
            category:req.body.product.category
      })

      product.save()
      .then(result=>res.status(200).json({message:'product has been created successfully '}))
      .catch(err=>res.status(500).json({message:err}))
}
const updateProduct=(req,res,next)=>{
      Product.updateOne({_id:req.params.id},
            {$set:{
                  name:req.body.product.name,
                  price:req.body.product.price,
                  category:req.body.product.category,
                  brand:req.body.product.brand,
                  countInStock:req.body.product.countInStock,
                  image:req.body.product.image
                  }},(err,updatedProduct)=>{
                        if(err)
                        {
                              res.status(500).json({message:'There is an error in updating product '+err})
                        }
                        else
                        {
                              res.status(200).json({message:'product has been updated successfully'})
                        }
                  })
}


const deteteProduct=(req,res,next)=>{
      Product.deleteOne({_id:req.params.id},(err,result)=>
      {
            if(err)
            {
                  res.status(500).json({message:err})
            }
            else
            {
                  res.status(200).json({message:'Product has been deleted successfully ...'})
            }
      })
}
module.exports={productList:productList
      ,productDetails:productDetails,
      createProduct:createProduct,
      updateProduct:updateProduct,
      deteteProduct:deteteProduct}