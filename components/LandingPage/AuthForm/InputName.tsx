import Router from 'next/router';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import 'twin.macro';
import { useRegisterCustomer } from '../../../api/hooks/registrationHooks';
import Button from '../../Utils/Button';

const InputName: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const { mutate: registerCustomer } = useRegisterCustomer();

  return (
    <>
      <h1 tw="text-base font-bold mb-2">Masukkan nama kamu</h1>
      <p tw="text-xs font-normal mb-6">
        Biar kami bisa menginfokan tempat booking kamu nanti dari siapa.
      </p>
      <label htmlFor="name" tw="mb-2">
        Nama<span tw="color[#FE3131]">*</span>
      </label>
      <div tw="flex">
        <input
          id="name"
          {...register('name', {
            required: true,
            maxLength: 30,
            pattern: /^[a-zA-Z ]*$/,
          })}
          tw="w-full h-8 px-2 border border-black rounded"
        />
      </div>
      <p tw="mt-2 ml-2 color[#FE3131]">
        {errors.name?.type === 'required' && '*Name is required'}
        {errors.name?.type === 'maxLength' && '*Name is too long'}
        {errors.name?.type === 'pattern' && '*Name is invalid'}
      </p>

      <div tw="mt-6">
        <Button
          onClick={handleSubmit((data: any) => {
            return registerCustomer(
              {
                phone_number: `0${data.phone}`,
                full_name: data.name,
              },
              {
                onSuccess: (res: any) => {
                  // console.log(res);
                  Router.push({
                    pathname: '/auth/success',
                    query: { session: 'Register' },
                  });
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

export default InputName;
