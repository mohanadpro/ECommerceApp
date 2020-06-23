import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import SignIn from "./components/usermanagement/signin/sign-in";
import ProductList from "./components/productmanagment/ProductList/product-list";
import ProductDetails from "./components/productmanagment/ProductDetails/product-details";
import CartDetails from "./components/cartmanagement/CartDetails/cart-details";
import SignUp from "./components/usermanagement/signup/sign-up";
import CreateProduct from "./components/productmanagment/create-product/create-product";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { useSelector } from "react-redux";
import ProtectedAdminRoute from "./components/protected-route/protected-admin-route";
import Profile from "./components/usermanagement/profile/profile";
import ProtectedUserRoute from "./components/protected-route/protected-user-route";
import auth from "./utilities/Auth";
import { useTranslation } from "react-i18next";
import  Navbar  from "./components/navbar/navbar";
function App() {
  const signIn = useSelector((store) => store.signIn);
  const { userInfo } = signIn;
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    i18n.changeLanguage(language);
    return () => {};
  }, [language]);

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  const logout = () => {
    auth.logout();
    window.location.href = "/";
  };
  return (
    <BrowserRouter>
      <div className="page-container">
        <Navbar
          userInfo={userInfo}
          setLanguage={setLanguage}
          openModal={openMenu}
          logout={logout}
        />
        <main id="product-container">
          <Switch>
            <Route exact={true} path="/" component={ProductList} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/cart-details/:id?" component={CartDetails} />
            <ProtectedAdminRoute
              path="/product-managment/"
              component={CreateProduct}
            />
            <ProtectedUserRoute path="/profile" component={Profile} />
          </Switch>
        </main>

        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button onClick={closeMenu}>X</button>
          <ul>
            <li>
              <Link to="#">Pants</Link>
            </li>
            <li>
              <Link to="#">Shirts</Link>
            </li>
          </ul>
        </aside>

        <footer className="footer">
          <p> {t("All rights reserved.1")}</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
