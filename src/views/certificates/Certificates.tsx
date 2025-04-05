import classNames from 'classnames/bind';
import styles from './Certificates.module.scss';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const cx = classNames.bind(styles);

const Certificates = () => {
  return (
    <div className={cx('wapper')}>
      <div className={cx('container')}>
        <h1 className={cx('maincont-ttl')}>Bằng khen của Mỹ phẩm Mỹ Hạnh</h1>
        <p className={cx('maincont-desc')}>
          Mỹ Phẩm Mỹ Hạnh tự hào là đơn vị được trao tặng nhiều bằng khen trong hoạt động từ thiện và thành tựu kinh
          doanh xuất sắc từ Ủy Ban Nhân Dân tỉnh An Giang, Hiệp Hội Doanh Nghiệp, và Hiệp Hội Phụ Nữ, thể hiện cam kết
          vì cộng đồng và uy tín trong hoạt động thương mại.
        </p>
      </div>
    </div>
  );
};

export default Certificates;
