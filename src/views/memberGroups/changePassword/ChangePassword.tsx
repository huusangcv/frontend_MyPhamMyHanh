import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';

const cx = classNames.bind(styles);

const ChangePassword = () => {
  return (
    <div className={cx('wapper')}>
      <div className={cx('container')}>
        <div className={cx('header')}>Tạo mật khẩu mới</div>
      </div>

      <div className={cx('container')}>
        <div className={cx('block-change-password')}>
          <div className={cx('change-password__form')}>
            <p className={cx('form__notice')}>Nhập mật khẩu hiện tại</p>
            <div className={cx('form__group')}>
              <div className={cx('field')}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại của bạn"
                  required
                  className={cx('group__item')}
                />
              </div>
            </div>
          </div>
          <div className={cx('change-password__form')}>
            <p className={cx('form__notice')}>Tạo mật khẩu mới</p>
            <div className={cx('form__group')}>
              <div className={cx('field')}>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  placeholder="Nhập mật khẩu mới của bạn"
                  className={cx('group__item')}
                  aria-autocomplete="list"
                />
                <p className={cx('item__description')}>Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số.</p>
              </div>
              <div className={cx('field')}>
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  required
                  placeholder="Xác nhận lại mật khẩu"
                  className={cx('group__item')}
                />
              </div>
            </div>
            <div className={cx('btn-form__submit')}>Xác nhận</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
