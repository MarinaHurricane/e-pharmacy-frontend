import { Review } from '@/app/types/review';
import css from './ReviewList.module.css';
import { ReviewItem } from '../Review/Review';

interface ReviewsListProps {
    reviews: Review[];
}

export const ReviewsList = ({reviews}: ReviewsListProps) => {
    return (
        <ul className={css.reviewsList}>
            {reviews.map(review => <ReviewItem key={review.id} review={review}/>)}
        </ul>
    )
}