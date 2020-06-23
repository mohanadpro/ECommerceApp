import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import auth from '../../utilities/Auth';

const ProtectedAdminRoute = ({component:Component,...rest}) => {
      return (
            // the value from render property is a functional component
            <Route {...rest} render={
                  (props)=>{
                  if(auth.isAdmin()||auth.canCreateProduct()||auth.canDeleteProduct()
                  ||auth.canEditProduct())
                  {
                        return <Component {...props}/>
                  }
                  else
                  {
                        return <Redirect to={
                        {
                            pathname:'/',  
                            state:{
                                  from:props.location
                            } 
                        }
                        }/>
                  }
            }}/>
      );
};

export default ProtectedAdminRoute;