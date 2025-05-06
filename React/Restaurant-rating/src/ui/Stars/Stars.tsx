import StarIcon from "/src/assets/star.svg?react";
import "./styles.css";
import { FC, useState } from "react";
import { StarsProps } from "./types";

export const Stars: FC<StarsProps> = ({restId, ratingData, onRatingChange}) => {
  const [rating, setRating] = useState<number | null>(ratingData);
  const [hover, setHover] = useState<number | null>(null);
  
  const stars = [...Array(5)];

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRatingChange(restId, newRating);
  };

  return (
    <div className="stars">
      {stars.map((_star, index) => {

        const currentRating = index + 1

        return (
          <label key={index}>
            <input 
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => handleRatingChange(currentRating)}
            />
            <StarIcon
              className="stars__icon"
              fill={currentRating <= (rating || hover || 0) ? '#f73f1a' : 'none'}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
    </div>
  );
};
