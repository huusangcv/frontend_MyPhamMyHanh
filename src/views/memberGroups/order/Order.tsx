import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import orderMethods from '../../../services/orders';
import { useAppSelector } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatterDate = new Intl.DateTimeFormat('vi-VN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

interface OrderProps {
  _id: string;
  products: {
    name: string;
    image: string;
    price: number;
  }[];
  total: number;
  status: string;
  paidAmount: number;
  isPaid: boolean;
  createdAt: string;
}

const Order = () => {
  const profile = useAppSelector((state) => state.profile);
  const navigate = useNavigate();

  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [swiperSelected, setSwiperSelected] = useState<string>('all');
  const [showPhone, setShowPhone] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderMethods.getOrdersByUserIid(profile._id);

        console.log(res);
        if (res.status) {
          setOrders(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (profile) {
      fetchOrders();
    }
  }, [profile]);

  useEffect(() => {
    scroll({
      top: 0,
    });
  }, []);

  const totalMoney = orders.reduce((acc, order) => {
    return acc + order.paidAmount;
  }, 0);

  const firstPaidOrder = orders.find((order) => order.isPaid);

  const ordersList = orders.filter((order) => (swiperSelected === 'all' && order) || order.status === swiperSelected);

  const date = (firstPaidOrder && new Date(firstPaidOrder.createdAt)) || new Date();

  // Hàm để ẩn số
  const maskPhoneNumber = () => {
    return profile.phone.slice(0, 2) + '*****' + profile.phone.slice(7);
  };

  return (
    <div className={cx('wapper')}>
      <div className={cx('block-info')}>
        <div className={cx('block-welcome')}>
          <div className={cx('block-welcome__box-content')}>
            <Avatar
              src={`http://res.cloudinary.com${profile.image}`}
              alt={profile.username}
              sx={{ width: 60, height: 60 }}
            />
            <div className={cx('welcome-member')}>
              <p className={cx('welcome-member__name')}>{profile.username}</p>
              <div className="d-flex align-items-center">
                <p className={cx('welcome-member__phone')}>{(showPhone && profile.phone) || maskPhoneNumber()}</p>
                {(showPhone && (
                  <svg
                    onClick={() => setShowPhone(false)}
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className={cx('member-icon')}
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path>
                  </svg>
                )) || (
                  <svg
                    onClick={() => setShowPhone(true)}
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className={cx('member-icon')}
                  >
                    <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"></path>
                  </svg>
                )}
              </div>
              <div className={cx('label-rank')}>
                <p className={cx('welcome-member__level')}>KHÁCH HÀNG MỚI</p>
                {/* <a href="/smember/promotion/s-student" className="">
                  <p className={cx("welcome-member__level")}>S-STUDENT</p>
                </a> */}
              </div>
            </div>
          </div>
          <div className="bg-block-welcome"></div>
        </div>
      </div>
      <div className={cx('block-homepage-menu')}>
        <div className={cx('block-homepage-menu__content')}>
          <div className={cx('content__item')}>
            <p className={cx('item__content', 'title')}>{orders && orders.length}</p>
            <p className={cx('item__content', 'text')}>đơn hàng</p>
          </div>
          <div className={cx('content__item')}>
            <p className={cx('item__content', 'title')}>{formatter.format(totalMoney)}đ</p>
            <p className={cx('item__content')}>Tổng tiền tích lũy từ {date.toLocaleString()}</p>
          </div>
          {/* <div className={cx("content__item")}>
            <p className="item__content title">429K</p>
            <p className="item__content text has-text-centered">
              Tổng tiền tích lũy từ 01/01/2024
            </p>
          </div> */}
        </div>
      </div>

      <div className={cx('block-order')}>
        <div className={cx('block-sliding-order')}>
          <div className={cx('order-container')}>
            <div className={cx('thumbs-wrapper')}>
              <div
                className={cx('thumb-item', {
                  active: swiperSelected === 'all',
                })}
                onClick={() => setSwiperSelected('all')}
              >
                Tất cả
              </div>
              <div
                className={cx('thumb-item', {
                  active: swiperSelected === 'pending',
                })}
                onClick={() => setSwiperSelected('pending')}
              >
                Chờ xác nhận
              </div>
              <div
                className={cx('thumb-item', {
                  active: swiperSelected === 'ordered',
                })}
                onClick={() => setSwiperSelected('ordered')}
              >
                Đã xác nhận
              </div>
              <div
                className={cx('thumb-item', {
                  active: swiperSelected === 'delivering',
                })}
                onClick={() => setSwiperSelected('delivering')}
              >
                Đang vận chuyển
              </div>
              <div
                className={cx('thumb-item', {
                  active: swiperSelected === 'delivered',
                })}
                onClick={() => setSwiperSelected('delivered')}
              >
                Đã giao hàng
              </div>
              <div
                className={cx('thumb-item', {
                  active: swiperSelected === 'cancelled',
                })}
                onClick={() => setSwiperSelected('cancelled')}
              >
                Đã huỷ
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('list-order-wrapper')}>
        <div className={cx('block-order-list')}>
          {orders &&
            ordersList.length > 0 &&
            ordersList.map((order) => (
              <div className={cx('block-order-item')} key={order._id}>
                <div className={cx('order-item')}>
                  <div className={cx('order-item__img')}>
                    <img
                      src={`http://res.cloudinary.com${order.products[0].image}`}
                      alt={order.products[0].name}
                      loading="lazy"
                    />
                  </div>
                  <div className={cx('order-item__info')}>
                    <div className={cx('info__title')}>
                      <span>{order.products[0].name}</span>
                      <p>{formatterDate.format(new Date(order.createdAt))}</p>
                    </div>
                    <div className="d-flex align-items-center"> </div>
                    <div className={cx('order-status', order.status)}>
                      {order.status === 'pending' && 'Chờ xác nhận'}
                      {order.status === 'ordered' && 'Đã xác nhận'}
                      {order.status === 'delivering' && 'Đang vận chuyển'}
                      {order.status === 'delivered' && 'Đã giao hàng'}
                      {order.status === 'cancelled' && 'Đã huỷ'}
                    </div>
                    <div className={cx('info__group')}>
                      <div className={cx('price')}>{formatter.format(order.products[0].price)}đ</div>
                      <div className={cx('group-btn-info')}>
                        <div className={cx('btn-info')} onClick={() => navigate(`/member/order/detail/${order._id}`)}>
                          Xem chi tiết
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
