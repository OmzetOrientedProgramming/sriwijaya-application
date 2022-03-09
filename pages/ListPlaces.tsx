import Head from 'next/head';
import CardPlace from '../components/ListPlace/CardPlace';

import { Layout } from '../components/Utils/Layout';

import { placePaginationSuccessResponse } from '../__mocks__/api/listPlacesMocks';

const ListPlaces: React.FC = () => {
  const data = placePaginationSuccessResponse;

  return (
    <Layout>
      <Head>
        <title>List Place</title>
      </Head>

      <div tw="pt-8 pb-16 flex flex-col items-center justify-center min-h-screen w-full">
        {data.data.places.map((detail, key) => (
          <div key={detail.id}>
            <CardPlace
              id={detail.id}
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
