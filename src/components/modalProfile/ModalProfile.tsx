import classNames from 'classnames/bind';
import styles from './ModalProfile.module.scss';
import { Avatar } from '@mui/material';
import { CSSProperties, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import usersMethods from '../../services/users';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../redux/features/profile/profileSlice';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
const styleModalProfile: CSSProperties = {
  zIndex: 9999,
  position: 'absolute',
  inset: '0px 0px auto auto',
  margin: '0px',
  transform: 'translate3d(-28px, 57.3333px, 0px)',
};
const ModalProfile = () => {
  const [isShowModalProfile, setIsShowModalProfile] = useState<boolean>(false);
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await usersMethods.logout();
      if (res.status) {
        dispatch(
          setProfile({
            _id: '',
            username: '',
            address: '',
            phone: '',
            image: '',
            email: '',
          }),
        );
        Cookies.remove('customer', { path: '/', domain: '.regis.id.vn' });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div
        className={cx('avatar-wrapper')}
        aria-expanded={isShowModalProfile}
        aria-controls="tippy-4"
        onClick={() => setIsShowModalProfile(!isShowModalProfile)}
      >
        <div className="_avatar_hzxfy_1">
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={`https://backend.regis.id.vn${profile.image}`}
            alt={profile.username}
          />
        </div>
      </div>
      {isShowModalProfile && (
        <div data-tippy-root id="tippy-4" style={isShowModalProfile && styleModalProfile}>
          <ul className={cx('wapper__profile')}>
            <Link className={cx('user')} to="/member">
              <div className={cx('avatarWapper')}>
                <div className="_avatar_hzxfy_1">
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={`https://backend.regis.id.vn${profile.image}`}
                    alt={profile.username}
                  />
                </div>
              </div>
              <div className={cx('info')}>
                <span className={cx('name')}>{profile.username}</span>
                <div className={cx('email')}>{profile.email}</div>
              </div>
            </Link>
            <hr />
            <ul className={cx('list')}>
              <li>
                <Link className={cx('item')} to="/member/order">
                  Đơn hàng của tôi
                </Link>
              </li>
            </ul>
            <hr />
            <ul className={cx('list')}>
              <li>
                <Link className={cx('item')} to="/member">
                  Sản phẩm đã xem
                </Link>
              </li>
              <li>
                <Link className={cx('item')} to="/member">
                  Bài viết đã xem
                </Link>
              </li>
              <li>
                <Link className={cx('item')} to="/member">
                  Yêu thích
                </Link>
              </li>
            </ul>
            <hr />
            <ul className={cx('list')}>
              <li onClick={handleLogout}>
                <div className={cx('item')}>Đăng xuất</div>
              </li>
            </ul>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModalProfile;
