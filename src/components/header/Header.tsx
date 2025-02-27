import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Search from "../search/Search";
import LoginBtn from "../buttons/Login";
import RegisterBtn from "../buttons/Register";

const cx = classNames.bind(styles);
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cx("header")}>
      <a onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" width={200} />
      </a>
      <Search />
      <div className={cx("header__actions")}>
        <RegisterBtn />
        <LoginBtn />
      </div>
    </header>
  );
};

export default Header;
