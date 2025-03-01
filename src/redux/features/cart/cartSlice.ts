import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
// Định nghĩa kiểu cho sản phẩm
interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// Định nghĩa kiểu cho trạng thái giỏ hàng
interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}

// Trạng thái ban đầu
const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity,
        });
      }

      state.totalPrice += newItem.price;
      state.totalQuantity += newItem.quantity;
    },
    increaseItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      }

      state.totalPrice += newItem.price;
      state.totalQuantity += 1;
    },
    decreaseItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          if (confirm("Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không")) {
            state.items = state.items.filter((item) => item.id !== newItem.id);
          } else {
            existingItem.quantity += 1;
          }
        }
        state.totalPrice -= newItem.price;
        state.totalQuantity -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
// Xuất các action
export const { addItemToCart, increaseItemToCart, decreaseItemToCart } =
  cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
// Xuất reducer
export default cartSlice.reducer;
