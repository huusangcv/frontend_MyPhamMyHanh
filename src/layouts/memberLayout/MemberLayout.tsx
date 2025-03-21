import { ReactNode } from "react";
import Header from "../../components/header/Header";
import styles from "./MemberLayout.module.scss";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setShowAccountModal } from "../../redux/features/isShowAccountModal/isShowAccountModalSlice";
import SidebarMember from "../../components/sidebarMember/SidebarMember";
const cx = classNames.bind(styles);

interface MemberLayoutProps {
  children: ReactNode;
}
const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => {
  const isShowModalAccount = useSelector(
    (state: RootState) => state.modalAccount
  );

  const dispatch = useDispatch();
  return (
    <>
      <Header></Header>
      <div className={cx("member-container")}>
        <div className={cx("member-background")}></div>
        <SidebarMember></SidebarMember>
        <div className={cx("main-content")}>{children}</div>
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
              src="http://localhost:5174/login"
              frameBorder="0"
              className={cx("content__inner")}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberLayout;
