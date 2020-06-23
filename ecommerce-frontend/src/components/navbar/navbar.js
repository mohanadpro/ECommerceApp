import React from "react";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';


const Navbar = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button onClick={props.openMenu}>
        <span>
          <FontAwesomeIcon icon={faBars} />
        </span>
      </button>
      <Link className="navbar-brand" to="/">
        amazona
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            {props.userInfo?.isAdmin ||
            props.userInfo?.canDeleteProduct ||
            props.userInfo?.canDeleteProduct ||
            props.userInfo?.canDeleteProduct ? null : (
              <Link className="nav-link" to="/cart-details">
                {t("Cart.1")}
              </Link>
            )}
          </li>
          <li className="mynav nav-item">
            {props.userInfo ? (
              <ul>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to=""
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {props.userInfo.username}
                  </Link>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/profile">
                      {t("Profile.1")}
                    </Link>
                    <button
                      style={{ color: "black", fontSize: 15 }}
                      className="dropdown-item"
                      onClick={() => props.logout()}
                    >
                      {t("Logout.1")}
                    </button>

                    <div>
                      {props.userInfo?.isAdmin && (
                        <Link className="dropdown-item" to="/profile">
                          {" "}
                          {t("User management.1")}{" "}
                        </Link>
                      )}
                    </div>
                    {(props.userInfo?.isAdmin ||
                      props.userInfo?.canCreateProduct ||
                      props.userInfo?.canEditProduct ||
                      props.userInfo?.canDeleteProduct) && (
                      <Link className="dropdown-item" to="/product-managment">
                        {" "}
                        {t("Product management.1")}{" "}
                      </Link>
                    )}
                  </div>
                </li>
              </ul>
            ) : (
              <Link className="nav-link" to="/sign-in">
                {t("Sign In.1")}
              </Link>
            )}
          </li>
          <li className="languages nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to=""
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Languages
                  </Link>
                  <div className="dropdown-menu">
                    <button className="dropdown-item" style={{ color: "black", fontSize: 15 }}
                    onClick={e=>props.setLanguage('en')}>
                      English
                    </button>
                    <button
                      style={{ color: "black", fontSize: 15 }}
                      className="dropdown-item"
                      onClick={(e) => props.setLanguage('de')}
                    >
                      Deutsch
                    </button>
                  </div>
                  </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
