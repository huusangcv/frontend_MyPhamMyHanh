import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { setShowAccountModal } from "../../redux/features/isShowAccountModal/isShowAccountModalSlice";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles);
const RegisterBtn = () => {
  const dispatch = useDispatch();

  return (
    <button
      className={cx("register-btn", "btn")}
      onClick={() => dispatch(setShowAccountModal(true))}
    >
      Đăng ký
    </button>
  );
};

export default RegisterBtn;
