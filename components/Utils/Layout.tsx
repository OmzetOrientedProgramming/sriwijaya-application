import React from 'react';
import Head from 'next/head';
import { Detector } from 'react-detect-offline';
import tw from 'twin.macro';

export const Layout: React.FC = ({ children }) => {
  // Alternative to detect offline
  // const isOnline = useOnlineStatus();
  // const [status, setStatus] = useState(isOnline);

  // useEffect(() => {
  //   setStatus(isOnline);
  // }, [isOnline]);

  return (
    <>
      <Head>
        <title>NextJS Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="icon" type="image/png" href="/icon-192x192.png" />
      </Head>
      <div tw="min-h-screen flex flex-col items-center justify-center">
        <div tw="min-h-screen w-full">{children}</div>
        {/* {!status && (
          <div tw="bg-yellow-300 w-full fixed bottom-10 text-center">
            You are Offline!
          </div>
        )} */}
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
    </>
  );
};
