import React, { useState, useEffect, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import moment from 'moment';
import 'twin.macro';

import { Drawer } from '../../Drawer';
import BookingCalendar from '../BookingCalendar/BookingCalendar';
import { BookingFormContext } from '.';
import { useGetBookingDate } from '../../../apis/hooks/bookingHooks';
import BackgroundWrapper from './BackgroundWrapper';
import Button from '../../Utils/Button';

interface InputDateProps {
  placeId: number;
  placeName: string;
  placeImage: string;
}

const InputDate: React.FC<InputDateProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { placeId, placeName, placeImage } = props;

  const { step, setStep } = useContext(BookingFormContext);

  const {
    handleSubmit,
    watch,
    trigger,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [count, date] = watch(['count', 'date']);

  const params = {
    placeId,
    count,
    date: moment().format('YYYY-MM-DD'),
    interval: 30,
  };

  const { data, isLoading, isError } = useGetBookingDate(params);

  let availableDates = data?.data ?? [];
  availableDates = availableDates.filter(
    (date: any) => date.status === 'available'
  );
  availableDates = availableDates.map((date: any) => date.date);

  useEffect(() => {
    register('date', {
      required: true,
      validate: (value) => availableDates.includes(value),
    });
  }, [register, availableDates]);

  return (
    <BackgroundWrapper background={placeImage}>
      <div tw="mt-6">
        <div tw="flex flex-col items-center">
          <h1 tw="text-2xl font-bold">Pemesanan</h1>
          <p tw="mt-2 font-semibold">{placeName}</p>
        </div>
        <div tw="mt-6">
          <p tw="font-medium text-xs">Pilih tanggal pemesanan</p>
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            tw="flex mt-3 justify-between items-center w-full py-3 px-4 border[1px solid #000000] rounded-[0.25rem]"
          >
            <label tw="mr-2">{date}</label>
            <img src="/icon/polygon-bottom.png" alt="Dropdown" />
          </button>
          <p tw="text-xs mt-2 ml-2 color[#FE3131]">
            {errors.date?.type === 'required' && '*Date is required!'}
            {errors.date?.type === 'validate' && '*That date is not available!'}
          </p>
        </div>
        <div tw="flex justify-between space-x-4 mt-9">
          <div tw="flex flex-shrink-0 items-center space-x-1">
            <p tw="text-base color[#335c85]">
              Step <span tw="font-semibold">{step}/4</span>
            </p>
            <div tw="w-5 h-5">
              <img tw="w-full h-full" src="/icon/check-blue.png" alt="Check" />
            </div>
          </div>
          <Button
            type="submit"
            disabled={errors.date}
            onClick={handleSubmit(() => {
              return setStep((prev: number) => prev + 1);
            })}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <BookingCalendar
          date={moment(date)}
          setDate={(newDate: moment.Moment) => {
            // setDate(newDate);
            setValue('date', newDate.format('YYYY-MM-DD'));
            trigger('date');
            setIsOpen(false);
          }}
          availableDates={availableDates}
        />
      </Drawer>
    </BackgroundWrapper>
  );
};

export default InputDate;
