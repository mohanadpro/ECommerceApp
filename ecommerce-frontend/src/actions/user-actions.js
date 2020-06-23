import Cookie from 'js-cookie';

const { default: Axios } = require("axios")
const {SERVER_IP,SIGN_IN_REQUEST,SIGN_IN_SUCCESS,SIGN_IN_FAIL, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAIL}=require('../constants/constants');

const signInAction=(email,password)=>async(dispatch)=>
{
      try{
      dispatch({type:SIGN_IN_REQUEST})
      const {data}=await Axios.post(SERVER_IP+'/api/users/signin',{email,password});
      Cookie.set('userInfo',JSON.stringify(data))
      dispatch({type:SIGN_IN_SUCCESS,payload:data });
      }catch(error)
      {
            dispatch({type:SIGN_IN_FAIL,payload:error.message})
      }
}

const signUpAction=(username,email,password)=>(dispatch)=>
{
      try{
            dispatch({type:SIGN_UP_REQUEST})
            const {data}=Axios.post(SERVER_IP+'/api/users/signup',{username,email,password})
            dispatch({type:SIGN_UP_SUCCESS,payload:data})
      }catch(error)
      {
            dispatch({type:SIGN_UP_FAIL,payload:error.message})
      }
}

export {signInAction,signUpAction}