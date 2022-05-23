import React, { useContext, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import moment from 'moment';
import currency from 'currency.js';
import 'twin.macro';

import { BookingFormContext, renderStep } from '.';
import BackgroundWrapper from './BackgroundWrapper';
import Button from '../../Utils/Button';

interface InputResultProps {
  placeName: string;
  placePrice: string;
}

const InputResult: React.FC<InputResultProps> = (props) => {
  const { placeName, placePrice } = props;
  const { watch, handleSubmit } = useFormContext();
  const { step, setStep, maxStep } = useContext(BookingFormContext);

  const [count, date, startTime, endTime] = watch([
    'count',
    'date',
    'start_time',
    'end_time',
  ]);

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
          {renderStep(step, maxStep)}
          <Button
            type="button"
            onClick={() => {
              return setStep((prev: number) => prev + 1);
            }}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default InputResult;
