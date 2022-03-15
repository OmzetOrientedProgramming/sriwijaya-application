import Head from 'next/head';
import ItemDetailCard from '../../../../../components/ItemDetail/ItemDetailCard';
import 'twin.macro';

import { Layout } from '../../../../../components/Utils/Layout';
import { useRouter } from 'next/router';
import { useGetItemDetail } from '../../../../../api/hooks/detailItemHooks';
import toast from 'react-hot-toast';

const ItemDetail: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const { id, item_id } = router.query;

  let stringID1: string = (id as string) || '';
  let stringID2: string = (item_id as string) || '';
  const { data, status, error } = useGetItemDetail(
    {
      placeID: stringID1,
      itemID: stringID2,
    },
    {
      onSuccess: (res: any) => {},
      onError: (err: any) => {
        toast.error(err.message, { position: 'top-right' });
      },
    }
  );
  return (
    <>
      <Layout title="Detail Item" back={true}>
        <Head>
          <title>Catalog</title>
        </Head>

        <div tw="flex flex-col justify-center w-full">
          {status === 'error' && <p>Error: {error}</p>}
          <div key={data?.data.data.item.id}>
            {status === 'success' && (
              <ItemDetailCard
                itemID={data?.data.data.item.id}
                name={data?.data.data.item.name}
                image={data?.data.data.item.image}
                price={data?.data.data.item.price}
                description={data?.data.data.item.description}
              />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ItemDetail;
