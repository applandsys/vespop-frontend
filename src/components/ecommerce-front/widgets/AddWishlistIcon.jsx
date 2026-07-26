import React from 'react';
import axios from "axios";
import config from "@/config";
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";

const AddWishlistIcon = ({product}) => {
    const { token } = GetCustomerData();
    const payload = {
        productId: product.id,
    };

    const addToWishlist = async () =>{
        const response = await axios.post(
            `${config.apiBaseUrl}/customer/add-wishlist`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response);
    }

    return (
        <>
            <button className=" rounded-md px-2 py-1 hover:bg-gray-100  border border-gray-400" onClick={addToWishlist}>♡</button>
        </>
    );
};

export default AddWishlistIcon;