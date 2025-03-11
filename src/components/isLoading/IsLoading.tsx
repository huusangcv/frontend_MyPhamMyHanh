import classNames from "classnames/bind";
import styles from "./IsLoading.module.scss";

const cx = classNames.bind(styles);
const Loading = () => {
  return (
    <section className={cx("dots-container")}>
      <div className={cx("dot")}></div>
      <div className={cx("dot")}></div>
      <div className={cx("dot")}></div>
      <div className={cx("dot")}></div>
      <div className={cx("dot")}></div>
    </section>
  );
};

export default Loading;
