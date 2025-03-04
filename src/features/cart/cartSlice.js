import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  cartItem: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // 既にカートに同じ商品が存在するかチェック
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        // 存在すれば数量を増やす
        existingItem.quantity += 1;
      } else {
        // 存在しなければ新しくカートに追加
        state.cartItems.push({ ...item, quantity: 1 });
      }
      state.total += item.price; // 合計金額の更新
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        state.total -= item.price * item.quantity; // 合計金額の減算
        state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, action: quantityAction } = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        if (quantityAction === "increase") {
          item.quantity += 1;
          state.total += item.price; // 合計金額を増やす
        } else if (quantityAction === "decrease" && item.quantity > 1) {
          item.quantity -= 1;
          state.total -= item.price; // 合計金額を減らす
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
