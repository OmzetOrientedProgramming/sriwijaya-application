import React from 'react';
import tw, { css } from 'twin.macro';

interface LandingWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<LandingWrapperProps> = ({ children }) => {
  return (
    <div
      css={[
        css`
          @media (min-width: 400px) {
            margin-left: auto;
            margin-right: auto;
          }
        `,
        tw`max-h-screen max-w-sm text-center mx-4 mt-8 flex flex-col justify-center items-center`,
      ]}
    >
      {children}
    </div>
  );
};

export default AuthWrapper;
