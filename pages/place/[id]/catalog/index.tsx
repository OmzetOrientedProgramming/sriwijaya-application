// import Head from 'next/head';
// import CardCatalog from '../../../../components/Catalog/CardCatalog';
// import SearchBar from '../../../../components/Catalog/SearchBar';
// import 'twin.macro';
// import { useRouter } from 'next/router';
// import { useGetCatalog } from '../../../../api/hooks/catalogHooks';
// import { Layout } from '../../../../components/Utils/Layout';
// import toast from 'react-hot-toast';
// import Link from 'next/link';
// import endpoint from '../../../../api/endpoint';
// import { useEffect, useState } from 'react';
// import StyledImageDiv from '../../../../components/Utils/StyledImageDiv';

// const Catalog: React.FC = () => {
//   const router = useRouter();
//   if (!router.isReady) return <></>;
//   const { id, name, limit, page } = router.query;
//   const [inputText, setInputText] = useState('');

//   let stringID: string = (id as string) || '';
//   let stringName: string = (name as string) || '';
//   let stringLimit: string = (limit as string) || '';
//   let stringPage: string = (page as string) || '';
//   // console.log(id);

//   useEffect(() => {
//     refetch();
//   }, []);

//   const { data, status, error, refetch } = useGetCatalog(
//     {
//       id: stringID,
//       name: inputText,
//       limit: stringLimit,
//       page: stringPage,
//     },
//     {
//       onSuccess: (res: any) => {},
//       onError: (err: any) => {
//         toast.error(err.message, { position: 'top-right' });
//       },
//     }
//   );

//   // console.log('info: ', data?.data.data.info);
//   // console.log('data example: ', data2);
//   return (
//     <>
//       <Layout>
//         <Head>
//           <title>Catalog</title>
//         </Head>

//         <div tw="flex flex-col justify-center w-full">
//           {status === 'error' && <p>Error: {error}</p>}
//           {data?.data.data.info.map(
//             (
//               detail: {
//                 name: string;
//                 image: string;
//               },
//               key: any
//             ) => (
//               <div key={detail.name}>
//                 {status === 'success' && (
//                   <StyledImageDiv src={detail.image}></StyledImageDiv>
//                 )}
//                 {status === 'success' && (
//                   <h1 tw="m-9 text-xl font-bold text-center">{detail.name}</h1>
//                 )}
//               </div>
//             )
//           )}
//           <SearchBar onClick={refetch} setInputText={setInputText} />
//           {data?.data.data.items.map(
//             (
//               detail: {
//                 placeID: string;
//                 id: string;
//                 name: string;
//                 image: string;
//                 price: number;
//                 description: string;
//               },
//               key: any
//             ) => (
//               <div key={detail.id}>
//                 {status === 'success' && (
//                   <CardCatalog
//                     placeID={stringID}
//                     itemID={detail.id}
//                     name={detail.name}
//                     image={detail.image}
//                     price={detail.price}
//                     description={detail.description}
//                   />
//                 )}
//               </div>
//             )
//           )}
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default Catalog;

import Head from 'next/head';
import CardCatalog from '../../../../components/Catalog/CardCatalog';
import SearchBar from '../../../../components/Catalog/SearchBar';
import 'twin.macro';
import { useRouter } from 'next/router';
import { useGetCatalog } from '../../../../api/hooks/catalogHooks';
import { Layout } from '../../../../components/Utils/Layout';
import toast from 'react-hot-toast';
import Link from 'next/link';
import endpoint from '../../../../api/endpoint';
import { useEffect, useState } from 'react';
import StyledImageDiv from '../../../../components/Utils/StyledImageDiv';

export const handleScrollRefetch = (refetch: any) => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    refetch();
  }
};

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
  // var page = 1;
  const [items, setItems] = useState<Array<IItem>>([]);
  const { id } = router.query;
  const [inputText, setInputText] = useState('');
  const [info, setInfo] = useState<IInfoPlace>();
  // var isSearch = false;
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
        console.log('res:', res);
        if (res.data.data.items.length !== 0) {
          setInfo(res.data.data.info[0]);
          console.log('info: ', info);
          console.log('isSearch: ', paginationState.isSearch);
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
        }
      },
      onError: (err: any) => {
        toast.error(err.message, { position: 'top-right' });
      },
    }
  );

  // console.log('id: ', id);
  // console.log('data: ', data);
  // console.log('data info: ', data?.data.data.info);
  console.log('items: ', items);
  return (
    <>
      <Layout>
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
          />
          {items.map((detail: any) => (
            <div key={detail.id}>
              <CardCatalog
                placeID={stringID}
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
