import classNames from "classnames/bind";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);
const LoginBtn = () => {
  return <button className={cx("login-btn", "btn")}>Đăng nhập</button>;
};

export default LoginBtn;
