import logoDesktop from "../../assets/logo.png";
import logoMoblie from "../../assets/logo-mobile.png";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Search from "../search/Search";
import LoginBtn from "../buttons/Login";
import RegisterBtn from "../buttons/Register";
import Cart from "../cart/Cart";
import ProductMenu from "../product-menu/ProductMenu";

const cx = classNames.bind(styles);
const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={cx("header")}>
      <a onClick={() => navigate("/")}>
        <img
          src={logoDesktop}
          alt="Logo"
          width={150}
          className={cx("logo-desktop", "logo")}
        />
        <img
          src={logoMoblie}
          alt="Logo"
          width={38}
          className={cx("logo-mobile", "logo")}
        />
      </a>
      <ProductMenu />
      <Search />
      <Cart />
      <div className={cx("header__actions")}>
        <RegisterBtn />
        <LoginBtn />
      </div>
    </header>
  );
};

export default Header;
