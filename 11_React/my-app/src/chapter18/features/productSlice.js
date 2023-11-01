import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: []
};


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToProductList: (state, aciton) => {
      state.productList.push(aciton.payload);
    }
  }
});


export const { addToProductList } = productSlice.actions;

export default productSlice.reducer;