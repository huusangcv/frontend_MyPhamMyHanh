import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import paymentMethods from "../../services/payments";
import classNames from "classnames/bind";
import styles from "./PaymentResult.module.scss";
const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const cx = classNames.bind(styles);

const PaymentResult = () => {
  const queryParams = useQueryParams();
  const queryString = queryParams.toString();
  const [paymentResult, setPaymentResult] = useState<string>(
    "ĐẶT HÀNG THÀNH CÔNG"
  );
  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const res = await paymentMethods.getPaymentResult(queryString);
        setPaymentResult(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    if (queryString) {
      fetchPaymentResult();
    }
  });

  return (
    <div className={cx("wapper")}>
      <div className={cx("paymentResult__header")}>TRẠNG THÁI GIAO DỊCH</div>
      <div className={cx("paymentResult__body")}>
        <p className={cx("message-success")}> {paymentResult}</p>
        <h3 className={cx("message-helper")}>
          "Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đã được xác nhận và chúng
          tôi sẽ xử lý ngay. Bạn sẽ nhận được thông tin cập nhật qua email trong
          thời gian sớm nhất."
        </h3>
      </div>

      <div className={cx("paymentResult__footer")}>
        <Link to={"/"} className={cx("back")}>
          TRỞ LẠI
        </Link>
      </div>
    </div>
  );
};

export default PaymentResult;
