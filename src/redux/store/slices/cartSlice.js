import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState:  {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                // If the product exists, increase its quantity
                existingItem.quantity += 1;
            } else {
                // If the product doesn't exist, add it to the cart
                state.items.push(action.payload);
            }
        },
        updateItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
});

export const { addToCart, removeFromCart, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
