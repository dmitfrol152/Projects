export interface StarsProps {
  restId: string;
  ratingData: number;
  onRatingChange: (id: string, rating: number) => void;
}
