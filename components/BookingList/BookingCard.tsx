import React from 'react';
import Link from 'next/link';
import tw, { styled, css } from 'twin.macro';

interface BookingCardProps {
  bookingId: number;
  placeId: number;
  placeImage: string;
  placeName: string;
  totalPrice: number;
  status: number;
  date: string;
  startTime: string;
  endTime: string;
}

function moneySeparator(amount : number) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function formatDate(date : string){
  let day = date.slice(8, 10)
  let month : string;
  if (date[5] === '0'){
    month = months[parseInt(date[6]) - 1]
  } else {
    month = months[parseInt(date.slice(5, 7)) - 1]
  }
  let year = date.slice(0, 4)

  return (day + " " + month + " " + year)
}

function formatHour(hour : string){
  let hourOfHour = hour.slice(11, 13);
  let minuteOfHour = hour.slice(14, 16);

  return (hourOfHour + ":" + minuteOfHour)
}

const mockBookingRating : number = -1;

function getStateCard(state: number, bookingRating: number, propsId: number){
  if (state === 0){
    return (
      <div tw="flex flex-row space-x-1">
        <div css={css`
        height:32px;
        display:table;
        `}>
          <div css={css`display:table-cell; vertical-align:middle;`}>
            <img src="icons/time-icon-blue.png" width="20" height="auto" css={css`float: left;`}/>
          </div>
          <div css={css`display:table-cell; vertical-align:middle; padding-left: 4px`}>
            <p               
              tw="w-full text-[12px] leading-normal font-bold"
              css={css`
                word-wrap: break-word;
                color:#003366;
                vertical-align:middle;
              `}
              >
              Menunggu Konfirmasi
            </p>
          </div>
        </div>
      </div>
      )
  }
  if (state === 1){
    return(
      <div tw="flex flex-row space-x-1" css={css`display: table;`}>
        <div css={css`
            display: table-cell;
            vertical-align: middle;
        `}>
          <p 
          tw="w-full text-[12px] leading-normal font-bold"
          css={css`
            word-wrap: break-word;
            margin-bottom: 0.25rem;
            color:#FE3131;
          `}>
            Pembayaran
          </p>

          <div css={css`
          height = 24px;
          vertical-align: middle;
          `}>
          <img src="icons/time-icon-red.png" width="18" height="auto" css={css` position: relative; float: left;`}/>
          <p 
          tw="w-full text-[12px] leading-normal font-bold"
          css={css`
            word-wrap: break-word;
            margin-left: 0.25rem;
            margin-bottom: 0.25rem;
            color:#FE3131;
            position: relative;
            left: 4px;
          `}>
            00:00
          </p>
          </div>
        </div>
        <div css={css`display: table-cell; vertical-align: middle; padding-left:16px`}>
          <BookingButton>
            Detail
          </BookingButton>
        </div>
      </div>
    )
  }
  if (state === 2){
    return (
    <div tw="flex flex-row space-x-1">
      <BasicStateCard hexColor='#03BD36'>
        Terkonfirmasi
      </BasicStateCard>
    </div>
    )
  } else if (state === 5){
    return (
      <div tw="flex flex-row space-x-2 items-center">
        <BasicStateCard hexColor='#03BD36'>
          Selesai
        </BasicStateCard>
        {/* Add stars */}
      </div>
    )
  } else if (state === 3){
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

const BookingCard: React.FC<BookingCardProps> = (props) => {  
  return (
    <StyledBookingCardContainer tw="shadow-md align-top">
      <StyledCardImageDiv src={props.placeImage}/>
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
              {formatDate(props.date)} &nbsp;•&nbsp; {formatHour(props.startTime)} - {formatHour(props.endTime)}
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
              Rp{moneySeparator(props.totalPrice)}
            </p>
          </div>

          <div tw="flex flex-row space-x-1">
            {getStateCard(props.status, mockBookingRating, props.placeId)}
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
  margin: 0 0.375rem 0 auto;
  width: 100%;
  height: 120px;
  border-radius: 0.625rem;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-box-shadow:inset 0px 0px 0px 2px #003366;
  -moz-box-shadow:inset 0px 0px 0px 2px #003366;
  box-shadow:inset 0px 0px 0px 2px #003366;
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