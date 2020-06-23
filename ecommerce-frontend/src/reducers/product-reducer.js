import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL} from '../constants/constants';
const {CREATE_PRODUCT_REQUEST,CREATE_PRODUCT_SUCCESS,CREATE_PRODUCT_FAIL} =require('../constants/constants');
const {DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS,DELETE_PRODUCT_FAIL} =require('../constants/constants');
function productListReducer(state={products:[],totalDocs:0},action)
{
      switch(action.type)
      {
            case PRODUCT_LIST_REQUEST:
                  return {loading:true};
            case PRODUCT_LIST_SUCCESS:         
                  console.log('products '+action.payload.products+' '+action.payload.totalDocs);    
                  return {loading:false,products:action.payload.products,totalDocs:action.payload.totalDocs};
            case PRODUCT_LIST_FAIL:
                  return {loading:false,error:action.payload};
            default :
                  return state;
      }
}

function productDetailsReducer(state={product:{}},action)
{
      switch(action.type)
      {
            case PRODUCT_DETAILS_REQUEST:
                  return {loading:true};
            case PRODUCT_DETAILS_SUCCESS:
                  return {loading:false,product:action.payload};
            case PRODUCT_DETAILS_FAIL:
                  return {loading:false,error:action.error}
            default:
                  return state;
      }
}

function createProductReducer(state={messageSave:{}},action)
{
      switch(action.type)
      {
            case CREATE_PRODUCT_REQUEST:
                  return {loadingSave:true}
            case CREATE_PRODUCT_SUCCESS:
                  return {loadingSave:false,messageSave:action.payload}
            case CREATE_PRODUCT_FAIL:
                  return {loadingSave:false,errorSave:action.payload}
            default:
                  return state;
      }
}

const updateProductReducer=(state={message:{}},action)=>
{
      switch(action.type)
      {
            case UPDATE_PRODUCT_REQUEST:
                  return {loadingUpdate:true};
            case UPDATE_PRODUCT_SUCCESS:
                  return {loadingUpdate:false,messageUpdate:action.payload};
            case UPDATE_PRODUCT_FAIL:
                  return {loadingUpdate:false,messageUpdate:action.payload};
            default:
                  return state;
      }
}

const deleteProductReducer=(state={message:{}},action)=>{
      switch(action.type)
      {
            case DELETE_PRODUCT_REQUEST:
                  return {loadingDelete:true};
            case DELETE_PRODUCT_SUCCESS:
                  return {loadingDelete:false,message:action.payload};
            case DELETE_PRODUCT_FAIL:
                  return {loadingDelete:false,message:action.payload};
            default:
                  return state;
      }
}

export {productListReducer,productDetailsReducer,
      createProductReducer,updateProductReducer,
      deleteProductReducer};