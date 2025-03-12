import classNames from "classnames/bind";
import styles from "./ModalSighUp.module.scss";
const cx = classNames.bind(styles);

const ModalSighUp = () => {
  return (
    <div className={cx("wapper")}>
      <div className={cx("wapper__inner")}>
        <header className={cx("header")}></header>
      </div>
    </div>
  );
};

export default ModalSighUp;
