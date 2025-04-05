import classNames from 'classnames/bind';
import styles from './About.module.scss';

const cx = classNames.bind(styles);
const About = () => {
  return (
    <div className={cx('wapper')}>
      <div className={cx('container')}>
        <div className={cx('intro-section')}>
          <div className={cx('intro-text')}>
            <h2>Giới thiệu về Mỹ phẩm Mỹ Hạnh</h2>
            <p>
              Mỹ Phẩm Mỹ Hạnh ra đời với sứ mệnh giúp phụ nữ Việt Nam tìm lại sự tươi trẻ của làn da, tăng sự tự tin
              trong giao tiếp và mang lại vẻ đẹp hoàn hảo trong cuộc sống.
            </p>
            <p>
              Sau một thời gian nghiên cứu và phát triển, chúng tôi hiểu rằng làn da của các chị em bị nổi mụn, đen sạm,
              nám,...là do ảnh hưởng từ môi trường khói bụi và ô nhiểm; do nhịp sống bộn bề, ăn uống, ngủ nghỉ thất
              thường làm cho làn da của các chị em ngày càng đen sạm lại, mụn bắt đầu xuất hiện,...Từ đó, Mỹ phẩm Mỹ
              Hạnh đã cho ra đời các dòng sản phẩm trị dứt điểm mụn cám, mụn bọc, xóa mờ các vết nám sau đó cung cấp
              dưỡng chất để mang lại làn da mịn màng và tươi sáng cho các chị em.
            </p>
            <p>
              Chúng tôi tự hào mang đến các sản phẩm chất lượng cao, được nghiên cứu kỹ lưỡng để phù hợp với làn da
              người Việt, giúp giải quyết các vấn đề về da như mụn, nám, và lão hóa.
            </p>
          </div>
          <div className={cx('intro-image')}>
            <img src="https://myphammyhanh.com/frontend/img/thuvien/9.jpeg" alt="Mỹ Phẩm Mỹ Hạnh" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
