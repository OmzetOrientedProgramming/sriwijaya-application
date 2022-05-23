import React, { useEffect, useState } from 'react';
import 'twin.macro';
import Head from 'next/head';
import toast from 'react-hot-toast';

import withAuth from '../../../../components/Utils/AuthHOC/withAuth';
import { useRouter } from 'next/router';
import { Layout } from '../../../../components/Utils/Layout';
import { useGetReviewRating } from '../../../../apis/hooks/reviewRatingHooks';
import ReviewCard from '../../../../components/PlaceDetail/reviewCard';

import moment from 'moment';
import 'moment/locale/id';
import SortReview from '../../../../components/PlaceDetail/sortReview';
import useScroll from '../../../../hooks/useScroll';
import { handleScrollRefetch } from '../../..';
moment.locale('id');

interface IReview {
  id: number;
  name: string;
  rating: number;
  content: string;
  time: string;
}

const Review: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [latest, setLatest] = useState(true);
  const [rating, setRating] = useState(false);
  const [sort, setSort] = useState('latest review');
  const [review, setReview] = useState<Array<IReview>>([]);
  const [totalReview, setTotalReview] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useScroll(() => handleScrollRefetch(refetch));

  useEffect(() => {
    if (!isOpen) {
      refetch();
    }
  }, [isOpen]);

  let stringPlaceID: string = (id as string) || '';
  const { status, error, refetch } = useGetReviewRating(
    {
      placeID: stringPlaceID,
      page: page,
      limit: 5,
      latest: latest,
      rating: rating,
    },
    {
      onSuccess: (res: any) => {
        if (page > 1) {
          setReview((oldReviews) => oldReviews?.concat(res.data.data.reviews));
        } else {
          setReview(res.data.data.reviews);
        }
        setTotalReview(res.data.data.total_review);
        setPage(page + 1);
      },
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );
  return (
    <>
      <Head>
        <title>Review</title>
      </Head>
      <Layout title="Review" back={true}>
        <div tw="pt-0 pb-16 flex flex-col items-center min-h-screen w-full">
          {status === 'error' && <p>Error: {error}</p>}
          <div tw="flex flex-initial w-full p-4 gap-x-3">
            <SortReview
              sort={sort}
              setSort={setSort}
              setLatest={setLatest}
              setRating={setRating}
              isSorted={true}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setPage={setPage}
            />
          </div>
          <div tw="px-4 pt-10 w-full flex-col items-center">
            {status === 'success' && (
              <div tw="text-lg font-bold mb-4">
                <p>Ulasan ({totalReview})</p>
              </div>
            )}
            {status === 'success' &&
              review.map((review: any) => (
                <div key={review.id} tw="text-center mb-3">
                  <ReviewCard
                    name={review.name}
                    rating={review.rating}
                    content={review.content}
                    time={review.created_at}
                  />
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default withAuth(Review);
