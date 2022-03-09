import React from 'react';
import { Detector } from 'react-detect-offline';
import tw from 'twin.macro';

export const Layout: React.FC = ({ children }) => {
  return (
    <div tw="min-h-screen flex flex-col items-center justify-center">
      <div tw="min-h-screen w-full max-w-[360px]">{children}</div>
      <Detector
        render={({ online }) =>
          !online ? (
            <div css={[tw`w-full fixed bottom-10 text-center bg-yellow-300`]}>
              You are currently offline
            </div>
          ) : null
        }
      />
      <div tw="fixed bg-white bottom-0 border w-full">
        <div tw="flex justify-center items-center h-10">
          <p>Navbar</p>
        </div>
      </div>
    </div>
  );
};
