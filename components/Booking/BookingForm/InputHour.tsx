import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import moment from 'moment';
import { styled } from 'twin.macro';

import { BookingFormContext, renderStep } from '.';
import BackgroundWrapper from './BackgroundWrapper';
import Button from '../../Utils/Button';
import { useGetPlaceTimeSlots } from '../../../apis/hooks/placeDetailHooks';
import { useGetBookingTime } from '../../../apis/hooks/bookingHooks';

interface InputHourProps {
  placeId: number;
  placeName: string;
  placeOpenHour: string;
  placeCloseHour: string;
}

const InputHour: React.FC<InputHourProps> = (props) => {
  const { placeId, placeName, placeOpenHour, placeCloseHour } = props;
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const { step, setStep, maxStep } = useContext(BookingFormContext);

  const [date, startTime, count, endTime] = watch([
    'date',
    'start_time',
    'count',
    'end_time',
  ]);

  const timeSlotsParams = {
    id: placeId.toString(),
    date,
  };

  const { data: placeTimeSlotsData } = useGetPlaceTimeSlots(timeSlotsParams);

  const timeSlotsData = placeTimeSlotsData?.data;

  const checkOutParams = {
    placeId,
    check_in: startTime,
    count,
    date,
  };

  const { data: checkOutData } = useGetBookingTime(checkOutParams, {
    enabled: !!startTime,
  });

  const timeSlotsCheckoutData = checkOutData?.data;

  return (
    <BackgroundWrapper>
      <div tw="mt-6">
        <div tw="flex flex-col items-center">
          <h1 tw="text-2xl font-bold">Pemesanan</h1>
          <p tw="mt-2 font-semibold">{placeName}</p>
        </div>
        <div tw="mt-6">
          <div tw="flex justify-between space-x-4">
            <p tw="text-xs">Pilih jam check-in:</p>
            <p tw="text-xs">
              Jam buka: {moment.utc(placeOpenHour).format('HH:mm')} -{' '}
              {moment.utc(placeCloseHour).format('HH:mm')}
            </p>
          </div>
          {timeSlotsData ? (
            timeSlotsData.length > 0 ? (
              <div tw="grid grid-cols-4 gap-3 mt-3">
                {timeSlotsData?.map((timeSlot: any, key: number) => (
                  <StyledRadioContainer key={key}>
                    <label>
                      <input
                        type="radio"
                        value={timeSlot.start_time}
                        {...register('start_time', { required: true })}
                        name="start_time"
                      />
                      <h1>
                        {moment(timeSlot.start_time, 'HH:mm:ss').format(
                          'HH:mm'
                        )}
                      </h1>
                    </label>
                  </StyledRadioContainer>
                ))}
              </div>
            ) : (
              <div tw="mt-3 flex justify-center items-center">
                <p tw="text-center py-3 text-xs">
                  Anda sudah tidak bisa check in di jam ini.
                </p>
              </div>
            )
          ) : (
            <h1>Loading...</h1>
          )}
          <p tw="text-xs mt-2 ml-2 color[#FE3131]">
            {errors.start_time?.type === 'required' &&
              '*Start time is required!'}
          </p>
        </div>
        {startTime && (
          <div tw="mt-6">
            <div tw="flex justify-between space-x-4">
              <p tw="text-xs">Pilih jam check-out:</p>
            </div>
            {timeSlotsCheckoutData ? (
              timeSlotsCheckoutData.length > 0 ? (
                <div tw="grid grid-cols-4 gap-3 mt-3">
                  {timeSlotsCheckoutData?.map((timeSlot: any, key: number) => (
                    <StyledRadioContainer key={key}>
                      <label>
                        <input
                          type="radio"
                          value={timeSlot.time}
                          {...register('end_time', { required: true })}
                          name="end_time"
                        />
                        <h1>
                          {moment(timeSlot.time, 'HH:mm:ss').format('HH:mm')}
                        </h1>
                      </label>
                    </StyledRadioContainer>
                  ))}
                </div>
              ) : (
                <div tw="mt-3 flex justify-center items-center">
                  <p tw="text-center py-3 text-xs">Tidak ada jam check-out.</p>
                </div>
              )
            ) : (
              <h1>Loading...</h1>
            )}
            <p tw="text-xs mt-2 ml-2 color[#FE3131]">
              {errors.end_time?.type === 'required' && '*End time is required!'}
            </p>
          </div>
        )}
        {startTime && endTime && (
          <div tw="flex justify-between space-x-4 mt-9">
            {renderStep(step, maxStep)}
            <Button
              type="button"
              disabled={errors.start_time || errors.end_time}
              onClick={handleSubmit(() => {
                return setStep((prev: number) => prev + 1);
              })}
            >
              Selanjutnya
            </Button>
          </div>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default InputHour;

const StyledRadioContainer = styled.div`
  label {
    position: relative;
  }

  input[type='radio'] {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
  }

  input[type='radio'] + h1 {
    cursor: pointer;
    padding: 0.625rem 0.75rem;
    text-align: center;
    background: #ffffff;
    color: black;
    border: 1px solid #bdbdbd;
    border-radius: 0.25rem;
    font-size: 0.75rem;
  }

  input[type='radio']:checked + h1 {
    background: #003366;
    color: white;
    font-weight: 600;
  }
`;
