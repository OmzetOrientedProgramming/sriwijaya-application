import { AxiosResponse } from "axios";

export const viewProfileSuccessResponse = {
    status: 200,
    message: 'success',
    data: {
        "status": 200,
        "message": "success",
        "data": {
          "phone_number": "+62123456789",
          "name": "test full name",
          "gender": 0,
          "date_of_birth": "0001-01-01T00:00:00Z",
          "image": ""
        }
    },
  };

export const mockedResponse: AxiosResponse = {
    data: viewProfileSuccessResponse,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
};