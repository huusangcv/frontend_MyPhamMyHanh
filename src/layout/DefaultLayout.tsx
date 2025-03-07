import { ReactNode } from "react";
import Header from "../components/header/Header";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer/Footer";
const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div className={cx("sidebar-container")}>
        <Sidebar />
        <div className={cx("sidebar-content")}>
          <Box sx={{ bgcolor: "#fff" }}>{children}</Box>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default DefaultLayout;
