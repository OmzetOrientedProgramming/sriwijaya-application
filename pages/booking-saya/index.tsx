import Head from 'next/head';
import tw, { styled, css } from 'twin.macro';

import { Layout } from '../../components/Utils/Layout';
import BookingCard from '../../components/BookingList/BookingCard'
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useGetOngoingBookings } from '../../apis/hooks/ongoingBookingsHooks';
import { useGetPreviousBookings } from '../../apis/hooks/previousBookingsHooks';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const handleScrollRefetch = (fetchNextPage: any) => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
    fetchNextPage();
  }
};

const BookingList: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const { data : prevData, fetchNextPage, hasNextPage, isFetching, status: prevStatus, error: prevError } = useGetPreviousBookings();
  const { data : ongoData, status : ongoStatus, error: ongoError } = useGetOngoingBookings(
    {
      onSuccess: (res: any) => {},
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      }
    }
  );

  useEffect(() => {
    window.addEventListener('scroll', () => handleScrollRefetch(fetchNextPage));

    return () => {
      window.removeEventListener('scroll', () =>
        handleScrollRefetch(fetchNextPage)
      );
    };
  }, []);

  return (
    <Layout>
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
            {ongoStatus === 'success' &&
              ongoData?.data.map((detail: any) => {
                return (
                  <div tw="w-full">
                    <BookingCard
                      bookingId = {detail.id}
                      placeId = {detail.place_id}
                      placeName= {detail.place_name}
                      placeImage = {detail.place_image}
                      date = {detail.date}
                      endTime = {detail.end_time}
                      startTime = {detail.start_time}
                      totalPrice = {detail.total_price}
                      status = {detail.status}
                    />
                  </div>
                );
              })
            }
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
                      placeImage = {detail.place_image}
                      date = {detail.date}
                      endTime = {detail.end_time}
                      startTime = {detail.start_time}
                      totalPrice = {detail.total_price}
                      status = {detail.status}
                    />
                  </div>
                );
              });
            })
          }
          {/* LOOPING */}

          {isFetching && hasNextPage && <p tw="m-8">sedang memuat...</p>}          
        </div>
      </div>

    </Layout>
  );
};

export default BookingList;