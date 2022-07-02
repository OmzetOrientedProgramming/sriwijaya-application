import React from 'react';
import 'twin.macro';
import Head from 'next/head';
import toast from 'react-hot-toast';

import withAuth from '../../../components/Utils/AuthHOC/withAuth';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/Utils/Layout';
import StyledImageDiv from '../../../components/Utils/StyledImageDiv';
import Button from '../../../components/Utils/Button';
import { useGetPlaceDetail } from '../../../apis/hooks/placeDetailHooks';
import Card from '../../../components/PlaceDetail/card';
import ReviewCard from '../../../components/PlaceDetail/reviewCard';
import Link from 'next/link';

import moment from 'moment';
import 'moment/locale/id';
import { useGetReviewRating } from '../../../apis/hooks/reviewRatingHooks';
moment.locale('id');

const PlaceDetail: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const { id } = router.query;

  let stringID: string = (id as string) || '';
  const { data, status, error } = useGetPlaceDetail(
    {
      id: stringID,
    },
    {
      onSuccess: (res: any) => {},
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );

  const { data: dataReview, status: statusReview } = useGetReviewRating(
    {
      placeID: stringID,
      page: 1,
      limit: 2,
      latest: true,
      rating: false,
    },
    {
      onSuccess: (res: any) => {},
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );

  return (
    <>
      <Head>
        <title>Detail Tempat</title>
      </Head>
      <Layout title="Detail" back={true}>
        <div tw="pt-0 pb-16 flex flex-col items-center min-h-screen w-full">
          {status === 'error' && <p>Error: {error}</p>}
          <div tw="my-4 mx-0 my-0 flex flex-col items-center justify-center">
            {status === 'success' && (
              <StyledImageDiv src={data.data.image}></StyledImageDiv>
            )}
          </div>

          <div tw="px-6 py-5 flex flex-col w-full">
            {status === 'success' && (
              <Card
                title={data.data.name}
                distance={data.data.distance}
                address={data.data.address}
                openHour={moment(
                  data.data.open_hour,
                  'YYYY-MM-DDTHH:mm:ss'
                ).format('HH:mm')}
                closeHour={moment(
                  data.data.close_hour,
                  'YYYY-MM-DDTHH:mm:ss'
                ).format('HH:mm')}
                rating={data.data.average_rating}
              />
            )}
          </div>

          <div tw="py-0 px-6 text-xs text-justify w-full">
            {status === 'success' && <p>{data.data.description}</p>}
          </div>

          <div tw="pb-7 pt-4 px-6 text-xs text-justify w-full">
            {status === 'success' && (
              <div tw="flex items-start">
                <div tw="mr-2">
                  <img src="/images/PlaceDetail/Caution.svg" alt="" />
                </div>
                <div>
                  <p>
                    Slot Booking: {data.data.min_slot} - {data.data.max_slot}
                  </p>
                  <p>Biaya Booking: Rp.{data.data.booking_price}/orang</p>
                </div>
              </div>
            )}
          </div>

          <div tw="px-4 w-full flex items-center">
            <Link href={`/booking/${id}`}>
              <Button>Booking</Button>
            </Link>
            <Link href={`/place/${id}/catalog`}>
              <img
                tw="ml-2 hover:cursor-pointer"
                src="/images/PlaceDetail/Katalog.svg"
                alt=""
              />
            </Link>
          </div>

          <div tw="px-4 pt-10 w-full flex-col items-center">
            {status === 'success' && (
              <div tw="text-lg font-bold mb-4">
                <p>Ulasan ({data.data.review_count})</p>
              </div>
            )}
            {statusReview === 'success' &&
              dataReview &&
              dataReview.data.data.reviews.length === 0 && (
                <p tw="font-bold text-gray-400 flex justify-center items-center mt-6">
                  Tidak ada Ulasan
                </p>
              )}
            {statusReview === 'success' &&
              dataReview &&
              dataReview.data.data.reviews.map((review: any, key: any) => (
                <div key={key} tw="text-center mb-3">
                  <ReviewCard
                    name={review.name}
                    rating={review.rating}
                    content={review.content}
                    time={review.created_at}
                  />
                </div>
              ))}

            {statusReview === 'success' &&
              dataReview &&
              dataReview.data.data.total_review > 2 && (
                <div tw="justify-center flex items-center mx-20 my-10">
                  <Link href={`/place/${id}/review`}>
                    <Button>See More</Button>
                  </Link>
                </div>
              )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default withAuth(PlaceDetail);
