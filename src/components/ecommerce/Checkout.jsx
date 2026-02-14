"use client";
import React, { useState } from "react";
import UserIcon from "@/components/icons/UserIcon";
import Login from "@/components/auth/Login";
import CustomerWelcome from "@/components/ecommerce/CustomerWelcome";
import TextInput from "@/components/ui/TextInput";
import OrderList from "@/components/ecommerce/OrderList";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { GetCartItems, GetCustomerData } from '@/services/ecommerce/GetReduxData';
import { clearCart } from "@/redux/store/slices/cartSlice";
import { useDispatch } from "react-redux";
import Image from 'next/image';
import config from '@/config';

export default function CheckoutPage() {
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [differentShipping, setDifferentShipping] = useState(false);
    const { token, customer } = GetCustomerData();
    const orderItems = GetCartItems();
    const dispatch = useDispatch();

    const router = useRouter();

    const [billingAddress,setBillingAddress] = useState({
        first_name: customer?.first_name,
        last_name: customer?.last_name,
        street: customer?.addresses?.street,
        city: customer?.addresses?.city,
        state: customer?.addresses?.state,
        zipCode: customer?.addresses?.zipCode,
        country: customer?.addresses?.country,
        phone: customer?.phone
    });

    const [shippingAddress,setShippingAddress] = useState({
        first_name: '',
        last_name: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    });

    const handleChangeShipping = (e) => {
        setDifferentShipping(e.target.checked);
    }

    const handleChangeBillingAddress = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setBillingAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChangeShippingAddress = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setShippingAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const [couponCode, setCouponCode] = useState('');

    const handleApplyCoupon = async () => {
        if (!couponCode) {
            alert("Please enter a coupon code!");
            return;
        }

        try {
            const response = await axios.post(`${config.apiBaseUrl}/apply-coupon`, {
                code: couponCode,
                customerId: customer?.id,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                alert(`Coupon applied! Discount: ${response.data.discount}%`);
                // optionally update order summary or redux state here
            } else {
                alert("Invalid or expired coupon code.");
            }
        } catch (error) {
            console.error("Coupon error:", error);
            alert("Failed to apply coupon.");
        }
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();  // Prevent default form submission

        try {
            if (!token) {
                alert("Please login first.");
                return;
            }

            const orderPayload = {
                customerId: customer.id,
                billingAddress: billingAddress,
                shippingAddress: differentShipping ? shippingAddress : null,
                orderItems,
                paymentMethod: "CASH_ON_DELIVERY"
            };

            const response = await axios.post(
                `${config.apiBaseUrl}/customer/order-submit`,
                orderPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 201) {
                alert("Order placed successfully!");
                dispatch(clearCart());
                console.log(response.data)
                router.push(`/order/success?orderId=${response.data.id}`);
            } else {
                alert("Failed to place order.");
            }
        } catch (error) {
            console.error("Order submission error:", error);
            alert("Something went wrong.");
        }
    };


    return (
        <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="lg:col-span-2 ">

                    <div className="flex flex-col">
                        <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                            <div className="loginBox w-full md:w-1/2 mb-5">
                                <div>
                                    <div className="text-xs flex">
                                        {
                                            !customer ? (
                                                <div className="flex">
                                                    <UserIcon className="w-6 h-6 text-gray-600" />
                                                    <span className="px-2">Already have an account?</span>
                                                    <a href="#" className="text-red-600"
                                                       onClick={() => setLoginOpen(!loginOpen)}> Click here to login</a>
                                                </div>
                                            ) : <><CustomerWelcome
                                                name={`${customer?.first_name} ${customer?.last_name == null ? customer?.last_name : ''}`}/></>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full md:w-1/2 md:justify-end mx-3">
                                <div className="xs:w-2/3">
                                    <input
                                        type="text"
                                        placeholder="Enter Coupon Code..."
                                        className="w-full py-3 border rounded-l text-xs px-2 focus:outline-none focus:shadow-outline"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end ">
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        className="bg-gray-800 text-white rounded-r-lg p-3 text-xs"
                                    >
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="loginFormToggleBox w-full lg:w-1/2">
                            {loginOpen && (
                                <Login/>
                            )}
                        </div>

                        <div className="mt-4 mx-2  ">
                            <form className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
                                <div className="flex flex-col">
                                    <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First Name</label>
                                    <input id="first-name" name="first-name" type="text" className="mt-1 p-2 border border-gray-300 rounded-md" required/>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input id="last-name" name="last-name" type="text" className="mt-1 p-2 border border-gray-300 rounded-md" required/>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                    <input id="email" name="email" type="email" className="mt-1 p-2 border border-gray-300 rounded-md" required/>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <input id="phone" name="phone" type="tel" className="mt-1 p-2 border border-gray-300 rounded-md" required/>
                                </div>

                                <div className="flex flex-col md:col-span-2">
                                    <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
                                    <textarea id="address" name="address" rows="4" className="mt-1 p-2 border border-gray-300 rounded-md" required></textarea>
                                </div>

                                {/*<div className="flex flex-col md:col-span-2">*/}
                                {/*    <div className="flex justify-end mt-4 w-full   ">*/}
                                {/*        <button type="submit" className="w-auto p-2 px-6 bg-blue-600 text-white rounded-md">*/}
                                {/*            Submit*/}
                                {/*        </button>*/}
                                {/*    </div>*/}
                                {/*</div>*/}


                            </form>
                        </div>
                        <div className="shippingBox mt-4">
                            {
                                differentShipping && (
                                    <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                                        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <TextInput placeholder="First name *" name="first_name"
                                                       value={shippingAddress?.first_name} required={true}
                                                       onChange={handleChangeShippingAddress}/>
                                            <TextInput placeholder="Last name " name="last_name"
                                                       value={billingAddress?.last_name} required={true}
                                                       onChange={handleChangeShippingAddress}/>
                                            <TextInput placeholder="House *" name="house" value={billingAddress?.house}
                                                       required={true} onChange={handleChangeShippingAddress}/>
                                            <TextInput placeholder="Street *" name="street" value={billingAddress?.street}
                                                       required={true} onChange={handleChangeShippingAddress}/>
                                            <TextInput placeholder="Area *" name="area" value={billingAddress?.area}
                                                       required={true} onChange={handleChangeShippingAddress}/>
                                            <TextInput placeholder="City *" name="city" value={billingAddress?.city}
                                                       required={true} onChange={handleChangeShippingAddress}/>
                                            <TextInput placeholder="State *" name="state" value={billingAddress?.state}
                                                       required={true} onChange={handleChangeShippingAddress}/>
                                            <TextInput placeholder="Zip Code *" name="zipCode"
                                                       value={billingAddress?.zipCode} required={true}
                                                       onChange={handleChangeShippingAddress}/>
                                            <TextInput placeholder="Country *" name="country"
                                                       value={billingAddress?.country} required={true}
                                                       onChange={handleChangeShippingAddress}/>
                                            <TextInput placeholder="Phone *" name="phone" value={billingAddress?.phone}
                                                       required={true} onChange={handleChangeShippingAddress}/>

                                            <textarea name="additinal_info" placeholder="Additional information"
                                                      className="col-span-2 border rounded-lg p-2 w-full" rows={4}
                                                      onChange={handleChangeShippingAddress}></textarea>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>

                <div className="rightBox">
                    <div className="flex flex-col">
                        <div className="orderBox">
                            <div className="bg-white p-6 rounded-2xl shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                                <div className="space-y-4">
                                    <OrderList/>
                                </div>
                            </div>
                        </div>
                        <div className="paymentBox">
                            {/* Payment Methods */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Payment</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="radio" name="payment" className="mr-2"/> Direct Bank Transfer
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="payment" className="mr-2"/> Cash on delivery
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="payment" className="mr-2"/> Online Gateway
                                    </label>
                                </div>
                                <div className="flex items-center space-x-3 mt-4">
                                    <Image className="h-24 w-24" src={`${config.publicPath}/images/payment_gatway/bkash.png`} alt="..." width={100} height={100} />
                                </div>
                                <button type="submit" className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                                    Place an Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}
