import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Detector } from 'react-detect-offline';
import tw from 'twin.macro';

import { MainNavbar, MainNavbarProps } from './Navbar';
import { MainHeader, MainHeaderProps } from './Header';

const layoutMainNavbarProps = {
  mainNavbarItems: [
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.5833 2.33331H17.5H7.58333C5.33167 2.33331 3.5 4.16498 3.5 6.41665V8.61231V10.9118V25.6666L11.6667 21.5833L19.8333 25.6666V15.1666H25.6667V6.41665C25.6667 4.16498 23.835 2.33331 21.5833 2.33331ZM17.5 21.8913L11.6667 18.9746L5.83333 21.8913V10.9118V8.61231V6.41665C5.83333 5.45181 6.6185 4.66665 7.58333 4.66665H17.5H17.9107C17.6552 5.19865 17.5 5.78781 17.5 6.41665V8.61231V10.9118V21.8913ZM23.3333 12.8333H19.8333V10.9118V8.61231V6.41665C19.8333 5.45181 20.6185 4.66665 21.5833 4.66665C22.5482 4.66665 23.3333 5.45181 23.3333 6.41665V12.8333Z"
            fill="#707070"
          />
          <path
            d="M8.16675 10.5H15.1667V12.8333H8.16675V10.5Z"
            fill="#707070"
          />
        </svg>
      ),
      text: 'Pesanan',
      href: '/booking-saya',
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6641 22.5488V16.7154H16.3308V22.5488C16.3308 23.1904 16.8558 23.7154 17.4974 23.7154H20.9974C21.6391 23.7154 22.1641 23.1904 22.1641 22.5488V14.3821H24.1474C24.6841 14.3821 24.9408 13.7171 24.5324 13.3671L14.7791 4.58211C14.3358 4.18544 13.6591 4.18544 13.2158 4.58211L3.46243 13.3671C3.06576 13.7171 3.31076 14.3821 3.84743 14.3821H5.83076V22.5488C5.83076 23.1904 6.35576 23.7154 6.99743 23.7154H10.4974C11.1391 23.7154 11.6641 23.1904 11.6641 22.5488Z"
            fill="#707070"
          />
        </svg>
      ),
      text: 'Beranda',
      href: '/',
    },
    {
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.75 7.58331C8.75 10.4778 11.1055 12.8333 14 12.8333C16.8945 12.8333 19.25 10.4778 19.25 7.58331C19.25 4.68881 16.8945 2.33331 14 2.33331C11.1055 2.33331 8.75 4.68881 8.75 7.58331ZM23.3333 24.5H24.5V23.3333C24.5 18.8311 20.8355 15.1666 16.3333 15.1666H11.6667C7.16333 15.1666 3.5 18.8311 3.5 23.3333V24.5H4.66667H5.83333H22.1667H23.3333Z"
            fill="#707070"
          />
        </svg>
      ),
      text: 'Profil',
      href: '/profil',
    },
  ],
  activeItemHref: null,
} as MainNavbarProps;

interface LayoutProps {
  title?: string;
  back?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  back = false,
  children,
}) => {
  const layoutMainHeaderProps = {
    src: '/header/logo.png',
    alt: 'Wave Logo',
    title: title,
    back: back,
  } as MainHeaderProps;

  const router = useRouter();

  const pathname = router.pathname;

  const mainNavbarProps = useMemo(
    () => ({
      ...layoutMainNavbarProps,
      activeItemHref:
        layoutMainNavbarProps.mainNavbarItems.filter(
          (item) => `/${pathname.slice(1).split('/')[0]}` === item.href
        )[0]?.href ?? null,
    }),
    [pathname]
  );

  const mainHeaderProps = useMemo(() => layoutMainHeaderProps, []);

  return (
    <div tw="min-h-screen flex flex-col items-center justify-center">
      <MainHeader {...mainHeaderProps} />
      <div tw="w-full border[1px solid #CDCCCC] pt-[70px] pb-[calc(66px + 24px)] max-w-screen-md">
        {children}
      </div>
      <Detector
        render={({ online }) => (
          <div
            id="wave-network-detector"
            tw="w-full fixed bottom-[66px] max-w-screen-md"
          >
            {!online ? (
              <div css={[tw`text-center bg-yellow-300`]}>
                You are currently offline
              </div>
            ) : null}
          </div>
        )}
      />
      <MainNavbar {...mainNavbarProps} />
    </div>
  );
};

export const LayoutStart: React.FC<LayoutProps> = ({
  title,
  back = false,
  children,
}) => {
  const layoutMainHeaderProps = {
    src: '/header/logo.png',
    alt: 'Wave Logo',
    title: title,
    back: back,
  } as MainHeaderProps;

  const router = useRouter();

  const pathname = router.pathname;

  const mainNavbarProps = useMemo(
    () => ({
      ...layoutMainNavbarProps,
      activeItemHref:
        layoutMainNavbarProps.mainNavbarItems.filter(
          (item) => `/${pathname.slice(1).split('/')[0]}` === item.href
        )[0]?.href ?? null,
    }),
    [pathname]
  );

  const mainHeaderProps = useMemo(() => layoutMainHeaderProps, []);

  return (
    <div tw="min-h-screen flex flex-col items-start justify-start">
      <MainHeader {...mainHeaderProps} />
      <div tw="w-full pt-[70px] max-w-screen-md">
        {children}
      </div>
      <Detector
        render={({ online }) => (
          <div
            id="wave-network-detector"
            tw="w-full fixed bottom-[66px] max-w-screen-md"
          >
            {!online ? (
              <div css={[tw`text-center bg-yellow-300`]}>
                You are currently offline
              </div>
            ) : null}
          </div>
        )}
      />
      <MainNavbar {...mainNavbarProps} />
    </div>
  );
};