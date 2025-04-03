import { ReactNode } from "react";
import Header from "../components/header/Header";
import { Box } from "@mui/material";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setShowAccountModal } from "../redux/features/isShowAccountModal/isShowAccountModalSlice";

const cx = classNames.bind(styles);

interface CartLayoutProps {
  children: ReactNode;
}

const CartLayout: React.FC<CartLayoutProps> = ({ children }) => {
  const isShowModalAccount = useSelector(
    (state: RootState) => state.modalAccount
  );

  const dispatch = useDispatch();
  return (
    <>
      <Header></Header>
      <div className={cx("sidebar-container")}>
        <div className={cx("sidebar-content")}>
          <Box sx={{ bgcolor: "#fff" }}>{children}</Box>
        </div>
      </div>
      <ToastContainer />
      {isShowModalAccount && (
        <div className={cx("wapper")}>
          <div
            className={cx("overplay")}
            onClick={() => dispatch(setShowAccountModal(false))}
          ></div>
          <div className={cx("content")}>
            <button
              className={cx("close")}
              onClick={() => dispatch(setShowAccountModal(false))}
            >
              <span>×</span>
            </button>

            <iframe
              src="https://accounts.regis.id.vn/login"
              frameBorder="0"
              className={cx("content__inner")}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default CartLayout;
