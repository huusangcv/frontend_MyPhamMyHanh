import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { styled } from '@mui/material/styles';
import cartEmpty from '../../assets/cart_empty.png';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  decreaseItemToCart,
  increaseItemToCart,
  removeItemsToCart,
  removeItemToCart,
} from '../../redux/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import {
  addAllItemsToPayment,
  addItemToPayment,
  decreaseItemToPayment,
  increaseItemToPayment,
  removeItemsToPayment,
  removeItemToPayment,
} from '../../redux/features/payment/paymentSlice';
const cx = classNames.bind(styles);
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const RoundedCheckbox = styled(Checkbox)(() => ({
  '&.Mui-checked': {
    color: 'var(--primary-color)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)', // Màu nền khi hover
    },
  },
  '&.MuiCheckbox-root': {
    borderRadius: '50%', // Hình tròn
  },
}));

interface CartItem {
  id: string;
  name: string;
  image: string;
  slug: string;
  price: number;
  priceThrought: number;
  quantity: number;
}

const Cart = () => {
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  const cart = useSelector((state: RootState) => state.cart);
  const payment = useSelector((state: RootState) => state.payment);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.items.length > 0) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [cart]);

  useEffect(() => {
    if (cart.items.length === payment.items.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [cart, payment]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChangeAllChecked = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedAll(true);
      dispatch(addAllItemsToPayment(cart.items));
    } else {
      dispatch(removeItemsToPayment(cart.items));
      setCheckedAll(false);
    }
  };

  const handleSelectItems = (newItem: CartItem) => {
    const existingItem = payment.items.find((item) => item.id === newItem.id);
    if (existingItem) {
      dispatch(removeItemToPayment(newItem));
    } else {
      dispatch(addItemToPayment(newItem));
    }
  };

  return (
    <div className={cx('supper-cart-container')}>
      <div className={cx('cart-header')} data-v-5273d083="">
        <div className={cx('go-back')} data-v-5273d083="">
          <Link to="/" className={cx('button__back')} data-v-5273d083="">
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
            Giỏ hàng của bạn
          </p>
          <div data-v-5273d083=""></div>
        </div>
      </div>
      <div className={cx('tabs-cart-type')}>
        {/* <button data-type="1" className="tab-item active">
          Giỏ hàng
        </button> */}
      </div>
      <div className={cx('block-info')}>
        {(cart && cart.items.length > 0 && (
          <div className={cx('listItemSuperCart')}>
            <div className={cx('header-action')}>
              <div className="d-flex align-items-center justify-content-center">
                <div className={cx('select-product-action')}>
                  <RoundedCheckbox checked={checkedAll} onChange={handleChangeAllChecked} />
                </div>
                <p>Chọn tất cả</p>
              </div>
              <div>
                {payment && payment.items.length > 0 && (
                  <button
                    className={cx('btn-remove-checked')}
                    onClick={() => {
                      dispatch(removeItemsToCart(payment.items));
                      dispatch(removeItemsToPayment(payment.items));
                    }}
                  >
                    <em>Xóa sản phẩm đã chọn</em>
                  </button>
                )}
              </div>
            </div>
            <div className={cx('block__product-item__outer')}>
              {cart &&
                cart.items.length > 0 &&
                cart.items.map((item: CartItem) => (
                  <div key={item.id}>
                    <div className={cx('block__product-item')}>
                      <div className={cx('checkbox-product')}>
                        <RoundedCheckbox
                          checked={(payment.items.find((itemPayment) => itemPayment.id === item.id) && true) || false}
                          onChange={() => handleSelectItems(item)}
                        />
                        <img
                          src={`https://backend.regis.id.vn${item.image}`}
                          width="350"
                          alt="iPhone 13-Đen"
                          loading="lazy"
                          className={cx('product-img')}
                        />
                      </div>
                      <div className={cx('product-info')}>
                        <div className="d-flex align-items-center justify-content-space-between">
                          <div className={cx('product-name')}>
                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                          </div>
                          <button
                            className={cx('remove-item')}
                            onClick={() => {
                              dispatch(
                                removeItemToCart({
                                  ...item,
                                  id: item.id,
                                }),
                              );
                              const existingItem = payment.items.find((itemPayment) => itemPayment.id === item.id);
                              if (existingItem) {
                                dispatch(
                                  removeItemToPayment({
                                    ...item,
                                    id: item.id,
                                  }),
                                );
                              }
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.9999 4H10.6666V2.88666C10.6509 2.45988 10.4667 2.0567 10.1543 1.76553C9.84188 1.47435 9.42675 1.31893 8.99992 1.33333H6.99992C6.57309 1.31893 6.15796 1.47435 5.84554 1.76553C5.53312 2.0567 5.34889 2.45988 5.33325 2.88666V4H1.99992C1.82311 4 1.65354 4.07024 1.52851 4.19526C1.40349 4.32028 1.33325 4.48985 1.33325 4.66666C1.33325 4.84348 1.40349 5.01305 1.52851 5.13807C1.65354 5.26309 1.82311 5.33333 1.99992 5.33333H2.66659V12.6667C2.66659 13.1971 2.8773 13.7058 3.25237 14.0809C3.62744 14.456 4.13615 14.6667 4.66659 14.6667H11.3333C11.8637 14.6667 12.3724 14.456 12.7475 14.0809C13.1225 13.7058 13.3333 13.1971 13.3333 12.6667V5.33333H13.9999C14.1767 5.33333 14.3463 5.26309 14.4713 5.13807C14.5963 5.01305 14.6666 4.84348 14.6666 4.66666C14.6666 4.48985 14.5963 4.32028 14.4713 4.19526C14.3463 4.07024 14.1767 4 13.9999 4ZM6.66659 2.88666C6.66659 2.78 6.80659 2.66666 6.99992 2.66666H8.99992C9.19325 2.66666 9.33325 2.78 9.33325 2.88666V4H6.66659V2.88666ZM11.9999 12.6667C11.9999 12.8435 11.9297 13.013 11.8047 13.1381C11.6796 13.2631 11.5101 13.3333 11.3333 13.3333H4.66659C4.48977 13.3333 4.32021 13.2631 4.19518 13.1381C4.07016 13.013 3.99992 12.8435 3.99992 12.6667V5.33333H11.9999V12.6667Z"
                                fill="#212B36"
                              ></path>
                              <path
                                d="M5.99992 11.3333C6.17673 11.3333 6.3463 11.2631 6.47132 11.1381C6.59635 11.013 6.66658 10.8435 6.66658 10.6667V8C6.66658 7.82319 6.59635 7.65362 6.47132 7.5286C6.3463 7.40357 6.17673 7.33334 5.99992 7.33334C5.82311 7.33334 5.65354 7.40357 5.52851 7.5286C5.40349 7.65362 5.33325 7.82319 5.33325 8V10.6667C5.33325 10.8435 5.40349 11.013 5.52851 11.1381C5.65354 11.2631 5.82311 11.3333 5.99992 11.3333Z"
                                fill="#212B36"
                              ></path>
                              <path
                                d="M9.99992 11.3333C10.1767 11.3333 10.3463 11.2631 10.4713 11.1381C10.5963 11.013 10.6666 10.8435 10.6666 10.6667V8C10.6666 7.82319 10.5963 7.65362 10.4713 7.5286C10.3463 7.40357 10.1767 7.33334 9.99992 7.33334C9.82311 7.33334 9.65354 7.40357 9.52851 7.5286C9.40349 7.65362 9.33325 7.82319 9.33325 8V10.6667C9.33325 10.8435 9.40349 11.013 9.52851 11.1381C9.65354 11.2631 9.82311 11.3333 9.99992 11.3333Z"
                                fill="#212B36"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        <div className="d-flex justify-content-space-between align-items-end">
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
                          <div className={cx('d-flex', 'action')}>
                            <div className={cx('quantity')}>
                              <div
                                className={cx('minus')}
                                onClick={() => {
                                  const existingItem = payment.items.find((itemPayment) => itemPayment.id === item.id);

                                  if (item.quantity > 1) {
                                    dispatch(
                                      decreaseItemToCart({
                                        ...item,
                                        id: item.id,
                                      }),
                                    );
                                    if (existingItem && existingItem.quantity > 1) {
                                      dispatch(
                                        decreaseItemToPayment({
                                          ...item,
                                          id: item.id,
                                        }),
                                      );
                                    }
                                  } else {
                                    alert('Số lượng sản phẩm đã giảm đến mức tối thiểu');
                                  }
                                }}
                              >
                                -
                              </div>
                              <div>{item.quantity}</div>
                              <div
                                className={cx('plus')}
                                onClick={() => {
                                  dispatch(
                                    increaseItemToCart({
                                      ...item,
                                      id: item.id,
                                    }),
                                  );
                                  const existingItem = payment.items.find((itemPayment) => itemPayment.id === item.id);
                                  if (existingItem) {
                                    dispatch(
                                      increaseItemToPayment({
                                        ...item,
                                        id: item.id,
                                      }),
                                    );
                                  }
                                }}
                              >
                                +
                              </div>
                            </div>
                          </div>
                        </div>
                        {item.price - item.priceThrought < 0 && (
                          <div className={cx('bmsm-info')}>
                            <div className={cx('bmsm-info__text')}>
                              Đã giảm {formatter.format(item.priceThrought - item.price)}đ
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {cart && cart.items.length > 1 && <div className={cx('horizontal')}></div>}
                  </div>
                ))}
            </div>
          </div>
        )) || (
          <div className={cx('nothing-in-cart')}>
            <img src={cartEmpty} alt="Giỏ hàng rỗng" className={cx('image-cart-empty')} />
            <span className="my-3">
              Giỏ hàng của bạn đang trống. <br />
              Hãy chọn thêm sản phẩm để mua sắm nhé
            </span>
          </div>
        )}
      </div>
      <div>
        <div className={cx('stickyBottomBar')}>
          {(cart && cart.items.length > 0 && (
            <>
              <div className={cx('temp-info')}>
                <div className={cx('price-temp')}>
                  <p>
                    Tạm tính: <span>{formatter.format(payment.totalPrice)}đ</span>
                  </p>
                </div>{' '}
                <div className={cx('"bmsm-info"')}>
                  <div className={cx('bmsm-info__text')}>Chưa gồm phí ship</div>
                </div>
              </div>
              <button
                className={cx('btn-action', payment.items.length > 0 || 'disabled')}
                onClick={() => navigate('/cart/payment-info')}
              >
                Mua ngay
                {payment.items.length > 0 && ` (${payment.totalQuantity})`}
              </button>
            </>
          )) || (
            <Link to="/" className={cx('go-back')}>
              Quay lại trang chủ
            </Link>
          )}
        </div>
        <div id="viewProductStudent"></div>
        <div id="listConfirmedBMSMModal"></div> <div className={cx('clear')}></div>
      </div>
    </div>
  );
};

export default Cart;
