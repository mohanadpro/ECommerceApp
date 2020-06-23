import React, { useState } from 'react';
import '../signup/sign-up.css';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import {signUpAction} from '../../../actions/user-actions';
function SignIn(props)
{
      const [username,setUsername]=useState('');
      const [email,setEmail]=useState('');
      const [password,setPassword]=useState('');

      const signUp=useSelector(store=>store.signUp);
      const {message,loading,error}=signUp;
      const dispatch=useDispatch();

      const handleSignUp=(e)=>{
            e.preventDefault();
            dispatch(signUpAction(username,email,password))
      }

      return <div className="sign-up">
            <h1 className="logo">Sign Up</h1>
            {

            message && <div>{message.message}</div>
             }
            <form className="form-sign-in" onSubmit={handleSignUp}>
                  <div className="form-group">
                        <label htmlFor="username">username</label>
                  </div>

                  <div className="form-group">
                        <input type="text" placeholder="please enter your username"
                        onChange={e=>setUsername(e.target.value)}/>
                  </div>

                  <div className="form-group">
                        <label htmlFor="email">email</label>
                  </div>

                  <div className="form-group">
                        <input type="email" placeholder="please enter your email"
                        onChange={e=>setEmail(e.target.value)}/>
                  </div>
                  
                  <div className="form-group">
                        <label htmlFor="password">password</label>
                  </div>

                  <div className="form-group">
                        <input type="password" placeholder="please enter your password"
                        onChange={e=>setPassword(e.target.value)}/>
                  </div>

                  <div className="form-group">
                        <label htmlFor="rePassword">Re Password</label>
                  </div>

                  <div className="form-group">
                        <input type="password" placeholder="please repeat your password"
                        onChange={e=>setPassword(e.target.value)}/>
                  </div>


                  <div className="form-group">
                        <button type="submit" className="form-control amazona-button">Sign Up</button>
                  </div>

                  <div className="form-group">
                        <Link className="form-control sign-in-button" to='/sign-in'>Already have an account</Link>
                  </div>
            </form>
      </div>
}

export default SignIn;