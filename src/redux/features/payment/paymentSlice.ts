import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
// Định nghĩa kiểu cho sản phẩm
interface PaymentItem {
  id: string;
  name: string;
  image: string;
  slug: string;
  price: number;
  priceThrought: number;
  quantity: number;
}

// Định nghĩa kiểu cho trạng thái giỏ hàng
interface PaymentState {
  items: PaymentItem[];
  totalPrice: number;
  totalQuantity: number;
}

// Trạng thái ban đầu
const initialState: PaymentState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const PaymentSlice = createSlice({
  name: "Payment",
  initialState,
  reducers: {
    addItemToPayment(state, action: PayloadAction<PaymentItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity,
        });
        state.totalPrice += newItem.price * newItem.quantity;
        state.totalQuantity += newItem.quantity;
      }
    },
    addAllItemsToPayment(state, action: PayloadAction<PaymentItem[]>) {
      state.items = action.payload;
      state.totalPrice = action.payload.reduce(
        (total, current) => total + current.price * current.quantity,
        0
      );
      state.totalQuantity = action.payload.reduce(
        (total, current) => total + current.quantity,
        0
      );
    },
    removeItemToPayment(state, action: PayloadAction<PaymentItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== existingItem.id);
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.totalQuantity -= existingItem.quantity;
      }
    },
    removeItemsToPayment(state, action: PayloadAction<PaymentItem[]>) {
      const itemsToRemove = action.payload;

      state.items = state.items.filter(
        (item) => !itemsToRemove.some((removeItem) => removeItem.id === item.id)
      );

      state.totalQuantity -= itemsToRemove.reduce(
        (total, currentItem) => total + currentItem.quantity,
        0
      );

      state.totalPrice -= itemsToRemove.reduce(
        (total, currentItem) => total + currentItem.price,
        0
      );
    },
    increaseItemToPayment(state, action: PayloadAction<PaymentItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      }

      state.totalPrice += newItem.price;
      state.totalQuantity += 1;
    },
    decreaseItemToPayment(state, action: PayloadAction<PaymentItem>) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          if (confirm("Bạn có muốn xoá sản phẩm này khỏi giỏ hàng không")) {
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
export const {
  addItemToPayment,
  addAllItemsToPayment,
  removeItemToPayment,
  removeItemsToPayment,
  increaseItemToPayment,
  decreaseItemToPayment,
} = PaymentSlice.actions;
export const selectPayment = (state: RootState) => state.payment;
// Xuất reducer
export default PaymentSlice.reducer;
