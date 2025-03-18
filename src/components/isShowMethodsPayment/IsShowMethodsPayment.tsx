import classNames from "classnames/bind";
import styles from "./IsShowMethodsPayment.module.scss";
import paymentMethodImg from "../../assets/paymentImg.png";
import delivery from "../../assets/delivery.jfif";

const cx = classNames.bind(styles);

const PaymentMethod = ({ method }: { method: string }) => {
  return (
    <>
      {(method === "" && (
        <>
          <div data-v-93881a34="" className={cx("payment-main__img")}>
            <img
              data-v-93881a34=""
              src={paymentMethodImg}
              alt="payment method"
              className={cx("payment-method__img")}
            />
          </div>
          <div data-v-93881a34="" className={cx("payment-main__title")}>
            <p data-v-93881a34="">Chọn phương thức thanh toán</p>
            <span data-v-93881a34="">Giảm thêm tới 200.000đ </span>
          </div>
          <div data-v-93881a34="" className={cx("payment-main__arrow")}>
            <svg
              data-v-93881a34=""
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                data-v-93881a34=""
                d="M12.4994 10.0186C12.4998 10.2133 12.432 10.402 12.3078 10.5519L8.1411 15.5519C7.84655 15.9063 7.32048 15.9548 6.9661 15.6602C6.61172 15.3657 6.56322 14.8396 6.85777 14.4852L10.5911 10.0186L6.9911 5.5519C6.85129 5.37974 6.78588 5.15895 6.80934 4.93842C6.8328 4.71788 6.9432 4.5158 7.1161 4.3769C7.28932 4.22263 7.519 4.14752 7.7499 4.16967C7.9808 4.19181 8.19203 4.30919 8.33277 4.49357L12.3578 9.49357C12.4624 9.64781 12.5122 9.83265 12.4994 10.0186Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </>
      )) ||
        (method === "vnpay" && (
          <>
            <div data-v-93881a34="" className={cx("payment-main__img")}>
              <img
                data-v-93881a34=""
                src="https://cdn2.cellphones.com.vn/x/media/logo/gw2/vnpay.png"
                alt="payment method"
                className={cx("payment-method__img")}
              />
            </div>
            <div
              data-v-93881a34=""
              className={cx("payment-main__title", {
                active: method === "vnpay",
              })}
            >
              <p data-v-93881a34="">VNPAY</p>
            </div>
            <div data-v-93881a34="" className={cx("payment-main__arrow")}>
              thay đổi
              <svg
                data-v-93881a34=""
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  data-v-93881a34=""
                  d="M12.4994 10.0186C12.4998 10.2133 12.432 10.402 12.3078 10.5519L8.1411 15.5519C7.84655 15.9063 7.32048 15.9548 6.9661 15.6602C6.61172 15.3657 6.56322 14.8396 6.85777 14.4852L10.5911 10.0186L6.9911 5.5519C6.85129 5.37974 6.78588 5.15895 6.80934 4.93842C6.8328 4.71788 6.9432 4.5158 7.1161 4.3769C7.28932 4.22263 7.519 4.14752 7.7499 4.16967C7.9808 4.19181 8.19203 4.30919 8.33277 4.49357L12.3578 9.49357C12.4624 9.64781 12.5122 9.83265 12.4994 10.0186Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </>
        )) ||
        (method === "cash_on_delivery" && (
          <>
            <div data-v-93881a34="" className={cx("payment-main__img")}>
              <img
                data-v-93881a34=""
                src={delivery}
                alt="payment method"
                className={cx("payment-method__img")}
              />
            </div>
            <div
              data-v-93881a34=""
              className={cx("payment-main__title", {
                active: method === "cash_on_delivery",
              })}
            >
              <p data-v-93881a34="">Thanh toán khi nhận hàng</p>
            </div>
            <div data-v-93881a34="" className={cx("payment-main__arrow")}>
              thay đổi
              <svg
                data-v-93881a34=""
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  data-v-93881a34=""
                  d="M12.4994 10.0186C12.4998 10.2133 12.432 10.402 12.3078 10.5519L8.1411 15.5519C7.84655 15.9063 7.32048 15.9548 6.9661 15.6602C6.61172 15.3657 6.56322 14.8396 6.85777 14.4852L10.5911 10.0186L6.9911 5.5519C6.85129 5.37974 6.78588 5.15895 6.80934 4.93842C6.8328 4.71788 6.9432 4.5158 7.1161 4.3769C7.28932 4.22263 7.519 4.14752 7.7499 4.16967C7.9808 4.19181 8.19203 4.30919 8.33277 4.49357L12.3578 9.49357C12.4624 9.64781 12.5122 9.83265 12.4994 10.0186Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </>
        )) ||
        (method === "pickup" && (
          <>
            <div data-v-93881a34="" className={cx("payment-main__img")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path
                  fill="#6bc67c"
                  stroke="#6bc67c"
                  d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                />
              </svg>
            </div>
            <div
              data-v-93881a34=""
              className={cx("payment-main__title", {
                active: method === "pickup",
              })}
            >
              <p data-v-93881a34="">Thanh toán tại cửa hàng</p>
            </div>
            <div data-v-93881a34="" className={cx("payment-main__arrow")}>
              thay đổi
              <svg
                data-v-93881a34=""
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  data-v-93881a34=""
                  d="M12.4994 10.0186C12.4998 10.2133 12.432 10.402 12.3078 10.5519L8.1411 15.5519C7.84655 15.9063 7.32048 15.9548 6.9661 15.6602C6.61172 15.3657 6.56322 14.8396 6.85777 14.4852L10.5911 10.0186L6.9911 5.5519C6.85129 5.37974 6.78588 5.15895 6.80934 4.93842C6.8328 4.71788 6.9432 4.5158 7.1161 4.3769C7.28932 4.22263 7.519 4.14752 7.7499 4.16967C7.9808 4.19181 8.19203 4.30919 8.33277 4.49357L12.3578 9.49357C12.4624 9.64781 12.5122 9.83265 12.4994 10.0186Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </>
        ))}
      ;
    </>
  );
};

export default PaymentMethod;
