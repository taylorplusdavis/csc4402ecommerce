import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  ArrowDownOnSquareIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";
import { useCookies } from 'react-cookie';

function Navbar() {

  const [cookies, setCookie, removeCookie] = useCookies(['id']);

  const deletecookie = () => {
   removeCookie('id', { path: '/'});
};



  return (
    <div className="nav">
      {/* left */}
      <div className="nav__left">
        <Link to="/home">
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
          <ArrowDownOnSquareIcon className="nav__icon"  onClick={deletecookie} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
