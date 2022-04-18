import React, { useContext, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import moment from 'moment';
import currency from 'currency.js';
import toast from 'react-hot-toast';
import 'twin.macro';

import { BookingFormContext } from '.';
import BackgroundWrapper from './BackgroundWrapper';
import Button from '../../Utils/Button';
import { usePostCreateBooking } from '../../../apis/hooks/bookingHooks';
import { headers } from '../../../apis/constants';
import axios from 'axios';
import endpoint from '../../../apis/endpoint';
import nookies from 'nookies';

interface InputResultProps {
  placeId: number;
  placeName: string;
  placePrice: string;
}

const InputResult: React.FC<InputResultProps> = (props) => {
  const { placeId, placeName, placePrice } = props;
  const {
    watch,
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const { step } = useContext(BookingFormContext);
  const router = useRouter();

  const options = {
    headers: {
      ...headers,
      Authorization: `Bearer ${nookies.get(null)?.accessToken}`,
    },
  };

  const { mutateAsync, isLoading } = usePostCreateBooking();

  const [count, date, startTime, endTime] = watch([
    'count',
    'date',
    'start_time',
    'end_time',
  ]);

  const isDisabled = JSON.stringify(errors) !== '{}';

  const onSubmit = useCallback(
    async (data: any) => {
      const postCreateBookingParams = {
        placeId,
        ...data,
      };
      try {
        const bookingResponse = await mutateAsync(postCreateBookingParams);
        if (bookingResponse.message === 'success') {
          setTimeout(function () {
            console.log('setTimeout');
            axios.get(endpoint.ongoingBookings, options).then((res) => {
              console.log(res.data[6]);
              if (res.data[6].status === 0) {
                console.log('Expired Gagal');
              } else {
                console.log('Confirmed!');
              }
            });
          }, 30 * 1000);

          toast.success('Sukses membuat booking!');
          router.push('/booking-saya');
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    [placeId]
  );

  return (
    <BackgroundWrapper>
      <div tw="mt-6">
        <div tw="flex flex-col items-center">
          <h1 tw="text-2xl font-bold">Rincian Pemesanan</h1>
          <p tw="mt-2 font-semibold">{placeName}</p>
        </div>
        <div tw="mt-6 space-y-3">
          <div>
            <h2 tw="text-xs font-semibold">Tempat</h2>
            <p tw="mt-1 text-xs">{placeName}</p>
          </div>
          <div>
            <h2 tw="text-xs font-semibold">Jumlah Pengunjung</h2>
            <p tw="mt-1 text-xs">{count}</p>
          </div>
          <div>
            <h2 tw="text-xs font-semibold">Tanggal</h2>
            <p tw="mt-1 text-xs">{moment(date).format('DD MMMM YYYY')}</p>
          </div>
          <div>
            <h2 tw="text-xs font-semibold">Waktu</h2>
            <p tw="mt-1 text-xs">
              {moment(startTime, 'HH:mm:ss').format('HH:mm')} -{' '}
              {moment(endTime, 'HH:mm:ss').format('HH:mm')}
            </p>
          </div>
          <div>
            <h2 tw="text-xs font-semibold">Biaya Pemesanan</h2>
            <p tw="mt-1 text-xs">
              {currency(placePrice, {
                symbol: 'Rp.',
                decimal: ',',
                separator: '.',
              }).format()}
            </p>
          </div>
        </div>
        <div tw="flex justify-between space-x-4 mt-9">
          <div tw="flex flex-shrink-0 items-center space-x-1">
            <p tw="text-base color[#03bd36]">
              Step <span tw="font-semibold">{step}/4</span>
            </p>
            <div tw="w-5 h-5">
              <img tw="w-full h-full" src="/icon/check-green.png" alt="Check" />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isDisabled || isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default InputResult;
