import classNames from "classnames/bind";
import styles from "./Button.module.scss";
const cx = classNames.bind(styles);
const RegisterBtn = () => {
  return <button className={cx("register-btn", "btn")}>Đăng ký</button>;
};

export default RegisterBtn;
