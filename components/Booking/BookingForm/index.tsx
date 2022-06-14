import React, { createContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import moment from 'moment';
import tw from 'twin.macro';

import InputVisitor from './InputVisitor';
import InputDate from './InputDate';
import InputHour from './InputHour';
import InputResult from './InputResult';
import InputItems, { IItem } from './InputItems';
import InputDetailItem from './InputDetailItem';
import InputCart from './InputCart';

export const BookingFormContext = createContext<{
  step: number;
  setStep: any;
  maxStep: number;
  activeItem: (IItem & { qty: number }) | null;
  setActiveItem: any;
}>({
  step: 1,
  setStep: null,
  maxStep: 6,
  activeItem: null,
  setActiveItem: null,
});

interface BookingFormProps {
  placeData: any;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  activeItem: (IItem & { qty: number }) | null;
  setActiveItem: any;
}

const MAX_STEP = 6;

const BookingForm: React.FC<BookingFormProps> = (props) => {
  const { placeData, step, setStep, activeItem, setActiveItem } = props;

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      count: 0,
      items: {},
      start_time: null,
      end_time: null,
      date: moment().format('YYYY-MM-DD'),
    },
  });

  const handleSubmit = (e: React.FormEvent) => e.preventDefault();

  return (
    <BookingFormContext.Provider
      value={{ step, setStep, activeItem, setActiveItem, maxStep: MAX_STEP }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
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
              placeName={placeData.name}
              placePrice={placeData.booking_price}
            />
          )}
          {step === 5 &&
            (activeItem !== null ? (
              <InputDetailItem item={activeItem} />
            ) : (
              <InputItems placeId={placeData.id} />
            ))}

          {step === 6 && <InputCart placeId={placeData.id} />}
        </form>
      </FormProvider>
    </BookingFormContext.Provider>
  );
};

export default BookingForm;

export const renderStep = (step: number, maxStep: number) => {
  const isLessThanMaxStep = step < maxStep;
  return (
    <div tw="flex flex-row flex-shrink-0 items-center space-x-1">
      <p
        tw="text-base"
        css={[isLessThanMaxStep ? tw`color[#335c85]` : tw`color[#03bd36]`]}
      >
        Step{' '}
        <span tw="font-semibold">
          {step}/{maxStep}
        </span>
      </p>
      <div tw="w-5 h-5">
        {isLessThanMaxStep ? (
          <img tw="w-full h-full" src="/icon/check-blue.png" alt="Check" />
        ) : (
          <img tw="w-full h-full" src="/icon/check-green.png" alt="Check" />
        )}
      </div>
    </div>
  );
};
