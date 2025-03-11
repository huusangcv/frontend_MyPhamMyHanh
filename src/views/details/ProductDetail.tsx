import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import productMethods from "../../services/products";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import { Avatar, Box, Grid, Rating } from "@mui/material";
import categoryMethods from "../../services/categories";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch } from "../../../hooks";
import { addItemToCart } from "../../redux/features/cart/cartSlice";
import MDEditor from "@uiw/react-md-editor";
import newsMethods from "../../services/news";
import usersMethods from "../../services/users";
import ImagesReview from "../../components/imagesReview/ImagesReview";
import segmentMethods from "../../services/segments";
import SameProducts from "../../components/sameProducts/SameProducts";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Loading from "../../components/isLoading/IsLoading";
const cx = classNames.bind(styles);
const ProductDetail = () => {
  interface Product {
    _id: string;
    name: string;
    images: string[];
    discount: number;
    price: number;
    category_id: string;
    note: string;
    description: string;
    image: string;
    slug: string;
  }

  interface Category {
    _id: string;
    name: string;
    slug: string;
  }

  interface News {
    _id: string;
    title: string;
    image: string;
    slug: string;
  }

  interface Review {
    _id: string;
    user_id: string;
    product_id: string;
    rating: number;
    content: string;
    media: string[];
    createdAt: string;
  }

  interface User {
    _id: string;
    username: string;
    image: string;
    segment_ids: string[];
  }

  interface Segment {
    _id: string;
    name: string;
  }

  const { slug } = useParams();
  const [product, setProduct] = useState<Product>({
    _id: "",
    name: "",
    images: [],
    discount: 0,
    price: 0,
    category_id: "",
    note: "",
    description: "",
    slug: "",
    image: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { status, data } = await productMethods.getProducts();

        if (status) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, status } = await productMethods.getDetailProduct(
          slug as string
        );

        if (status) {
          if (data.reviews) {
            setReviews(data.reviews);
            setProduct(data.product);
          } else {
            setReviews([]);
            setProduct(data);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (slug !== "") {
      fetchProduct();
    }
  }, [slug]);

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
    const fetchNews = async () => {
      try {
        const { status, data } = await newsMethods.getNews();

        if (status) {
          setNews(data.news);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { status, data } = await usersMethods.getUsers();

        if (status) {
          setUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const { status, data } = await segmentMethods.getSegments();

        if (status) {
          setSegments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSegments();
  }, []);

  useEffect(() => {
    document.title = `${product.name}`;
    scroll({
      top: 0,
    });
  }, [product.name]);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const caclReview = (reviews: Review[]): number => {
    const lengthReview = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / lengthReview;
  };

  const sameProducts = products.filter(
    (sameProduct) =>
      sameProduct.category_id === product.category_id &&
      sameProduct._id !== product._id
  );

  const category = categories.find(
    (category) => category._id === product.category_id
  );

  return (
    (isLoading && <Loading />) || (
      <div className={cx("wapper")}>
        <div className={cx("product-detail")}>
          <div className={"bannerTopHead topBarHeader"}>
            <div className={"block-breadcrumbs affix"}>
              <div className="container">
                <Breadcrumb
                  breadcrums={[
                    {
                      name: "Sản phẩm",
                      to: "/products/all",
                    },
                    {
                      name: `${category ? category.name : "..."}`,
                      to: `/products/${category ? category.slug : "..."}`,
                    },
                    {
                      name: `${product.name}`,
                      to: "",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <section className={cx("block-detail-product")}>
            <div className={cx("box-header")}>
              <div className={cx("box-product-name")}>
                <h1>{product.name}</h1>
              </div>
              {reviews.length > 0 && (
                <>
                  <Rating
                    name="half-rating-read"
                    value={parseFloat(caclReview(reviews).toFixed(0))}
                    precision={0.5}
                    readOnly
                  />

                  <span>&nbsp;{reviews.length} đánh giá</span>
                </>
              )}
            </div>
            <hr />

            <div className={cx("block-detail-product", "wrap")}>
              <Grid container spacing={2}>
                <Grid
                  item
                  md={7}
                  xs={12}
                  className={cx("box-detail-product__box-left")}
                >
                  <div className={cx("box-gallery")}>
                    <div className={cx("gallery-product-detail")}>
                      <div className={cx("gallery-slide")}>
                        <div
                          className={cx("thumbnail-slide", "swiper-container")}
                        >
                          <div className={cx("swiper-slide")}>
                            <img
                              className={cx("img")}
                              src={`http://localhost:8080${product.images[imageIndex]}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={cx(
                          "thumbnail-slide",
                          "swiper-container",
                          "swiper-container-thumbs",
                          "footer"
                        )}
                      >
                        {product.images.map((image, index) => (
                          <div
                            className={cx(
                              "swiper-slide",
                              imageIndex === index &&
                                "swiper-slide-thumb-active"
                            )}
                            key={index}
                            onClick={() => setImageIndex(index)}
                          >
                            <img
                              className={cx("img")}
                              src={`http://localhost:8080${image}`}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  md={5}
                  xs={12}
                  className={cx("box-detail-product__box-center")}
                >
                  <div className={cx("block-box-price")}>
                    <div className={cx("box-info__box-price")}>
                      <p className={cx("product__price--show")}>
                        {formatter.format(
                          product.price * (1 - product.discount / 100)
                        )}
                        đ
                      </p>
                      <div>
                        <p className={cx("product__price--through")}>
                          {formatter.format(product.price)}đ
                        </p>
                        <div></div>
                      </div>
                    </div>
                    <div className={cx("product__category")}>
                      {categories.map((category) => {
                        if (category._id === product.category_id) {
                          return category.name;
                        }
                      })}
                    </div>
                    <p className={cx("prod-excerpt")}>{product.note}</p>
                  </div>

                  <div className="is-flex" style={{ gap: 10 }}>
                    <button className={cx("order-button")}>
                      <strong>MUA NGAY</strong>
                    </button>
                    <button
                      className={cx("add-to-cart-button")}
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
                      }}
                    >
                      <AddShoppingCartIcon />

                      <span>Thêm vào giỏ</span>
                    </button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </section>
          {sameProducts.length > 0 && (
            <>
              <hr />
              <div data-v-b42e641e="" className={cx("same-product-head")}>
                <h2 data-v-b42e641e="" className={cx("same-product-title")}>
                  SẢN PHẨM TƯƠNG TỰ
                </h2>
              </div>
            </>
          )}

          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
                  gap: 2,
                }}
              >
                <SameProducts
                  categoryId={product.category_id}
                  currentProduct={product._id}
                />
              </Box>
            </Grid>
          </Grid>
          <hr />
          <div></div>
          <hr />
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <div className={cx("block-content-product", "footer")}>
                <div className={cx("block-content-product-left")}>
                  <div className={cx("product-block-content")}>
                    <div className={cx("product-block-content__inner")}>
                      <h2 className={cx("content-title")}>Đặc điểm nổi bật</h2>
                      <div className={cx("primary-note")}>{product.note}</div>
                    </div>
                    <div className={cx("content-desc")}>
                      <MDEditor.Markdown source={product.description} />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item md={4} xs={12}>
              <div className={cx("block-news")}>
                <div className={cx("block-sforum")}>
                  <div className={cx("sforum__title")}>
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="15"
                        viewBox="0 0 20 15"
                      >
                        <path
                          id="newspaper"
                          d="M17.5,6.5V4H0V17.75A1.25,1.25,0,0,0,1.25,19H18.125A1.875,1.875,0,0,0,20,17.125V6.5ZM16.25,17.75h-15V5.25h15ZM2.5,7.75H15V9H2.5Zm7.5,2.5h5V11.5H10Zm0,2.5h5V14H10Zm0,2.5h3.75V16.5H10Zm-7.5-5H8.75V16.5H2.5Z"
                          transform="translate(0 -4)"
                          fill="#6bc67c"
                        ></path>
                      </svg>
                    </div>
                    Tin tức
                  </div>
                  {news.map((news, index) => {
                    if (index <= 4) {
                      return (
                        <div className={cx("sforum__content")} key={news._id}>
                          <Link
                            to={`/news/detail/${news.slug}`}
                            className={cx("sforum__content-item")}
                          >
                            <img
                              src={`http://localhost:8080${news.image}`}
                              alt={news.title}
                              loading="lazy"
                              className={cx("content-item__img")}
                            />
                            <div className={cx("content-item__text")}>
                              {news.title}
                            </div>
                          </Link>
                        </div>
                      );
                    }
                  })}
                  <div className={cx("block-sforum_btn-showmore")}>
                    <Link to="/news/all" className={cx("btn-show-more")}>
                      Xem tất cả bài viết
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          width="10"
                          height="10"
                        >
                          <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path>
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <div className={cx("boxReview")}>
                <h2 className="title is-6">
                  Đánh giá &amp; nhận xét {product.name}
                </h2>

                {(reviews.length > 0 && (
                  <>
                    <div className={cx("boxReview-review")}>
                      <div className={cx("boxReview-score")}>
                        <p className={cx("title")}>
                          {caclReview(reviews).toFixed(1)}
                        </p>
                        <div className={cx("item-star")}>
                          <Rating
                            name="half-rating-read"
                            value={parseFloat(caclReview(reviews).toFixed(0))}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                        <div className={cx("boxReview-score__count")}>
                          <strong>{reviews.length}</strong> đánh giá
                        </div>
                      </div>
                      <div className={cx("boxReview-star")}>
                        <div className={cx("rating-level")}>
                          <div className={cx("star-count")}>
                            <span className="has-text-weight-bold">5</span>
                            <div className={cx("is-active")}>
                              <svg
                                height="15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                              </svg>
                            </div>
                          </div>
                          <progress
                            max={reviews.length}
                            className="progress is-small m-0"
                            value={
                              reviews.filter((review) => review.rating === 5)
                                .length
                            }
                          ></progress>
                          <span className="is-size-7">
                            {
                              reviews.filter((review) => review.rating === 5)
                                .length
                            }{" "}
                            đánh giá
                          </span>
                        </div>
                        <div className={cx("rating-level")}>
                          <div className={cx("star-count")}>
                            <span className="has-text-weight-bold">4</span>
                            <div className={cx("is-active")}>
                              <svg
                                height="15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                              </svg>
                            </div>
                          </div>
                          <progress
                            max={reviews.length}
                            className="progress is-small m-0"
                            value={
                              reviews.filter((review) => review.rating === 4)
                                .length
                            }
                          ></progress>
                          <span className="is-size-7">
                            {
                              reviews.filter((review) => review.rating === 4)
                                .length
                            }{" "}
                            đánh giá
                          </span>
                        </div>
                        <div className={cx("rating-level")}>
                          <div className={cx("star-count")}>
                            <span className="has-text-weight-bold">3</span>
                            <div className={cx("is-active")}>
                              <svg
                                height="15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                              </svg>
                            </div>
                          </div>
                          <progress
                            max={reviews.length}
                            className="progress is-small m-0"
                            value={
                              reviews.filter((review) => review.rating === 3)
                                .length
                            }
                          ></progress>
                          <span className="is-size-7">
                            {
                              reviews.filter((review) => review.rating === 3)
                                .length
                            }{" "}
                            đánh giá
                          </span>
                        </div>
                        <div className={cx("rating-level")}>
                          <div className={cx("star-count")}>
                            <span className="has-text-weight-bold">2</span>
                            <div className={cx("is-active")}>
                              <svg
                                height="15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                              </svg>
                            </div>
                          </div>
                          <progress
                            max={reviews.length}
                            className="progress is-small m-0"
                            value={
                              reviews.filter((review) => review.rating === 2)
                                .length
                            }
                          ></progress>
                          <span className="is-size-7">
                            {
                              reviews.filter((review) => review.rating === 2)
                                .length
                            }{" "}
                            đánh giá
                          </span>
                        </div>
                        <div className={cx("rating-level")}>
                          <div className={cx("star-count")}>
                            <span className="has-text-weight-bold">1</span>
                            <div className={cx("is-active")}>
                              <svg
                                height="15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"></path>
                              </svg>
                            </div>
                          </div>
                          <progress
                            max={reviews.length}
                            className="progress is-small m-0"
                            value={
                              reviews.filter((review) => review.rating === 1)
                                .length
                            }
                          ></progress>
                          <span className="is-size-7">
                            {
                              reviews.filter((review) => review.rating === 1)
                                .length
                            }{" "}
                            đánh giá
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={cx("button__review-container")}>
                      <p className="has-text-centered">
                        Bạn đánh giá sao về sản phẩm này?
                      </p>
                      <div className="has-text-centered">
                        <button className={cx("button__review")}>
                          Đánh giá ngay
                        </button>
                      </div>
                    </div>
                    <div className={cx("boxReview-comment")}>
                      {reviews.map((review) => (
                        <div
                          className={cx("boxReview-comment-item")}
                          key={review._id}
                        >
                          <div className={cx("boxReview-comment-item-title")}>
                            <div
                              className="is-flex is-align-items-center"
                              style={{ gap: 10 }}
                            >
                              <div className="mr-2 is-flex is-align-items-center is-justify-content-center name-letter">
                                {users.map((user) => {
                                  if (review.user_id === user._id) {
                                    return user.image !== "" ? (
                                      <Avatar
                                        key={user._id}
                                        alt={user.username}
                                        src={`http://localhost:8080${user.image}`}
                                      />
                                    ) : (
                                      "S"
                                    );
                                  }
                                })}
                              </div>
                              <div className="block-info">
                                <div className="block-info__name">
                                  <span className="name">
                                    {users.map((user) => {
                                      if (review.user_id === user._id) {
                                        return user.username;
                                      }
                                    })}
                                  </span>
                                  <div className="date-time">
                                    <div className="icon-clock">
                                      <svg
                                        height="15"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                      >
                                        <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"></path>
                                      </svg>
                                    </div>
                                    {new Date(
                                      review.createdAt
                                    ).toLocaleString()}
                                  </div>
                                </div>
                                {users.map((user) => {
                                  if (review.user_id === user._id) {
                                    const findSegmentId = segments.find(
                                      (segment) =>
                                        segment.name === "Đã đặt hàng một lần"
                                    );

                                    if (findSegmentId !== undefined) {
                                      // Check segments_id includes findSegmentId._id
                                      if (
                                        user.segment_ids !== undefined &&
                                        user.segment_ids.includes(
                                          findSegmentId._id
                                        )
                                      ) {
                                        return (
                                          <span
                                            style={{ marginTop: 6 }}
                                            key={user._id}
                                            className="bought-cps is-flex is-align-items-center"
                                          >
                                            <div className="tick-icon">
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M14.6666 8.00016C14.6666 4.31826 11.6818 1.3335 7.99992 1.3335C4.31802 1.3335 1.33325 4.31826 1.33325 8.00016C1.33325 11.6821 4.31802 14.6668 7.99992 14.6668C11.6818 14.6668 14.6666 11.6821 14.6666 8.00016Z"
                                                  stroke="#6bc67c"
                                                  strokeWidth="1.5"
                                                ></path>
                                                <path
                                                  d="M5 7.6665L6.53936 9.42577C6.95185 9.89719 7.69125 9.87764 8.07825 9.38509L11 5.6665"
                                                  stroke="#6bc67c"
                                                  strokeWidth="1.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                ></path>
                                              </svg>
                                            </div>
                                            Đã mua tại Mỹ phẩm Mỹ Hạnh
                                          </span>
                                        );
                                      }
                                    }
                                  }
                                  return null; // Trả về null nếu không thỏa mãn điều kiện
                                })}
                              </div>
                            </div>
                          </div>
                          <div className={cx("boxReview-comment-item-review")}>
                            <div className="item-review-rating">
                              <Rating
                                name="half-rating-read"
                                value={review.rating}
                                readOnly
                              />
                            </div>

                            <div className={cx("item-review-comment")}>
                              <div className={cx("comment-content")}>
                                <p>{review.content}</p>
                              </div>
                            </div>

                            <div className={cx("item-review-rating__images")}>
                              <ImagesReview imagesReviews={review.media} />
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className={cx("block-sforum_btn-showmore")}>
                        <a
                          target="_blank"
                          href="https://cellphones.com.vn/sforum/tag/samsung-galaxy-s25-ultra"
                          className={cx("btn-show-more")}
                        >
                          Xem thêm
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              width="10"
                              height="10"
                            >
                              <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path>
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </>
                )) || (
                  <div className={cx("boxReview-no-comment")}>
                    <div className={cx("button__review-container")}>
                      <p>
                        Hiện chưa có đánh giá nào. <br />
                        Bạn sẽ là người đầu tiên đánh giá sản phẩm này chứ?
                      </p>
                      <div className="has-text-centered">
                        <button className={cx("button__review")}>
                          Đánh giá ngay
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  );
};

export default ProductDetail;
