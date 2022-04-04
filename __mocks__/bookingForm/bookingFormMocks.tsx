import React, { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from 'react-query';
import moment from 'moment';

import { BookingFormContext } from '../../components/Booking/BookingForm';

interface BookingFormWrapperProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const BookingFormWrapper: React.FC<BookingFormWrapperProps> = ({
  children,
  step,
  setStep,
}) => {
  const queryClient = new QueryClient();
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      count: 0,
      items: [],
      start_time: null,
      end_time: null,
      date: moment().format('YYYY-MM-DD'),
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BookingFormContext.Provider value={{ step, setStep }}>
        <FormProvider {...methods}>
          <form>{children}</form>
        </FormProvider>
      </BookingFormContext.Provider>
    </QueryClientProvider>
  );
};
