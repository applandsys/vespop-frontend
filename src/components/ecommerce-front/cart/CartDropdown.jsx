import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from "@/redux/store/slices/cartSlice";
import Link from "next/link";
import OrderList from "@/components/ecommerce-front/cart/OrderList";

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
                            className="text-sm text-gray-600 rounded px-4 py-2 hover:bg-yellow-500 hover:text-white border border-gray-600 text-center"
                        >
                            View Cart
                        </Link>
                        <Link
                            href="/checkout"
                            onClick={handleLinkClick}
                            className="text-sm bg-gray-800 text-white rounded px-4 py-2 hover:bg-black text-center"
                        >
                            Checkout
                        </Link>
                    </div>
                </>
            )}
        </>
    );
}