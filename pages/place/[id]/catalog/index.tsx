import Head from 'next/head';
import CardCatalog from '../../../../components/Catalog/CardCatalog';
import SearchBar from '../../../../components/Catalog/SearchBar';
import 'twin.macro';
import { useRouter } from 'next/router';
import { useGetCatalog } from '../../../../apis/hooks/catalogHooks';
import { Layout } from '../../../../components/Utils/Layout';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import StyledImageDiv from '../../../../components/Utils/StyledImageDiv';
import withAuth from '../../../../components/Utils/AuthHOC/withAuth';
import { handleScrollRefetch } from '../../..';
import Link from 'next/link';

interface IItem {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface IInfoPlace {
  name: string;
  image: string;
}

const Catalog: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const [items, setItems] = useState<Array<IItem>>([]);
  const { id } = router.query;
  const [inputText, setInputText] = useState('');
  const [info, setInfo] = useState<IInfoPlace>();
  const [paginationState, setPaginationState] = useState({
    page: 1,
    isSearch: false,
  });

  let stringID: string = (id as string) || '';

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (paginationState.page == 1) {
      refetch();
    }
  }, [paginationState.page]);

  useEffect(() => {
    window.addEventListener('scroll', () => handleScrollRefetch(refetch));

    return () => {
      window.removeEventListener('scroll', () => handleScrollRefetch(refetch));
    };
  }, []);

  const { status, error, refetch } = useGetCatalog(
    {
      id: stringID,
      name: inputText,
      limit: 5,
      page: paginationState.page,
    },
    {
      onSuccess: (res: any) => {
        setInfo(() => {
          return res.data.data.info[0];
        });
        if (paginationState.isSearch === true) {
          setItems(res.data.data.items);
          setPaginationState((prev) => ({
            isSearch: false,
            page: prev.page,
          }));
        } else {
          setItems((oldItems) => oldItems.concat(res.data.data.items));
        }
        setPaginationState((prev) => ({
          isSearch: false,
          page: prev.page + 1,
        }));
      },
      onError: (err: any) => {
        toast.error(err.response.data.message, { position: 'top-right' });
      },
    }
  );
  return (
    <>
      <Layout title="Katalog" back={true}>
        <Head>
          <title>Catalog</title>
        </Head>

        <div tw="flex flex-col justify-center w-full">
          {status === 'error' && <p>Error: {error}</p>}
          {info !== null && (
            <div>
              <StyledImageDiv src={info?.image}></StyledImageDiv>
              <h1 tw="m-9 text-xl font-bold text-center">{info?.name}</h1>
            </div>
          )}

          <SearchBar
            onClick={() => {
              setPaginationState({
                isSearch: true,
                page: 1,
              });
              refetch();
            }}
            setInputText={setInputText}
            setPagination={setPaginationState}
          />
          {items.length === 0 && (
            <p tw="font-bold text-gray-400 flex justify-center items-center mt-12">
              Item tidak tersedia
            </p>
          )}
          {items.map((detail: any) => (
            <div key={detail.id}>
              <Link href={`/place/${stringID}/catalog/${detail.id}`}>
                <CardCatalog
                  itemID={detail.id}
                  name={detail.name}
                  image={detail.image}
                  price={detail.price}
                  description={detail.description}
                />
              </Link>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default withAuth(Catalog);
