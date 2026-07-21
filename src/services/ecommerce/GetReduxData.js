// reduxSelectors.js

import { useSelector } from 'react-redux';

// Selector function for cart items
export const GetCartItems = () => {
    return useSelector((state) => state.cart.items);
};

export const GetCustomerData = () => {
    return useSelector((state) => state.auth)
}

// You can add more selectors if you need other data from the Redux store
