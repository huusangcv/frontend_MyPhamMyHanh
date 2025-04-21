import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SildeSlick.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import slidesMethods from '../../services/slides';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setSlide } from '../../redux/features/slide/slidesSlice';
import { Skeleton } from '@mui/material';
const cx = classNames.bind(styles);

function NextArrow({ onClick }: { onClick: () => void }) {
  return (
    <div className={cx('arrow', 'arrow-next')} onClick={onClick}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="chevron-right"
        className="svg-inline--fa fa-chevron-right "
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
        ></path>
      </svg>
    </div>
  );
}

function PrevArrow({ onClick }: { onClick: () => void }) {
  return (
    <div className={cx('arrow', 'arrow-prev')} onClick={onClick}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="chevron-left"
        className="svg-inline--fa fa-chevron-left "
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
        ></path>
      </svg>
    </div>
  );
}

function SlideSkeletonLoading() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {[1, 2, 3, 4].map((item) => (
        <div key={item}>
          <div className={cx('slide-item')} style={{ background: '#f5f5f5' }}>
            <div className={cx('slide-item__content')}>
              <Skeleton variant="rectangular" height={40} width="60%" />
              <Skeleton variant="text" height={100} width="80%" />
              <Skeleton variant="rectangular" height={40} width={150} />
            </div>
            <div className={cx('slide-item__image')}>
              <Skeleton variant="rectangular" height={400} width="100%" />
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

const SlideSlick = () => {
  const slides = useAppSelector((state) => state.slide);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthSlides = async () => {
      try {
        setLoading(true);
        const { data, status } = await slidesMethods.getSidles();

        if (status) {
          dispatch(setSlide(data.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (slides[0]._id === '') {
      fecthSlides();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <SlideSkeletonLoading />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: (
      <NextArrow
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    ),
    prevArrow: (
      <PrevArrow
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    ),
  };
  return (
    <div className={cx('slider-container')}>
      <Slider {...settings}>
        {Array.isArray(slides) &&
          slides.length > 0 &&
          slides.map((slide) => (
            <div key={slide._id}>
              <div
                className={cx('slide-item')}
                style={{
                  background: slide.backGroundLinerGradient,
                }}
              >
                <div className={cx('slide-item__content')}>
                  <h2 className="sub-title">
                    <Link to={`/product/${slide.link}`}>{slide.title}</Link>
                  </h2>
                  <p className="desc">{slide.description}</p>
                  <div>
                    <Link
                      to={`/product/${slide.link}`}
                      rel="noreferrer"
                      className="ctaBtn"
                      style={{ '--cta-hover-color': slide.colorHover } as React.CSSProperties}
                    >
                      Xem sản phẩm
                    </Link>
                  </div>
                </div>
                <div className={cx('slide-item__image')}>
                  <a href="#!">
                    <img src={`https://res.cloudinary.com${slide.image}`} alt="" />
                  </a>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default SlideSlick;
