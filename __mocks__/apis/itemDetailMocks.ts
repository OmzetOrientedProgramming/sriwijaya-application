import { AxiosResponse } from 'axios';

export const itemDetailSuccessResponse = {
  status: 200,
  message: 'success',
  data: {
    id: 0,
    name: 'mock_item_name_0',
    image: '/images/tenda.jpg',
    price: 100000000,
    description:
      'mock_item_descriptions_0 mock_item_descriptions_0 mock_item_descriptions_0',
  },
};

export const mockedResponse = {
  data: {
    status: 200,
    message: 'success',
    data: itemDetailSuccessResponse,
  },
  statusText: 'OK',
  headers: {},
  config: {},
};

export const getParams = {
  placeID: '1',
  itemID: '1',
};
