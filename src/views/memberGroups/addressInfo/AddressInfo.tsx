import classNames from 'classnames/bind';
import styles from './AddressInfo.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addressService } from '../../../services/addressInfo';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const cx = classNames.bind(styles);

export interface Address {
  _id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

const AddressInfo = () => {
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profile);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; addressId: string | null }>({
    open: false,
    addressId: null,
  });

  useEffect(() => {
    scroll({
      top: 0,
    });
    if (profile?._id) {
      fetchAddresses();
    }
  }, [profile]);

  const fetchAddresses = async () => {
    try {
      const response = await addressService.getUserAddresses(profile._id);
      if (response.status) {
        setAddresses(response.data);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Không thể tải danh sách địa chỉ');
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      const response = await addressService.setDefaultAddress(addressId, profile._id);
      if (response.status) {
        toast.success('Đặt địa chỉ mặc định thành công');
        fetchAddresses();
      }
    } catch (error) {
      console.error('Error setting default address:', error);
      toast.error('Không thể đặt địa chỉ mặc định');
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.addressId) return;

    try {
      const response = await addressService.deleteAddress(deleteDialog.addressId, profile._id);
      if (response.status) {
        toast.success('Xóa địa chỉ thành công');
        fetchAddresses();
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Không thể xóa địa chỉ');
    } finally {
      setDeleteDialog({ open: false, addressId: null });
    }
  };

  const openDeleteDialog = (addressId: string) => {
    setDeleteDialog({ open: true, addressId });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, addressId: null });
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('top-nav-bar')}>
        <div className={cx('navbar-container')}>
          <div onClick={() => navigate(-1)} className={cx('back-button')}>
            <div className={cx('icon')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 12H7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path
                  d="M12 19L5 12L12 5"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <div className={cx('nav-bar__title')}>Thông tin địa chỉ</div>
        </div>
      </div>

      <div className={cx('container')}>
        <Link to="/member/account/user-info/address-info/update-address/add" className={cx('button__add-address')}>
          Thêm địa chỉ mới
        </Link>

        {loading ? (
          <div className={cx('loading')}>Đang tải...</div>
        ) : addresses.length === 0 ? (
          <div className={cx('no-address')}>Bạn chưa có địa chỉ nào</div>
        ) : (
          <div className={cx('address-list')}>
            {addresses.map((address) => (
              <div key={address._id} className={cx('address-item')}>
                <div className={cx('address-info')}>
                  <div className={cx('name-phone')}>
                    <span className={cx('full-name')}>{address.fullName}</span>
                    <span className={cx('phone')}>{address.phoneNumber}</span>
                  </div>
                  <div className={cx('address-detail')}>
                    {address.addressLine}, {address.state}, {address.city}, {address.country}
                  </div>
                  {address.isDefault && <div className={cx('default-badge')}>Mặc định</div>}
                </div>
                <div className={cx('actions')}>
                  <Link
                    to={`/member/account/user-info/address-info/update-address/${address._id}`}
                    className={cx('edit-button')}
                  >
                    Sửa
                  </Link>
                  {!address.isDefault && (
                    <>
                      <button onClick={() => handleSetDefault(address._id)} className={cx('set-default-button')}>
                        Đặt mặc định
                      </button>
                      <button onClick={() => openDeleteDialog(address._id)} className={cx('delete-button')}>
                        Xóa
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={deleteDialog.open}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận xóa địa chỉ</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa địa chỉ này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddressInfo;
