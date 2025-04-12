import { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './base.scss';
import './global.scss';
import './buttonSubmit.scss';
import './contentChatbot.scss';
interface GlobalStylesProps {
  children: ReactNode;
}

const GlobalStyles = ({ children }: GlobalStylesProps) => {
  return children;
};

export default GlobalStyles;
