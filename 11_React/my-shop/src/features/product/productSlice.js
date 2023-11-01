import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  selectedProduct: null,
};

// 상품 정보를 담을 slice 만들기
const prodcutSlice = createSlice({
  name: 'product',
  initialState ,
  reducers: {
    getAllProduct: (state, action) => {
      state.productList = action.payload;
    },
    getSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  }
});

// 액션 생성 함수
export const { getAllProduct, getSelectedProduct } = prodcutSlice.actions;

// 선택자 함수
export const selectedProductList = (state) => state.product.productList;
export const selectselectedProduct = (state) => state.product.selectedProduct;

export default prodcutSlice.reducer;