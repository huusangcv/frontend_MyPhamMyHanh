import styles from './AccountSupport.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AccountSupport = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('supportItem')}>
        <img src="/icons/consultation.png" alt="Tư vấn mua hàng" />
        <p>Tư vấn mua hàng (8h00 - 22h00)</p>
        <span>1800.2097</span>
      </div>
      <div className={cx('supportItem')}>
        <img src="/icons/warranty.png" alt="Bảo hành" />
        <p>Bảo hành (8h00 - 21h00)</p>
        <span>1800.2064</span>
      </div>
      <div className={cx('supportItem')}>
        <img src="/icons/complaint.png" alt="Khiếu nại" />
        <p>Khiếu nại (8h00 - 21h30)</p>
        <span>1800.2063</span>
      </div>
      <div className={cx('supportItem')}>
        <img src="/icons/email.png" alt="Email" />
        <p>Email</p>
        <span>cskh@myphammyhanh.com.vn</span>
      </div>
    </div>
  );
};

export default AccountSupport;
