import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";

const store = configureStore({
    reducer:{
        userState:userReducer,
        productState:productReducer,
    }
});

export default store;