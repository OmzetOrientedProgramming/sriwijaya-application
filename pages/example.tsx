import React from 'react';
import 'twin.macro';
import Head from 'next/head';
import toast from 'react-hot-toast';

import { Layout } from '../components/Utils/Layout';
import Button from '../components/Example/Button';
import { useGetExample, usePostExample } from '../api/hooks/exampleHooks';

const dummyPost = {
  name: 'budi',
  job: 'softeng',
};

const Example: React.FC = () => {
  // const queryClient = useQueryClient();

  // POST Request Example (using hook made from ./api)
  const { mutate: postRegistration, isLoading: isPostingRegistration } =
    usePostExample(dummyPost, {
      onSuccess: (res: any) => {
        // console.log(res);
        toast.success('Post Success!');
      },
      onError: (err: any) => {
        // console.log(err);
        toast.error(err.message, { position: 'top-right' });
      },
    });

  // GET Request Example (using hook made from ./api)
  const { data, status, error } = useGetExample(
    { page: 2 },
    {
      onSuccess: (res: any) => {
        // console.log(res);
        toast.success('Get Success!');
        // queryClient.invalidateQueries(['get_example', params]);
      },
      onError: (err: any) => {
        // console.log(err);
        toast.error(err.message, { position: 'top-right' });
      },
    }
  );

  return (
    <>
      <Head>
        <title>Example</title>
      </Head>
      <Layout>
        <div tw="pt-8 pb-16 flex flex-col items-center justify-center min-h-screen w-full">
          <Button>Back to Home</Button>

          {status === 'loading' && <p>Loading data . . .</p>}

          {status === 'error' && <p>Error: {error}</p>}
          <div tw="my-4 flex flex-col items-center justify-center">
            {status === 'success' &&
              data?.data.data.map((user: any, key: any) => (
                <div key={key} tw="text-center">
                  <p>{user.id}</p>
                  <p>{user.first_name}</p>
                  <p>{user.email}</p>
                </div>
              ))}
          </div>

          {isPostingRegistration && <p>Posting . . .</p>}
          <button tw="border p-4" onClick={() => postRegistration()}>
            Click to Post
          </button>
        </div>
      </Layout>
    </>
  );
};

export default Example;
