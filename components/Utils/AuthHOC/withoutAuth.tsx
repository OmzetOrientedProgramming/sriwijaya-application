import React from 'react';
import { NextPage, NextPageContext } from 'next';
import nookies from 'nookies';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import ErrorPage from 'next/error';

const loginURL = '/auth';
const withoutAuth: (WrappedComponent: NextPage) => NextPage = (
  WrappedComponent: NextPage
) => {
  const hocComponent: NextPage<any> = ({ ...props }) => {
    if (props.statusCode) {
      return <ErrorPage statusCode={props.statusCode} />;
    }
    return <WrappedComponent {...props} />;
  };

  hocComponent.getInitialProps = async (ctx: NextPageContext) => {
    const accessToken = nookies.get(ctx)?.accessToken;

    const flag =
      accessToken &&
      Date.now() >= (jwtDecode<JwtPayload>(accessToken).exp ?? Date.now() + 1);

    if (flag) {
      return { statusCode: 404 };
    }

    if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(ctx);
      return { ...wrappedProps };
    }

    return {};
  };

  return hocComponent;
};

export default withoutAuth;
