import React, { createContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import moment from 'moment';
import 'twin.macro';

import InputVisitor from './InputVisitor';
import InputDate from './InputDate';
import InputHour from './InputHour';
import InputResult from './InputResult';

export const BookingFormContext = createContext<{ step: number; setStep: any }>(
  {
    step: 1,
    setStep: null,
  }
);

interface BookingFormProps {
  placeData: any;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const BookingForm: React.FC<BookingFormProps> = (props) => {
  const { placeData, step, setStep } = props;

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
    <BookingFormContext.Provider value={{ step, setStep }}>
      <FormProvider {...methods}>
        <form>
          {step === 1 && (
            <InputVisitor
              placeName={placeData.name}
              placeImage={placeData.image}
              minVisitor={placeData.min_slot}
              maxVisitor={placeData.max_slot}
            />
          )}
          {step === 2 && (
            <InputDate
              placeId={placeData.id}
              placeName={placeData.name}
              placeImage={placeData.image}
            />
          )}
          {step === 3 && (
            <InputHour
              placeId={placeData.id}
              placeName={placeData.name}
              placeOpenHour={placeData.open_hour}
              placeCloseHour={placeData.close_hour}
            />
          )}
          {step === 4 && (
            <InputResult
              placeId={placeData.id}
              placeName={placeData.name}
              placePrice={placeData.booking_price}
            />
          )}
        </form>
      </FormProvider>
    </BookingFormContext.Provider>
  );
};

export default BookingForm;
