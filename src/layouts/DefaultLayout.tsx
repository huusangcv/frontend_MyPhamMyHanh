import { ReactNode } from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/footer/Footer';
import BottomNav from '../components/bottomNavigation/BottomNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setShowAccountModal } from '../redux/features/isShowAccountModal/isShowAccountModalSlice';
import ChatbotAi from '../components/chatbotAi/ChatbotAi';

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const isShowModalAccount = useSelector((state: RootState) => state.modalAccount);

  const dispatch = useDispatch();
  return (
    <>
      <Header></Header>
      <div className={cx('sidebar-container')}>
        <Sidebar />
        <div className={cx('sidebar-content')}>{children}</div>
      </div>
      <BottomNav />
      <Footer />
      <ToastContainer />
      {isShowModalAccount && (
        <div className={cx('wapper')}>
          <div className={cx('overplay')} onClick={() => dispatch(setShowAccountModal(false))}></div>
          <div className={cx('content')}>
            <button className={cx('close')} onClick={() => dispatch(setShowAccountModal(false))}>
              <span>×</span>
            </button>
            <iframe src="https://accounts.regis.id.vn/login" frameBorder="0" className={cx('content__inner')}></iframe>
          </div>
        </div>
      )}
      <ChatbotAi />
      <BottomNav />
    </>
  );
};

export default DefaultLayout;
