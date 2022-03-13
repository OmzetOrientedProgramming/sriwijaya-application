import React, { createContext, useState } from 'react';
import 'twin.macro';
import InputPhone from './InputPhone';
import { useForm, FormProvider } from 'react-hook-form';
import InputOTP from './InputOTP';
import InputName from './InputName';

export const AuthFormContext = createContext<{
  step: number;
  setStep: any;
}>({
  step: 0,
  setStep: null,
});

const AuthForm: React.FC = () => {
  const [step, setStep] = useState(1);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      phone: '',
      otp: '',
      otpArr: [...Array(6)],
      name: '',
    },
  });

  return (
    <AuthFormContext.Provider
      value={{
        step: step,
        setStep: setStep,
      }}
    >
      <div tw="flex flex-col text-left">
        <FormProvider {...methods}>
          <form tw="flex flex-col text-left text-xs">
            {step == 1 && <InputPhone />}
            {step == 2 && <InputOTP />}
            {step == 3 && <InputName />}
          </form>
        </FormProvider>
      </div>
    </AuthFormContext.Provider>
  );
};

export default AuthForm;
