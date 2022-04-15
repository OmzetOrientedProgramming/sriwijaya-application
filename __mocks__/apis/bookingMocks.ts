export const dummyResponseBookingDate = {
  status: 200,
  message: 'success',
  data: [
    {
      date: '2022-02-01',
      status: 'available',
    },
    {
      date: '2022-02-02',
      status: 'fully booked',
    },
  ],
};

export const mockedResponseBookingDate = {
  status: 200,
  message: 'success',
  data: dummyResponseBookingDate,
  statusText: 'OK',
  headers: {},
  config: {},
};
