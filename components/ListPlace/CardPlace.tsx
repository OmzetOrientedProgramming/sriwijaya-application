import React from 'react';
import Link from 'next/link';
import { styled, css } from 'twin.macro';

import StarRating from '../Utils/StarRating';

interface CardPlaceProps {
  id: number;
  image: string;
  name: string;
  description: string;
  address: string;
  distance: number;
  rating: number;
  review_count: number;
}

const CardPlace: React.FC<CardPlaceProps> = (props) => {
  return (
    <Link href={`/place/${props.id}`}>
      <StyledCardPlaceContainer tw="shadow-md">
        <StyledCardImageDiv src={props.image} />
        <div tw="px-2 py-2 flex flex-col justify-between leading-normal ">
          <div tw="mb-2">
            <div tw="mb-1">
              <p
                tw="text-[20px] leading-tight overflow-hidden font-bold"
                css={css`
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                {props.name}
              </p>
            </div>
            <p
              tw="text-[12px] text-base overflow-hidden leading-normal"
              css={css`
                text-overflow: ellipsis;
                white-space: nowrap;
              `}
            >
              {props.description}
            </p>

            <div tw="my-1 border-b-2 border-black"></div>

            <div tw="flex flex-row space-x-1">
              <p
                tw="w-2/3 overflow-hidden text-[12px] text-base leading-normal"
                css={css`
                  text-overflow: ellipsis;
                  white-space: nowrap;
                `}
              >
                {props.address}
              </p>
              <p> ·</p>
              <p tw="w-1/3 text-[12px] text-base leading-normal">
                {props.distance} Km
              </p>
            </div>

            <div tw="flex flex-row space-x-1 justify-center items-center">
              <div tw="w-1/2">
                <StarRating rating={props.rating} type={'golden'} size={'17'} />
              </div>
              <p tw="w-1/2 text-[12px] text-base leading-normal">
                {props.review_count} Reviews
              </p>
            </div>
          </div>
        </div>
      </StyledCardPlaceContainer>
    </Link>
  );
};

export default CardPlace;

const StyledCardPlaceContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);
  margin: 0.75rem 1rem;
  border-radius: 0.6rem;
  overflow: hidden;
  align-items: center;
`;

interface StyledCardImageDivProps {
  src?: string;
}

const StyledCardImageDiv = styled.div<StyledCardImageDivProps>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: 50% 50%;
`;
