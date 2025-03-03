import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import productMethods from "../../services/products";
import categoryMethods from "../../services/categories";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Rating } from "@mui/material";
import { useAppDispatch } from "../../../hooks";
import { addItemToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
export default function CardItem() {
  const dispatch = useAppDispatch();

  interface Product {
    _id: string;
    name: string;
    price: number;
    discount: number;
    slug: string;
    category_id: string;
    images: string[];
  }

  interface Category {
    _id: string;
    name: string;
  }
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { status, data } = await productMethods.getProducts();

        if (status) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
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

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return (
    <>
      {products.map((product) => (
        <Card sx={{ maxWidth: 345 }} key={product._id} className={cx("card")}>
          <Link to={`/san-pham/${product.slug}`}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={`http://localhost:8080${product.images[0]}`}
            />
          </Link>
          <CardContent>
            <Link to={`/san-pham/${product.slug}`}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={cx("heading")}
              >
                {product.name}
              </Typography>
            </Link>
            {(product.discount > 0 && (
              <div className={cx("wrap-price")}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className={cx("price")}
                >
                  <span>
                    {formatter.format(
                      product.price * (1 - product.discount / 100)
                    )}
                    đ
                  </span>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={cx("price-after-discount")}
                >
                  <span> {formatter.format(product.price)}đ</span>
                </Typography>
              </div>
            )) || (
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className={cx("price")}
              >
                <span> {formatter.format(product.price)}đ</span>
              </Typography>
            )}

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {categories.map((category) => {
                if (product.category_id === category._id) {
                  return category.name;
                }
              })}
            </Typography>
          </CardContent>

          <CardActions style={{ justifyContent: "space-between" }}>
            <Rating
              name="half-rating-read"
              precision={0.5}
              value={2.5}
              readOnly
            />

            <div className={cx("cta-wrap")}>
              <Button
                size="small"
                onClick={() => {
                  dispatch(
                    addItemToCart({
                      id: product._id,
                      name: product.name,
                      image: product.images[0],
                      price: product.price * (1 - product.discount / 100),
                      quantity: 1,
                    })
                  );
                  toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }}
              >
                <AddShoppingCartIcon />
              </Button>
            </div>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
