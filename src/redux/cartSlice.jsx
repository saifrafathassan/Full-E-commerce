import { createSlice } from '@reduxjs/toolkit'
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add to cart function
        addToCart(state, action) {
            const newItem = {
                ...action.payload,
                uniqueId: Date.now() + Math.random() 
            };
            state.push(newItem);
        },
        // delete from cart function
        deleteFromCart(state, action) {
            return state.filter(item => item.uniqueId !== action.payload.uniqueId);
        }
    }
})

export const { addToCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer;
