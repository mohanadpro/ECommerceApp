import React, { useState,useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash,faEdit,faPlus} from '@fortawesome/free-solid-svg-icons';
import {  useDispatch } from 'react-redux';
import {listProducts} from '../../../../actions/product-actions';

const ProductList = (props) => {

      const [currentPage,setCurrentPage]=useState(0);
      const [documentsPerPage]=useState(10);
      const dispatch=useDispatch();

      useEffect(()=>{
            dispatch(listProducts(currentPage,documentsPerPage));
            return ()=>{}
      },[currentPage])


      return (
            <div>
            {
            (props.userInfo?.isAdmin || props.userInfo?.canCreateProduct) 
            && <button className="clear-btn-create float-right" onClick={()=>props.openModal({})}>
                   <FontAwesomeIcon icon={faPlus}/>
            </button>
            }
            <div className="list-founded-products">
            <table className="table ">
            <thead className="thead-dark">
                  <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Count In Stock</th>
                        <th>Brand</th>
                        <th colSpan="2">Action</th>
                  </tr>
            </thead>
            <tbody>
                  {props.loading?<tr><td>Loading....</td></tr>:
                  props.error?<tr><td>{props.error.message}</td></tr>:
                  props.products.map(product=><tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.brand}</td>
                  <td>
                  {
                  (props.userInfo?.isAdmin || props.userInfo?.canDeleteProduct) &&   <button  className="clear-btn" onClick={()=>props.deleteProd(product._id)}><FontAwesomeIcon icon={faTrash}/></button>
                  }
                  </td>
                  <td>
                  {
                   (props.userInfo?.isAdmin || props.userInfo?.canEditProduct) &&
                        <button className="clear-btn" onClick={()=>props.openModal(product)}><FontAwesomeIcon icon={faEdit}/></button>
                  }
                  </td>
                  </tr>)
                  }                        
            </tbody>
      </table>
      
      </div>
      
      {/* {props.totalDocs&&<Pagination totalDocs={props.totalDocs} documentsPerPage={props.documentsPerPage} pagination={props.pagination}/>} */}

      {props.totalDocs&& <div className="container products">
      <ul className="pagination" style={{marginBottom:60}}>
            {[
            ...Array(Math.ceil(props.totalDocs / props.documentsPerPage)).keys(),
            ].map((number) => (
            <li key={number + 1} className="page-item" 
            >
                  <a href="!#" className="page-link" onClick={      
                        (e)=>{
                              e.preventDefault();
                        setCurrentPage(number)}
                   } >
                  {number + 1}
                  </a>
            </li>
            ))}
            </ul>
       </div>
            }
      </div>
      );
}

export default ProductList;