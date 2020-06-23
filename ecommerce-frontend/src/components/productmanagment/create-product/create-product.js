import React, { useState, useEffect } from 'react';
import './create-product.css'
import { useSelector, useDispatch } from 'react-redux';
import {createProduct, listProducts,updateProduct,deleteProduct} from '../../../actions/product-actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import ProductList from './product-list/product-list';
import Loader from '../../Loader/Loader';
const CreateProduct=()=>
{
      // start initial variable
      const [isModalVisible,setIsModalVisible]=useState(false);
      const productList=useSelector(sotre=>sotre.productsList);
      const { products,totalDocs , loading ,error }=productList;

      const [id,setID]=useState('');
      const [name,setName]=useState('');
      const [price,setPrice]=useState(0);
      const [category,setCategory]=useState('');
      const [image,setImage]=useState('');
      const [brand,setBrand]=useState('');
      const [description,setDescription]=useState('');
      const [countInStock,setCountInStock]=useState(0);

      const createProductState=useSelector(store=>store.createProduct);
      const {loading:loadingSave,success:successSave,error:errorSave}=createProductState;
      const dispatch=useDispatch();

      const deleteProductState=useSelector(store=>store.deleteProduct);
      const {loading:loadingDelete,success:successDelete,error:errorDelete}=deleteProductState;

      const signInState=useSelector(store=>store.signIn);
      const {userInfo}=signInState;

      const [currentPage,setCurrentPage]=useState(0);
      const [documentsPerPage]=useState(10);
      // end initial variable


      // start useEffect
      useEffect(()=>{
            dispatch(listProducts(currentPage,documentsPerPage));
            return ()=>{}
      },[currentPage])
      // end useEffect


      // start actions
      const handleSubmit=(e)=>{
            e.preventDefault();
            if(id)
            {
                  dispatch(updateProduct({id,name,price,category,brand,countInStock,image,description}))
            }
            else
            {
                  dispatch(createProduct({name,price,category,brand,countInStock,image,description}));
            }
            window.location.reload(true);
      }
      
      const deleteProd=(id)=>
      {
            dispatch(deleteProduct(id));
            window.location.reload(true);
      }

      const openModal=(product)=>{
            setIsModalVisible(true)
            setName(product.name);
            setID(product._id);
            setPrice(product.price);
            setBrand(product.brand);
            setCategory(product.category);
            setDescription(product.description);
            setCountInStock(product.countInStock)
            setImage(product.image);
      }
      
      const closeModal=()=>{
            setIsModalVisible(false)
      }

      const pagination=(number)=>{
            console.log(number);
            setCurrentPage(number);
      }
      // End actions

      return <div className="container">
            {isModalVisible?<div className="create-product">
                  <button className="position-left clear-btn" onClick={closeModal}> <FontAwesomeIcon icon={faArrowLeft}/> </button>
                  <div >
                  <h2><strong>Create Product</strong></h2>
                  {loadingSave?<Loader/>:
                  errorSave?<div>{error}</div>:
                  <div>{successSave}</div>}
      <form onSubmit={handleSubmit}>
      <table>
            <tbody>
            <tr>
                  <td>Name</td>
                  <td><input value={name||''} type="text" name="name" id="name" 
                  onChange={e=>setName(e.target.value)}/></td>
            </tr>
            <tr>
                  <td>Category</td>
                  <td><input value={category||''} type="text" name="category" id="category"
                  onChange={e=>setCategory(e.target.value)}/></td>

            </tr>
            <tr>
                  <td>Price</td>
                  <td><input value={price||0} type="text" name="price" id="price"
                  onChange={e=>setPrice(e.target.value)}/></td>
            </tr>
            <tr>
                  <td>Brand</td>
                  <td><input value={brand||''} type="text" name="brand" id="brand"
                  onChange={e=>setBrand(e.target.value)}/></td>
            </tr>
            <tr>
                  <td>Description</td>
                  <td><textarea value={description||''} cols="23" rows="5"
                  onChange={e=>setDescription(e.target.value)}/></td>
            </tr>
            <tr>
                  <td>Image</td>
                  <td>
                  {id?<input type="text" value={image} name="image" id="image"
                  onChange={e=>setImage(e.target.value)}/>:
                  <input type="file" name="image" id="image"
                  onChange={e=>setImage(e.target.value)}/>}
                  </td>
            </tr>          
            <tr>
                  <td>countInStock</td>
                  <td><input type="number" value={countInStock||0} name="countInStock" id="countInStock"
                  onChange={e=>setCountInStock(e.target.value)}/></td>
            </tr>
            <tr>
                  <td></td>
                  <td>
                  <button type="submit" className="btn btn-success add-product-button">
                  {id?"Update":"Add"} 
                  </button>
                  </td>
                  
            </tr>
            </tbody>
      </table>
      </form>
      </div>
      </div>:
            <div>
            <ProductList products={products} loading={loading} error={error} userInfo={userInfo}
            deleteProd={deleteProd} openModal={openModal} totalDocs={totalDocs} 
            documentsPerPage={documentsPerPage} pagination={pagination}/>


            </div>
      }      
      </div>
}

export default CreateProduct;