"use client";

import React, {useEffect, useState} from 'react';
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";
import CommonCard from "@/components/ui/CommonCard";
import UserOrders from "@/components/user/UserOrders";
import {getUserOrders} from "@/services/user/GetUserOrder";

export default  function UserOrdersPage(props) {

    const {token, customer} = GetCustomerData();

    const [allOrder, setAllOrder] = useState([]);

    useEffect(() => {
         getUserOrders(token).then((res) => {setAllOrder(res)}).catch((err) => {});
    }, []);


    return (
        <>
            <div className="mx-4">
                <CommonCard title="My Orders">
                    <div className="w-full ">
                        <UserOrders orderList={allOrder}/>
                    </div>
                </CommonCard>
            </div>
        </>
    );
}
