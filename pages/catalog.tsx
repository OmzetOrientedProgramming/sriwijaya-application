import Head from 'next/head';
import CardCatalog from '../components/Catalog/CardCatalog';

import { Layout } from '../components/Utils/Layout';

const Catalog: React.FC = () => {
  return (
    <>
      <Layout>
        <Head>
          <title>Catalog</title>
        </Head>

        <div tw="pt-8 pb-16 flex flex-col items-center justify-center min-h-screen w-full">
          <img src="/images/golang.png" />
          <div tw="m-9">
            <p tw="text-base overflow-hidden leading-normal">Kafe Janji Jiwa</p>
          </div>

          <CardCatalog
            itemID={1}
            image={'test'}
            name={'nama'}
            description={'test'}
            price={10000}
          />
        </div>
      </Layout>
    </>
  );
};

export default Catalog;
