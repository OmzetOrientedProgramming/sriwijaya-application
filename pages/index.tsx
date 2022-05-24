import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import 'twin.macro';

import { useGetListPlaces } from '../apis/hooks/listPlacesHooks';
import CardPlace from '../components/ListPlace/CardPlace';
import { Layout } from '../components/Utils/Layout';
import FilterForm from '../components/ListPlace/FilterForm';
import SortForm from '../components/ListPlace/SortForm';
import withAuth from '../components/Utils/AuthHOC/withAuth';
import CategoryForm from '../components/ListPlace/CategoryForm';

export const handleScrollRefetch = (fetchNextPage: any) => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
    fetchNextPage();
  }
};

export interface FilterData {
  people: string[];
  price: string[];
  rating: string[];
}

export interface Location {
  lat: number;
  lng: number;
}

const ListPlaces: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const [filter, setFilter] = useState<FilterData>({
    price: [],
    rating: [],
    people: [],
  });
  const [sort, setSort] = useState<string>('recommended');
  const [location, setLocation] = useState<Location>({
    lat: 0,
    lng: 0,
  });
  const [category, setCategory] = useState<string>('');

  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useGetListPlaces({
      sort,
      category,
      ...filter,
      ...location,
    });

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
        tw="flex flex-col items-center justify-center w-full"
      >
        <div tw="flex flex-initial w-full p-4 gap-x-3">
          <FilterForm filter={filter} setFilter={setFilter} />
          <SortForm
            sort={sort}
            setSort={setSort}
            location={location}
            setLocation={setLocation}
          />
          <CategoryForm category={category} setCategory={setCategory} />
        </div>
        {status === 'success' &&
          data?.pages.map((page: any) => {
            return page.data.places.length === 0 ? (
              <h1>Tidak ada tempat yang memenuhi kriteria</h1>
            ) : (
              page.data.places.map((detail: any) => {
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
              })
            );
          })}
        {isFetching && hasNextPage && <p tw="m-8">Loading . . .</p>}
      </div>
    </Layout>
  );
};

export default withAuth(ListPlaces);
