import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const LandingPageWrapper: React.FC = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
