import { AxiosResponse } from 'axios';

export const reviewAndRatingPaginationSuccessResponse = {
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
    reviews: [
      {
        id: 0,
        name: 'mock_name_0',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-13 23:17:17.107',
      },
      {
        id: 1,
        name: 'mock_name_1',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-14 23:17:17.107',
      },
      {
        id: 2,
        name: 'mock_name_2',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-15 23:17:17.107',
      },
      {
        id: 3,
        name: 'mock_name_3',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-16 23:17:17.107',
      },
      {
        id: 4,
        name: 'mock_name_4',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-17 23:17:17.107',
      },
      {
        id: 5,
        name: 'mock_name_5',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-18 23:17:17.107',
      },
      {
        id: 6,
        name: 'mock_name_6',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-19 23:17:17.107',
      },
      {
        id: 7,
        name: 'mock_name_7',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-20 23:17:17.107',
      },
      {
        id: 8,
        name: 'mock_name_8',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-21 23:17:17.107',
      },
      {
        id: 9,
        name: 'mock_name_9',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-22 23:17:17.107',
      },
      {
        id: 10,
        name: 'mock_name_10',
        rating: 5,
        content: 'menarik',
        created_at: '2022-03-23 23:17:17.107',
      },
    ],
    total_review: 11,
  },
};

export const reviewRatingMockedResponse = {
  status: 200,
  message: 'success',
  data: reviewAndRatingPaginationSuccessResponse,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const reviewRatingMockedFailedResponse = {
  status: 401,
  message: 'unauthorized',
  data: {},
  statusText: 'OK',
  headers: {},
  config: {},
};

export const getReviewRatingParams = {
  placeID: '1',
  limit: 1,
  page: 1,
  latest: true,
  rating: false,
};
