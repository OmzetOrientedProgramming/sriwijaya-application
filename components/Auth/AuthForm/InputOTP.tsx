import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import tw, { css } from 'twin.macro';
import nookies from 'nookies';
import Router from 'next/router';

import { useVerifyOTP } from '../../../apis/hooks/authHooks';
import Button from '../../Utils/Button';
import { AuthFormContext } from '.';
import { AuthFormSession } from './types';
import capitalize from '../../../utils/capitalize';

export const handleRef = (e: any) => {
  if (e.target.value !== '') {
    try {
      e.target.nextSibling.focus();
    } catch (err) {
      // ignore
    }
  }
};

export const combineArrayToString = (otpData: string[]) => {
  let res = '';
  otpData.forEach((kode: string) => (res = res + kode));
  return res;
};

interface InputOTPProps {
  session: AuthFormSession;
}

const InputOTP: React.FC<InputOTPProps> = (props) => {
  const { setStep } = useContext(AuthFormContext);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const otpData = watch('otpArr');

  const { mutate: verifyOTP, isLoading: isVerifyingOTP } = useVerifyOTP();

  const { session } = props;

  return (
    <>
      <h1 tw="text-base font-bold mb-2">Verifikasi nomor teleponmu</h1>
      <p tw="text-xs font-normal mb-6">
        Kami baru mengirimkan kode ke nomor telepon kamu, masukkin yuk biar kami
        tahu ini beneran kamu.
      </p>
      <div tw="flex flex-col justify-center items-center text-xs">
        <label tw="mb-2">
          Kode OTP<span tw="color[#FE3131]">*</span>
        </label>
        <div
          css={[
            css`
              min-width: 226px;
            `,
            tw`grid grid-cols-6 gap-x-2`,
          ]}
        >
          {[...Array(6)].map((_: any, i: number) => {
            return (
              <input
                type="number"
                key={i}
                data-testid={`otp-${i}`}
                {...register(`otpArr.${i}`, {
                  required: true,
                  onBlur: () => setValue('otp', combineArrayToString(otpData)),
                  max: 9, // should prevent user to type more
                  maxLength: 1,
                })}
                tw="h-8 w-8 text-center border border-black rounded"
                onChange={handleRef}
              />
            );
          })}
        </div>
      </div>
      <p tw="mt-2 ml-2 color[#FE3131]">{errors.otpArr && '*OTP is invalid'}</p>

      <div tw="mt-6">
        <Button
          onClick={handleSubmit((data: any) => {
            return verifyOTP(
              {
                otp: data.otp,
                session_info: data.session_info,
              },
              {
                onSuccess: (res: any) => {
                  let resData = res?.data;
                  if (resData.message !== 'success') return;
                  const accessToken = resData.data.access_token;
                  const refreshToken = resData.data.refresh_token;
                  nookies.set(null, 'accessToken', accessToken, {
                    path: '/',
                  });
                  nookies.set(null, 'refreshToken', refreshToken, {
                    path: '/',
                  });
                  if (session === 'register')
                    return setStep((step: number) => step + 1);
                  else
                    return Router.push({
                      pathname: 'auth/success',
                      query: { session },
                    });
                },
                onError: (err: any) => {
                  err.response.data.errors?.forEach((response: string) => {
                    toast.error(capitalize(response), {
                      position: 'top-right',
                    });
                  });
                },
              }
            );
          })}
        >
          {isVerifyingOTP ? '. . .' : 'Selanjutnya'}
        </Button>
      </div>
    </>
  );
};

export default InputOTP;
