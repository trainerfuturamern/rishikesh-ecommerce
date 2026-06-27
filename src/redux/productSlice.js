import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: JSON.parse(localStorage.getItem("products")) || [],
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
}

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            localStorage.setItem("products", JSON.stringify(state.products));

        },
        editProduct: (state, action) => {

            console.log("action.payload ------->", action.payload);
            

            const productIndex = state.products.findIndex((pr) => pr.id === action.payload.id);
            if (productIndex !== -1) {
                state.products[productIndex] = action.payload;
                localStorage.setItem("products", JSON.stringify(state.products));
            }
            
            const cartItemIndex = state.cartItems.findIndex((pr) => pr.id === action.payload.id);
            
            if (cartItemIndex !== -1) {
                
                const cartItemQuantity = state.cartItems[cartItemIndex].quantity;

                console.log("cartItemQuantity------------>",cartItemQuantity);
                

                state.cartItems[cartItemIndex] = { ...action.payload, quantity: cartItemQuantity };
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            }
        },
        deleteProduct: (state, action) => {
            const productIndex = state.products.findIndex((pr) => pr.id === action.payload);  //deleteProduct(2)
            if (productIndex !== -1) {
                state.products.splice(productIndex, 1);
                localStorage.setItem("products", JSON.stringify(state.products));
            }
        },
        addCartItem: (state, action) => { // {id:1,productName:"dsd", }  //addCartItem({id:1,prodeuctName:''})

            const cartItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (cartItemIndex === -1) {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            } else {
                state.cartItems[cartItemIndex].quantity++;
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
        cartItemQuantityIncrement: (state, action) => { // {id:1,productName:"dsd", }  //addCartItem({id:1,prodeuctName:''})

            const cartItemIndex = state.cartItems.findIndex((item) => item.id === action.payload);

            if (cartItemIndex !== -1) {
                state.cartItems[cartItemIndex].quantity++;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            }


        },
        cartItemQuantityDecrement: (state, action) => { // {id:1,productName:"dsd", }  //addCartItem({id:1,prodeuctName:''})

            const cartItemIndex = state.cartItems.findIndex((item) => item.id === action.payload);

            if (cartItemIndex !== -1) {
                state.cartItems[cartItemIndex].quantity--;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            }


        },
    }

});

export const { addProduct, editProduct, deleteProduct, addCartItem,
    cartItemQuantityIncrement,
    cartItemQuantityDecrement
} = productSlice.actions;
export default productSlice.reducer;