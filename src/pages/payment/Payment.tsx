import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useAppSelector } from '../../../hooks';
import { useEffect, useState } from 'react';
import orderMethods from '../../services/orders';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeItemsToPayment } from '../../redux/features/payment/paymentSlice';
import { removeItemsToCart } from '../../redux/features/cart/cartSlice';
import PaymentMethod from '../../components/isShowMethodsPayment/IsShowMethodsPayment';
import delivery from '../../assets/delivery.jfif';
import paymentMethods from '../../services/payments';
import { v4 as uuidv4 } from 'uuid';
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const generateShortId = () => {
  return 'MDH' + uuidv4().replace(/-/g, '').slice(0, 6);
};

interface Product {
  id: string;
  name: string;
  image: string;
  product_id: string;
  quantity: number;
  price: number;
  category_id: string;
}

interface PropsOrder {
  user_id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  receiver: string;
  total: number;
  products: Product[];
  reference: string;
  paymentMethod: string;
  shipping: number;
  mustPay: number;
  stillHaveToPay: number;
  leadtimeOrder: {
    fromEstimateDate: string;
    toEstimateDate: string;
  };
}
const cx = classNames.bind(styles);
const Payment = () => {
  const [showModalListItem, setShowModalListItem] = useState<boolean>(false);
  const [showModalPaymentMethods, setShowModalPaymentMethods] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const paymentInfo = useAppSelector((state) => state.payment);
  const profile = useAppSelector((state) => state.profile);
  const infoShipping = useAppSelector((state) => state.infoShipping);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //handlePayment with onClick event
  const handlePayment = async () => {
    const productsId = paymentInfo.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        category_id: item.category_id,
      };
    });
    const orderId = generateShortId();
    const data: PropsOrder = {
      user_id: profile._id,
      name: infoShipping.name,
      phone: infoShipping.phone,
      address: infoShipping.address,
      email: infoShipping.email,
      receiver: infoShipping.personGet,
      total: paymentInfo.totalPrice,
      shipping: infoShipping.shipping,
      mustPay: paymentInfo.totalPrice + infoShipping.shipping,
      stillHaveToPay: paymentInfo.totalPrice + infoShipping.shipping,
      products: productsId,
      reference: orderId,
      paymentMethod,
      leadtimeOrder: {
        fromEstimateDate: infoShipping.leadtimeOrder.from_estimate_date,
        toEstimateDate: infoShipping.leadtimeOrder.to_estimate_date,
      },
    };
    if (paymentMethod !== '') {
      const id = toast.loading('Loading...');
      if (paymentMethod === 'vnpay') {
        try {
          const res = await paymentMethods.createPaymentVNPAY({
            amount: paymentInfo.totalPrice + infoShipping.shipping,
            orderId: orderId,
          });

          if (res.status) {
            toast.update(id, {
              render: 'Đang chuyển hướng, vui lòng đợi một chút',
              type: 'success',
              isLoading: false,
            });
            await orderMethods.createOrder(data);
            window.location.href = res.data.paymentUrl;
            dispatch(removeItemsToPayment(paymentInfo.items));
            dispatch(removeItemsToCart(paymentInfo.items));
          }
          console.log(res.data.message);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await orderMethods.createOrder(data);

          if (res.status) {
            toast.update(id, {
              render: 'Đặt hàng thành công',
              type: 'success',
              isLoading: false,
            });
            dispatch(removeItemsToPayment(paymentInfo.items));
            dispatch(removeItemsToCart(paymentInfo.items));
            navigate('/cart/payment-result');
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.error('Quý khách vui lòng chọn phương thức thanh toán', {
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
  };

  return (
    <div className={cx('supper-cart-container')}>
      <div className={cx('cart-header')} data-v-5273d083="">
        <div className={cx('go-back')} data-v-5273d083="">
          <Link to="/cart/payment-info" className={cx('button__back')} data-v-5273d083="">
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
            Thanh toán
          </p>
          <div data-v-5273d083=""></div>
        </div>
      </div>

      <div className={cx('block-info')}>
        <div className={cx('block-box')}>
          <div className={cx('nav')} data-v-6c7c95d0="" data-v-76dd8f4d="">
            <div className={cx('nav__item')} data-v-6c7c95d0="">
              <span data-v-6c7c95d0="">1. Thông tin</span>
            </div>
            <div className={cx('nav__item', 'active')} data-v-6c7c95d0="">
              <span data-v-6c7c95d0="">2. Thanh toán</span>
            </div>
          </div>

          <div className={cx('info-payment')}>
            <div className={cx('block-promotion')}>
              <div className={cx('block-promotion-input')}>
                <TextField
                  id="standard-basic"
                  label="MÃ GIẢM GIÁ"
                  placeholder="Nhập mã giảm giá (chỉ áp dụng 1 lần)"
                  variant="standard"
                  sx={{ width: '100%', height: '100%' }}
                />
                <button data-v-403c5d58="" disabled className={cx('button__voucher')}>
                  Áp dụng
                </button>
              </div>
            </div>
            <div data-v-497ee55d="" data-v-6c94dbbc="" className={cx('info-quote')}>
              <div data-v-497ee55d="" className={cx('info-quote__block')}>
                <div data-v-497ee55d="" className={cx('quote-block__item')}>
                  <p data-v-497ee55d="" className={cx('quote-block__title')}>
                    Số lượng sản phẩm
                  </p>
                  <p data-v-497ee55d="" className={cx('quote-block__value')}>
                    {paymentInfo.totalQuantity}
                  </p>
                </div>
                <div data-v-497ee55d="" className={cx('quote-block__item')}>
                  <p data-v-497ee55d="" className={cx('quote-block__title')}>
                    Tiền hàng (tạm tính)
                  </p>
                  <p data-v-497ee55d="" className={cx('quote-block__value')}>
                    {formatter.format(paymentInfo.totalPrice)}đ
                  </p>
                </div>
                <div data-v-497ee55d="" className={cx('quote-block__item')}>
                  <p data-v-497ee55d="" className={cx('quote-block__title')}>
                    Phí vận chuyển
                  </p>
                  <p data-v-497ee55d="" className={cx('quote-block__value')}>
                    {(infoShipping.shipping > 0 && <>{formatter.format(infoShipping.shipping)}đ</>) || 'Miễn phí'}
                  </p>
                </div>
              </div>
              <div data-v-497ee55d="" className={cx('info-quote__bottom')}>
                <div data-v-497ee55d="" className={cx('quote-bottom__title')}>
                  <p data-v-497ee55d="">Tổng tiền</p>
                  <span data-v-497ee55d="">(đã gồm VAT)</span>
                </div>
                <p data-v-497ee55d="" className={cx('quote-bottom__value')}>
                  {formatter.format(paymentInfo.totalPrice + infoShipping.shipping)}đ
                </p>
              </div>
            </div>
          </div>

          <div data-v-93881a34 className={cx('payment-quote')}>
            <p data-v-93881a34="">Thông tin thanh toán</p>

            <div
              data-v-93881a34=""
              className={cx('payment-quote__main')}
              onClick={() => setShowModalPaymentMethods(true)}
            >
              <PaymentMethod method={paymentMethod as string} />
            </div>

            <div
              data-v-93881a34
              className={cx('payment-quote__modal', {
                show: showModalPaymentMethods,
              })}
            >
              <div data-v-93881a34="" className={cx('payment-overlay')}></div>
              <div
                data-v-93881a34=""
                className={cx('payment-modal', {
                  show: showModalPaymentMethods,
                })}
              >
                <div data-v-93881a34="" className={cx('payment-modal__head')}>
                  <p data-v-93881a34="">Chọn phương thức thanh toán</p>
                  <em data-v-93881a34="" onClick={() => setShowModalPaymentMethods(false)}>
                    <svg
                      data-v-93881a34=""
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        data-v-93881a34=""
                        d="M5 19L19 5"
                        stroke="#292D32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        data-v-93881a34=""
                        d="M19 19L5 5"
                        stroke="#292D32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </em>
                </div>
                <div data-v-93881a34="" className={cx('payment-modal__body')}>
                  <div data-v-93881a34 className={cx('payment-modal__body-main')}>
                    <div data-v-93881a34="" className={cx('list-payment')}>
                      <p data-v-93881a34="">Khả dụng</p>
                      {(infoShipping.currentAddress === 'pickup' && (
                        <div
                          data-v-93881a34=""
                          className={cx('list-payment__item', {
                            active: paymentMethod === 'pickup',
                          })}
                          onClick={() => setPaymentMethod('pickup')}
                        >
                          <div data-v-93881a34="" className={cx('payment-item__img')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path
                                fill="#6bc67c"
                                stroke="#6bc67c"
                                d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
                              />
                            </svg>
                          </div>
                          <div data-v-93881a34="" className={cx('payment-item__title')}>
                            <p data-v-93881a34="">Thanh toán tại cửa hàng</p>
                          </div>
                          <div
                            data-v-93881a34=""
                            className={cx('payment-item__tick', {
                              active: paymentMethod === 'pickup',
                            })}
                          >
                            <svg
                              data-v-93881a34=""
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                data-v-93881a34=""
                                d="M11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6Z"
                                fill="#6bc67c"
                                stroke="#6bc67c"
                                strokeWidth="1.5"
                              ></path>
                              <path
                                data-v-93881a34=""
                                d="M3.75 5.75L4.70603 6.8426C5.11852 7.31402 5.85792 7.29447 6.24492 6.80192L8.25 4.25"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      )) || (
                        <div
                          data-v-93881a34=""
                          className={cx('list-payment__item', {
                            active: paymentMethod === 'cash_on_delivery',
                          })}
                          onClick={() => setPaymentMethod('cash_on_delivery')}
                        >
                          <div data-v-93881a34="" className={cx('payment-item__img')}>
                            <img data-v-93881a34="" src={delivery} alt="payment method" />
                          </div>
                          <div data-v-93881a34="" className={cx('payment-item__title')}>
                            <p data-v-93881a34="">Thanh toán khi nhận hàng</p>
                          </div>
                          <div
                            data-v-93881a34=""
                            className={cx('payment-item__tick', {
                              active: paymentMethod === 'cash_on_delivery',
                            })}
                          >
                            <svg
                              data-v-93881a34=""
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                data-v-93881a34=""
                                d="M11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6Z"
                                fill="#6bc67c"
                                stroke="#6bc67c"
                                strokeWidth="1.5"
                              ></path>
                              <path
                                data-v-93881a34=""
                                d="M3.75 5.75L4.70603 6.8426C5.11852 7.31402 5.85792 7.29447 6.24492 6.80192L8.25 4.25"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      )}
                      <div
                        data-v-93881a34=""
                        className={cx('list-payment__item', {
                          active: paymentMethod === 'vnpay',
                        })}
                        onClick={() => setPaymentMethod('vnpay')}
                      >
                        <div data-v-93881a34="" className={cx('payment-item__img')}>
                          <img
                            data-v-93881a34=""
                            src="https://cdn2.cellphones.com.vn/x/media/logo/gw2/vnpay.png"
                            alt="payment method"
                          />
                        </div>
                        <div data-v-93881a34="" className={cx('payment-item__title')}>
                          <p data-v-93881a34="">VNPAY</p>
                        </div>
                        <div
                          data-v-93881a34=""
                          className={cx('payment-item__tick', {
                            active: paymentMethod === 'vnpay',
                          })}
                        >
                          <svg
                            data-v-93881a34=""
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              data-v-93881a34=""
                              d="M11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6Z"
                              fill="#6bc67c"
                              stroke="#6bc67c"
                              strokeWidth="1.5"
                            ></path>
                            <path
                              data-v-93881a34=""
                              d="M3.75 5.75L4.70603 6.8426C5.11852 7.31402 5.85792 7.29447 6.24492 6.80192L8.25 4.25"
                              stroke="white"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-v-93881a34="" className={cx('payment-modal__bottom')}>
                  <button
                    data-v-93881a34=""
                    className={cx('btn-danger')}
                    onClick={() => {
                      if (paymentMethod === '') {
                        toast.error('Quý khách vui lòng chọn phương thức thanh toán', {
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
                        setShowModalPaymentMethods(false);
                      }
                    }}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div data-v-6f30f3d2="" data-v-6c94dbbc="" className={cx('address-quote')}>
            <p data-v-6f30f3d2="">Thông tin nhận hàng</p>
            <div data-v-6f30f3d2="" className={cx('address-quote__main')}>
              <div data-v-6f30f3d2="" className={cx('address-quote__block')}>
                <div data-v-6f30f3d2="" className={cx('address-quote__item')}>
                  <p data-v-6f30f3d2="" className={cx('address-quote__title')}>
                    Khách hàng
                  </p>
                  <p data-v-6f30f3d2="" className={cx('address-quote__value')}>
                    <span data-v-6ee77bf0="" data-v-6f30f3d2="" className={cx('level')}>
                      {profile.segment_ids.length > 0 || 'KHÁCH HÀNG MỚI'}
                    </span>
                    {infoShipping.name}
                  </p>
                </div>
                <div data-v-6f30f3d2="" className={cx('address-quote__item')}>
                  <p data-v-6f30f3d2="" className={cx('address-quote__title')}>
                    Số điện thoại
                  </p>
                  <p data-v-6f30f3d2="" className={cx('address-quote__value')}>
                    {infoShipping.phone}
                  </p>
                </div>
                <div data-v-6f30f3d2="" className={cx('address-quote__item')}>
                  <p data-v-6f30f3d2="" className={cx('address-quote__title')}>
                    Email
                  </p>
                  <p data-v-6f30f3d2="" className={cx('address-quote__value')}>
                    {infoShipping.email}
                  </p>
                </div>
                <div data-v-6f30f3d2="" className={cx('address-quote__item')}>
                  <p data-v-6f30f3d2="" className={cx('address-quote__title')}>
                    Nhận hàng tại
                  </p>
                  <p data-v-6f30f3d2="" className={cx('address-quote__value')}>
                    {infoShipping.address}
                  </p>
                </div>
                <div data-v-6f30f3d2="" className={cx('address-quote__item')}>
                  <p data-v-6f30f3d2="" className={cx('address-quote__title')}>
                    Người nhận
                  </p>
                  <p data-v-6f30f3d2="" className={cx('address-quote__value')}>
                    {infoShipping.personGet}
                  </p>
                </div>
                {infoShipping.note !== '' && (
                  <div data-v-6f30f3d2="" className={cx('address-quote__item')}>
                    <p data-v-6f30f3d2="" className={cx('address-quote__title')}>
                      Ghi chú
                    </p>
                    <p data-v-6f30f3d2="" className={cx('address-quote__value')}>
                      {infoShipping.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={cx('stickyBottomBar')}>
            <div data-v-46ce1f8b="" className={cx('total-box')}>
              <p data-v-46ce1f8b="" className={cx('title-temp')}>
                Tổng tiền tạm tính:
              </p>
              <div data-v-46ce1f8b="" className="price d-flex flex-column align-items-end">
                <span data-v-46ce1f8b="" className={cx('total')}>
                  {formatter.format(paymentInfo.totalPrice + infoShipping.shipping)}đ
                </span>
              </div>
            </div>
            <div className={cx('go-back')} onClick={handlePayment}>
              THANH TOÁN
            </div>
            <div data-v-46ce1f8b="" id="viewListItemInQuote" className={cx('viewListItemInQuote')}>
              <button id="viewListItemInQuote-btn" type="button" onClick={() => setShowModalListItem(true)}>
                Kiểm tra danh sách sản phẩm ({paymentInfo.totalQuantity})
              </button>
            </div>
          </div>
          <div className={cx('modal__list-item', { show: showModalListItem })}>
            <div className={cx('list-item__overplay')}></div>
            <div className={cx('modal__main')}>
              <div className={cx('modal__content')}>
                <header className={cx('modal-header')}>
                  <h5 className={cx('modal-title')}>Danh sách sản phẩm đang thanh toán</h5>
                  <button
                    type="button"
                    aria-label="Close"
                    className={cx('close')}
                    onClick={() => setShowModalListItem(false)}
                  >
                    ×
                  </button>
                </header>
                <div className={cx('modal-body')}>
                  {paymentInfo &&
                    paymentInfo.items.length > 0 &&
                    paymentInfo.items.map((item, index) => (
                      <div className={cx('product-item')} key={index}>
                        <img
                          src={`http://res.cloudinary.com${item.image}`}
                          alt="Laptop Gaming Acer Nitro V ANV15-51-58AN-Đen"
                          loading="lazy"
                          className={cx('product-img')}
                        />
                        <div className={cx('product-info')}>
                          <p>{item.name}</p>
                          <div className={cx('item__price')}>
                            <div>
                              <div className={cx('block-box-price')}>
                                <div className={cx('box-info__box-price')}>
                                  <p className={cx('product__price--show')}>{formatter.format(item.price)}đ</p>
                                  {item.price - item.priceThrought < 0 && (
                                    <p className={cx('product__price--through')}>
                                      {formatter.format(item.priceThrought)}đ
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <p>
                              Số lượng: {''}
                              <span className={cx('text-danger')}>{item.quantity}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
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

export default Payment;
