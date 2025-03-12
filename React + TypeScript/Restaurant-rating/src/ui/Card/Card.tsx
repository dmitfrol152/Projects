import { RestaurantProps } from "./types";
import "./styles.css";
import { Stars } from "../Stars/Stars";

export const Card = ({ id, name, description, rating, url, onRatingChange }: RestaurantProps) => {
  return (
    <div className="card">
      <img className="card__img" src={url} alt="Изображение ресторана" />
      <h2 className="card__name">{name}</h2>
      <p className="card__description">{description}</p>
      <Stars restId={id} ratingData={rating} onRatingChange={onRatingChange} />
    </div>
  );
};
