import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData:[],
    userInfo:null,

};

export const shopperSlice = createSlice({
    name: "shopper",
    initialState,
    reducers:{
        addToCart:( state, action) =>{
            state.productData = action.payload;

        },
    }
});

export const {addToCart} = shopperSlice.actions;
export default shopperSlice.reducer;