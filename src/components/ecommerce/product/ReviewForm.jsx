"use client";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import config from "@/config";
import axios from "axios";
import {GetCustomerData} from "@/services/ecommerce/GetReduxData";
import SuccessAlert from "@/components/ui/SuccessAlert";
import ErrorAlert from "@/components/ui/ErrorAlert";


const ReviewForm = ({product}) => {
    // Rating state
    const { token } = GetCustomerData();

    const [rating, setRating] = useState(0);
    // Form state
    const [comment, setComment] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (!rating) {
            setError("Please select a star rating.");
            return;
        }
        if (!comment.trim()) {
            setError("Review comment are required.");
            return;
        }

        try {
            setSubmitting(true);

            const res = await axios.post(
                `${config.apiBaseUrl}/customer/review`,
                {
                    rating,
                    comment,
                    productId: product.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!res.status === 201) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || `Request failed (${res.status})`);
            }

            setMessage("Thanks! Your review has been submitted.");
            // Optional: clear the form
            setRating(0);
            setComment("");
        } catch (err) {
            setError(err?.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a Review</h2>

            {/* Rating Stars */}
            <div className="flex items-center mb-4">
                <div className="flex space-x-1" aria-label="Select rating out of 5 stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className="p-0.5"
                            aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        >
                            <StarIcon
                                className={`h-6 w-6 cursor-pointer ${
                                    star <= rating ? "text-yellow-500" : "text-gray-300"
                                }`}
                            />
                        </button>
                    ))}
                </div>
                {rating > 0 && (
                    <span className="ml-3 text-sm text-gray-600">{rating} / 5</span>
                )}
            </div>

            {message && (
               <SuccessAlert message={message} />
            )}
            {error && (
                <ErrorAlert error={error}/>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={onSubmit}>
        <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            rows={4}
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
        />
                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-3 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                        submitting ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                    {submitting ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;