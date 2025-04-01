import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import { useEffect, useState } from 'react';
import usersMethods from '../../../services/users';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setProfile } from '../../../redux/features/profile/profileSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ChangePassword = () => {
  const [password, setPassword] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    scroll({
      top: 0,
    });
  }, []);

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      toast.error('Nhập lại mật khẩu không chính xác', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      try {
        const { data, status } = await usersMethods.changePassword({ email: profile.email, currentPassword, password });
        if (status) {
          dispatch(setProfile(data.data));
          toast.success(data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          navigate('/member/account/user-info');
        } else {
          toast.error(data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
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
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận lại mật khẩu"
                  className={cx('group__item')}
                />
              </div>
            </div>
            <div className={cx('btn-form__submit')} onClick={handleChangePassword}>
              Xác nhận
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
