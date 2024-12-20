import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart({ cart }, { payload: newProduct }) {
      const exitsProduct = cart.find(
        (item) =>
          item.productId === newProduct.productId &&
          item.ice === newProduct.ice &&
          item.sugar === newProduct.sugar
      );

      if (!exitsProduct) {
        cart.push(newProduct);
      } else {
        exitsProduct.quantity += +newProduct.quantity;
      }
    },
    removeItemCart(state, { payload }) {
      state.cart = state.cart.filter((item) => item.id !== payload);
    },
    updateQuantity(state, { payload: listQuantity }) {
      listQuantity.forEach((cartItem) => {
        if (!cartItem.quantity) {
          state.cart = state.cart.filter((item) => item.id !== cartItem.id);
        } else {
          const currentProduct = state.cart.find(
            (item) => item.id === cartItem.id
          );
          currentProduct.quantity = cartItem.quantity;
        }
      });
    },
    finishOrder(state) {
      state.cart = [];
    },
  },
});

export const selectCart = (state) => state.cart.cart;
export const { addCart, removeItemCart, updateQuantity, finishOrder } =
  cartSlice.actions;
export default cartSlice.reducer;
