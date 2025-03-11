import SlideSlick from "../../components/sildeslick/SlideSlick";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Box } from "@mui/material";
import CardItem from "../../components/card/Card";
import News from "../../components/news/News";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productMethods from "../../services/products";
import SkeletonLoading from "../../components/skeletonLoading/SkeletonLoading";
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
}
const cx = classNames.bind(styles);
const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
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

  useEffect(() => {
    document.title = "Trang chủ | Mỹ phẩm Mỹ Hạnh";
    scroll({
      top: 0,
    });
  }, []);

  return (
    <div className={cx("home")} style={{ width: "100%" }}>
      <SlideSlick />
      <div className={cx("wapper")}>
        <div className={cx("heading-wrap")}>
          <h2 className={cx("heading")}>
            <span>Sản phẩm nổi bật</span>
          </h2>
          <div className={cx("view-all")}>
            <Link to="/products/all">
              Xem tất cả
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
            </Link>
          </div>
        </div>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 2,
          }}
        >
          {(isLoading && <SkeletonLoading />) || (
            <CardItem products={products} isBestseller />
          )}
        </Box>
      </div>
      <div className={cx("wapper")} style={{ marginTop: 20 }}>
        <div className={cx("heading-wrap")}>
          <h2 className={cx("heading")}>
            <span>Tin tức nổi bật</span>
          </h2>
          <div className={cx("view-all")}>
            <Link to="/news">
              Xem tất cả
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
            </Link>
          </div>
        </div>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 2,
          }}
        >
          <News />
        </Box>
      </div>
    </div>
  );
};

export default Home;
