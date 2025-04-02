import logoDesktop from '../../assets/logo.png';
import logoMoblie from '../../assets/logo-mobile.png';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Search from '../search/Search';
import LoginBtn from '../buttons/Login';
// import RegisterBtn from '../buttons/Register';
import Cart from '../cart/Cart';
import ProductMenu from '../product-menu/ProductMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ModalProfile from '../modalProfile/ModalProfile';
const cx = classNames.bind(styles);
const Header = () => {
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <header className={cx('header')}>
      <a onClick={() => navigate('/')}>
        <img src={logoDesktop} alt="Logo" width={150} className={cx('logo-desktop', 'logo')} />
        <img src={logoMoblie} alt="Logo" width={38} className={cx('logo-mobile', 'logo')} />
      </a>
      <ProductMenu />
      <div className={cx('body')}>
        <div>
          <Search />
        </div>
      </div>

      {(profile._id !== '' && (
        <div className={cx('header__actions')}>
          {profile._id !== '' && (
            <div className="d-lg-none">
              <button className={cx('btn-member')} aria-expanded="false" onClick={() => navigate('/member/order')}>
                Đơn hàng của tôi
              </button>
            </div>
          )}
          <Cart />
          <ModalProfile />
        </div>
      )) || (
        <div className={cx('header__actions')}>
          <Cart />
          {/* <RegisterBtn /> */}
          <LoginBtn />
        </div>
      )}
    </header>
  );
};

export default Header;
