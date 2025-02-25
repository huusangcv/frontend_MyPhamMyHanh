import { ReactNode } from "react";
import Header from "../components/header/Header";
import { Box, Container } from "@mui/material";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Header></Header>
      <Container maxWidth="md">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>{children}</Box>
      </Container>
    </>
  );
};

export default DefaultLayout;
