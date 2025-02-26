import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/features/cart/cartSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;