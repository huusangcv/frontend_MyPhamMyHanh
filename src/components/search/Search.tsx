import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import productMethods from "../../services/products";
import { Link } from "react-router-dom";
import newsMethods from "../../services/news";
const cx = classNames.bind(styles);
const Search = () => {
  interface Product {
    _id: string;
    name: string;
    images: string[];
    slug: string;
  }

  interface News {
    _id: string;
    title: string;
    image: string;
    slug: string;
  }

  const [searchName, setSearchName] = useState("");
  const [showClearIcon, setShowClearIcon] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [showResultSearch, setShowResultSearch] = useState<boolean>(true);
  useEffect(() => {
    const fetchSearchProducts = async () => {
      try {
        const { data, status } =
          await productMethods.searchProducts(searchName);

        if (status) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (searchName !== "") {
      fetchSearchProducts();
    }
  }, [searchName]);

  useEffect(() => {
    const fetchSearchNews = async () => {
      try {
        const { data, status } = await newsMethods.searchNews(searchName);

        if (status) {
          setNews(data.news);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (searchName !== "") {
      fetchSearchNews();
    }
  }, [searchName]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSetSearchName = (e: any) => {
    const newValue = e.target.value;
    if (newValue !== "") {
      setSearchName(newValue);
      setShowClearIcon(true);
    } else {
      setSearchName("");
      setShowClearIcon(false);
    }
  };
  return (
    <>
      <div className={cx("search")}>
        <div className={cx("search__icon")}>
          <SearchIcon />
        </div>
        <input
          value={searchName}
          onChange={(e) => {
            handleSetSearchName(e);
            setShowResultSearch(true);
          }}
          type="text"
          className={cx("search__input")}
          placeholder="Tìm kiếm sản phẩm, tin tức,..."
        />
        {showClearIcon && (
          <div
            className={cx("search__icon")}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              setSearchName("");
              setShowClearIcon(false);
            }}
          >
            <CloseIcon />
          </div>
        )}
      </div>

      {showResultSearch && (
        <div
          className={cx("search__inner")}
          style={{ display: (searchName === "" && "none") || "block" }}
        >
          <div className={cx("search__wapper")}>
            <div className={cx("search__result")}>
              <div className={cx("search__header")}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="magnifying-glass"
                  className="svg-inline--fa fa-magnifying-glass _icon_15ttk_79"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                  ></path>
                </svg>
                <span>Kết quả cho '{searchName}'</span>
              </div>
              {products && products.length > 0 && (
                <>
                  <div className={cx("search__heading")}>
                    <h5>SẢN PHẨM</h5>
                    <Link to="/products/all" className={cx("search__seemore")}>
                      Xem thêm
                    </Link>
                  </div>
                  {products.map((product) => (
                    <Link
                      to={`/product/${product.slug}`}
                      className={cx("search__item")}
                      key={product._id}
                      onClick={() => setShowResultSearch(false)}
                    >
                      <div className={cx("search__avatar")}>
                        <img
                          src={`https://api.regis.id.vn${product.images[0]}`}
                          alt={product.name}
                        />
                      </div>
                      <span>{product.name}</span>
                    </Link>
                  ))}
                </>
              )}

              {news && news.length > 0 && (
                <>
                  <div className={cx("search__heading")}>
                    <h5>Tin tức</h5>
                    <Link to="/news" className={cx("search__seemore")}>
                      Xem thêm
                    </Link>
                  </div>
                  {news.map((news) => (
                    <Link
                      to={`/news/${news.slug}`}
                      className={cx("search__item")}
                      key={news._id}
                      onClick={() => setShowResultSearch(false)}
                    >
                      <div className={cx("search__avatar")}>
                        <img
                          src={`https://api.regis.id.vn${news.image}`}
                          alt={news.title}
                        />
                      </div>
                      <span>{news.title}</span>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
