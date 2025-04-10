import classNames from 'classnames/bind';
import styles from './AccountInfo.module.scss';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import LoadingIcons from 'react-loading-icons';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import usersMethods from '../../../services/users';
import { setProfile } from '../../../redux/features/profile/profileSlice';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const AccountInfo = () => {
  const profile = useAppSelector((state) => state.profile);
  const [showEditName, setShowEditName] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    scroll({
      top: 0,
    });
  }, []);

  const handleUpdateProfile = async () => {
    if (name !== profile.username) {
      setIsLoading(true);
      try {
        const res = await usersMethods.updateProfile(profile._id, name);
        if (res.status) {
          dispatch(setProfile(res.data));
          toast.success('Cập nhật thông tin thành công', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUploadProfile = async () => {
    try {
      const inputElement = document.getElementById('inputImage') as HTMLInputElement | null;
      if (inputElement && inputElement.files) {
        const input = inputElement.files[0];
        const response = await usersMethods.uploadImage(profile._id, input);
        if (response && response.status) {
          dispatch(setProfile(response.data));
          toast.success('Cập nhật ảnh đại diện thành công', {
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
  return (
    <div className={cx('wapper')}>
      <div className={cx('wapper__container')}>
        <label htmlFor="inputImage" className={cx('user-info-avatar')}>
          <Avatar
            src={`https://https://backend.regis.id.vn${profile.image}`}
            alt="avatar"
            sx={{ width: 60, height: 60 }}
          />
          <div className={cx('photo-icon')}>
            <CameraAltIcon />
          </div>
        </label>
        <input type="file" id="inputImage" onChange={handleUploadProfile} hidden />
        <p className={cx('user-info-avatar__name')}>{profile.username}</p>
        <div className={cx('form__group')}>
          <div className={cx('field')} onBlur={() => setShowEditName(false)}>
            <input
              id="name"
              type="text"
              placeholder={`Họ và tên: ${profile.username}`}
              className={cx('group__item')}
              disabled={!showEditName}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name" className={cx('button__edit-name')} onClick={() => setShowEditName(true)}>
              <div data-v-5170e23d="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"></path>
                </svg>
              </div>
            </label>
          </div>
        </div>
        <div className={cx('form__group')}>
          <div className={cx('field')}>
            <input
              id="name"
              type="text"
              placeholder={`Email: ${profile.email}`}
              className={cx('group__item')}
              disabled
            />
          </div>
        </div>
        <div className={cx('form__group')}>
          <div className={cx('field')}>
            <input
              id="phone"
              type="text"
              placeholder={`Số điện thoại: ${profile.phone}`}
              className={cx('group__item')}
              disabled
            />
          </div>
        </div>
        <div className={cx('form__group')}>
          <div className={cx('field')}>
            <input id="name" type="text" placeholder="Ngày tham gia: 4/7/2003" className={cx('group__item')} disabled />
          </div>
        </div>
        <div className={cx('form__group')}>
          <div className={cx('field')}>
            <input
              id="name"
              type="text"
              placeholder="Tổng tiền đã mua sắm: 90000"
              className={cx('group__item')}
              disabled
            />
          </div>
        </div>
        <div className={cx('form__group')} onClick={() => navigate('/member/account/user-info/address-info')}>
          <div className={cx('field')}>
            <input
              id="address"
              type="text"
              placeholder={`Địa chỉ: ${profile.address || 'Chưa có địa chỉ mặc định'}`}
              className={cx('group__item')}
              readOnly
            />
            <div className={cx('button__edit-name')}>
              <div data-v-5170e23d="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('form__group')} onClick={() => navigate('/member/change-password')}>
          <div className={cx('field')}>
            <input id="passwordChange" type="text" placeholder="Đổi mật khẩu" className={cx('group__item')} readOnly />
            <div className={cx('button__edit-name')}>
              <div data-v-5170e23d="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('btn-form__submit', 'button__update-info')} onClick={handleUpdateProfile}>
          {(isLoading && <LoadingIcons.ThreeDots strokeOpacity={0.125} speed={0.5} strokeWidth={5} />) ||
            'Cập nhật thông tin'}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
