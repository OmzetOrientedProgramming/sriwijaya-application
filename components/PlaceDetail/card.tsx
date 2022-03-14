import React from 'react';
import 'twin.macro';
import StarRating from '../Utils/StarRating';

interface CardProps {
  title: string;
  distance: number;
  address: string;
  openHour: string;
  closeHour: string;
  rating: number;
}

const Card: React.FC<CardProps> = ({
  title,
  distance,
  address,
  openHour,
  closeHour,
  rating,
}) => {
  return (
    <div tw="text-left">
      <div tw="text-xl capitalize mb-0 font-bold">{title}</div>
      <div tw="text-base mt-1 mb-0">
        <p tw="font-bold opacity-50">{distance} km</p>
      </div>
      <div tw="flex items-center capitalize mt-3 mb-0">
        <img tw="h-5 mr-2" src="/images/PlaceDetail/Pin.svg" />
        <p tw="text-xs">{address}</p>
      </div>
      <div tw="mt-1 mb-0 flex items-center">
        <img tw="h-4 mr-2" src="/images/PlaceDetail/error-alert-filled.svg" />
        <p tw="text-xs ">
          Jam Buka: {openHour} - {closeHour}{' '}
        </p>
      </div>
      <div tw="mt-3">
        <StarRating rating={rating} type={'golden'} size={'30'} />
      </div>
    </div>
  );
};

export default Card;
