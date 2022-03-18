import React, { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AxiosResponse } from 'axios';

import { AuthFormSession } from '../../components/Auth/AuthForm/types';

interface AuthFormWrapperProps {
  phone_number?: string;
  otp?: string;
  name?: string;
}

export const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  phone_number,
  otp,
  name,
  children,
}) => {
  const queryClient = new QueryClient();

  const AuthFormContext = createContext<{
    step: number;
    setStep: any;
  }>({
    step: 1,
    setStep: null,
  });

  const [step, setStep] = useState(1);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      phone_number: phone_number || '',
      otp: otp || '',
      otpArr: [...Array(6)],
      name: name || '',
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthFormContext.Provider
        value={{
          step: step,
          setStep: setStep,
        }}
      >
        <FormProvider {...methods}>
          <form>{children}</form>
        </FormProvider>
      </AuthFormContext.Provider>
    </QueryClientProvider>
  );
};

export const registerSession = 'register' as AuthFormSession;
export const loginSession = 'login' as AuthFormSession;
