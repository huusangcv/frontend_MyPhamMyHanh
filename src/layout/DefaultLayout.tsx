import { ReactNode } from "react";
import Header from "../components/header/Header";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer/Footer";
import BottomNav from "../components/bottomNavigation/BottomNavigation";
import Login from "../pages/login/Login";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { setShowAccountModal } from "../redux/features/isShowAccountModal/isShowAccountModalSlice";

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const isShowModalAccount = useSelector(
    (state: RootState) => state.modalAccount
  );

  const dispatch = useDispatch();
  return (
    <>
      <Header></Header>
      <div className={cx("sidebar-container")}>
        <Sidebar />
        <div className={cx("sidebar-content")}>
          <Box sx={{ bgcolor: "#fff" }}>{children}</Box>
        </div>
      </div>
      <BottomNav />
      <Footer />
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

            <div className={cx("content__inner")}>
              <div className={cx("magic")}></div>
              <div className={cx("wapper__content")}>
                <div className={cx("wapper__inner")}>
                  <header className={cx("header")}>
                    <a href="https://fullstack.edu.vn" target="_top">
                      <img
                        src="/src/assets/logo-mobile.png"
                        alt="logo"
                        className={cx("logo")}
                      />
                    </a>
                    <h1 className={cx("heading")}>
                      Đăng nhập vào Mỹ phẩm Mỹ Hạnh
                    </h1>
                    <p className={cx("description")}>
                      Vui lòng đăng nhập tài khoản Thành Viên để xem ưu đãi và
                      thanh toán dễ dàng hơn.
                    </p>
                  </header>

                  <div className={cx("main")}>
                    <Login />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DefaultLayout;
