"use client";

import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
import config from "@/config";
import {fetchCourier} from "@/services/ecommerce/FetchCourier";
import { useSearchParams } from "next/navigation";
import CourierDeliveryForm from "@/components/admin/ecommerce/order/CourierDeliveryForm";

export default function CourierDeliveryPage() {

    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [courierList, setCourierList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [courierOrder, setCourierOrder] = useState({});

    useEffect(() => {
        fetchCourier().then(res => setCourierList(res));
    }, []);


    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-100 p-4 rounded-md">
                <h2 className="text-xl font-bold mb-6">
                    Courier Delivery - Order # {orderId}
                </h2>
                <CourierDeliveryForm courierList={courierList} orderId={orderId} setCourierOrder={setCourierOrder}/>
            </div>
            <div className="flex flex-col gap-2">
                <div className="bg-green-100 rounded-md p-4">Order Detail </div>
                <div className="bg-green-100 rounded-md p-4">Courier Detail
                    {JSON.stringify(courierOrder)}
                </div>
            </div>
        </div>
    );
}