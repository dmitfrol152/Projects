import { useState } from "react";
import { useRestaurantsList } from "../../hooks/useRestaurantsList";
import { Card } from "../../ui/Card/Card";
import { TextField } from "../../ui/TextField/TextField";
import "./styles.css";
import { useUpdateRating } from "../../hooks/useUpdateRating";

export const RestaurantsList = () => {
  const [textSearch, setTextSearch] = useState("");
 
  // ** Query & Mutation

  const { data, isLoading, isError, refetch } = useRestaurantsList();
  const mutationRating = useUpdateRating();

  if (isLoading) {
    return (
      <div className="restaurant__loading">
        <p className="restaurant__loading-description">Пожалуйста, подождите</p>
        <p className="restaurant__loading-description">
          Доступные рестораны прогружаются
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="restaurant__error">
        <button onClick={() => refetch()}>Повторить запрос</button>
      </div>
    );
  }

  // ** Query filtred

  const filtredResturants = data?.filter((restaursnt) => {
    return restaursnt.name
      .toLocaleLowerCase()
      .includes(textSearch.toLocaleLowerCase());
  });

  // ** Mutation

  const handleRatingChange = (restId: string, restNewRating: number) => {
    mutationRating.mutate({id: restId, rating: restNewRating});
  };

  return (
    <section className="restaurant">
      <form>
        <TextField
          type="search"
          value={textSearch}
          placeholder="Search for restaurants"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTextSearch(e?.target?.value)
          }
        />
      </form>
      <ul className="restaurant__list">
        {filtredResturants?.map((restaurant) => (
          <li key={restaurant.id}>
            <Card
              id={restaurant.id}
              name={restaurant.name}
              description={restaurant.description}
              rating={restaurant.rating}
              url={restaurant.url}
              onRatingChange={handleRatingChange}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
