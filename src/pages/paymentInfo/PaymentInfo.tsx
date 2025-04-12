import classNames from 'classnames/bind';
import styles from './PaymentInfo.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import Select, { SingleValue } from 'react-select';
import { useDispatch } from 'react-redux';
import { setInfoShipping } from '../../redux/features/infoShipping/InfoShipping';
import { toast } from 'react-toastify';
import addressMethods from '../../services/fastDelivery';
import fastDeliveryMethods from '../../services/fastDelivery';
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

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const cx = classNames.bind(styles);
const PaymentInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const [cities, setCities] = useState<Option[]>([]);
  const [city, setCity] = useState<string>('');
  const [districts, setDistricts] = useState<Option[]>([]);
  const [district, setDistrict] = useState('');
  const [districtCode, setDistrictCode] = useState<number>(0);
  const [wards, setWards] = useState<Option[]>([]);
  const [ward, setWard] = useState('');

  const [currentAddress, setCurrentAddress] = useState<string>('pickup');
  const [fee, setFee] = useState<number>(0);
  const profile = useAppSelector((state) => state.profile);
  const paymentInfo = useAppSelector((state) => state.payment);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await addressMethods.getAddress();
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
    if (profile._id !== '') {
      setEmail(profile.email);
      setPhone(profile.phone);
      setName(profile.username);
    }
  }, [profile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //hanlde setCity address
  const handleChangeCity = async (newValue: SingleValue<Option>) => {
    if (newValue !== null) {
      setCity(newValue.label);
      try {
        const res = await addressMethods.getDistricts(newValue.value);
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
        const res = await addressMethods.getWards(newValue.value);
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
      const fectFee = async () => {
        try {
          const res = await fastDeliveryMethods.getFee({
            insurance_value: paymentInfo.totalPrice,
            to_district_id: districtCode,
            to_ward_code: newValue.value.toString(),
          });
          setFee(res.data.total);
        } catch (error) {
          console.log(error);
        }
      };
      if (currentAddress !== 'pickup') {
        fectFee();
      }
    }
  };

  //handleValidation
  const handleValidation = () => {
    if (currentAddress !== 'pickup') {
      if (name === '' || phone === '') {
        toast.error('Quý khách vui lòng nhập tên và số điện thoại để tiếp tục mua hàng.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }

      if (name !== '' && phone !== '' && district === '') {
        toast.error('Quý khách vui lòng không bỏ trống Quận / huyện', {
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

      if (name !== '' && phone !== '' && district !== '' && ward === '') {
        toast.error('Quý khách vui lòng không bỏ trống Phường / Xã', {
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
      if (name !== '' && phone !== '' && district !== '' && ward !== '' && address === '') {
        toast.error('Quý khách vui lòng không bỏ trống Số nhà, tên đường', {
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

      if (name !== '' && phone !== '' && district !== '' && ward !== '' && address !== '') {
        navigate('/cart/payment');
      }
    } else {
      navigate('/cart/payment');
    }
  };

  console.log('check fee', fee);

  return (
    <div className={cx('supper-cart-container')}>
      <div className={cx('cart-header')} data-v-5273d083="">
        <div className={cx('go-back')} data-v-5273d083="">
          <Link to="/cart" className={cx('button__back')} data-v-5273d083="">
            <svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-v-5273d083=""
            >
              <path
                d="M19 8.5L1 8.5M1 8.5L8 1M1 8.5L8 16"
                stroke="#121219"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-v-5273d083=""
              ></path>
            </svg>
            <p data-v-5273d083=""></p>
          </Link>
          <p className={cx('title')} data-v-5273d083="">
            Thông tin
          </p>
          <div data-v-5273d083=""></div>
        </div>
      </div>

      <div className={cx('block-info')}>
        <div className={cx('block-box')}>
          <div className={cx('nav')} data-v-6c7c95d0="" data-v-76dd8f4d="">
            <div className={cx('nav__item', 'active')} data-v-6c7c95d0="">
              <span data-v-6c7c95d0="">1. Thông tin</span>
            </div>
            <div className={cx('nav__item')} data-v-6c7c95d0="">
              <span data-v-6c7c95d0="">2. Thanh toán</span>
            </div>
          </div>

          <div data-v-70c027c8="" data-v-76dd8f4d="" className={cx('view-list')}>
            <div data-v-70c027c8="" className={cx('view-list__wrapper')}>
              {paymentInfo &&
                paymentInfo.items.length > 0 &&
                paymentInfo.items.map((item, index) => (
                  <div data-v-70c027c8="" className={cx('item')} key={index}>
                    <img
                      data-v-70c027c8=""
                      src={`http://res.cloudinary.com${item.image}`}
                      alt="Samsung Galaxy S25 Ultra 256GB-Xanh dương"
                      loading="lazy"
                      className={cx('item__img')}
                    />
                    <div data-v-70c027c8="" className={cx('item__info')}>
                      <p data-v-70c027c8="" className={cx('item__name')}>
                        {item.name}
                      </p>
                      <div data-v-70c027c8="" className={cx('item__price')}>
                        <div data-v-70c027c8="">
                          <div data-v-70c027c8="" className={cx('block-box-price')}>
                            <div className={cx('box-info__box-price')}>
                              <p className={cx('product__price--show')}>{formatter.format(item.price)}đ</p>
                              <p className={cx('product__price--through')}>{formatter.format(item.priceThrought)}đ</p>
                            </div>
                          </div>
                        </div>
                        <p data-v-70c027c8="">
                          Số lượng:
                          <span data-v-70c027c8="" className={cx('text-danger')}>
                            {item.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div data-v-761468d2="" data-v-76dd8f4d="" className={cx('block-customer')}>
            <p data-v-761468d2="">Thông tin khách hàng</p>
            <div data-v-761468d2="" className={cx('block-customer__wrapper')}>
              <div data-v-761468d2="" className={cx('block-customer__main')}>
                <div data-v-761468d2="" className={cx('customer-input__1')}>
                  <div data-v-761468d2="" className={cx('customer-name')}>
                    <p data-v-761468d2="">{profile.username}</p>
                    <span data-v-6ee77bf0="" data-v-761468d2="" className={cx('level')}>
                      KHÁCH HÀNG MỚI
                    </span>
                  </div>
                  <p data-v-761468d2="" className={cx('customer-phone')}>
                    {profile.phone}
                  </p>
                </div>
                <div data-v-761468d2="" className={cx('customer-input__2')}>
                  <div data-v-18807a6f="" data-v-761468d2="" className={cx('box-input')}>
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      value={email}
                      onChange={(e: { target: { value: SetStateAction<string> } }) => setEmail(e.target.value)}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <br data-v-761468d2="" />
                  <span data-v-761468d2="">(*) Hóa đơn VAT sẽ được gửi qua email này</span>
                </div>
              </div>
              {email === '' || (
                <div data-v-761468d2="" className={cx('block-customer__bottom')}>
                  <div data-v-761468d2="" className={cx('bottom__item')}>
                    <input data-v-761468d2="" type="checkbox" name="emailPromo" id="emailPromo" />
                    <label data-v-761468d2="" htmlFor="emailPromo">
                      Nhận email thông báo và ưu đãi từ Mỹ phẩm Mỹ Hạnh
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={cx('block-payment')} data-v-4dc16234="" data-v-76dd8f4d="">
            <p data-v-4dc16234="">Thông tin nhận hàng</p>
            <div className={cx('block-payment__wrapper')}>
              <div className={cx('block-payment__method')} data-v-4dc16234="">
                <div data-v-4dc16234="">
                  <input
                    id="pickup"
                    value="pickup"
                    name="delivery"
                    type="radio"
                    data-v-4dc16234=""
                    checked={(currentAddress === 'pickup' && true) || false}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                  />
                  <label htmlFor="pickup" className="mb-0" data-v-4dc16234="">
                    Nhận tại cửa hàng
                  </label>
                </div>
                <div data-v-4dc16234="">
                  <input
                    id="shipping"
                    value="shipping"
                    name="delivery"
                    type="radio"
                    data-v-4dc16234=""
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    checked={(currentAddress !== 'pickup' && true) || false}
                  />
                  <label htmlFor="shipping" className="mb-0" data-v-4dc16234="">
                    Giao hàng tận nơi
                  </label>
                </div>
              </div>

              {(currentAddress && currentAddress === 'pickup' && (
                <div className={cx('block-payment__main')}>
                  <div className={cx('customer-receiver')}>
                    <TextField
                      id="standard-basic"
                      label="CỬA HÀNG (*Mặc đinh)"
                      placeholder="Địa chỉ cửa hàng"
                      variant="standard"
                      value="Số 240, Tổ 6, Ấp Long Hạ, Xã Kiến An, Huyện Chợ Mới, Tỉnh An Giang, Việt Nam"
                      disabled
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className={cx('customer-receiver')} style={{ marginTop: 10 }}>
                    <TextField
                      id="standard-basic"
                      label="Ghi chú khác (nếu có)"
                      placeholder="Số nhà, tên đường"
                      variant="standard"
                      value={note}
                      onChange={(e: { target: { value: SetStateAction<string> } }) => setNote(e.target.value)}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              )) || (
                <div className={cx('block-payment__main')}>
                  <div className={cx('customer-receiver')}>
                    <TextField
                      id="standard-basic"
                      label="TÊN NGƯỜI NHẬN"
                      placeholder="Họ tên người nhận"
                      variant="standard"
                      value={name}
                      onChange={(e: { target: { value: SetStateAction<string> } }) => setName(e.target.value)}
                      sx={{ width: '100%', height: '100%' }}
                    />
                    <TextField
                      id="standard-basic"
                      label="SĐT NGƯỜI NHẬN"
                      placeholder="Số điện thoại người nhận"
                      variant="standard"
                      value={phone}
                      onChange={(e: { target: { value: SetStateAction<string> } }) => setPhone(e.target.value)}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className={cx('customer-receiver')}>
                    <Select
                      placeholder="Chọn tỉnh/thành phố"
                      defaultValue={cities[0]}
                      className={cx('select')}
                      onChange={handleChangeCity}
                      options={cities}
                    />
                    <Select
                      placeholder="Chọn quận/huyện"
                      className={cx('select')}
                      onChange={handleChangeDistrict}
                      options={districts}
                    />
                  </div>
                  <div className={cx('customer-receiver')} style={{ marginTop: 10 }}>
                    <Select
                      placeholder="Chọn phường/xã"
                      className={cx('select')}
                      onChange={(newValue) => handleChangeWard(newValue)}
                      options={wards}
                    />
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
                  <div className={cx('customer-receiver')} style={{ marginTop: 10 }}>
                    <TextField
                      id="standard-basic"
                      label="Ghi chú khác (nếu có)"
                      placeholder="Số nhà, tên đường"
                      variant="standard"
                      value={note}
                      onChange={(e: { target: { value: SetStateAction<string> } }) => setNote(e.target.value)}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div data-v-4dc16234="" className={cx('block-payment__tips')}>
            <span data-v-4dc16234="">
              <strong data-v-4dc16234="">Mẹo</strong>: Bạn có thể cài đặt Sổ địa chỉ tại
              <strong data-v-4dc16234=""> Hồ sơ</strong> để đặt hàng nhanh hơn.
            </span>
          </div>
        </div>
        <div className={cx('stickyBottomBar')}>
          <div data-v-46ce1f8b="" className={cx('total-box')}>
            <p data-v-46ce1f8b="" className={cx('title-temp')}>
              Tổng tiền tạm tính:
            </p>
            <div data-v-46ce1f8b="" className="price d-flex flex-column align-items-end">
              <span data-v-46ce1f8b="" className={cx('total')}>
                {formatter.format(paymentInfo.totalPrice)}đ
              </span>
            </div>
          </div>

          <div
            className={cx('go-back')}
            onClick={() => {
              dispatch(
                setInfoShipping({
                  name: profile.username,
                  phone,
                  email,
                  currentAddress,
                  address:
                    (currentAddress === 'pickup' &&
                      'Số 240, Tổ 6, Ấp Long Hạ, Xã Kiến An, Huyện Chợ Mới, Tỉnh An Giang, Việt Nam') ||
                    `${address}, ${ward}, ${district}, ${city}`,
                  shipping: (currentAddress !== 'pickup' && fee > 0 && fee) || 0,
                  personGet: `${name} - ${phone}`,
                  note,
                }),
              );
              handleValidation();
            }}
          >
            Tiếp tục
          </div>
        </div>
      </div>

      <div>
        <div id="viewProductStudent"></div>
        <div id="listConfirmedBMSMModal"></div>
        <div className={cx('clear')}></div>
      </div>
    </div>
  );
};

export default PaymentInfo;
