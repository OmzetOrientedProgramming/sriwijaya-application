import Head from 'next/head';
import tw, { styled, css } from 'twin.macro';

import { LayoutStart } from '../../components/Utils/Layout';
import BookingCard from '../../components/BookingList/BookingCard'
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useGetOngoingBookings } from '../../apis/hooks/ongoingBookingsHooks';
import { useGetPreviousBookings } from '../../apis/hooks/previousBookingsHooks';
import { useEffect } from 'react';

export const handleScrollRefetch = (fetchNextPage: any) => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
    fetchNextPage();
  }
};

const BookingList: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const { data : prevData, fetchNextPage, hasNextPage, isFetching, status: prevStatus, error: prevError } = useGetPreviousBookings();
  const {} = useGetOngoingBookings();

  useEffect(() => {
    window.addEventListener('scroll', () => handleScrollRefetch(fetchNextPage));

    return () => {
      window.removeEventListener('scroll', () =>
        handleScrollRefetch(fetchNextPage)
      );
    };
  }, []);

  return (
    <LayoutStart>
      <Head>
        <title>Booking Saya - Wave</title>
      </Head>
      <div css={css`
      height = 100%;
      align-items: flex-start;
      `}
      >
        <div
          data-testid="wrapper"
          tw="mt-8 flex flex-col items-start justify-center w-full"
        >
          <div
          tw="w-full text-[16px] leading-normal font-bold"
          css={css`
            word-wrap: break-word;
            padding: 0 0 0 1rem;
          `}>
          Booking Terjadwal
          </div>
          {/* LOOPING */}
              <div tw="w-full">
                <BookingCard
                    bookingId = {1}
                    placeId = {1}
                    placeImage = {"string"}
                    placeName= {"Skyrink Ice Skating Rink, Taman Anggrek"}
                    totalPrice = {1625000}
                    status = {1}
                    date = {"01-01-2001"}
                    endTime = {"00:00"}
                    startTime = {"00:00"}
                />
              </div>
        </div>
        <div
          data-testid="wrapper"
          tw="mt-8 flex flex-col items-start justify-center w-full"
        >
          <div
          tw="w-full text-[16px] leading-normal font-bold"
          css={css`
            word-wrap: break-word;
            padding: 0 0 0 1rem;
          `}>
            Booking Sebelumnya
          </div>

          {prevStatus === 'success' &&
            prevData?.pages.map((page: any) => {
              return page.data.bookings.map((detail: any) => {
                return (
                  <div tw="w-full">
                    <BookingCard
                        bookingId = {detail.id}
                        placeId = {detail.place_id}
                        placeName= {detail.place_name}
                        placeImage = {detail.place_image} //
                        date = {detail.date}
                        endTime = {detail.end_time}
                        startTime = {detail.start_time}
                        totalPrice = {detail.total_price} //
                        status = {detail.status}
                    />
                  </div>
                );
              });
            })
          }
          {/* LOOPING */}

          {isFetching && hasNextPage && <p tw="m-8">sedang memuat...</p>}

          {!(prevStatus === 'success') && console.log(prevStatus)}
          {!(prevStatus === 'success') && console.log(prevError)}
          
        </div>
      </div>

    </LayoutStart>
  );
};

export default BookingList;