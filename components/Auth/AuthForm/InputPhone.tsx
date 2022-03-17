import React, { useContext } from 'react';
import 'twin.macro';
import { AuthFormContext } from '.';
import Button from '../../Utils/Button';
import { useFormContext } from 'react-hook-form';
import { useCheckPhoneNumber } from '../../../apis/hooks/authHooks';
import toast from 'react-hot-toast';

import { AuthFormSession } from './types';
import capitalize from '../../../utils/capitalize';

interface InputPhoneProps {
  session: AuthFormSession;
}

const InputPhone: React.FC<InputPhoneProps> = (props) => {
  const { setStep } = useContext(AuthFormContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const { mutate: checkPhoneNumber, isLoading: isCheckingPhoneNumber } =
    useCheckPhoneNumber();

  const { session } = props;

  return (
    <>
      <h1 tw="text-base font-bold mb-2">Masukkan nomor teleponmu</h1>
      <p tw="text-xs font-normal mb-6">
        Kami butuh nomor teleponmu sebagai identifikasi akun Wave kamu.
      </p>
      <label htmlFor="phone" tw="mb-2">
        Nomor HP<span tw="color[#FE3131]">*</span>
      </label>
      <div tw="flex flex-row">
        <input
          type="text"
          name="country-code"
          id="country-code"
          tw="text-center h-8 w-9 mr-2 border border-black rounded background[#EDEDED]"
          value="+62"
          disabled
        />
        <input
          type="number"
          id="phone"
          {...register('phone', {
            required: true,
            maxLength: 12,
          })}
          tw="inline-block w-full h-8 px-2 border border-black rounded"
        />
      </div>
      <p tw="mt-2 ml-2 color[#FE3131]">
        {errors.phone?.type === 'required' && '*Phone number is required'}
        {errors.phone?.type === 'maxLength' && '*Phone number is invalid'}
      </p>

      <div tw="mt-6">
        <Button
          onClick={handleSubmit((data: any) => {
            return checkPhoneNumber(
              { session, phone_number: `0${data.phone}` },
              {
                onSuccess: (res: any) => {
                  // console.log(res);
                  setStep((step: number) => step + 1);
                },
                onError: (err: any) => {
                  // console.log(err)
                  toast.error(capitalize(err.response.data.message), {
                    position: 'top-right',
                  });
                },
              }
            );
          })}
        >
          {isCheckingPhoneNumber ? '. . .' : 'Selanjutnya'}
        </Button>
      </div>
    </>
  );
};

export default InputPhone;
