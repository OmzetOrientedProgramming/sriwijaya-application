import React from 'react';
import 'twin.macro';
import StarRating from '../Utils/StarRating';

interface ReviewCardProps {
  name: string;
  rating: number;
  content: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, content }) => {
  return (
    <div tw="text-left">
      <div tw="flex flex-row items-center">
        <div tw="text-base capitalize pb-1 font-semibold">{name}</div>
        <div tw="ml-3">
          <StarRating rating={rating} type={'black'} size={'14'} />
        </div>
      </div>

      <div tw="text-xs">{content}</div>
    </div>
  );
};

export default ReviewCard;
