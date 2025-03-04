import { useEffect, useState } from "react";
import reviewMethods from "../../services/reviews";
import { Rating } from "@mui/material";
interface PropsProductRating {
  currentProduct: string;
}

interface Review {
  _id: string;
  rating: number;
}

const RatingByProduct = ({ currentProduct }: PropsProductRating) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { status, data } = await reviewMethods.getReviewsByProduct(
          currentProduct
        );

        if (status) {
          setReviews(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, []);

  const caclReview = (reviews: Review[]): number => {
    const lengthReview = reviews.length;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / lengthReview;
  };
  return (
    <>
      {(reviews.length > 0 && (
        <Rating
          name="half-rating-read"
          precision={0.5}
          value={parseFloat(caclReview(reviews).toFixed(0))}
          readOnly
        />
      )) || <div></div>}
    </>
  );
};

export default RatingByProduct;
