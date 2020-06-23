const {SERVER_ENVIRONMENT,DEVELOPEMENT_SERVER_IP,SERVER_IP, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL} =require('../constants/constants');
const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } = require("../constants/constants")
var axios=require('axios');
const {PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL} =require('../constants/constants');

const {DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS,DELETE_PRODUCT_FAIL} =require('../constants/constants');

const {CREATE_PRODUCT_REQUEST,CREATE_PRODUCT_SUCCESS,CREATE_PRODUCT_FAIL} =require('../constants/constants');


const listProducts=(currentPage,documentsPerPage)=> async(dispatch)=>{
      try{
            dispatch({type:PRODUCT_LIST_REQUEST})
            console.log('entered')
            const {data}=await axios.post(SERVER_IP+'/api/products',{currentPage,documentsPerPage});
            dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});
      }catch(error)
      {
            dispatch({type:PRODUCT_LIST_FAIL,payload:error.message});
      }
}


const detailsProduct=(productId)=> async(dispatch)=>
{
      try{
            dispatch({type:PRODUCT_DETAILS_REQUEST});
            const {data}=await axios.get(SERVER_IP+'/api/products/'+productId);
            dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data});
      }catch(error)
      {
            dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.msg})
      }
}

const createProduct=(product)=>async (dispatch,getState)=>
{
      try{
            dispatch({type:CREATE_PRODUCT_REQUEST});
            const {signIn:{userInfo}}=getState();
            const {data}=await axios.post(SERVER_IP+'/api/products/',{product},{headers:{
                  Authorization:'Bearer '+userInfo.token
            }})
            dispatch({type:CREATE_PRODUCT_SUCCESS,payload:data});
      }catch(error)
      {
            dispatch({type:CREATE_PRODUCT_FAIL,payload:error.message})
      }
}

const updateProduct=(product)=>async(dispatch,getState)=>{
      try{
            dispatch({type:UPDATE_PRODUCT_REQUEST});
            const {signIn:{userInfo}}=getState();
            const {data}=await axios.patch(SERVER_IP+'/api/products/'+product.id,{product},{headers:{Authorization:'Bearer '+userInfo.token}})
            dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:data,successUpdate:true});
      }catch(error)
      {
            dispatch({type:UPDATE_PRODUCT_FAIL,payload:error.message})
      }
}

const deleteProduct=(id)=>async(dispatch,getState)=>{
      try{
            dispatch({type:DELETE_PRODUCT_REQUEST});
            const {signIn:{userInfo}}=getState();
            const {data}=await axios.delete(SERVER_IP+'/api/products/'+id,
            {headers:{ Authorization:'Bearer '+ userInfo.token}});
            dispatch({type:DELETE_PRODUCT_SUCCESS,payload:data})
      }catch(err)
      {
            dispatch({type:DELETE_PRODUCT_FAIL,payload:err.message})
      }
}

export {listProducts,detailsProduct,createProduct,updateProduct,deleteProduct};