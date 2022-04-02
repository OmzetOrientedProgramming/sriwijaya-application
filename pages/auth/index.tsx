import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { css } from 'twin.macro';

import withoutAuth from '../../components/Utils/AuthHOC/withoutAuth';
import { Drawer } from '../../components/Drawer';
import AuthForm from '../../components/Auth/AuthForm';
import { AuthFormSession } from '../../components/Auth/AuthForm/types';
import AuthWrapper from '../../components/Auth/AuthWrapper';
import Button from '../../components/Utils/Button';

const Auth: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [authFormSession, setAuthFormSession] =
    useState<AuthFormSession | null>(null);

  const onRegister = () => {
    setIsOpen(true);
    setAuthFormSession('register');
  };

  const onLogin = () => {
    setIsOpen(true);
    setAuthFormSession('login');
  };

  useEffect(() => {
    if (isOpen) return;
    setAuthFormSession(null);
  }, [isOpen]);

  return (
    <AuthWrapper>
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
      <img src="/images/LandingPage/illustration-1.png" alt="illustration" />
      <div tw="mt-6 mb-8">
        <h1 tw="text-base font-bold mb-2">Cari tempat seru</h1>
        <p tw="text-xs">
          Semua tempat buat seru-seruan, sendirian, atau sama temen kamu.
        </p>
      </div>
      <div tw="grid grid-cols-3 gap-x-2">
        <img src="/images/LandingPage/ellipse.svg" alt="ellipse" />
        <img src="/images/LandingPage/ellipse.svg" alt="ellipse" />
        <img src="/images/LandingPage/ellipse.svg" alt="ellipse" />
      </div>
      <div tw="my-6 w-full">
        <Button onClick={() => onLogin()}>Login</Button>
      </div>
      <div tw="text-xs flex justify-center items-center">
        <p tw="font-normal mr-1">Belum ada akun?</p>
        <button tw="font-bold color[#003366]" onClick={() => onRegister()}>
          Register
        </button>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        {authFormSession !== null && <AuthForm session={authFormSession} />}
      </Drawer>
    </AuthWrapper>
  );
};

export default withoutAuth(Auth);
