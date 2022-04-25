import React from 'react';
import tw, { styled, css } from 'twin.macro';
import Router from 'next/router';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  usePutEditProfile,
  useUploadProfilePicture,
} from '../../apis/hooks/profilHooks';

interface ProfileCardFormProps {
  customerProfilePicture: string;
  customerName: string;
  customerDateOfBirth: Date;
  customerSex: number;
  customerPhoneNumber: string;
}

interface Payload {
  name: string;
  profile_picture: string;
  date_of_birth: string;
  gender: number;
}

const ProfileCardForm: React.FC<ProfileCardFormProps> = (props) => {
  const methods = useForm<Payload>({
    mode: 'onChange',
    defaultValues: {
      name: props.customerName,
      profile_picture: props.customerProfilePicture,
      date_of_birth: formatDateOfBirthField(props.customerDateOfBirth),
      gender: props.customerSex,
    },
  });
  const {
    mutateAsync: uploadProfilePicture,
    isLoading: uploadProfilePictureLoading,
  } = useUploadProfilePicture();
  const { mutateAsync: editProfile } = usePutEditProfile();

  const { register, handleSubmit, setValue, watch } = methods;

  const onSubmit = async (data: any) => {
    try {
      data = {
        ...data,
        gender: parseInt(data.gender),
      };
      const response = await editProfile(data);
      toast.success(response.data.message);
      Router.back();
    } catch (error: any) {
      if (!error?.response?.data?.errors) {
        toast.error('Internal server error.');
        return;
      }
      error.response.data.errors.forEach((message: string) =>
        toast.error(message)
      );
    }
  };

  const [profilePicture] = watch(['profile_picture']);

  return (
    <StyledProfileCardContainer
      onSubmit={handleSubmit(onSubmit)}
      tw="justify-center align-top"
    >
      <label htmlFor="profile-picture">
        <StyledProfileCardImageEditDiv src={profilePicture}>
          {uploadProfilePictureLoading ? (
            'Uploading...'
          ) : (
            <img
              src="/icons/profile-edit-add-image.png"
              css={css`
                display: block;
                margin: auto;
                width: 36px;
              `}
            />
          )}
        </StyledProfileCardImageEditDiv>
      </label>
      <input
        type="file"
        id="profile-picture"
        accept="image/png, image/jpeg"
        css={css`
          display: none;
        `}
        multiple={false}
        onChange={async (event) => {
          // TODO: Create event to upload here and then setValues for profile_picture

          const ALLOWED_MIME_TYPE = [
            'image/png',
            'image/jpeg',
            'image/svg+xml',
            'image/gif',
          ];
          if (
            event.target.files === null ||
            (typeof event.target.files === 'object' &&
              event.target.files.length <= 0)
          ) {
            toast.error('No file selected.');
            return;
          }
          const file = event.target.files[0];
          const type = file.type;
          const sizeInMb = file.size / 1024 / 1024;

          // MS: Validation for file size
          if (sizeInMb > 5) {
            toast.error('Profile picture size cannot be greater than 5MB!');
            return;
          }

          // MS: Validation for MIME type validation
          if (!ALLOWED_MIME_TYPE.includes(type)) {
            toast.error('Non-image files not allowed!');
            return;
          }

          let result;

          try {
            result = await toBase64(file);
          } catch (err) {
            console.error(err);
            return;
          }

          const payload = {
            file: result as string,
          };

          let uploadedData;
          try {
            uploadedData = await uploadProfilePicture(payload);
          } catch (err) {
            console.error(err);
            return;
          }

          const url = uploadedData?.data?.data?.url;

          setValue('profile_picture', url);
        }}
      />

      <div tw="w-full">
        <label
          htmlFor="name"
          tw="w-full text-[16px] leading-normal"
          css={css`
            color: #003366;
          `}
        >
          Nama<span tw="color[#FE3131]">*</span>
        </label>
        <div tw="mt-1 mb-4 flex">
          <input
            id="name"
            tw="w-full py-2 px-3 border border-[#003366] rounded-lg"
            css={css`
              color: #003366;
            `}
            {...register('name', { required: true })}
          />
        </div>

        <label
          htmlFor="date-of-birth"
          tw="w-full text-[16px] leading-normal"
          css={css`
            color: #003366;
          `}
        >
          Tanggal Lahir<span tw="color[#FE3131]">*</span>
        </label>
        <div tw="mt-1 mb-4 flex">
          <input
            id="date-of-birth"
            type="date"
            tw="w-full py-2 px-3 border border-[#003366] rounded-lg"
            css={css`
              color: #003366;
            `}
            {...register('date_of_birth', { required: true })}
          />
        </div>

        <div
          id="sex"
          tw="w-full text-[16px] leading-normal"
          css={css`
            color: #003366;
          `}
        >
          Jenis Kelamin<span tw="color[#FE3131]">*</span>
        </div>
        <div tw="mt-1 mb-4 flex space-x-3">
          <label tw="w-full py-2 px-3 border border-[#003366] text-[#003366] rounded-lg ">
            <input
              value={1}
              {...register('gender')}
              type="radio"
              className="form-radio h-5 w-5"
            />{' '}
            Laki-laki
          </label>
          <label tw="w-full py-2 px-3 border border-[#003366] text-[#003366] rounded-lg ">
            <input
              value={2}
              {...register('gender')}
              type="radio"
              className="form-radio h-5 w-5"
            />{' '}
            Perempuan
          </label>
        </div>

        <label
          htmlFor="phone-number"
          tw="w-full text-[16px] leading-normal"
          css={css`
            color: #003366;
          `}
        >
          Nomor Telepon
        </label>
        <div
          tw="mt-1 mb-4 ml-3 w-full text-[16px] leading-normal"
          css={css`
            color: #003366;
            word-wrap: break-word;
          `}
        >
          {formatPhoneNumber(props.customerPhoneNumber)}
        </div>
      </div>
      <div tw="w-full flex justify-center">
        <button
          type="submit"
          css={[
            css`
              box-shadow: 0px 3px 0px 0px #888888;
              border: 2px solid #003366;
              font-size: 16px;
              border-radius: 10px;
              background-color: #003366;
            `,
            tw`w-1/2 mx-10 font-bold text-[#FFFFFF] border[2px solid #003366]`,
          ]}
        >
          <div
            tw="w-full text-[16px] leading-normal flex justify-center items-center"
            css={css`
              word-wrap: break-word;
              padding: 0.375rem 1.5rem;
              color: #ffffff;
            `}
          >
            <div>Simpan</div>
          </div>
        </button>
      </div>
    </StyledProfileCardContainer>
  );
};

export default ProfileCardForm;

const StyledProfileCardContainer = styled.form`
  margin: 1.875rem 2.5rem 0;
  align-items: center;
  padding: 0 0 2rem 0;
`;

interface StyledProfileCardImageDivEditProps {
  src?: string;
}

const StyledProfileCardImageEditDiv = styled.div<StyledProfileCardImageDivEditProps>`
  margin: 0 auto 2rem;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #aaaaaa;
  -webkit-box-shadow: inset 0px 0px 0px 2px #003366;
  -moz-box-shadow: inset 0px 0px 0px 2px #003366;
  box-shadow: inset 0px 0px 0px 2px #003366;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const formatDateOfBirthField = (dateOfBirth: Date) => {
  return !(dateOfBirth.getTime() === new Date('0001-01-01T00:00:00Z').getTime())
    ? dateOfBirth.toISOString().substring(0, 10)
    : undefined;
};

const formatPhoneNumber = (phoneNumber: string) => {
  return (
    '(' +
    phoneNumber.slice(0, 3) +
    ') ' +
    phoneNumber.slice(3, 6) +
    '-' +
    phoneNumber.slice(6, 10) +
    '-' +
    phoneNumber.slice(10)
  );
};

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
