import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import categoryMethods from '../../services/categories';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAppDispatch } from '../../../hooks';
import { addItemToCart } from '../../redux/features/cart/cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import RatingByProduct from '../ratingByProduct/RatingByProduct';
const cx = classNames.bind(styles);

interface Product {
  _id: string;
  name: string;
  images: string[];
  discount: number;
  price: number;
  category_id: string;
  note: string;
  description: string;
  slug: string;
  bestseller: boolean;
  quantity: number;
}

interface PropsCardItem {
  products: Product[];
  isBestseller: boolean;
}

export default function CardItem({ products, isBestseller = false }: PropsCardItem) {
  const dispatch = useAppDispatch();

  interface Category {
    _id: string;
    name: string;
  }
  const [categories, setCategories] = React.useState<Category[]>([]);
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

  const cardProduts = (isBestseller && products.filter((product) => product.bestseller)) || products;

  return (
    <>
      {cardProduts.map((product) => (
        <div className="col">
          <Card key={product._id} className={cx('card')}>
            <Link to={`/product/${product.slug}`}>
              <div className={cx('card-media-wrapper')}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={`http://res.cloudinary.com${product.images[0]}`}
                />
                {product.discount > 0 && <div className={cx('discount-label')}>-{product.discount}%</div>}
              </div>
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
                <Typography gutterBottom variant="h5" component="div" className={cx('price')}>
                  <span> {formatter.format(product.price)}đ</span>
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {categories.map((category) => {
                  if (product.category_id === category._id) {
                    return (
                      <span key={category._id} className={cx('category-name')}>
                        {category.name}
                      </span>
                    );
                  }
                })}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between' }}>
              <RatingByProduct currentProduct={product._id} />

              <div className={cx('cta-wrap')}>
                {(product.quantity > 0 && (
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
                )) || <div className={cx('out-of-stock')}>Tạm hết hàng</div>}
              </div>
            </CardActions>
          </Card>
        </div>
      ))}
    </>
  );
}
