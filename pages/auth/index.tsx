import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { css } from 'twin.macro';

import withoutAuth from '../../components/Utils/AuthHOC/withoutAuth';
import { Drawer } from '../../components/Drawer';
import AuthForm from '../../components/Auth/AuthForm';
import { AuthFormSession } from '../../components/Auth/AuthForm/types';
import AuthWrapper from '../../components/Auth/AuthWrapper';
import Button from '../../components/Utils/Button';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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

  const carouselData: any = [
    {
      image: '/images/LandingPage/illustration-1.png',
      title: 'Cari tempat seru',
      desc: 'Semua tempat buat seru-seruan, sendirian, atau sama temen kamu.',
    },
    {
      image: '/images/LandingPage/illustration-2.png',
      title: 'Booking dari jauh hari',
      desc: 'Ga usah pusing mikirin penuh atau enggak, karena udah dari jauh hari.',
    },
    {
      image: '/images/LandingPage/illustration-3.png',
      title: 'Nongkrong sepuasnya',
      desc: 'Sepuasnya nongkrong sesuai sama waktu yang kamu tentuin.',
    },
  ];

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

      {/* Carousel */}
      <div tw="w-full">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          showArrows={false}
          showThumbs={false}
        >
          {carouselData.map((data: any, key: any) => (
            <div key={key}>
              <div tw="w-[264px] h-[240px] inline">
                <img
                  src={data.image}
                  alt="illustration"
                  css={[
                    css`
                      width: 264px !important;
                      height: 240px !important;
                    `,
                  ]}
                />
              </div>
              <div tw="mt-6 mb-14">
                <h1 tw="text-base font-bold mb-2">{data.title}</h1>
                <p tw="text-xs">{data.desc}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* <div tw="grid grid-cols-3 gap-x-2">
        <img src="/images/LandingPage/ellipse.svg" alt="ellipse" />
        <img src="/images/LandingPage/ellipse.svg" alt="ellipse" />
        <img src="/images/LandingPage/ellipse.svg" alt="ellipse" />
      </div> */}

      <div tw="mt-4 mb-6 w-full">
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
