import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'twin.macro';

import GlobalStyles from './../styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { OnlineStatusProvider } from '../components/Utils/useOnlineStatus';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
