import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ProductReviews = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rafi Ahmed",
      rating: 5,
      comment: "Excellent quality! Works perfectly and packaging was great.",
      date: "October 15, 2025"
    },
    {
      id: 2,
      name: "Taslima Sultana",
      rating: 4,
      comment: "Good product, value for money. Delivery was fast too.",
      date: "October 18, 2025"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment || !rating) return;

    const newReview = {
      id: Date.now(),
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };
    setReviews([newReview, ...reviews]);
    setName('');
    setComment('');
    setRating(0);
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Product Reviews
      </h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
        />

        {/* Comment Input */}
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
          rows="3"
        />

        {/* Star Rating */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={ratingValue}
                size={22}
                className={`cursor-pointer transition-colors ${
                  ratingValue <= (hover || rating)
                    ? 'text-yellow-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </div>

        {/* Post Button */}
        <button
          type="submit"
          className="py-2 cursor-pointer outline-0 btn-primary bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm px-5"
        >
          Post Review
        </button>
      </form>

      {/* Divider */}
      <div className="divider my-6"></div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                {review.name}
              </h4>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={16}
                    className={i < review.rating ? "text-yellow-400" : "text-gray-400"}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{review.comment}</p>
            <p className="text-xs text-gray-500 mt-1">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
