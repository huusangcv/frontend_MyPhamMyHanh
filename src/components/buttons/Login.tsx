import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { useDispatch } from "react-redux";
import { setShowAccountModal } from "../../redux/features/isShowAccountModal/isShowAccountModalSlice";
const cx = classNames.bind(styles);
const LoginBtn = () => {
  const dispatch = useDispatch();

  return (
    <button
      className={cx("login-btn", "btn")}
      onClick={() => dispatch(setShowAccountModal(true))}
    >
      Đăng nhập
    </button>
  );
};

export default LoginBtn;
