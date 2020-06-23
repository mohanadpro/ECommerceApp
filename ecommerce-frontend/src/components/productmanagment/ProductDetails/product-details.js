import React, { useEffect, useState } from 'react';
import './product-details.css'
import {detailsProduct} from '../../../actions/product-actions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../Loader/Loader';
function ProductDetails(props)
{
      const [qty,setQty]=useState(1);
      const productDetails=useSelector(state=>state.productDetails);
      const {product,loading,error}=productDetails;
      const dispatch=useDispatch();
      
      useEffect(()=>{
              dispatch(detailsProduct(props.match.params.id));
          return ()=>{}
        },[]); 
      const addToCart=()=>{
            props.history.push('/cart-details/'+product._id+'?qty='+qty);
      }
      return loading?<Loader/>:
      error?<div>{error}</div>:
      <div className="row-screen product-details">
            <div className="col-sm-6 col-md-4 product-details-image">
                  <img src={product.image}/>
            </div>
            <div className="col-sm-6 col-md-4 product-details-info">
                  <ul>
                        <li><h1>{product.name}</h1></li>
                        <li>({product.numPreview} customers)</li>
                        <li><span>Price: <h5 className="product-price">${product.price}</h5></span></li>
                        <li></li>
                        <li></li>
                  </ul>
            </div>
            <div className="col-sm-6 col-md-4 action">
                  <table>
                        <tbody>
                              <tr>
                                    <td><h5>Price:</h5></td>
                                    <td>{product.price}</td>
                              </tr>
                              <tr>
                                    <td><h5>State</h5></td>
                                     <td>{product.countInStock>0?<h5>InStock</h5>:<h5>OutOfStock</h5>}</td>
                              </tr>
                              
                              <tr>
                                    <td><h5>Qty</h5></td>
                                    <td>
                                          <select value={qty} onChange={e=>{setQty(e.target.value)}}>
                                               {[...Array(product.countInStock).keys()].map(x=>
                                               <option key={x+1} value={x+1}>{x+1}</option>)}
                                          </select>
                                    </td>
                              </tr>

                        </tbody>
                  </table>
                  <div>
                        {product.countInStock>0?  <button onClick={addToCart} className="add-to-cart-button">Add To Cart</button>:null}
                  </div>
            </div>
      </div>
}

export default ProductDetails 