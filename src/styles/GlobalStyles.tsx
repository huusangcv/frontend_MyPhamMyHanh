import { ReactNode } from "react";
import "./base.scss";
import "./global.scss";
interface GlobalStylesProps {
  children: ReactNode;
}

const GlobalStyles = ({ children }: GlobalStylesProps) => {
  return children;
};

export default GlobalStyles;
