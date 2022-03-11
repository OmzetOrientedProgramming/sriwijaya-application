import Head from 'next/head';
import ItemDetailCard from '../../../../components/ItemDetail/ItemDetailCard';
import tw from 'twin.macro';
import { itemDetailSuccessResponse } from '../../../../__mocks__/api/itemDetailMocks';

import { Layout } from '../../../../components/Utils/Layout';

const ItemDetail: React.FC = () => {
  const data = itemDetailSuccessResponse;
  return (
    <>
      <Layout>
        <Head>
          <title>Catalog</title>
        </Head>

        <div tw="flex flex-col justify-center w-full">
          <div key={data.data.id}>
            <ItemDetailCard
              itemID={data.data.id}
              name={data.data.name}
              image={data.data.image}
              price={data.data.price}
              description={data.data.description}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ItemDetail;
