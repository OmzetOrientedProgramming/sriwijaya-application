import Head from 'next/head';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import 'twin.macro';

import { useGetListPlaces } from '../api/hooks/listPlacesHooks';
import CardPlace from '../components/ListPlace/CardPlace';
import { Layout } from '../components/Utils/Layout';

export const handleScrollRefetch = (refetch: any) => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    refetch();
  }
};

interface IPlace {
  id: number;
  name: string;
  description: string;
  address: string;
  distance: number;
  rating: number;
  review_count: number;
  image: string;
}

const ListPlaces: React.FC = () => {
  const [page, setPage] = useState(1);
  const [places, setPlaces] = useState<Array<IPlace>>([]);

  useEffect(() => {
    window.addEventListener('scroll', () => handleScrollRefetch(refetch));

    return () => {
      window.removeEventListener('scroll', () => handleScrollRefetch(refetch));
    };
  }, []);

  const { status, refetch } = useGetListPlaces(
    { limit: 5, page: page },
    {
      onSuccess: (res: any) => {
        if (res.data.places.length !== 0) {
          setPlaces((oldPlaces) => oldPlaces.concat(res.data.places));
          setPage((oldPage) => oldPage + 1);
        }
      },
      onError: (err: any) => {
        toast.error(err.message, { position: 'top-right' });
      },
    }
  );

  return (
    <Layout>
      <Head>
        <title>Beranda - Wave</title>
      </Head>

      <div
        data-testid="wrapper"
        tw="pt-8 pb-16 flex flex-col items-center justify-center min-h-screen w-full"
      >
        {status === 'loading' && <p tw="m-8">. . .</p>}
        {status === 'success' &&
          places.map((detail: any) => (
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
          ))}
      </div>
    </Layout>
  );
};

export default ListPlaces;
