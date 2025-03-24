import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./OrderDetail.module.scss";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const cx = classNames.bind(styles);
const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className={cx("wapper")}>
      <div className={cx("order-detail")}>
        <div className={cx("top-nav-bar")}>
          <div className={cx("navbar-container")}>
            <div>
              <div data-v-5170e23d="" className={cx("back-icon")}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.1" clip-path="url(#clip0_11167_71432)">
                    <path
                      d="M25 12H7"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M12 19L5 12L12 5"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
            <div className={cx("nav-bar__title")}>Chi tiết đơn hàng</div>
          </div>
        </div>

        <div className={cx("order-container")}>
          <div className={cx("block-order-detail")}>
            <div className={cx("order-detail__code")}>
              <div className={cx("code__name")}>
                Mã đơn hàng: <strong> WN0302710179</strong>
              </div>
              <div className={cx("order-status", "cancelled")}>Đã hủy</div>
            </div>
            <div className={cx("order-detail__date")}>16/3/2025 13:1</div>
            <div className={cx("order-detail__products")}>
              <div className={cx("block-product-list")}>
                <div className={cx("product-list")}>
                  <div className={cx("product-list-container")}>
                    <div className={cx("block-order-item")}>
                      <div className={cx("order-item")}>
                        <div className={cx("order-item__img")}>
                          <img
                            src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/m/a/macbook_air_m2_1_1_1_8.png"
                            alt="cps-product"
                            loading="lazy"
                          />
                        </div>
                        <div className={cx("order-item__info")}>
                          <a
                            target="_blank"
                            rel="noopener"
                            href="https://cellphones.com.vn/macbook-air-m2-2022-16gb-256gb-2022-s-c-30w-i-chinh-h-ng-apple-vi-t-nam-den.html"
                            className={cx("info__title")}
                          >
                            MacBook Air M2 2022 16GB 256GB 2022 Sạc 30W I Chính
                            hãng Apple Việt Nam-Đen
                          </a>
                          <div className={cx("info__sub-title")}>
                            <div className={cx("sub-title__item")}>Đen</div>
                            <div className={cx("sub-title__quantity")}>
                              Số lượng: <p>1</p>
                            </div>
                          </div>
                          <div className={cx("info__group")}>
                            <div className={cx("group-btn-info")}>
                              <div className={cx("btn-info")}>Đánh giá</div>
                              <div className={cx("btn-info")}>Mua lại</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("order-detail__payment-info")}>
              <div className={cx("payment-info")}>
                <div className={cx("payment-info__title")}>
                  <div data-v-5170e23d="" className={cx("title__icon")}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.5615 15.9792L30.1414 15.3405C31.6443 14.7322 32.3825 13.0318 31.8006 11.5184L28.1025 1.90485C27.5107 0.371693 25.788 -0.391372 24.2549 0.200454C24.2332 0.208858 24.2116 0.217468 24.1901 0.226354L5.71285 7.88593C4.23418 8.5007 3.50728 10.1755 4.06797 11.6755L4.81189 13.6593L6.06056 17.0813H24.7962L28.5615 15.9792Z"
                        fill="#FF4842"
                      ></path>
                      <path
                        d="M8.89869 13.6613L7.73047 10.7407L12.4034 8.4043L13.5716 11.3249L8.89869 13.6613Z"
                        fill="#D70018"
                      ></path>
                      <path
                        d="M22.6953 10.8219L27.952 8.48438L28.3998 9.49141L23.1431 11.8289L22.6953 10.8219Z"
                        fill="#D70018"
                      ></path>
                      <path
                        d="M19.1836 9.65583L26.7766 6.15137L27.2382 7.15152L19.6452 10.656L19.1836 9.65583Z"
                        fill="#D70018"
                      ></path>
                      <path
                        opacity="0.12"
                        d="M30.1434 15.3405C30.1925 15.3206 30.2338 15.2903 30.2812 15.2683C30.1336 13.796 28.8954 12.6745 27.4157 12.6729H4.44141L4.81171 13.6609L6.06259 17.0812H24.7983L28.5636 15.9791L30.1434 15.3405Z"
                        fill="black"
                      ></path>
                      <path
                        d="M2.89301 13.7754H26.3126C27.9104 13.7754 29.2056 15.0706 29.2056 16.6684V29.067C29.2056 30.6648 27.9104 31.96 26.3126 31.96H2.89301C1.29524 31.96 0 30.6648 0 29.067V16.6684C0 15.0706 1.29524 13.7754 2.89301 13.7754Z"
                        fill="#FFA48D"
                      ></path>
                      <path
                        d="M20.9391 30.3069C19.1131 30.3069 17.6328 28.8267 17.6328 27.0006C17.6328 25.1746 19.1131 23.6943 20.9391 23.6943C22.7651 23.6943 24.2454 25.1746 24.2454 27.0006C24.2436 28.8259 22.7644 30.3051 20.9391 30.3069ZM20.9391 24.7964C19.7218 24.7964 18.7349 25.7833 18.7349 27.0006C18.7349 28.218 19.7218 29.2048 20.9391 29.2048C22.1564 29.2048 23.1433 28.218 23.1433 27.0006C23.1433 25.7833 22.1564 24.7964 20.9391 24.7964Z"
                        fill="#D70018"
                      ></path>
                      <path
                        d="M24.2477 30.3069C22.4217 30.3069 20.9414 28.8267 20.9414 27.0006C20.9414 25.1746 22.4217 23.6943 24.2477 23.6943C26.0737 23.6943 27.554 25.1746 27.554 27.0006C27.5522 28.8259 26.073 30.3051 24.2477 30.3069ZM24.2477 24.7964C23.0304 24.7964 22.0435 25.7833 22.0435 27.0006C22.0435 28.218 23.0304 29.2048 24.2477 29.2048C25.465 29.2048 26.4519 28.218 26.4519 27.0006C26.4519 25.7833 25.465 24.7964 24.2477 24.7964Z"
                        fill="#D70018"
                      ></path>
                      <path
                        d="M0 17.0811H29.2056V21.4895H0V17.0811Z"
                        fill="#D70018"
                      ></path>
                    </svg>
                  </div>
                  <p className={cx("title__text")}>Thông tin thanh toán</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
