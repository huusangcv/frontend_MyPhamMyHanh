import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames";

const cx = classNames.bind(styles);
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cx("header")}>
      <a onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" width={200} />
      </a>
    </header>
  );
};

export default Header;
