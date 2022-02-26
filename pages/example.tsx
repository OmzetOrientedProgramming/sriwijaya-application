import React from 'react';
import 'twin.macro';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getExample, postExample } from '../api/services/example';

import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '../components/Example/Button';
import { Layout } from '../components/Utils/Layout';
import toast from 'react-hot-toast';

const dummyPost = {
  name: 'budi',
  job: 'softeng',
};

const Example: React.FC = () => {
  // Might be used later
  const router = useRouter();
  const queryClient = useQueryClient();

  // POST Request Example (Mutation)
  const { mutate: postRegistration, isLoading: isPostingRegistration } =
    useMutation(() => postExample(dummyPost), {
      onSuccess: (res) => {
        console.log(res);
        toast.success('Post Success!');
        // router.push('/'); // redirect
      },
      onError: (err: any) => {
        console.log(err);
        toast.error(err.message, { position: 'top-right' });
      },
    });

  // GET Request Example (Query)
  const { data, status, error } = useQuery(
    'get_example',
    () => getExample({ page: 2 }),
    {
      onSuccess: (res) => {
        console.log(res);
        // queryClient.invalidateQueries(['get_example', params]);
      },
      onError: (err: any) => {
        console.log(err);
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
            Post
          </button>
        </div>
      </Layout>
    </>
  );
};

export default Example;
