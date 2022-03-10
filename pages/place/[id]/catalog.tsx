import Head from 'next/head';
import CardCatalog from '../../../components/Catalog/CardCatalog';
import StyledImageDiv from '../../../components/Utils/Image';
import SearchBar from '../../../components/Catalog/SearchBar';
import tw from 'twin.macro';
import { catalogPaginationSuccessResponse } from '../../../__mocks__/api/catalogMocks';

import { Layout } from '../../../components/Utils/Layout';

const Catalog: React.FC = () => {
  const data = catalogPaginationSuccessResponse;
  return (
    <>
      <Layout>
        <Head>
          <title>Catalog</title>
        </Head>

        <div tw="flex flex-col justify-center w-full">
          <StyledImageDiv src="/images/dummy.jpg"></StyledImageDiv>
          <h1 tw="m-9 text-xl font-bold text-center">Kafe Janji Jiwa</h1>
          <SearchBar></SearchBar>
          {data.data.items.map((detail, key) => (
            <div key={detail.id}>
              <CardCatalog
                itemID={detail.id}
                name={detail.name}
                image={detail.image}
                price={detail.price}
                description={detail.description}
              />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Catalog;
