import React, { useContext, useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useFormContext } from 'react-hook-form';
import { RecaptchaVerifier } from 'firebase/auth';
import 'twin.macro';

import { AuthFormContext } from '.';
import { AuthFormSession } from './types';
import { auth } from '../../../firebase';
import Button from '../../Utils/Button';
import { useCheckPhoneNumber } from '../../../apis/hooks/authHooks';
import capitalize from '../../../utils/capitalize';

interface InputPhoneProps {
  session: AuthFormSession;
}

const InputPhone: React.FC<InputPhoneProps> = (props) => {
  const { setStep } = useContext(AuthFormContext);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<any>();
  const recaptchaValidatorWrapperRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const { mutate: checkPhoneNumber, isLoading: isCheckingPhoneNumber } =
    useCheckPhoneNumber();

  const { session } = props;

  const recaptchaToken = watch('recaptchaToken');

  useEffect(
    () =>
      setRecaptchaVerifier(
        new RecaptchaVerifier(
          'recaptcha-validator',
          { size: 'invisible' },
          auth
        )
      ),
    []
  );

  useEffect(() => {
    if (!recaptchaToken)
      toast.loading('Please wait while we prepare captcha...', {
        duration: 3000,
      });
  }, [recaptchaToken]);

  useEffect(() => {
    if (!recaptchaVerifier) return;
    recaptchaVerifier
      .verify()
      .then((token: string) => setValue('recaptchaToken', token));
  }, [recaptchaVerifier]);

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
        <div ref={recaptchaValidatorWrapperRef}>
          <div id="recaptcha-validator" />
        </div>
      </div>
      <p tw="mt-2 ml-2 color[#FE3131]">
        {errors.phone?.type === 'required' && '*Phone number is required'}
        {errors.phone?.type === 'maxLength' && '*Phone number is invalid'}
      </p>

      <div tw="mt-6">
        <Button
          onClick={handleSubmit(async (data: any) => {
            return checkPhoneNumber(
              {
                session,
                phone_number: `0${data.phone}`,
                recaptcha_token: data.recaptchaToken,
              },
              {
                onSuccess: (res: any) => {
                  const resData = res?.data;
                  if (!resData || resData.status !== 200) return;

                  setValue('session_info', resData.data.session_info);
                  setStep((step: number) => step + 1);
                },
                onError: (err: any) => {
                  recaptchaVerifier.clear();
                  if (recaptchaValidatorWrapperRef.current) {
                    recaptchaValidatorWrapperRef.current.innerHTML =
                      '<div id="recaptcha-validator"></div>';
                    setRecaptchaVerifier(
                      new RecaptchaVerifier(
                        'recaptcha-validator',
                        { size: 'invisible' },
                        auth
                      )
                    );
                  }
                  err.response.data.errors?.forEach((response: string) =>
                    toast.error(capitalize(response), {
                      position: 'top-right',
                    })
                  );
                },
              }
            );
          })}
          disabled={isCheckingPhoneNumber || !recaptchaToken}
        >
          {isCheckingPhoneNumber ? '. . .' : 'Selanjutnya'}
        </Button>
      </div>
    </>
  );
};

export default InputPhone;
