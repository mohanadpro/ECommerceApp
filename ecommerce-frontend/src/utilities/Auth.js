import Cookie from 'js-cookie';
class Auth{

      constructor()
      {}                  
            isUser()
            {
                  const userInfo=Cookie.getJSON('userInfo') || null;
                  if(!userInfo)
                  {
                        return false
                  }
                  else
                  {
                        const token=userInfo.token;
                        if(token)
                              return true;
                        return false;
                  }
            }

            canDeleteProduct()
            {
                  const userInfo=Cookie.getJSON('userInfo') || null;
                  return userInfo.canDeleteProduct;
            }

            canCreateProduct()
            {
                  const userInfo=Cookie.getJSON('userInfo') || null;
                  return userInfo.canCreateProduct;
            }
            

            canEditProduct()
            {
                  const userInfo=Cookie.getJSON('userInfo') || null;
                  return userInfo.canEditProduct;
            }

            isAdmin()
            {
            const userInfo=Cookie.getJSON('userInfo') || null;
                  if(!userInfo)                  
                        return false
                  
                  else
                        return userInfo.isAdmin;
            }

            logout(){
                  var object=Cookie.getJSON('userInfo');
                  console.log(object);
                  Cookie.remove('userInfo');
            }
}

export default new Auth();