import { Review } from '@/app/types/review';
import css from './Review.module.css';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Icon } from '@/app/components/Icon/Icon';

interface ReviewProps {
  review: Review;
}

export const ReviewItem = ({ review }: ReviewProps) => {
  const timeAgo = formatDistanceToNow(new Date(review.createdAt), {
    addSuffix: true,
  });
  return (
    <li className={css.reviewItem}>
      <div className={css.userInfo}>
        <div className={css.userWrap}>
          <Image
            src={review.avatar}
            alt="user-avatar"
            width={44}
            height={44}
            className={css.userAvatar}
          />

          <div className={css.nameTimeWrapper}>
            <p className={css.userName}>{review.name}</p>
            <p className={css.time}>{timeAgo}</p>
          </div>
        </div>

        <div className={css.ratingWrapper}>
            <div className={css.mobileRating}>
          <Icon name="icon-stars" width={16} height={16} className={css.activeStar}/>
          <span className={css.rating}>{review.rating}</span>
          </div>

            <div className={css.tabletRating}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Icon
        key={index}
        name="icon-stars"
        width={16} height={16}
        className={
          index < review.rating
            ? css.activeStar
            : css.inactiveStar
        }
      />
      
    ))}
    <span className={css.rating}>{review.rating}</span>
  </div>
        </div>
      </div>
      <p className={css.reviewText}>{review.text}</p>
    </li>
  );
};
