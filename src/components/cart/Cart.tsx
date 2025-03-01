import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  decreaseItemToCart,
  increaseItemToCart,
  selectCart,
} from "../../redux/features/cart/cartSlice";
const cx = classNames.bind(styles);
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const carts = useAppSelector(selectCart); // Assuming 'items' is the array in the cart state
  const dispatch = useAppDispatch();

  const handleShowCart = () => {
    setShowCart(!showCart);
  };
  return (
    <div className={cx("cart")}>
      <div className={cx("cart__cta")} onClick={handleShowCart}>
        <IconButton>
          <ShoppingCartIcon fontSize="small" />
          <CartBadge
            badgeContent={carts.totalQuantity}
            color="primary"
            overlap="circular"
          />
        </IconButton>
      </div>
      {showCart && (
        <>
          {(carts.items.length > 0 && (
            <div className={cx("cart__dropdown")} onMouseLeave={handleShowCart}>
              <ul className={cx("wapper-dropdown")}>
                <div className={cx("cart__header")}>
                  <div className={cx("heading")}>Đơn hàng của tôi</div>
                  <div className={cx("view-all-orders-btn")}>Xem tất cả </div>
                </div>
                <div className={cx("cart__content")}>
                  {carts.items.map((cart) => (
                    <div className={cx("product__item")} key={cart.id}>
                      <a href="#!">
                        <img
                          src={`http://localhost:8080${cart.image}`}
                          alt=""
                          className={cx("product__thumb")}
                        />
                      </a>
                      <div className={cx("product__info")}>
                        <div className={cx("product__title")}>{cart.name}</div>
                        <div className={cx("product__category")}>
                          Prie white
                        </div>
                        <div className={cx("product__price")}>
                          {formatter.format(cart.price * cart.quantity)}đ
                        </div>
                      </div>
                      <div className={cx("quantity")}>
                        <div
                          className={cx("minus")}
                          onClick={() =>
                            dispatch(
                              decreaseItemToCart({
                                ...cart,
                                id: cart.id,
                              })
                            )
                          }
                        >
                          -
                        </div>
                        <div>{cart.quantity}</div>
                        <div
                          className={cx("plus")}
                          onClick={() =>
                            dispatch(
                              increaseItemToCart({
                                ...cart,
                                id: cart.id,
                              })
                            )
                          }
                        >
                          +
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cx("cart__footer")}>
                  <div className={cx("view-all-orders-btn")}>
                    Tổng tiền: {formatter.format(carts.totalPrice)}đ
                  </div>
                  <div className={cx("payload__all-btn")}>
                    Thanh toán tất cả
                  </div>
                </div>
              </ul>
            </div>
          )) || (
            <div className={cx("cart__dropdown")} onMouseLeave={handleShowCart}>
              <ul className={cx("wapper-dropdown")}>
                <div className={cx("cart__header")}>
                  <div className={cx("heading")}>Đơn hàng của tôi</div>
                </div>
                <div className={cx("cart__content")}>
                  <div className={cx("no-result")}>Chưa có sản phẩm nào</div>
                </div>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
