import classNames from 'classnames/bind';
import styles from './ModalReview.module.scss';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import ratingImg from '../../assets/rating.png';
import { useEffect, useState } from 'react';
import reviewMethods from '../../services/reviews';
import { useAppSelector } from '../../../hooks';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
const labels: { [index: string]: string } = {
  1: 'Rất tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Tốt',
  5: 'Rất tốt',
};
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface Review {
  _id: string;
  user_id: string;
  product_id: string;
  rating: number;
  content: string;
  media: string[];
  createdAt: string;
  likes: string[];
}

const ModalReview = ({
  productName,
  showModalReview,
  setReviews,
  productId,
  handleCloseModalReview,
}: {
  productName: string;
  showModalReview: boolean;
  setReviews: (reviews: Review[]) => void;
  productId: string;
  handleCloseModalReview: () => void;
}) => {
  const profile = useAppSelector((state) => state.profile);

  const [hover, setHover] = useState(5);
  const [images, setImages] = useState<any[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState<string>('');

  useEffect(() => {
    if (showModalReview) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showModalReview]);

  const handleReview = async (e: any) => {
    e.preventDefault();
    try {
      const res = await reviewMethods.createReview({
        user_id: profile._id,
        product_id: productId,
        content: review,
        rating,
        media: images,
      });

      if (res.status) {
        toast.success('Đánh giá thành công', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setReview('');
        setImages([]);

        //fecth new list review when create review
        const response = await reviewMethods.getReviewsByProduct(productId);
        if (response.status) {
          handleCloseModalReview(); // close modal review
          setReviews(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadPhotos = async () => {
    const inputElement = document.getElementById('image') as HTMLInputElement | null;
    const input = inputElement?.files;
    const result = await reviewMethods.uploadImages(input);
    setImages([...result.data]);
  };
  return (
    <div className={cx('modal', 'modal-review', { active: showModalReview })}>
      <div className={cx('modal-background')}></div>
      <div className={cx('modal-content')}>
        <div className={cx('review-container')}>
          <div className={cx('content__close-btn')}></div>
          <div className={cx('content__close-btn-desk')} onClick={handleCloseModalReview}>
            <div className={cx('close-icon')}>
              <svg height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"></path>
              </svg>
            </div>
          </div>
          <div className={cx('title')}>Đánh giá &amp; nhận xét</div>
          <div className={cx('modal-review-title')}>
            <img src={ratingImg} width="100" height="100" /> <p className={cx('title-logged')}> {productName}</p>
          </div>

          <form onSubmit={handleReview} encType="multipart/form-data" className={cx('modal-review-content')}>
            <div className={cx('title-review-star-items')}>Điểm đánh giá</div>
            <div className={cx('star-all')}>
              <Rating
                className={cx('star')}
                name="hover-feedback"
                value={rating}
                getLabelText={getLabelText}
                onChange={(_event: any, newValue: number) => {
                  setRating(newValue);
                }}
                onChangeActive={(_event: any, newHover: number) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {rating !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>}
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 kí tự)"
              className={cx('review-content')}
            ></textarea>
            <div className={cx('group-input')}>
              {(images &&
                images.length > 0 &&
                images.map((image, index) => (
                  <div className={cx('previewImg')}>
                    <div className={cx('img-container')}>
                      <img src={`http://localhost:8080${image}`} alt="hình của khách" loading="lazy" />
                      <div className={cx('del-img')} onClick={() => setImages(images.filter((_, i) => i !== index))}>
                        <div className="input-icon">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.99967 1.33334C4.32634 1.33334 1.33301 4.32668 1.33301 8.00001C1.33301 11.6733 4.32634 14.6667 7.99967 14.6667C11.673 14.6667 14.6663 11.6733 14.6663 8.00001C14.6663 4.32668 11.673 1.33334 7.99967 1.33334ZM10.2397 9.53334C10.433 9.72668 10.433 10.0467 10.2397 10.24C10.1397 10.34 10.013 10.3867 9.88634 10.3867C9.75968 10.3867 9.63301 10.34 9.53301 10.24L7.99967 8.70668L6.46634 10.24C6.36634 10.34 6.23967 10.3867 6.11301 10.3867C5.98634 10.3867 5.85967 10.34 5.75968 10.24C5.56634 10.0467 5.56634 9.72668 5.75968 9.53334L7.29301 8.00001L5.75968 6.46668C5.56634 6.27334 5.56634 5.95334 5.75968 5.76001C5.95301 5.56668 6.27301 5.56668 6.46634 5.76001L7.99967 7.29334L9.53301 5.76001C9.72634 5.56668 10.0463 5.56668 10.2397 5.76001C10.433 5.95334 10.433 6.27334 10.2397 6.46668L8.70634 8.00001L10.2397 9.53334Z"
                              fill="white"
                            ></path>
                            <path
                              d="M7.99967 14.6667C11.6663 14.6667 14.6663 11.6667 14.6663 8.00001C14.6663 4.33334 11.6663 1.33334 7.99967 1.33334C4.33301 1.33334 1.33301 4.33334 1.33301 8.00001C1.33301 11.6667 4.33301 14.6667 7.99967 14.6667Z"
                              stroke="#637381"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M6.11328 9.88668L9.88661 6.11334"
                              stroke="#637381"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M9.88661 9.88668L6.11328 6.11334"
                              stroke="#637381"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))) || (
                <>
                  <input
                    id="image"
                    accept="image/x-png,image/gif,image/jpeg"
                    multiple
                    onChange={handleUploadPhotos}
                    type="file"
                    className={cx('modal__button', 'is-hidden')}
                    data-gtm-form-interact-field-id="0"
                  />
                  <label htmlFor="image" className={cx('btn-add')}>
                    <div className={cx('input-icon')}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 8C3 8.55 3.45 9 4 9C4.55 9 5 8.55 5 8V6H7C7.55 6 8 5.55 8 5C8 4.45 7.55 4 7 4H5V2C5 1.45 4.55 1 4 1C3.45 1 3 1.45 3 2V4H1C0.45 4 0 4.45 0 5C0 5.55 0.45 6 1 6H3V8Z"
                          fill="#637381"
                        ></path>
                        <circle cx="13" cy="14" r="3" fill="#637381"></circle>{' '}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.83 6H21C22.1 6 23 6.9 23 8V20C23 21.1 22.1 22 21 22H5C3.9 22 3 21.1 3 20V9.72C3.3 9.89 3.63 10 4 10C5.1 10 6 9.1 6 8V7H7C8.1 7 9 6.1 9 5C9 4.63 8.89 4.3 8.72 4H15.12C15.68 4 16.22 4.24 16.59 4.65L17.83 6ZM8 14C8 16.76 10.24 19 13 19C15.76 19 18 16.76 18 14C18 11.24 15.76 9 13 9C10.24 9 8 11.24 8 14Z"
                          fill="#637381"
                        ></path>
                      </svg>
                    </div>
                    Thêm hình ảnh
                  </label>
                </>
              )}
            </div>
            <div className={cx('button-container')}>
              <button type="submit" className={cx('modal__button')}>
                GỬI ĐÁNH GIÁ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalReview;
