import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./cart-details.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,deleteItem } from "../../../actions/cart-actions";
import { Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';

function CartDetails(props) {
  var qtyFromProductDetails = parseInt(props.location.search.split("=")[1]);
  var productId = props.match.params.id;

  const {t,i18}=useTranslation();

  const [qty, setQty] = useState(1);

  const addItemToCart = useSelector((store) => store.cart);
  const { cartItems } = addItemToCart;
  const dispatch = useDispatch();

  const deleteItemHandler=(productId)=>{
    dispatch(deleteItem(productId));
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qtyFromProductDetails));
    }
    return () => {};
  }, []);

  const proceedCheckOutHandler=()=>{

  }
  return (
    <div className="cart-details">
      <h2 className="shopping-cart">{t('Shopping Cart.1')}</h2>
      <div className="row-screen">
        <div className="col-md col-md-9">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productId}>
              <div>
                <div className="row product-info">
                  <div className="col-md-3">
                    <img src={item.image} />
                  </div>
                  <div className="col-md-6">
                    <h4 className="product-name">
                      <Link to={"/product/" + item.productId}>{item.name}</Link>
                    </h4>
                    <div className="info-quantity">
                      <strong>{t('Qty.1')}</strong>
                      <select
                        defaultValue={item.qty}
                        onChange={ e=> {
                          dispatch(addToCart(item.productId,e.target.value))
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((prodQty) => (
                          <option key={prodQty + 1} value={prodQty + 1}>
                            {prodQty + 1}
                          </option>
                        ))}
                      </select>

                      <button onClick={()=>deleteItemHandler(item.productId)} className="button-delete">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <h6>${item.price}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>{t('empty cart.1')}</div>
        )}
        </div>
        <div className="col-md col-md-3 action">
          
            <strong>
        {t('Subtotal.1')} ( {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)>1?<span> {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} {t('items.1')}</span>:<span>{cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)} {t('item.1')}</span>}  ) : $
              {cartItems.reduce((a, c) => a + parseInt(c.qty) * parseFloat(c.price), 0)}
            </strong>
          
          <div className="form-group">
            <button onClick={()=>proceedCheckOutHandler()} className="form-control button-action">
              {t('checkout.1')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartDetails;
