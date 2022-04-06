import React, { useContext } from 'react';
import { styled } from 'twin.macro';
import { useFormContext } from 'react-hook-form';

import { BookingFormContext } from './';
import BackgroundWrapper from './BackgroundWrapper';
import Button from '../../Utils/Button';

interface InputVisitorProps {
  placeName: string;
  placeImage: string;
  minVisitor: number;
  maxVisitor: number;
}

const InputVisitor: React.FC<InputVisitorProps> = (props) => {
  const { placeName, placeImage, minVisitor, maxVisitor } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useFormContext();

  const { step, setStep } = useContext(BookingFormContext);
  const count = watch('count');

  return (
    <BackgroundWrapper background={placeImage}>
      <div tw="mt-6">
        <div tw="flex flex-col items-center">
          <h1 tw="text-2xl font-bold">Pemesanan</h1>
          <p tw="mt-2 font-semibold">{placeName}</p>
        </div>
        <div tw="mt-9">
          <h2 tw="text-xs font-medium">Masukkan jumlah pengunjung:</h2>
          <div tw="flex items-center mt-2 space-x-1">
            <div tw="w-4 h-4">
              <img
                tw="w-full h-full"
                src="/icon/danger-outline.png"
                alt="Danger"
              />
            </div>
            <p tw="text-xs">
              Slot Booking:{' '}
              <span>
                {minVisitor} - {maxVisitor} orang
              </span>
            </p>
          </div>
        </div>
        <div tw="mt-6">
          <div tw="flex justify-center items-center space-x-4">
            <StyledButton
              data-testid="decrease-button"
              type="button"
              onClick={() => {
                setValue('count', count - 1);
                trigger('count');
              }}
            >
              <img tw="w-full h-full" src="/icon/minus.png" alt="decrease" />
            </StyledButton>
            <StyledInput
              data-testid="visitor-input"
              type="number"
              tw="m-0"
              min={minVisitor}
              max={maxVisitor}
              onKeyDown={(e: React.KeyboardEvent) => validateKeyDown(e)}
              {...register('count', {
                required: true,
                valueAsNumber: true,
                min: minVisitor,
                max: maxVisitor,
              })}
            />
            <StyledButton
              data-testid="increase-button"
              type="button"
              onClick={() => {
                setValue('count', count + 1);
                trigger('count');
              }}
            >
              <img tw="w-full h-full" src="/icon/plus.png" alt="increase" />
            </StyledButton>
          </div>
          <p tw="text-xs mt-2 ml-2 color[#FE3131]">
            {errors.count?.type === 'max' &&
              '*Visitor is over the maximum accepted visitors!'}
            {errors.count?.type === 'min' &&
              '*Visitor is less than the minimum accepted visitors!'}
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
            disabled={errors.count}
            onClick={handleSubmit(() => {
              return setStep((prev: number) => prev + 1);
            })}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default InputVisitor;

const StyledInput = styled.input`
  margin: 0;
  padding: 0.75rem 1rem;
  border: 1px solid #000000;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  line-height: 150%;
  background: #ffffff;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  width: 1.5rem;
  height: 1.5rem;
`;

const validateKeyDown = (e: React.KeyboardEvent) => {
  const isArrow = /^[Arrow]/i.test(e.key);
  const isNumber = /^[0-9]$/i.test(e.key);
  const isBackspace = /^[Backspace]/i.test(e.key);
  const isDelete = /^[Delete]/i.test(e.key);

  if (!isNumber && !isArrow && !isBackspace && !isDelete) {
    e.preventDefault();
  }
};
