import React, { createContext, useState } from 'react';
import 'twin.macro';
import InputPhone from './InputPhone';
import { useForm, FormProvider } from 'react-hook-form';
import InputOTP from './InputOTP';
import InputName from './InputName';

import { AuthFormSession } from './types';

export const AuthFormContext = createContext<{
  step: number;
  setStep: any;
}>({
  step: 0,
  setStep: null,
});
interface AuthFormProps {
  session: AuthFormSession;
}

const AuthForm: React.FC<AuthFormProps> = (props) => {
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

  const { session } = props;

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
            {step == 1 && <InputPhone session={session} />}
            {step == 2 && <InputOTP session={session} />}
            {step == 3 && <InputName session={session} />}
          </form>
        </FormProvider>
      </div>
    </AuthFormContext.Provider>
  );
};

export default AuthForm;
