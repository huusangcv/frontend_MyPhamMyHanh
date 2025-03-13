import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Lưu trữ trên localStorage
import { combineReducers } from "redux";
import cartReducer from "./features/cart/cartSlice";
import categoryReducer from "./features/category/categorySlice";
import modalAccountReducer from "./features/isShowAccountModal/isShowAccountModalSlice";
import profileReducer from "./features/profile/profileSlice";

// Cấu hình persist
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["profile"], // Chỉ lưu profile
};

// Kết hợp tất cả các reducer
const rootReducer = combineReducers({
  cart: cartReducer,
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
