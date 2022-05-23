import React from 'react';
import Link from 'next/link';
import tw, { styled, css } from 'twin.macro';
import Rating from 'react-rating';
import Button from '../../Utils/Button';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { QueryClient, useQueryClient } from 'react-query';
import  Router  from 'next/router';
import { postBookingReview } from '../../../apis/services/bookingReviewService';
import { number } from 'prop-types';


interface BookingReviewCardProps {
  bookingId: number;
  placeImage: string;
  placeName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

function formatDate(date: string) {
  let day = date.slice(8, 10);
  let month: string;
  if (date[5] === '0') {
    month = months[parseInt(date[6]) - 1];
  } else {
    month = months[parseInt(date.slice(5, 7)) - 1];
  }
  let year = date.slice(0, 4);

  return day + ' ' + month + ' ' + year;
}

function formatHour(hour: string) {
  let hourOfHour = hour.slice(11, 13);
  let minuteOfHour = hour.slice(14, 16);

  return hourOfHour + ':' + minuteOfHour;
}

function moneySeparator(amount: number) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

interface Payload {
  booking_id: number;
  rating: number;
  content: string;
} 

const BookingReviewCard: React.FC<BookingReviewCardProps> = (props) => {
  const [count, setCount] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const { register, handleSubmit, formState:{ errors }, setValue } = useForm<Payload>({
    mode: 'onChange',
  });

  const queryClient = useQueryClient();

  var booking_id: number = +props.bookingId;

  const onSubmit = async (data: any) => {
    try{
      data = {
        ...data, booking_id: booking_id
      };
      const response = await postBookingReview(data);
      queryClient.invalidateQueries('get_booking_detail');
      toast.success(response.data.message);
      Router.push("/booking-saya");
    }
    catch (error: any) {
      if (!error?.response?.data?.errors) {
        toast.error('Internal server error.');
        return;
      }
      error.response.data.errors.forEach((message: string) =>
        toast.error(message)
      );
    }

  }
  
  return (
    <div tw="flex flex-col items-start justify-center w-full">
      <StyledCardImageDiv src={props.placeImage}/>
      <div css={css`padding: 1rem 1.5rem 1.25rem;`} tw="w-full">
        <p
          tw="text-[24px] overflow-visible leading-tight font-bold"
          css={css`word-wrap: break-word;`}
        >
          {props.placeName}
        </p>
        <p
          tw="w-full text-[16px] leading-normal"
          css={css`word-wrap: break-word; margin-top: 0.5rem;`}
        >
          {formatDate(props.date)} &nbsp;•&nbsp;{' '}
          {formatHour(props.startTime)} - {formatHour(props.endTime)}
        </p>
        <p
          tw="w-full text-[16px] font-bold leading-normal"
          css={css`word-wrap: break-word; margin-top: 0.25rem;`}
        >
          Rp{moneySeparator(props.totalPrice)}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div tw='flex flex-col justify-center w-full mt-3'>
            <label htmlFor='rating'>
              <p tw="w-full text-[16px] leading-normal" css={css`text-align:center; color:#003366; margin-bottom: 0.75rem`} id="description">
                Beri Penilaian (Wajib)
              </p>
            </label>
            <Rating 
            tw='flex justify-center w-full' css={css`text-align:center;`}
            emptySymbol={<img src="../../icons/review-star-empty.png" className="icon"/>}
            fullSymbol={<img src="../../icons/review-star-filled.png" className="icon"/>}
            onChange={newValue => { setRating(newValue); handleChange(newValue); setValue('rating', newValue)}}
            initialRating={ rating }
            />
            <input {...register("rating", {required: '*Penilaian wajib diisi.', min: 1, max: 5})}
              id="rating"
              name="rating"
              type="number"
              hidden
              readOnly
            />
            <p tw="w-full text-[16px] font-bold leading-normal" css={css`text-align:center; color:#FE3131;`}>
             {errors.rating?.message} &nbsp;
            </p>
          </div>

          <div tw='flex flex-col justify-center w-full mt-2 mb-8'>
            <label tw="w-full text-[16px] font-bold leading-normal" htmlFor="content" 
            css={css`text-align:center;`}>
              Berikan Ulasan (Opsional)
            </label> 

            <div tw="mt-1">
              <textarea 
                {...register("content", {maxLength:500})}
                rows={8} maxLength={500}
                tw="w-full py-2 px-3 border border-[#000000] rounded-lg"
                placeholder="Ulasan maksimal 500 karakter."
                css={css`
                  color: #003366; padding: 8px 12px; resize: none; font-size:0.75rem;
                `}
                onChange={e => setCount(e.target.value.length)}
                name="content" id="content"
              />
            </div>

            <p css={css`text-align:right`}>{count}/500</p>
          </div>
          <Button type='submit'>Kirim</Button>
        </form>
      </div>
    </div>
  );
};

export default BookingReviewCard;

function handleChange(value: number){
  var element;
  var desc : string = "Beri Penilaian (Wajib)";

  element = document.getElementById("description");

  if (value === 1) desc = "Buruk";
  else if (value === 2) desc = "Kurang";
  else if (value === 3) desc = "Cukup";
  else if (value === 4) desc = "Baik";
  else if (value === 5) desc = "Sempurna";

  if (element) {
    element.innerHTML = desc;
    element.style.fontWeight = "Bold";
    element.style.fontSize = "1.25rem";
    element.style.marginBottom = "0.375rem";
  }
}

interface StyledCardImageDivProps {
  src?: string;
}

const StyledCardImageDiv = styled.div<StyledCardImageDivProps>`
  width: 100%;
  height: 220px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;
`;
