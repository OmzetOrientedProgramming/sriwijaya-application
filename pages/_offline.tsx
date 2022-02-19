import Head from 'next/head';
import React from 'react';
import 'twin.macro';

const Offline: React.FC = () => (
  <>
    <Head>
      <title>Offline</title>
    </Head>
    <div tw="flex items-center justify-center w-full min-h-screen">
      <h1>Your device is offline</h1>
    </div>
  </>
);

export default Offline;
