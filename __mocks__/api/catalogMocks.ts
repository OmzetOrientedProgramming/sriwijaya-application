import { AxiosResponse } from 'axios';

export const catalogPaginationSuccessResponse = {
  status: 200,
  message: 'success',
  data: {
    pagination: {
      limit: 5,
      page: 1,
      first_url: 'string',
      last_url: 'string',
      next_url: 'string',
      previous_url: 'string',
      total_page: 5,
    },
    items: [
      {
        id: 0,
        name: 'mock_item_name_0',
        image: '/images/tenda.jpg',
        price: 10000,
        description: 'mock_item_descriptions_0',
      },
      {
        id: 1,
        name: 'mock_item_name_1',
        image: '/images/tenda.jpg',
        price: 10000,
        description: 'mock_item_descriptions_1',
      },
      {
        id: 2,
        name: 'mock_item_name_2',
        image: '/images/tenda.jpg',
        price: 10000,
        description: 'mock_item_descriptions_2',
      },
      {
        id: 3,
        name: 'mock_item_name_3',
        image: '/images/tenda.jpg',
        price: 10000,
        description: 'mock_item_descriptions_3',
      },
    ],
  },
};

export const mockedResponse = {
  data: {
    status: 200,
    message: 'success',
    data: catalogPaginationSuccessResponse,
  },
  statusText: 'OK',
  headers: {},
  config: {},
};

export const getParams = {
  id: '1',
  name: '',
  limit: '',
  page: '',
};
