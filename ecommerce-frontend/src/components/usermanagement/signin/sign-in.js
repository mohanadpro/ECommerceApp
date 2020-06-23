import React, { useState, useEffect } from 'react';
import '../signin/sign-in.css';
import { useSelector, useDispatch } from 'react-redux';
import {signInAction} from '../../../actions/user-actions';
import {useTranslation} from 'react-i18next';
import FacebookLogin from 'react-facebook-login';
import {GoogleLogin} from 'react-google-login';
import Cookie from 'js-cookie';
function SignIn(props)
{
      const [email,setEmail]=useState('');
      const [password,setPassword]=useState('');

      const [emailError,setEmailError]=useState('');
      const [passwordError,setPasswordError]=useState('');

      const {t,i18}=useTranslation();

      const signIn=useSelector(store=>store.signIn);
      const {loading,userInfo,error}=signIn;
      const dispatch=useDispatch();
      const responseFacebook = (response) => {
            console.log(response);
            response.username=response.name;
            Cookie.set('userInfo',response);
            window.location='/';
      }

      const responseGoogle = (response) => {

            Cookie.set('userInfo',response);
            props.history.push('/');
      }

      useEffect(()=>{
            console.log(userInfo)
            if(userInfo)
            {
                  console.log('User info '+userInfo);
                  props.history.push('/');
                  
            }
            return ()=>{}
      },[userInfo])

      const facebookSignInClicked=(e)=>
      {
            // e.preventDefault();
      }

      const handleSignIn=(e)=>{
            e.preventDefault();
            if(validate(e))
            {                  
                  dispatch(signInAction(email,password));
            }
      }
      const validate = (e) => {
        const { name, value } = e.target;
        var isValid = true;

        switch (name) {
          case "email":
            var regExpEmail = "/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/";
            if (value == "") {
              setEmailError("Email is empty");
              isValid = false;
            }
            if (!regExpEmail.match(regExpEmail)) {
              setEmailError("Email is not valid");
              isValid = false;
            }
            break;
          case "password":
            if (value == "") {
              setPasswordError("Password is empty");
              isValid = false;              
            }
            break;
          default:
            break;
        }
        return isValid;
      };
      
      const handleSignUp=()=>{
            props.history.push('/sign-up');
      }

      return <div className="sign-in">
            <h1 className="logo">{t('Sign In.1')}</h1>
            {     
                  loading?<div>loading</div>:
                  error && <div>{error.message}</div>
            }
            <form className="form-sign-in" onSubmit={handleSignIn}>
                  <div className="form-group">
                        <label htmlFor="email">Email</label>
                  </div>
                  <div className="form-group">
                        {emailError&&<span className="alert-danger">{emailError}</span>}
                        <input type="email" className="text-center" name="email" id="email" placeholder={t('Email placeholder.1')} onChange={e=>setEmail(e.target.value)}/>
                  </div>                  
                  <div className="form-group">
                        <label htmlFor="password">{t('Password.1')}</label>
                  </div>
                  <div className="form-group">
                        {passwordError&&<span className="alert-danger">{passwordError}</span>}
                        <input type="password" className="text-center" name="password" id="password" placeholder={t('Password placeholder.1')}
                        onChange={e=>setPassword(e.target.value)}/>
                  </div>
                  <div className="form-group">
                  <FacebookLogin
                  appId="588145718770551"
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={()=>facebookSignInClicked()}
                  callback={()=>responseFacebook()} />
                  </div>
                  <div className="form-group">
                  {/* <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  /> */}
                  </div>
                  <div className="form-group">
                        <button type="submit" className="form-control amazona-button">{t('Sign In.1')}</button>
                  </div>
            </form>

            <div className="form-sign-in">
                  <div className="form-group">
                        <label htmlFor="username">{t('New to.1')} amazona</label>
                  </div>

                  <div className="form-group">
                        <button onClick={handleSignUp} className="form-control sing-up-button">{t('Sign Up.1')}</button>
                  </div>
            </div>
      </div>
}

export default SignIn;