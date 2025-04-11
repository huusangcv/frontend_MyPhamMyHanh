import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import productMethods from '../../services/products';
import categoryMethods from '../../services/categories';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Rating } from '@mui/material';
import { useAppDispatch } from '../../../hooks';
import { addItemToCart } from '../../redux/features/cart/cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SameProducts.module.scss';
import reviewMethods from '../../services/reviews';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const cx = classNames.bind(styles);
interface PropsSameProduct {
  categoryId: string;
  currentProduct: string;
}
export default function SameProducts({ categoryId, currentProduct }: PropsSameProduct) {
  const dispatch = useAppDispatch();

  interface Product {
    _id: string;
    name: string;
    price: number;
    discount: number;
    slug: string;
    category_id: string;
    bestseller: boolean;
    images: string[];
  }

  interface Category {
    _id: string;
    name: string;
  }

  interface Review {
    _id: string;
    rating: number;
  }

  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { status, data } = await productMethods.getProducts();

        if (status) {
          setProducts(data.products);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { status, data } = await reviewMethods.getReviewsByProduct(currentProduct);

        if (status) {
          setReviews(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, []);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { status, data } = await categoryMethods.getCategories();

        if (status) {
          setCategories(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const caclReview = (reviews: Review[]): number => {
    const lengthReview = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / lengthReview;
  };
  return (
    (isLoading && (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rounded" height={60} />
        <Skeleton variant="rounded" height={22} />
      </Stack>
    )) || (
      <>
        {products.map(
          (product) =>
            product.category_id === categoryId &&
            product._id !== currentProduct && (
              <Card sx={{ maxWidth: 345 }} key={product._id} className={cx('card')}>
                <Link to={`/product/${product.slug}`}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={`http://res.cloudinary.com${product.images[0]}`}
                  />
                </Link>
                <CardContent>
                  <Link to={`/product/${product.slug}`}>
                    <Typography gutterBottom variant="h5" component="div" className={cx('heading')}>
                      {product.name}
                    </Typography>
                  </Link>
                  {(product.discount > 0 && (
                    <div className={cx('wrap-price')}>
                      <Typography gutterBottom variant="h5" component="div" className={cx('price')}>
                        <span>{formatter.format(product.price * (1 - product.discount / 100))}đ</span>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div" className={cx('price-after-discount')}>
                        <span> {formatter.format(product.price)}đ</span>
                      </Typography>
                    </div>
                  )) || (
                    <Typography gutterBottom variant="h6" component="div" className={cx('price')}>
                      <span> {formatter.format(product.price)}đ</span>
                    </Typography>
                  )}

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {categories.map((category) => {
                      if (product.category_id === category._id) {
                        return category.name;
                      }
                    })}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between' }}>
                  {(reviews.length > 0 && (
                    <Rating
                      name="half-rating-read"
                      precision={0.5}
                      value={parseFloat(caclReview(reviews).toFixed(0))}
                      readOnly
                    />
                  )) || <div></div>}

                  <div className={cx('cta-wrap')}>
                    <Button
                      size="small"
                      onClick={() => {
                        dispatch(
                          addItemToCart({
                            id: product._id,
                            name: product.name,
                            image: product.images[0],
                            priceThrought: product.price,
                            slug: product.slug,
                            price: product.price * (1 - product.discount / 100),
                            quantity: 1,
                          }),
                        );
                        toast.success('Thêm sản phẩm vào giỏ hàng thành công', {
                          position: 'bottom-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: 'light',
                        });
                      }}
                    >
                      <AddShoppingCartIcon />
                    </Button>
                  </div>
                </CardActions>
              </Card>
            ),
        )}
      </>
    )
  );
}
