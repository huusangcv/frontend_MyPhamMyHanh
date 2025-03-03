import { ReactNode } from "react";
import Header from "../components/header/Header";
import { Box, Container } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
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
          <Container maxWidth="lg" style={{ minHeight: 1000, margin: 0 }}>
            <Box sx={{ bgcolor: "#fff", height: "100vh" }}>{children}</Box>
          </Container>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DefaultLayout;
