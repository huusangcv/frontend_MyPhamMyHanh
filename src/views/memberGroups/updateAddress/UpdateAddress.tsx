import classNames from 'classnames/bind';
import styles from './UpdateAddress.module.scss';
import { TextField } from '@mui/material';
import Select, { SingleValue } from 'react-select';
const cx = classNames.bind(styles);

import { SetStateAction, useEffect, useState } from 'react';
import fastDeliveryMethods from '../../../services/fastDelivery';
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

const UpdateAddress = () => {
  const [cities, setCities] = useState<Option[]>([]);
  const [city, setCity] = useState<string>('');
  const [districts, setDistricts] = useState<Option[]>([]);
  const [district, setDistrict] = useState('');
  const [districtCode, setDistrictCode] = useState<number>(0);
  const [wards, setWards] = useState<Option[]>([]);
  const [ward, setWard] = useState('');

  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fastDeliveryMethods.getAddress();
        const newCities = response.data.map((city: City) => {
          return {
            value: city.ProvinceID,
            label: city.ProvinceName,
          };
        });
        setCities(newCities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, []);

  useEffect(() => {
    scroll({
      top: 0,
    });
  }, []);

  //hanlde setCity address
  const handleChangeCity = async (newValue: SingleValue<Option>) => {
    if (newValue !== null) {
      setCity(newValue.label);
      try {
        const res = await fastDeliveryMethods.getDistricts(newValue.value);
        const newDistricts = res.data.map((district: City) => {
          return {
            value: district.DistrictID,
            label: district.DistrictName,
          };
        });
        setDistricts(newDistricts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //hanlde District address
  const handleChangeDistrict = async (newValue: SingleValue<Option>) => {
    if (newValue !== null) {
      setDistrict(newValue.label);
      setDistrictCode(newValue.value);
      try {
        const res = await fastDeliveryMethods.getWards(newValue.value);
        const newWards = res.data.map((ward: City) => {
          return {
            value: ward.WardCode,
            label: ward.WardName,
          };
        });

        setWards(newWards);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //hanlde Ward address
  const handleChangeWard = (newValue: SingleValue<Option>) => {
    if (newValue !== null) {
      setWard(newValue.label);
    }
  };

  console.log('check', cities, city, district, districtCode, ward);

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
          <div className={cx('nav-bar__title')}>Thêm địa chỉ mới</div>
        </div>
      </div>

      <div className={cx('container')}>
        <div className={cx('group-input')}>
          <TextField
            id="standard-basic"
            label="Đặt tên gợi nhớ (ví dụ: Nhà của Sang)"
            variant="standard"
            sx={{ width: '100%', fontSize: '2rem' }}
            size="large"
          />
        </div>
        <div className={cx('group-input')}>
          <Select
            placeholder="Chọn tỉnh/thành phố"
            defaultValue={cities[0]}
            className={cx('select')}
            onChange={handleChangeCity}
            options={cities}
          />
        </div>
        <div className={cx('group-input')}>
          <Select
            placeholder="Chọn quận/huyện"
            className={cx('select')}
            onChange={handleChangeDistrict}
            options={districts}
          />
        </div>
        <div className={cx('group-input')}>
          <Select
            placeholder="Chọn phường/xã"
            className={cx('select')}
            onChange={(newValue) => handleChangeWard(newValue)}
            options={wards}
          />
        </div>
        <div className={cx('group-input')}>
          <TextField
            id="standard-basic"
            label="ĐỊA CHỈ"
            placeholder="Số nhà, tên đường"
            variant="standard"
            value={address}
            onChange={(e: { target: { value: SetStateAction<string> } }) => setAddress(e.target.value)}
            sx={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className={cx('group-input')}>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Đặt làm địa chỉ mặt định</label>
        </div>
      </div>

      <div className={cx('container')}>
        <button className={cx('button__add-address')}>Xác nhận thêm địa chỉ</button>
      </div>
    </div>
  );
};

export default UpdateAddress;
