import classNames from 'classnames/bind';
import styles from './UpdateAddress.module.scss';
import { TextField } from '@mui/material';
import Select, { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import fastDeliveryMethods from '../../../services/fastDelivery';
import { addressService } from '../../../services/addressInfo';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

interface City {
  ProvinceID: number;
  ProvinceName: string;
  DistrictName: string;
  WardName: string;
  DistrictID: number;
  district_code: number;
  WardCode: number;
}

interface Option {
  value: number;
  label: string;
}

interface FormData {
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

const UpdateAddress = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const profile = useSelector((state: any) => state.profile);

  const [formData, setFormData] = useState<FormData>({
    userId: '',
    fullName: '',
    phoneNumber: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Việt Nam', // Mặc định là Việt Nam
    isDefault: false,
  });

  const [cities, setCities] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    scroll({
      top: 0,
    });
    fetchCities();
    if (profile?._id) {
      setFormData((prev) => ({ ...prev, userId: profile._id }));
    }
  }, [profile]);

  useEffect(() => {
    if (id) {
      fetchAddressDetails();
    }
  }, [id, cities]);

  const fetchCities = async () => {
    try {
      const response = await fastDeliveryMethods.getAddress();
      const newCities = response.data.map((city: City) => ({
        value: city.ProvinceID,
        label: city.ProvinceName,
      }));
      setCities(newCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Không thể tải danh sách tỉnh/thành phố');
    }
  };

  const fetchAddressDetails = async () => {
    try {
      if (id && id !== 'add') {
        const response = await addressService.getAddressById(id);
        if (response.status) {
          const address = response.data;
          setFormData({
            userId: address.userId,
            fullName: address.fullName,
            phoneNumber: address.phoneNumber,
            addressLine: address.addressLine,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode || '',
            country: address.country,
            isDefault: address.isDefault,
          });

          // Load districts and wards based on selected city
          const cityOption = cities.find((c) => c.label === address.city);
          if (cityOption) {
            await handleChangeCity({ value: cityOption.value, label: address.city });

            // Load districts
            const districtRes = await fastDeliveryMethods.getDistricts(cityOption.value);
            const districtOption = districtRes.data.find((d: City) => d.DistrictName === address.state);
            if (districtOption) {
              await handleChangeDistrict({ value: districtOption.DistrictID, label: districtOption.DistrictName });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
      toast.error('Không thể tải thông tin địa chỉ');
    }
  };

  const handleChangeCity = async (newValue: SingleValue<Option>) => {
    if (newValue !== null) {
      setFormData((prev) => ({ ...prev, city: newValue.label, state: '' }));
      try {
        const res = await fastDeliveryMethods.getDistricts(newValue.value);
        const newDistricts = res.data.map((district: City) => ({
          value: district.DistrictID,
          label: district.DistrictName,
        }));
        setDistricts(newDistricts);
        setWards([]);
      } catch (error) {
        console.error('Error fetching districts:', error);
        toast.error('Không thể tải danh sách quận/huyện');
      }
    }
  };

  const handleChangeDistrict = async (newValue: SingleValue<Option>) => {
    if (newValue !== null) {
      setFormData((prev) => ({ ...prev, state: newValue.label }));
      try {
        const res = await fastDeliveryMethods.getWards(newValue.value);
        const newWards = res.data.map((ward: City) => ({
          value: ward.WardCode,
          label: ward.WardName,
        }));
        setWards(newWards);
      } catch (error) {
        console.error('Error fetching wards:', error);
        toast.error('Không thể tải danh sách phường/xã');
      }
    }
  };

  const handleChangeWard = (newValue: SingleValue<Option>) => {
    if (newValue !== null) {
      // Cập nhật postalCode với mã ward
      setFormData((prev) => ({ ...prev, postalCode: String(newValue.value) }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let response;
      if (id && id !== 'add') {
        response = await addressService.updateAddress(id, formData);
      } else {
        response = await addressService.createAddress(formData);
      }

      if (response.status) {
        toast.success(id ? 'Cập nhật địa chỉ thành công' : 'Thêm địa chỉ mới thành công');
        navigate('/member/account/user-info/address-info');
      }
    } catch (error) {
      console.error('Error submitting address:', error);
      toast.error('Đã có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Vui lòng nhập họ tên');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      toast.error('Vui lòng nhập số điện thoại');
      return false;
    }
    if (!formData.city) {
      toast.error('Vui lòng chọn tỉnh/thành phố');
      return false;
    }
    if (!formData.state) {
      toast.error('Vui lòng chọn quận/huyện');
      return false;
    }
    if (!formData.postalCode) {
      toast.error('Vui lòng chọn phường/xã');
      return false;
    }
    if (!formData.addressLine.trim()) {
      toast.error('Vui lòng nhập địa chỉ cụ thể');
      return false;
    }
    return true;
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
          <div className={cx('nav-bar__title')}>{id ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}</div>
        </div>
      </div>

      <div className={cx('container')}>
        <div className={cx('group-input')}>
          <TextField
            label="Họ và tên"
            variant="standard"
            value={formData.fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            sx={{ width: '100%' }}
          />
        </div>
        <div className={cx('group-input')}>
          <TextField
            label="Số điện thoại"
            variant="standard"
            value={formData.phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
            }
            sx={{ width: '100%' }}
          />
        </div>
        <div className={cx('group-input')}>
          <Select
            placeholder="Chọn tỉnh/thành phố"
            value={cities.find((city) => city.label === formData.city)}
            className={cx('select')}
            onChange={handleChangeCity}
            options={cities}
          />
        </div>
        <div className={cx('group-input')}>
          <Select
            placeholder="Chọn quận/huyện"
            value={districts.find((district) => district.label === formData.state)}
            className={cx('select')}
            onChange={handleChangeDistrict}
            options={districts}
            isDisabled={!formData.city}
          />
        </div>
        <div className={cx('group-input')}>
          <Select
            placeholder="Chọn phường/xã"
            value={wards.find((ward) => String(ward.value) === formData.postalCode)}
            className={cx('select')}
            onChange={handleChangeWard}
            options={wards}
            isDisabled={!formData.state}
          />
        </div>
        <div className={cx('group-input')}>
          <TextField
            label="Địa chỉ cụ thể"
            placeholder="Số nhà, tên đường"
            variant="standard"
            value={formData.addressLine}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, addressLine: e.target.value }))
            }
            sx={{ width: '100%' }}
          />
        </div>
        <div className={cx('group-input')}>
          <input
            type="checkbox"
            id="isDefault"
            checked={formData.isDefault}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))
            }
          />
          <label htmlFor="isDefault">Đặt làm địa chỉ mặc định</label>
        </div>
      </div>

      <div className={cx('container')}>
        <button className={cx('button__add-address', { loading })} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Đang xử lý...' : id ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
        </button>
      </div>
    </div>
  );
};

export default UpdateAddress;
