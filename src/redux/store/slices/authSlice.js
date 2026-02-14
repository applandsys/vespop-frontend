
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    customer: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginData: (state, action) => {
            state.token = action.payload.token;
            state.customer = action.payload.customer;
        },
        clearLoginData: (state) => {
            state.token = null;
            state.customer = null;
        },
    },
});

export const { setLoginData, clearLoginData } = authSlice.actions;

export default authSlice.reducer;
