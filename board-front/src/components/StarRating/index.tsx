import React, { useState } from "react";
import "./style.css";

// 별점 컴포넌트
const StarRating = () => {
    const [rating, setRating] = useState(0);
  
    const handleStarClick = (index: number) => {
      setRating(index + 1);
    };
  
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            type="button"
            className={`star-rating__button ${index < rating ? "active" : ""}`}
            onClick={() => handleStarClick(index)}
            aria-label={`별 ${index + 1}개`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };
  
  

export default StarRating;
