import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
import { useEffect, useState } from 'react';
import orderMethods from '../../../services/orders';
import logo from '../../../assets/logo-mobile.png';

const cx = classNames.bind(styles);

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

interface OrderProps {
  _id: string;
  products: {
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: string;
  createdAt: string;
  reference: string;
  receiver: string;
  phone: string;
  address: string;
  name: string;
  shipping: number;
  mustPay: number;
  stillHaveToPay: number;
  coupon: number;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [showMore, setShowMore] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderProps>({
    _id: '',
    products: [
      {
        name: '',
        image: '',
        price: 0,
        quantity: 0,
      },
    ],
    total: 0,
    status: '',
    createdAt: '',
    reference: '',
    receiver: '',
    phone: '',
    address: '',
    name: '',
    shipping: 0,
    mustPay: 0,
    stillHaveToPay: 0,
    coupon: 0,
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderMethods.getDetailOrder(id as string);

        if (res.status) {
          setOrder(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchOrder();
    }
  }, [id]);

  useEffect(() => {
    scroll({
      top: 0,
    });
  }, []);
  return (
    <div className={cx('wapper')}>
      <div className={cx('order-detail')}>
        <div className={cx('top-nav-bar')}>
          <div className={cx('navbar-container')}>
            <div>
              <div data-v-5170e23d="" className={cx('back-icon')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <div className={cx('nav-bar__title')}>Chi tiết đơn hàng</div>
          </div>
        </div>

        <div className={cx('order-container')}>
          <div className={cx('block-order-detail')}>
            <div className={cx('order-detail__code')}>
              <div className={cx('code__name')}>
                Mã đơn hàng: <strong> {order.reference}</strong>
              </div>
              <div
                className={cx('order-status', {
                  pending: order.status === 'pending',
                  ordered: order.status === 'ordered',
                  delivering: order.status === 'delivering',
                  delivered: order.status === 'delivered',
                  cancelled: order.status === 'cancelled',
                })}
              >
                {order.status === 'pending' && 'Chờ xác nhận'}
                {order.status === 'ordered' && 'Đã xác nhận'}
                {order.status === 'delivering' && 'Đang vận chuyển'}
                {order.status === 'delivered' && 'Đã giao hàng'}
                {order.status === 'cancelled' && 'Đã huỷ'}
              </div>
            </div>
            <div className={cx('order-detail__date')}>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
            <div className={cx('order-detail__products')}>
              <div className={cx('block-product-list')}>
                <div className={cx('product-list')}>
                  <div className={cx('product-list-container')}>
                    {order &&
                      order.products.length > 0 &&
                      order.products.map((product, index) => {
                        if (showMore || index === 0) {
                          return (
                            <div className={cx('block-order-item')}>
                              <div className={cx('order-item')}>
                                <div className={cx('order-item__img')}>
                                  <img src={`http://localhost:8080${product.image}`} alt="cps-product" loading="lazy" />
                                </div>
                                <div className={cx('order-item__info')}>
                                  <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://cellphones.com.vn/macbook-air-m2-2022-16gb-256gb-2022-s-c-30w-i-chinh-h-ng-apple-vi-t-nam-den.html"
                                    className={cx('info__title')}
                                  >
                                    {product.name}
                                  </a>
                                  <div className={cx('info__sub-title')}>
                                    <div className={cx('sub-title__item')}>Đen</div>
                                    <div className={cx('sub-title__quantity')}>
                                      Số lượng: <p>{product.quantity}</p>
                                    </div>
                                  </div>
                                  <div className={cx('info__group')}>
                                    <div className={cx('group-btn-info')}>
                                      <div className={cx('btn-info')}>Đánh giá</div>
                                      <div className={cx('btn-info')}>Mua lại</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                  </div>
                  {order.products.length > 1 && (
                    <>
                      {(showMore && (
                        <div className={cx('showmore')} onClick={() => setShowMore(false)}>
                          <p className={cx('btn-show-all')}>thu gọn</p>
                          <div data-v-5170e23d="" className={cx('show-all-icon')}>
                            <svg height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                              <path d="M416 352c-8.188 0-16.38-3.125-22.62-9.375L224 173.3l-169.4 169.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25C432.4 348.9 424.2 352 416 352z"></path>
                            </svg>
                          </div>
                        </div>
                      )) || (
                        <div className={cx('showmore')} onClick={() => setShowMore(true)}>
                          <p className={cx('btn-show-all')}>và {order.products.length - 1} sản phẩm khác</p>
                          <div data-v-5170e23d="" className={cx('show-all-icon')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10" height="10">
                              <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path>
                            </svg>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={cx('order-detail__payment-info')}>
              <div className={cx('payment-info')}>
                <div className={cx('payment-info__title')}>
                  <div data-v-5170e23d="" className={cx('title__icon')}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      <path d="M0 17.0811H29.2056V21.4895H0V17.0811Z" fill="#D70018"></path>
                    </svg>
                  </div>
                  <p className={cx('title__text')}>Thông tin thanh toán</p>
                </div>
                <div className={cx('payment-info__content')}>
                  <div className={cx('content__item')}>
                    <p className={cx('item-title')}> Tổng tiền sản phẩm: </p>
                    <p>{formatter.format(order.total)}đ</p>
                  </div>
                  <div className={cx('content__item')}>
                    <p className={cx('item-title')}>Giảm giá:</p>
                    {(order.coupon > 0 && <p>{formatter.format(order.coupon)}đ</p>) || <p>{order.coupon}đ</p>}
                  </div>
                  <div className={cx('content__item')}>
                    <p className={cx('item-title')}>Phí vận chuyển:</p>
                    <p>{(order.shipping > 0 && <p>{formatter.format(order.shipping)}đ</p>) || <p>Miễn phí</p>}</p>
                  </div>
                  <div className={cx('content__item', 'borderTop')}>
                    <p className={cx('item-title')}>Phải thanh toán:</p>
                    <p className={cx('has-text-weight-bold')}>{formatter.format(order.mustPay)}đ</p>
                  </div>
                  <div className={cx('content__item', 'last-item-money')}>
                    <p className={cx('item-title')}>Còn phải thanh toán:</p>
                    <p className={cx('has-text-weight-bold')}>{formatter.format(order.stillHaveToPay)}đ</p>
                  </div>
                </div>
              </div>
              <div className={cx('payment-info', 'info-customer')}>
                <div className={cx('payment-info__title')}>
                  <img src={logo} alt="cps-icon" className={cx('title__img')} />
                  <p className={cx('title__text')}>Thông tin khách hàng</p>
                </div>
                <div className={cx('payment-info__content')}>
                  <div className={cx('content__item', 'justify-content-start')}>
                    <div data-v-5170e23d="" className={cx('cps-icon')}>
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 12.96C14.7614 12.96 17 10.7214 17 7.95996C17 5.19854 14.7614 2.95996 12 2.95996C9.23858 2.95996 7 5.19854 7 7.95996C7 10.7214 9.23858 12.96 12 12.96Z"
                          stroke="#717171"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M20.5901 22.96C20.5901 19.09 16.7402 15.96 12.0002 15.96C7.26015 15.96 3.41016 19.09 3.41016 22.96"
                          stroke="#717171"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                    <div className={cx('item__text')}>{order.name}</div>
                  </div>
                  <div className={cx('content__item')}>
                    <div data-v-5170e23d="" className="cps-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                          stroke="#717171"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                        ></path>
                      </svg>
                    </div>
                    <div className={cx('item__text')}>{order.phone}</div>
                  </div>
                  <div className={cx('content__item')}>
                    <div data-v-5170e23d="" className="cps-icon">
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.9989 14.3904C13.722 14.3904 15.1189 12.9935 15.1189 11.2704C15.1189 9.54726 13.722 8.15039 11.9989 8.15039C10.2758 8.15039 8.87891 9.54726 8.87891 11.2704C8.87891 12.9935 10.2758 14.3904 11.9989 14.3904Z"
                          stroke="#717171"
                          strokeWidth="1.5"
                        ></path>
                        <path
                          d="M3.62166 9.44996C5.59166 0.789963 18.4217 0.799963 20.3817 9.45996C21.5317 14.54 18.3717 18.84 15.6017 21.5C13.5917 23.44 10.4117 23.44 8.39166 21.5C5.63166 18.84 2.47166 14.53 3.62166 9.44996Z"
                          stroke="#717171"
                          strokeWidth="1.5"
                        ></path>
                      </svg>
                    </div>
                    <div className={cx('item__text')}>{order.address}</div>
                  </div>
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
