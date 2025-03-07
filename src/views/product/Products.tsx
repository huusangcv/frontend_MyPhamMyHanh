import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { Box, Grid, Pagination, PaginationItem, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import productMethods from "../../services/products";
import CardItem from "../../components/card/Card";
import categoryMethods from "../../services/categories";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";
const cx = classNames.bind(styles);
const Products = () => {
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

  interface Category {
    _id: string;
    name: string;
    slug: string;
  }

  const { slug } = useParams();
  const location = useLocation();
  const { page } = queryString.parse(location.search, {
    parseNumbers: true,
  });
  const [categoryName, setCategoryName] = useState("TẤT CẢ SẢN PHẨM");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (slug === "all") {
          const { status, data } = await productMethods.getProducts(
            page as number
          );

          if (status) {
            setProducts(data.products);
            setTotalPages(data.totalPages);
          } else {
            setTotalPages(1);
          }
        } else {
          const { status, data } = await productMethods.getProductsByCategory(
            slug as string,
            page as number
          );

          if (status) {
            setProducts(data.products);
            setTotalPages(data.totalPages);
          } else {
            setTotalPages(1);
          }
        }

        window.scroll({
          top: 0,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [slug, page]);

  useEffect(() => {
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

  useEffect(() => {
    document.title = "Sản phẩm | Tất cả sản phẩm";
    scroll({
      top: 0,
    });
  }, []);

  return (
    <div className={cx("wapper")}>
      <div className={cx("header")}>
        <h1 className={cx("heading")}>{categoryName}</h1>
        <p className={cx("desc")}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
          obcaecati dicta exercitationem non cumque? Itaque corporis dolore
          doloremque ut commodi.
        </p>
      </div>
      <hr />
      <div className={cx("our-products")}>SẢN PHẨM CỦA CHÚNG TÔI</div>
      <div className={cx("body")}>
        <Grid container>
          <Grid item md={3}>
            <div className={cx("sidebar-category")}>
              <div className={cx("heading")}>Danh mục sản phẩm</div>
              <ul className={cx("list-categories")}>
                <li
                  className={cx(slug === "all" && "active")}
                  onClick={() => {
                    setCategoryName("TẤT CẢ SẢN PHẨM");
                  }}
                >
                  <Link to="/products/all">Tất cả sản phẩm</Link>
                  <span className={cx("category-arrow")}>
                    <ArrowForwardIosIcon />
                  </span>
                </li>
                {categories.map((category) => (
                  <li
                    key={category._id}
                    className={cx(category.slug === slug && "active")}
                    onClick={() => {
                      setCategoryName(category.name);
                    }}
                  >
                    <Link to={`/products/${category.slug}`}>
                      {category.name}
                    </Link>
                    <span className={cx("category-arrow")}>
                      <ArrowForwardIosIcon />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item md={9}>
            <div className={cx("list-products")}>
              {(products && (
                <Box
                  sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
                    gap: 2,
                  }}
                >
                  <CardItem products={products} isBestseller={false} />
                </Box>
              )) || <span>Sản phẩm trống</span>}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <Stack spacing={2}>
                  <Pagination
                    showFirstButton
                    showLastButton
                    size="large"
                    color="primary"
                    count={totalPages}
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`${item.page === 1 ? "" : `?page=${item.page}`}`}
                        {...item}
                      />
                    )}
                    boundaryCount={2}
                  />
                </Stack>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Products;
