import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import styles from "./SlideThumbs.module.scss";

const cx = classNames.bind(styles);
interface Image {
  images: string[];
}
const SlideThumbs = ({ images }: Image) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={cx("slider-container")}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              className={cx("thumb")}
              src={`https://backend-myphammyhanh-k43b.onrender.com${image}`}
              alt=""
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideThumbs;
