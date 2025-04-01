import classNames from 'classnames/bind';
import styles from './SocialAccount.module.scss';
import { useAppSelector } from '../../../../hooks';
import usersMethods from '../../../services/users';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../../redux/features/profile/profileSlice';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const SocialAccount = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    scroll({
      top: 0,
    });
  }, []);

  const handleCancelGoogleAccount = async () => {
    try {
      if (profile) {
        const { data, status } = await usersMethods.cancelGoogleAccount({ email: profile.email });
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // fecth profile google account
      const { data, status } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });

      if (status) {
        try {
          // check profile existing and add googleAccount into user info
          if (profile) {
            const res = await usersMethods.connectGoogleAccount({ email: data.email });
            if (res.status) {
              dispatch(setProfile(res.data.data));
              toast.success(res.data.message, {
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
              toast.error(res.data.message, {
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
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className={cx('wapper')}>
      <div className={cx('container')}>
        <div className={cx('block-social')}>
          <div className={cx('social-item')}>
            <img
              src="https://cdn2.cellphones.com.vn/x30,webp,q100/media/wysiwyg/image_45.png"
              height="30"
              alt="cps-logo"
              className="item__img"
            />
            <div className={cx('item__name')}>Google</div>
            {profile && profile.googleEmail && <div className={cx('item__status')}>Đã liên kết</div>}
            <div className={cx('item__action')}>
              {(profile && profile.googleEmail && <p onClick={handleCancelGoogleAccount}>Huỷ liên kết</p>) || (
                <p onClick={() => login()}>Liên kết ngay</p>
              )}
              <div data-v-5170e23d="" className={cx('action-icon')}>
                <svg height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAccount;
