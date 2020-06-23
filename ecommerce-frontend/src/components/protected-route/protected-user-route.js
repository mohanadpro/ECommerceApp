import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../../utilities/Auth';
const ProtectedUserRoute = ({component:Component,...rest}) => {
      return (
            <Route render={
                  (props)=>{
                        if(auth.isUser())
                        {
                              return <Component {...props} />
                        }
                        else
                        {
                              return <Redirect to={
                                    {
                                          pathname:'/',
                                          state:{
                                                from:props.loacation
                                          }
                                    }
                              }/>
                        }
                  }
            }/>
      );
};

export default ProtectedUserRoute