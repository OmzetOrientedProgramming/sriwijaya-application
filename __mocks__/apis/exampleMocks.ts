import { AxiosResponse } from "axios";

// Dummy list data requested
export const dummyResponse = {
  page: 1,
  data: [
    { id: 1, email: 'a@gmail.com', first_name: 'Abik' },
    { id: 2, email: 'b@gmail.com', first_name: 'Abik' },
    { id: 3, email: 'c@gmail.com', first_name: 'Abik' },
    { id: 4, email: 'd@gmail.com', first_name: 'Abik' },
    { id: 5, email: 'e@gmail.com', first_name: 'Abik' },
    { id: 6, email: 'f@gmail.com', first_name: 'Abik' },
  ],
  text: 'dummy data',
};

// Prepare the response we want to get from axios
export const mockedResponse: AxiosResponse = {
  data: dummyResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const getParams = {
  page: 2,
};

export const postParams = {
  name: 'budi',
  job: 'softeng',
};