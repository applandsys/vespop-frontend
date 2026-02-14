import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '@/config';
// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { signal }) => {
        const res = await fetch(`${config.apiBaseUrl}/product/categories`, { signal });
        return await res.json();
    },
    {
        condition: (_, { getState }) => {
            // Always allow fetch; skip condition check to force every time
            return true;
        },
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
