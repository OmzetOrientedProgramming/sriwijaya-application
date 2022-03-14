import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'twin.macro';

const Success: React.FC = () => {
  const [redirectSeconds, setRedirectSeconds] = useState(3);
  const router = useRouter();
  const session = router.query.session;

  useEffect(() => {
    if (redirectSeconds == 0) {
      router.push('/');
      return;
    }

    setTimeout(() => {
      setRedirectSeconds((prevRedirectSeconds) => prevRedirectSeconds - 1);
    }, 1000);
  }, [redirectSeconds]);

  return (
    <>
      <Head>
        <title>Success</title>
      </Head>
      <div tw="flex flex-col justify-center items-center my-auto min-h-screen w-full">
        <img src="/images/LandingPage/success.svg" alt="success" />
        <h1 tw="text-base font-bold mt-6 mb-3">{session} berhasil!</h1>
        <p tw="text-xs font-normal">Kamu akan dialihkan ke homepage...</p>
      </div>
    </>
  );
};

export default Success;
