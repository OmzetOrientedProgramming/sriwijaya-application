import React from 'react';
import Link from 'next/link';
import tw, { styled, css } from 'twin.macro';

import StarRating from '../Utils/StarRating';

interface BookingCardProps {
  placeId: number;
  image: string;
  placeName: string;
  totalPrice: number;
  rating: number;
  status: number;
  date: Date;
  startTime: Date;
  endTime: Date;
}

function moneySeparator(x : number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getStateCard(state: number, bookingRating: number, propsId: number){
  if (state === 2){
    return (
    <div tw="flex flex-row space-x-1">
      <BasicStateCard hexColor='#03BD36'>
        Terkonfirmasi
      </BasicStateCard>
    </div>
    )
  } else if (state === 3 && bookingRating > 0){
    return (
      <div tw="flex flex-row space-x-2 items-center">
        <BasicStateCard hexColor='#03BD36'>
          Selesai
          </BasicStateCard>
        <StarRating rating={bookingRating} type='black' size='16' />
      </div>
    )
  } else if (state === 3 && bookingRating === 0){
    return (
      <Link href={`/place/${propsId}`}>
        <BookingButton>
          Beri Penilaian
        </BookingButton>
      </Link>

    )
  } else if (state === 4){
    return (<BasicStateCard hexColor='#FE3131'>
      Gagal
    </BasicStateCard>)
  };
}

const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const BookingCard: React.FC<BookingCardProps> = (props) => {
  let fullDate: string = props.date.getDate() + " " + months[props.date.getMonth()] + " " + props.date.getFullYear();
  let fullStartTime: string = props.startTime.getHours() + ":" + (props.startTime.getMinutes() < 10 ? '0' : '') + props.startTime.getMinutes()
  let fullEndTime: string = props.endTime.getHours() + ":" + (props.endTime.getMinutes() < 10 ? '0' : '') + props.endTime.getMinutes()
  
  return (
    <StyledBookingCardContainer tw="shadow-md align-top">
      <div
      css={css`
      margin: 0 0.375rem 0 auto;
      width: 120px;
      height: 120px;
      border-radius: 0.625rem;
      background-image: url('/apple-touch-icon.png');
      background-size: 120px 120px;
      -webkit-box-shadow:inset 0px 0px 0px 2px #003366;
      -moz-box-shadow:inset 0px 0px 0px 2px #003366;
      box-shadow:inset 0px 0px 0px 2px #003366;
      `} />
      <div tw="flex flex-col justify-between leading-normal pt-1 pb-4 px-2">
        <div tw="mb-2">
          <div tw="mb-1">
            <p
              tw="text-[16px] overflow-visible leading-tight font-bold"
              css={css`
                word-wrap: break-word
              `}
            >
              {props.placeName}
            </p>
          </div>
          <div tw="flex flex-row space-x-1">
            <p
              tw="w-full text-[12px] leading-normal"
              css={css`
                word-wrap: break-word;
                margin-bottom: 0.25rem;
              `}
            >
              {fullDate} &nbsp;•&nbsp; {fullStartTime} - {fullEndTime}
            </p>
          </div>

          <div tw="flex flex-row space-x-1">
            <p
              tw="w-full text-[12px] leading-normal font-bold"
              css={css`
                word-wrap: break-word;
                margin-bottom: 0.5rem
              `}
            >
              {moneySeparator(props.totalPrice)}
            </p>
          </div>

          <div tw="flex flex-row space-x-1">
            {getStateCard(props.status, props.rating, props.placeId)}
          </div>
        </div>
      </div>
    </StyledBookingCardContainer>
  );
};

export default BookingCard;

const StyledBookingCardContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);
  margin: 0.75rem 1rem;
  align-items: top;
  padding: 0 0 0.5rem 0;
`;

interface StyledCardImageDivProps {
  src?: string;
}

const StyledCardImageDiv = styled.div<StyledCardImageDivProps>`
  margin: 0 0 0 auto;
  width: 120px;
  height: 120px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 0.625rem;
  text-align: right;
`;

interface BasicStateCardProps {
  hexColor?: string;
}

const BasicStateCard = styled.div<BasicStateCardProps>`
  word-wrap: break-word;
  padding: 0.125rem 0.75rem;
  border-radius: 0.625rem;
  outline-style:solid;
  outline-width:2px;
  color:${(props) => props.hexColor};
  font-size:0.75rem;
  font-weight: bold;
`;

interface BookingButtonProps {
  children: string;
}
  
const BookingButton: React.FC<BookingButtonProps> = ({
  children,
}) => {
  return (
    <div
      css={[
        css`
          box-shadow: 0px 3px 0px 0px #888888;
          border: 2px solid #003366;
          font-size: 12px;
          border-radius: 12px;
          padding: 2px 12px;
        `,
        tw`font-bold background[#003366] text-white disabled:(shadow-none background[#888888] border[2px solid #888888])`,
      ]}
    >
      {children}
    </div>
  );
};