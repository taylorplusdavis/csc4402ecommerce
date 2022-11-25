import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  HeartIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";

function Navbar() {
  const [cart, setCart] = useState([]);
  return (
    <div className="nav">
      {/* left */}
      <div className="nav__left">
        <Link to="/">
          <img src={logo} alt="logo" className="nav__logo" />
        </Link>

        <p className="nav__logo_text">Swappy</p>
      </div>
      {/* center */}
      <div className="nav__center">
        <ul className="nav__center_list">
          <Link className="nav__center_list_item" to="/womens">
            <p className="nav__link">Womens</p>
          </Link>
          <Link className="nav__center_list_item" to="/mens">
            <p className="nav__link">Mens</p>
          </Link>
          <Link className="nav__center_list_item" to="/accessories">
            <p className="nav__link">Accessories</p>
          </Link>
        </ul>
      </div>
      {/* right */}
      <div className="nav__right">
        <Link className="nav__right_links" to="/cart">
          <ShoppingCartIcon className="nav__icon" />
        </Link>
        <Link className="nav__right_links" to="/likes">
          <HeartIcon className="nav__icon" />
        </Link>
        <Link className="nav__right_links" to="/account">
          <UserIcon className="nav__icon" />
        </Link>
        <Link className="nav__right_links" to="/">
          <ShoppingBagIcon className="nav__icon" />
          <p className="nav__cart_count">{cart.length}</p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
