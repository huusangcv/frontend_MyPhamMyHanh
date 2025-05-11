import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import paymentMethods from '../../services/payments';
import classNames from 'classnames/bind';
import styles from './PaymentResult.module.scss';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Thêm icon

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const cx = classNames.bind(styles);

const PaymentResult = () => {
  const queryParams = useQueryParams();
  const queryString = queryParams.toString();
  const [paymentResult, setPaymentResult] = useState<string>('Đang hiển thị kết quả thanh toán...'); // Kết quả thanh toán
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(true); // Trạng thái giao dịch

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const { data, status } = await paymentMethods.getPaymentResult(queryString);
        if (status) {
          setIsPaymentSuccess(true);
        } else {
          setIsPaymentSuccess(false);
        }
        setPaymentResult(data.message);
      } catch (error) {
        console.log(error);
        setPaymentResult('ĐÃ XẢY RA LỖI KHI XỬ LÝ GIAO DỊCH');
        setIsPaymentSuccess(false);
      }
    };
    if (queryString) {
      fetchPaymentResult();
    } else {
      setPaymentResult('Thanh toán thành công!');
      setIsPaymentSuccess(true);
    }
  }, [queryString]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className={cx('wapper')}>
      <div className={cx('paymentResult__header')}>TRẠNG THÁI GIAO DỊCH</div>

      <div className={cx('paymentResult__body')}>
        {isPaymentSuccess !== null && (
          <div className={cx('status')}>
            {isPaymentSuccess ? (
              <FaCheckCircle className={cx('icon-success')} />
            ) : (
              <FaTimesCircle className={cx('icon-failed')} />
            )}
            <p className={cx(isPaymentSuccess ? 'message-success' : 'message-failed')}>{paymentResult}</p>
          </div>
        )}

        <div className={cx('order-message')}>
          {isPaymentSuccess ? (
            <h3 className={cx('message-helper')}>
              "Cảm ơn bạn đã thanh toán! Đơn hàng của bạn đã được xác nhận và chúng tôi sẽ xử lý ngay. Bạn sẽ nhận được
              thông tin cập nhật qua email trong thời gian sớm nhất."
            </h3>
          ) : (
            <h3 className={cx('message-helper')}>
              "Thanh toán không thành công. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ."
            </h3>
          )}
        </div>
      </div>

      <div className={cx('paymentResult__footer')}>
        <Link to={'/'} className={cx('back')}>
          TRỞ LẠI
        </Link>
      </div>
    </div>
  );
};

export default PaymentResult;
