
import {ADD_ITEM_TO_CART, CART_REMOVE_ITEM} from '../constants/constants';

function cartReducer(state={cartItems:[]},action)
{
      switch(action.type)
      {
            case ADD_ITEM_TO_CART:
                  const item=action.payload
                  const product=state.cartItems.find(x=>x.productId===item.productId);
                  if(product)
                  {
                       return {cartItems: state.cartItems.map(x=>x.productId === product.productId ? item : x)}
                  }
                  else
                  {
                        return {cartItems:[...state.cartItems,item]}
                  }
            case CART_REMOVE_ITEM:
                  return {cartItems:state.cartItems.filter(x=>x.productId!==action.payload)};
            default :
                  return state
      }
}

export {cartReducer}