export interface RestaurantProps {
  id: string;
  name: string;
  description: string;
  rating: number;
  url: string;
  onRatingChange: (id: string, rating: number) => void
}