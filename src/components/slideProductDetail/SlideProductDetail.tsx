import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import styles from "./SlideProductDetail.module.scss";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// import { useAppDispatch } from "../../../hooks";
const cx = classNames.bind(styles);
interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  images: string[];
  discount: number;
  slug: string;
}

interface SlideProductDetailProps {
  products: Product[];
  product: Product;
}
const SlideProductDetail = ({ products, product }: SlideProductDetailProps) => {
  // const dispatch = useAppDispatch();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div className={cx("slider-container")}>
      <div className={cx("list-item")}>
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id}>
              <div className={cx("recommend-item")}>
                <div className={cx("recommend-category")}>
                  <div className={cx("recommend-item-wapper")}>
                    <div className={cx("box-info-top")}>
                      <div className={cx("recommend-item-img")}>
                        <img
                          src={`http://localhost:8080${product.images[0]}`}
                          alt=""
                        />
                      </div>
                      <div className={cx("recommend-item-name")}>
                        {product.name}
                      </div>
                    </div>
                    <button
                      className={cx(
                        "btn-select",
                        "button__handle-select-prod",
                        "button"
                      )}
                    >
                      Chọn sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div id="callToAction" className="is-flex">
        <div className="is-flex temp-price">
          <div className="is-flex">
            <strong>Tạm tính:</strong>
            <span className="total-price">
              {formatter.format(product.price * (1 - product.discount / 100))} đ
            </span>
          </div>
          <em>
            (Tiết kiệm{" "}
            {product.price - product.price * (1 - product.discount / 100)} đ)
          </em>
        </div>
        <div className="is-flex gap-10px">
          <button
            id="buyNow"
            className="button button__buy-combo"
            disabled={true}
          >
            <strong>MUA NGAY</strong>
          </button>
          <button
            className={cx("add-to-cart-button")}
            // onClick={() => {
            //   dispatch(
            //     addItemToCart({
            //       id: product._id,
            //       name: product.name,
            //       image: product.images[0],
            //       price: product.price * (1 - product.discount / 100),
            //       quantity: 1,
            //     })
            //   );
            // }}
          >
            <AddShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideProductDetail;
