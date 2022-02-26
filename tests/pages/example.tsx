import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import Example from '../../pages/example';

// // THIRD mock axios
// jest.mock('axios');
// const mockAxios = axios as jest.Mocked<typeof axios>;

// const dummyFactData = { fact: 'some-fact-1', length: 11 };

// test('react-query works', async () => {
//   interface wrapperProps {
//     children: React.ReactNode;
//   }

//   const queryClient = new QueryClient();

//   const Wrapper: React.FC<wrapperProps> = ({ children }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );

//   //show loader
//   render(
//     <Wrapper>
//       <Example />
//     </Wrapper>
//   );
//   console.log(screen.debug());
//   expect(screen.getByText('Loading data . . .')).toBeInTheDocument();
//   expect(mockAxios.get).toHaveBeenCalledTimes(1);

//   // const { result, waitFor } = renderHook(
//   //   () => useQuery('data', () => 'Hello'),
//   //   { wrapper }
//   // );

//   // await waitFor(() => result.current.isSuccess);

//   // expect(result.current.data).toEqual('Hello');
// });

// test('fetches data from catfact', async () => {
//   // setup
//   mockAxios.get.mockImplementationOnce(() =>
//     Promise.resolve({
//       data: dummyFactData,
//     })
//   );

//   // work
//   const response = await getData();

//   // expect
//   expect(response.length).toEqual(11);
//   expect(mockAxios.get).toHaveBeenCalledTimes(2);
//   expect(mockAxios.get).toHaveBeenCalledWith('https://catfact.ninja/facts');

//   //check what's rendered in the row
//   // const rowValues = await screen.findByTestId('row');
//   // console.log(rowValues);
//   // expect(rowValues).toContain(<p>11</p>);
// });

// // // SECOND mock axios
// // const mockedAxios = axios as jest.Mocked<typeof axios>;
// // test("show loader when it's fetching data, then render users' name on rows", async () => {
// //   mockedAxios.get.mockResolvedValueOnce({
// //     data: {
// //       results: [
// //         {
// //           name: {
// //             first: 'ali',
// //           },
// //         },
// //         {
// //           name: {
// //             first: 'abu',
// //           },
// //         },
// //       ],
// //     },
// //   });

// //   //show loader
// //   const { getAllByTestId, getByText } = render(<Users />);
// //   expect(getByText(/loading.../i)).toBeInTheDocument();

// //   //check what's rendered in the row
// //   const rowValues = await waitForElement(() =>
// //     getAllByTestId('row').map((row) => row.textContent)
// //   );
// //   expect(rowValues).toEqual(['ali', 'abu']);
// //   expect(mockedAxios.get).toHaveBeenCalledWith(url);
// //   expect(mockedAxios.get).toHaveBeenCalledTimes(1);
// // });

// // FIRST jest-mock-fetch
// // const dummyGetData = { fact: 'some-fact-1', length: 11 };

// // global.fetch = jest.fn(() =>
// //   Promise.resolve({
// //     json: () => Promise.resolve(dummyGetData),
// //   })
// // ) as jest.Mock;

// // // beforeEach(() => {
// // //   fetch.mockClear();
// // // });

// // test('fetch returns data when success', async () => {
// //   const factData = await getData();
// //   console.log(factData);

// //   expect(factData.length).toEqual(11);
// //   // expect(fetch).toHaveBeenCalledTimes(1);
// // });

// // // test('fetch returns null when exception', async () => {
// // //   fetch.mockImplementationOnce(() => Promise.reject('API is down'));

// // //   const factData = await getData();
// // //   console.log(factData);

// // //   expect(factData).toEqual(null);
// // // });

// // // test('renders example correctly', async () => {
// // //   render(<Example />);

// // //   expect(await screen.findByText('Back to Home')).toBeTruthy();
// // //   // expect(await screen.getByText()).toBeTruthy();
// // //   // expect(fetch).toHaveBeenCalledTimes(1);
// // // });
