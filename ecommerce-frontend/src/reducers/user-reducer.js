const {SIGN_IN_REQUEST,SIGN_IN_SUCCESS,SIGN_IN_FAIL, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAIL} =require('../constants/constants');

function signInReducer(state={},action)
{
      switch(action.type)
      {
            case SIGN_IN_REQUEST:
                  return {loading:true}
            case SIGN_IN_SUCCESS:
                  return {loading:true,userInfo:action.payload}
            case SIGN_IN_FAIL:
                  return {loading:true,error:action.payload}
            default:
                  return state;
      }
}

function signUpReducer(state={},action)
{
      switch(action.type)
      {
            case SIGN_UP_REQUEST:
                  return {loading:true};
            case SIGN_UP_SUCCESS:
                  return {loading:false,message:action.payload}
            case SIGN_UP_FAIL:
                  return {loading:false,error:action.payload}
            default :
            return state;
      }
}

export {signInReducer,signUpReducer}