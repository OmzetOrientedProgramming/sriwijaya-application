import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPage } from 'next';
import 'twin.macro';

import { useGetListPlaces } from '../apis/hooks/listPlacesHooks';
import withAuth from '../components/Utils/AuthHOC/withAuth';
import CardPlace from '../components/ListPlace/CardPlace';
import { Layout } from '../components/Utils/Layout';

export const handleScrollRefetch = (fetchNextPage: any) => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
    fetchNextPage();
  }
};

const ListPlaces: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useGetListPlaces();

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
        <title>Beranda - Wave</title>
      </Head>

      <div
        data-testid="wrapper"
        tw="mt-8 flex flex-col items-center justify-center w-full"
      >
        {status === 'success' &&
          data?.pages.map((page: any) => {
            return page.data.places.map((detail: any) => {
              return (
                <div tw="w-full" key={detail.id}>
                  <CardPlace
                    id={detail.id}
                    image={detail.image}
                    name={detail.name}
                    description={detail.description}
                    address={detail.address}
                    distance={detail.distance}
                    rating={detail.rating}
                    review_count={detail.review_count}
                  />
                </div>
              );
            });
          })}
        {isFetching && hasNextPage && <p tw="m-8">Loading . . .</p>}
      </div>
    </Layout>
  );
};

export default withAuth(ListPlaces);
