
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage by default
import { combineReducers } from 'redux';

import categoryReducer from './slices/categorySlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import networkLevelReducer from './slices/networkLevelSlice';


// Combine reducers
const rootReducer = combineReducers({
    categories: categoryReducer,
    cart: cartReducer,
    auth: authReducer,
    networkLevel: networkLevelReducer
});

const persistedReducer = persistReducer({
    key: 'root',
    storage,
}, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // redux-persist uses non-serializable values internally
        }),
});

export const persistor = persistStore(store);
