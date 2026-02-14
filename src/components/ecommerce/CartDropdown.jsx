import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from "@/redux/store/slices/cartSlice";
import Link from "next/link";
import OrderList from "@/components/ecommerce/OrderList";

export default function CartDropdown({ onClose }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleLinkClick = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
                <>
                    <OrderList />
                    <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                        <Link
                            href="/cart"
                            onClick={handleLinkClick}
                            className="text-sm text-green-500 rounded px-4 py-2 hover:bg-yellow-500 hover:text-white border border-green-500 text-center"
                        >
                            View Cart
                        </Link>
                        <Link
                            href="/checkout"
                            onClick={handleLinkClick}
                            className="text-sm bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 text-center"
                        >
                            Checkout
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}