import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Link } from 'react-router-dom';
import { setShowAccountModal } from '../../redux/features/isShowAccountModal/isShowAccountModalSlice';
const cx = classNames.bind(styles);
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Notification = () => {
  const [showCart, setShowCart] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className={cx('cart')}>
      <div className={cx('cart__cta')} onClick={handleShowCart}>
        <IconButton>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bell"
            className="svg-inline--fa fa-bell _action-icon_vdbp4_107"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
            ></path>
          </svg>
          <CartBadge badgeContent={12} color="primary" overlap="circular" />
        </IconButton>
      </div>
      {showCart && (
        <>
          {(notifications.length > 0 && (
            <div className={cx('cart__dropdown')} onMouseLeave={handleShowCart}>
              <ul className={cx('wapper-dropdown')}>
                <div className={cx('cart__header')}>
                  <div className={cx('heading')}>Thông báo của tôi</div>

                  {(profile._id === '' && (
                    <div onClick={() => dispatch(setShowAccountModal(true))} className={cx('view-all-orders-btn')}>
                      Xem tất cả
                    </div>
                  )) || (
                    <Link to={'/cart'} className={cx('view-all-orders-btn')}>
                      Xem tất cả
                    </Link>
                  )}
                </div>
                <div className={cx('cart__content')}></div>
              </ul>
            </div>
          )) || (
            <div className={cx('cart__dropdown')} onMouseLeave={handleShowCart}>
              <ul className={cx('wapper-dropdown')}>
                <div className={cx('cart__header')}>
                  <div className={cx('heading')}>Thông báo của tôi</div>
                </div>
                <div className={cx('cart__content')}>
                  <div className={cx('no-result')}>Chưa có thông báo nào</div>
                </div>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Notification;
