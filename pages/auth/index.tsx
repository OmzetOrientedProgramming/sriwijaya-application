import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { css } from 'twin.macro';
import { Drawer } from '../../components/Drawer';
import AuthForm from '../../components/LandingPage/AuthForm';
import LandingWrapper from '../../components/LandingPage/LandingWrapper';
import Button from '../../components/Utils/Button';

const Auth: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LandingWrapper>
      <Head>
        <title>Auth - Wave</title>
      </Head>
      <img
        src="/assets/wave-logo.png"
        alt="wave logo"
        css={css`
          margin-bottom: 60px;
        `}
      />
      <img src="/images/landingPage/illustration-1.png" alt="illustration" />
      <div tw="mt-6 mb-8">
        <h1 tw="text-base font-bold mb-2">Cari tempat seru</h1>
        <p tw="text-xs">
          Semua tempat buat seru-seruan, sendirian, atau sama temen kamu.
        </p>
      </div>
      <div tw="grid grid-cols-3 gap-x-2">
        <img src="/images/landingPage/ellipse.svg" alt="ellipse" />
        <img src="/images/landingPage/ellipse.svg" alt="ellipse" />
        <img src="/images/landingPage/ellipse.svg" alt="ellipse" />
      </div>
      <div tw="my-6 w-full">
        <Link href="/auth/login">
          <a>
            <Button>Login</Button>
          </a>
        </Link>
      </div>
      <div tw="text-xs flex justify-center items-center">
        <p tw="font-normal mr-1">Belum ada akun?</p>
        <button onClick={() => setIsOpen(true)}>
          <p tw="font-bold color[#003366]">Register</p>
        </button>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <AuthForm />
      </Drawer>
    </LandingWrapper>
  );
};

export default Auth;
