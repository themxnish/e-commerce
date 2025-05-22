import React, { useState, useEffect, useContext } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { ShopContext } from "../context/Shop";
import Title from "./Title";

const CustomerReviews = () => {
  const { reviews: contextReviews } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (contextReviews && contextReviews.length > 0) {
      setReviews(contextReviews.slice(0, 4));
    }
  }, [contextReviews]); 

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Customer"} text2={"Reviews"} />
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl text-center shadow-md w-75 h-56 flex flex-col justify-between">
              <FaQuoteLeft className="text-gray-500 text-3xl mx-auto hover:rotate-25 transition-all duration-200"/>
              <p className="text-gray-700 italic flex-grow flex items-center justify-center">"{review.comment}"</p>
              <div>
                <div className="flex justify-center my-2">
                  {Array(review.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-lg" />
                    ))}
                </div>
                <h4 className="text-gray-800 font-semibold">{review.name}</h4>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-xl font-semibold text-center">No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;
