import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Lưu trữ trên localStorage
import { combineReducers } from "redux";
import cartReducer from "./features/cart/cartSlice";
import categoryReducer from "./features/category/categorySlice";
import modalAccountReducer from "./features/isShowAccountModal/isShowAccountModalSlice";
import profileReducer from "./features/profile/profileSlice";
import paymentReducer from "./features/payment/paymentSlice";
interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// Cấu hình persist
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["cart", "payment", "profile"], // Chỉ lưu profile
};

// Kết hợp tất cả các reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  payment: paymentReducer,
  category: categoryReducer,
  modalAccount: modalAccountReducer,
  profile: profileReducer,
});

// Kết hợp persist với rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
  reducer: persistedReducer,
});

// Tạo persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState> & {
  profile: {
    _id: string;
    name: string;
    image: string;
    username: string;
    roles: string;
    segment_ids: string[];
  };
  cart: {
    items: CartItem[];
    totalPrice: number;
    totalQuantity: number;
  };
};
export type AppDispatch = typeof store.dispatch;
