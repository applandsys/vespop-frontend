import { useEffect, useState } from "react";
import { fetchProductReviews } from "@/services/ecommerce/fetchReviews";
import ReviewForm from "@/components/ecommerce/product/ReviewForm";

export default function CustomerReviews({ product }) {
    const [productReviews, setProductReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ratingPercentages, setRatingPercentages] = useState([0, 0, 0, 0, 0]);

    // Fetch reviews when the component is mounted
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviews = await fetchProductReviews(product.id);
                setProductReviews(reviews);

                // Calculate the rating percentages
                const ratingCounts = [0, 0, 0, 0, 0]; // index 0 for 1 star, 1 for 2 stars, etc.
                reviews.forEach((review) => {
                    if (review.rating >= 1 && review.rating <= 5) {
                        ratingCounts[review.rating - 1]++;
                    }
                });

                const totalReviews = reviews.length;
                const percentages = ratingCounts.map(count => (count / totalReviews) * 100);
                setRatingPercentages(percentages);

            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [product.id]);

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-6">
            {loading ? (
                <p>Loading reviews...</p>
            ) : (
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-4">Customer questions & answers</h3>
                    <div className="space-y-6">
                        {productReviews.map((review, idx) => (
                            <div key={idx} className="flex gap-4 bg-white shadow rounded-xl p-4">
                                <img
                                    src="/images/user.png"
                                    alt={`${review.customer.first_name} ${review.customer.last_name}`}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <div className="text-sm text-gray-500">{review.createdAt}</div>
                                    <div className="mt-1 text-gray-700">{review.review}</div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-green-600 font-semibold">{review.name}</span>
                                        <div className="flex text-yellow-400">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <svg
                                                    key={i}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill={i < review.rating ? 'currentColor' : 'none'}
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    className="w-4 h-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1}
                                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.387 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.387-2.46a1 1 0 00-1.176 0l-3.387 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z"
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ReviewForm product={product} />
                </div>
            )}

            <div className="w-full lg:w-80">
                <h3 className="text-lg font-semibold mb-2">Customer reviews</h3>
                <p className="text-2xl font-bold text-gray-800 mb-4">
                    {(
                        (ratingPercentages[4] * 5 + ratingPercentages[3] * 4 + ratingPercentages[2] * 3 + ratingPercentages[1] * 2 + ratingPercentages[0] * 1) /
                        (ratingPercentages.reduce((acc, val) => acc + val, 0))
                    ).toFixed(1)} out of 5
                </p>
                <div className="space-y-2">
                    {ratingPercentages.map((percent, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-12 text-sm text-gray-600">{i + 1} star</span>
                            <div className="w-full h-3 bg-gray-200 rounded">
                                <div
                                    className="h-3 bg-green-500 rounded"
                                    style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-gray-500 mt-3 underline cursor-pointer">
                    How are ratings calculated?
                </p>
            </div>
        </div>
    );
}
