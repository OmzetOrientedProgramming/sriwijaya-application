import React from 'react';
import { css } from 'twin.macro';
import Head from 'next/head';

import withAuth from '../../../../components/Utils/AuthHOC/withAuth';
import { useRouter } from 'next/router';
import { Layout } from '../../../../components/Utils/Layout';
import BookingReviewCard from '../../../../components/BookingList/Review/BookingReviewCard';
import { useGetBookingDetail } from '../../../../apis/hooks/bookingDetailHooks';
import toast from 'react-hot-toast';

const BookingReview: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const { id } = router.query;

  let numberID: number = (id as unknown as number) || 0;

  const params = {
    bookingId: numberID,
  };

  const { data, status } = useGetBookingDetail(params, {
    onSuccess: (res: any) => {
      var isReviewEligible = res.data.status === 3;

      if (!isReviewEligible) {
        router.push('/booking-saya');
      }
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  const booking = data?.data;
  var isEligible = status === 'success' && booking?.status === 3;

  return (
    <>
      {isEligible && (
        <>
          <Head>
            <title>Ulas Booking</title>
          </Head>
          <Layout title="Ulasan" hasNavbar={false} back={true}>
            <div
              css={css`
                height: 100%;
                align-items: flex-start;
              `}
            >
              <BookingReviewCard
                bookingId={numberID}
                placeImage={booking?.image}
                placeName={booking?.place_name}
                date={booking?.date}
                startTime={booking?.start_time}
                endTime={booking?.end_time}
                totalPrice={booking?.total_price}
              />
            </div>
          </Layout>
        </>
      )}
    </>
  );
};

export default withAuth(BookingReview);
