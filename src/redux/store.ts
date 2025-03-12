import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import categoryReducer from "./features/category/categorySlice";
import modalAccountReducer from "./features/isShowAccountModal/isShowAccountModalSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    modalAccount: modalAccountReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
