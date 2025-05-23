import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
// Định nghĩa kiểu cho sản phẩm
interface CartItem {
  id: string;
  name: string;
  image: string;
  slug: string;
  price: number;
  priceThrought: number;
  quantity: number;
  category_id: string;
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
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem && existingItem.quantity >= 10) {
        alert('Số lượng sản phẩm tối đa là 10 - Bạn muốn đặt với số lượng lớn hơn vui lòng liên hệ với cửa hàng');
        return;
      }

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
    removeItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== existingItem.id);
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.totalQuantity -= existingItem.quantity;
      }
    },
    removeItemsToCart(state, action: PayloadAction<CartItem[]>) {
      const itemsToRemove = action.payload;

      state.items = state.items.filter((item) => !itemsToRemove.some((removeItem) => removeItem.id === item.id));

      state.totalQuantity -= itemsToRemove.reduce((total, currentItem) => total + currentItem.quantity, 0);

      state.totalPrice -= itemsToRemove.reduce(
        (total, currentItem) => total + currentItem.price * currentItem.quantity,
        0,
      );
    },
    increaseItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem && existingItem.quantity >= 10) {
        alert('Số lượng sản phẩm tối đa là 10 - Bạn muốn đặt với số lượng lớn hơn vui lòng liên hệ với cửa hàng');
        return;
      }

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
          if (confirm('Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không')) {
            state.items = state.items.filter((item) => item.id !== newItem.id);
          } else {
            existingItem.quantity += 1;
            state.totalPrice += newItem.price;
            state.totalQuantity += 1;
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
export const { addItemToCart, removeItemToCart, removeItemsToCart, increaseItemToCart, decreaseItemToCart } =
  cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
// Xuất reducer
export default cartSlice.reducer;
