import React from 'react';
import 'twin.macro';

interface LandingWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<LandingWrapperProps> = ({ children }) => {
  return (
    <div tw="min-h-screen flex flex-col items-center justify-center">
      <div tw="w-full max-w-screen-md max-h-screen text-center px-4 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
