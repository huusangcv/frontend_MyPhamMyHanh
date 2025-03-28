import classNames from 'classnames/bind';
import styles from './AddressInfo.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const AddressInfo = () => {
  return (
    <div className={cx('wapper')}>
      <div className={cx('top-nav-bar')}>
        <div className={cx('navbar-container')}>
          <div>
            <div data-v-5170e23d="" className={cx('icon')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.1" clip-path="url(#clip0_11167_71432)">
                  <path d="M25 12H7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path
                    d="M12 19L5 12L12 5"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_11167_71432">
                    <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className={cx('nav-bar__title')}>Thông tin địa chỉ</div>
        </div>
      </div>
      <div className={cx('container')}>
        <Link to={'/member/account/user-info/address-info/update-address'} className={cx('button__add-address')}>
          Thêm địa chỉ mới
        </Link>
      </div>
    </div>
  );
};

export default AddressInfo;
