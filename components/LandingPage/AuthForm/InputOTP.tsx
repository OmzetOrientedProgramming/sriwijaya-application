import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import tw, { css } from 'twin.macro';
import { AuthFormContext } from '.';
import { useVerifyOTP } from '../../../api/hooks/registrationHooks';
import Button from '../../Utils/Button';

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

const InputOTP: React.FC = () => {
  const { setStep } = useContext(AuthFormContext);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const otpData = watch('otpArr');

  const { mutate: verifyOTP } = useVerifyOTP();

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
                session: 'register',
                phone_number: `0${data.phone}`,
                otp: data.otp,
              },
              {
                onSuccess: (res: any) => {
                  // console.log(res);
                  setStep((step: number) => step + 1);
                },
                onError: (err: any) => {
                  // console.log(err);
                  toast.error(err.message, { position: 'top-right' });
                },
              }
            );
          })}
        >
          Selanjutnya
        </Button>
      </div>
    </>
  );
};

export default InputOTP;
