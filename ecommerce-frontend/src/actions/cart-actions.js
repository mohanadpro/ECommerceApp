import Cookie from 'js-cookie';
const { default: Axios } = require("axios");
const { ADD_ITEM_TO_CART,CART_REMOVE_ITEM } = require("../constants/constants");
const {SERVER_IP} =require('../constants/constants');

const addToCart=(productId,qty)=>async (dispatch,getState)=>
{
      try{
            const {data}=await Axios.get(SERVER_IP+'/api/products/'+productId);
          
            dispatch({type:ADD_ITEM_TO_CART,payload:{
                  productId:data._id,
                  name:data.name,
                  price:data.price,
                  image:data.image,
                  countInStock:data.countInStock,
                  qty:qty
            }});

            const { cart : { cartItems } }= getState();
            Cookie.set("cartItems",JSON.stringify(cartItems))
      }
      catch(error)
      {

      }
}

const deleteItem=(productId)=>async(dispatch,getState)=>{
      try{
            dispatch({type:CART_REMOVE_ITEM,payload:productId})
            const { cart : {cartItems}}=getState();
            Cookie.set("cartItems",JSON.stringify(cartItems));
      }
      catch(error)
      {

      }
}

export {addToCart,deleteItem}