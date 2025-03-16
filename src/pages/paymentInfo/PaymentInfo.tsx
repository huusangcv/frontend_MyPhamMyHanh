import classNames from "classnames/bind";
import styles from "./PaymentInfo.module.scss";
import { Link } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks";
import addressMethods from "../../services/address";
import Select from "react-select";
interface City {
  code: number;
  name: string;
  province_code: number;
  district_code: number;
}
const cx = classNames.bind(styles);
const PaymentInfo = () => {
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState<string>("");
  const [districts, setDistricts] = useState<City[]>([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState<City[]>([]);
  const [ward, setWard] = useState("");

  const [currentAddress, setCurrentAddress] = useState<string>("pickup");
  const profile = useAppSelector((state) => state.profile);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await addressMethods.getAddress();
        setCities(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, []);

  const handleDistricts = async (code: number) => {
    try {
      const districts = await addressMethods.getDistricts();

      const newDistricts = districts.data.filter(
        (district: City) => code === district.province_code
      );
      setDistricts(newDistricts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWards = async (code: number) => {
    try {
      const wards = await addressMethods.getWards();

      const newWards = wards.data.filter(
        (ward: City) => code === ward.district_code
      );
      setWards(newWards);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("check cities", cities);

  useEffect(() => {
    if (profile._id !== "") {
      setEmail(profile.email);
    }
  }, [profile]);

  const optionsCity = cities.map((city) => city.name);
  const optionsDistricts = districts.map((district) => district.name);
  const optionsWards = wards.map((ward) => ward.name);
  return (
    <div className={cx("supper-cart-container")}>
      <div className={cx("cart-header")} data-v-5273d083="">
        <div className={cx("go-back")} data-v-5273d083="">
          <Link to="/cart" className={cx("button__back")} data-v-5273d083="">
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
          <p className={cx("title")} data-v-5273d083="">
            Thông tin
          </p>
          <div data-v-5273d083=""></div>
        </div>
      </div>

      <div className={cx("block-info")}>
        <div className={cx("container", "block-box")}>
          <div className={cx("nav")} data-v-6c7c95d0="" data-v-76dd8f4d="">
            <div className={cx("nav__item", "active")} data-v-6c7c95d0="">
              <span data-v-6c7c95d0="">1. Thông tin</span>
            </div>
            <div className={cx("nav__item")} data-v-6c7c95d0="">
              <span data-v-6c7c95d0="">2. Thanh toán</span>
            </div>
          </div>

          <div
            data-v-70c027c8=""
            data-v-76dd8f4d=""
            className={cx("view-list")}
          >
            <div data-v-70c027c8="" className={cx("view-list__wrapper")}>
              <div data-v-70c027c8="" className={cx("item")}>
                <img
                  data-v-70c027c8=""
                  src="https://cdn2.cellphones.com.vn/100x100,webp,q100/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_2__6.png"
                  alt="Samsung Galaxy S25 Ultra 256GB-Xanh dương"
                  loading="lazy"
                  className={cx("item__img")}
                />
                <div data-v-70c027c8="" className={cx("item__info")}>
                  <p data-v-70c027c8="" className={cx("item__name")}>
                    Samsung Galaxy S25 Ultra 256GB-Xanh dương
                  </p>
                  <div data-v-70c027c8="" className={cx("item__price")}>
                    <div data-v-70c027c8="">
                      <div data-v-70c027c8="" className={cx("block-box-price")}>
                        <div className={cx("box-info__box-price")}>
                          <p className={cx("product__price--show")}>
                            27.890.000đ
                          </p>
                          <p className={cx("product__price--through")}>
                            33.990.000đ
                          </p>
                        </div>
                      </div>
                    </div>
                    <p data-v-70c027c8="">
                      Số lượng:
                      <span data-v-70c027c8="" className={cx("text-danger")}>
                        1
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            data-v-761468d2=""
            data-v-76dd8f4d=""
            className={cx("block-customer")}
          >
            <p data-v-761468d2="">Thông tin khách hàng</p>
            <div data-v-761468d2="" className={cx("block-customer__wrapper")}>
              <div data-v-761468d2="" className={cx("block-customer__main")}>
                <div data-v-761468d2="" className={cx("customer-input__1")}>
                  <div data-v-761468d2="" className={cx("customer-name")}>
                    <p data-v-761468d2="">Lê Hữu Sang</p>
                    <span
                      data-v-6ee77bf0=""
                      data-v-761468d2=""
                      className={cx("level")}
                    >
                      KHÁCH HÀNG MỚI
                    </span>
                  </div>
                  <p data-v-761468d2="" className={cx("customer-phone")}>
                    0358337215
                  </p>
                </div>
                <div data-v-761468d2="" className={cx("customer-input__2")}>
                  <div
                    data-v-18807a6f=""
                    data-v-761468d2=""
                    className={cx("box-input")}
                  >
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      value={email}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setEmail(e.target.value)}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <br data-v-761468d2="" />
                  <span data-v-761468d2="">
                    (*) Hóa đơn VAT sẽ được gửi qua email này
                  </span>
                </div>
              </div>
              {email === "" || (
                <div
                  data-v-761468d2=""
                  className={cx("block-customer__bottom")}
                >
                  <div data-v-761468d2="" className={cx("bottom__item")}>
                    <input
                      data-v-761468d2=""
                      type="checkbox"
                      name="emailPromo"
                      id="emailPromo"
                    />
                    <label data-v-761468d2="" htmlFor="emailPromo">
                      Nhận email thông báo và ưu đãi từ Mỹ phẩm Mỹ Hạnh
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={cx("block-payment")}
            data-v-4dc16234=""
            data-v-76dd8f4d=""
          >
            <p data-v-4dc16234="">Thông tin nhận hàng</p>
            <div className={cx("block-payment__wrapper")}>
              <div className={cx("block-payment__method")} data-v-4dc16234="">
                <div data-v-4dc16234="">
                  <input
                    id="pickup"
                    value="pickup"
                    name="delivery"
                    type="radio"
                    data-v-4dc16234=""
                    checked={(currentAddress === "pickup" && true) || false}
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
                    checked={(currentAddress !== "pickup" && true) || false}
                  />
                  <label htmlFor="shipping" className="mb-0" data-v-4dc16234="">
                    Giao hàng tận nơi
                  </label>
                </div>
              </div>

              {(currentAddress && currentAddress === "pickup" && (
                <div className={cx("block-payment__main")}>
                  <div
                    className={cx("customer-receiver")}
                    style={{ marginTop: 10 }}
                  >
                    <TextField
                      id="standard-basic"
                      label="CỬA HÀNG"
                      placeholder="Địa chỉ cửa hàng"
                      variant="standard"
                      value={address}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setAddress(e.target.value)}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div
                    className={cx("customer-receiver")}
                    style={{ marginTop: 10 }}
                  >
                    <TextField
                      id="standard-basic"
                      label="Ghi chú khác (nếu có)"
                      placeholder="Số nhà, tên đường"
                      variant="standard"
                      value={note}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setNote(e.target.value)}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              )) || (
                <div className={cx("block-payment__main")}>
                  <div
                    className={cx("customer-receiver")}
                    style={{ marginTop: 10 }}
                  >
                    <TextField
                      id="standard-basic"
                      label="TÊN NGƯỜI NHẬN"
                      placeholder="Họ tên người nhận"
                      variant="standard"
                      value={name}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setName(e.target.value)}
                      sx={{ width: "100%", height: "100%" }}
                    />
                    <TextField
                      id="standard-basic"
                      label="SĐT NGƯỜI NHẬN"
                      placeholder="Số điện thoại người nhận"
                      variant="standard"
                      value={phone}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setPhone(e.target.value)}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div
                    className={cx("customer-receiver")}
                    style={{ marginTop: 10 }}
                  >
                    <Autocomplete
                      sx={{ width: "100%", height: "100%" }}
                      value={city}
                      onChange={(_event, newValue) => {
                        if (newValue !== null) {
                          setCity(newValue);
                          if (cities && cities.length > 0) {
                            const selectedCity = cities.find(
                              (city: City) => city.name === newValue
                            );
                            if (selectedCity) {
                              handleDistricts(selectedCity.code);
                            }
                          }
                        } else {
                          setCity("");
                        }
                      }}
                      disablePortal
                      options={optionsCity && optionsCity}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tỉnh thành"
                          variant="standard"
                        />
                      )}
                    />
                    <Autocomplete
                      sx={{ width: "100%", height: "100%" }}
                      value={district}
                      onChange={(_event, newValue) => {
                        if (newValue !== null) {
                          setDistrict(newValue);
                          if (districts && districts.length > 0) {
                            const selectedWard = districts.find(
                              (district) => district.name === newValue
                            );

                            if (selectedWard) {
                              handleWards(selectedWard.code);
                            }
                          }
                        }
                      }}
                      disablePortal
                      options={optionsDistricts || []}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Quận huyện"
                          variant="standard"
                        />
                      )}
                    />
                  </div>
                  <div
                    className={cx("customer-receiver")}
                    style={{ marginTop: 10 }}
                  >
                    <Autocomplete
                      sx={{ width: "100%", height: "100%" }}
                      value={ward}
                      onChange={(_event, newValue) => {
                        if (newValue !== null) {
                          setWard(newValue);
                        }
                      }}
                      disablePortal
                      options={optionsWards}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Thị xã"
                          variant="standard"
                        />
                      )}
                    />
                    <TextField
                      id="standard-basic"
                      label="ĐỊA CHỈ"
                      placeholder="Số nhà, tên đường"
                      variant="standard"
                      value={email}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setEmail(e.target.value)}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div
                    className={cx("customer-receiver")}
                    style={{ marginTop: 10 }}
                  >
                    <TextField
                      id="standard-basic"
                      label="Ghi chú khác (nếu có)"
                      placeholder="Số nhà, tên đường"
                      variant="standard"
                      value={note}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => setNote(e.target.value)}
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div data-v-4dc16234="" className={cx("block-payment__tips")}>
            <span data-v-4dc16234="">
              <strong data-v-4dc16234="">Mẹo</strong>: Bạn có thể cài đặt Sổ địa
              chỉ tại
              <strong data-v-4dc16234=""> Hồ sơ</strong> để đặt hàng nhanh hơn.
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className={cx("stickyBottomBar")}>
          <div data-v-46ce1f8b="" className={cx("total-box")}>
            <p data-v-46ce1f8b="" className={cx("title-temp")}>
              Tổng tiền tạm tính:
            </p>
            <div
              data-v-46ce1f8b=""
              className="price d-flex flex-column align-items-end"
            >
              <span data-v-46ce1f8b="" className={cx("total")}>
                27.890.000đ
              </span>
            </div>
          </div>
          <Link to="/" className={cx("go-back")}>
            Tiếp tục
          </Link>
        </div>
        <div id="viewProductStudent"></div>
        <div id="listConfirmedBMSMModal"></div>
        <div className={cx("clear")}></div>
      </div>
    </div>
  );
};

export default PaymentInfo;
