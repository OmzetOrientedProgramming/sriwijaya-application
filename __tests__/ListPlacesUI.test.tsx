import React, { useState } from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ListPlaces from "../pages/ListPlaces"
import { QueryClient, QueryClientProvider } from 'react-query';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});


const setupWrapper = () => {
    const queryClient = new QueryClient();
  
    const Wrapper: React.FC = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  
    return Wrapper;
};


describe('Test UI For List Places ', () => {
    test('page display data requested', async () => {
        const Wrapper = setupWrapper();

        render(
        <Wrapper>
            <ListPlaces/>
        </Wrapper>
        );


        await waitFor(() => {
        expect(screen.queryByText('mock_place_name_0')).toBeInTheDocument();
        });
    });
});