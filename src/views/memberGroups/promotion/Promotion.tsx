import classNames from 'classnames/bind';
import styles from './Promotion.module.scss';

const cx = classNames.bind(styles);

const promotions = [
  { id: 1, title: 'Giảm 10% cho đơn hàng trên 500k', code: 'SALE10' },
  { id: 2, title: 'Miễn phí vận chuyển cho đơn hàng trên 300k', code: 'FREESHIP' },
  { id: 3, title: 'Giảm 20% cho khách hàng mới', code: 'NEW20' },
];

const Promotion = () => {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  return (
    <div className={cx('wapper')}>
      <div className={cx('block-info')}>
        <div className={cx('block-welcome')}>
          <div className={cx('block-welcome__box-content')}>
            <h1>Chương trình khuyến mãi</h1>
            <ul className={cx('promotion-list')}>
              {promotions.map((promo) => (
                <li key={promo.id} className={cx('promotion-item')}>
                  <span>{promo.title}</span>
                  <button onClick={() => copyToClipboard(promo.code)} className={cx('copy-button')}>
                    Sao chép mã
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
