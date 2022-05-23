import React from 'react';
import { styled, css } from 'twin.macro';

interface ProfileCardProps {
  customerProfilePicture: string;
  customerName: string;
  customerDateOfBirth: Date;
  customerSex: number;
  customerPhoneNumber: string;
}

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function formatDateOfBirth(dateOfBirth: Date) {
  if (dateOfBirth.getTime() === new Date('0001-01-01T00:00:00Z').getTime()) {
    return '-';
  }
  return dateOfBirth.toLocaleDateString('id-ID', options);
}

function formatPhoneNumber(phoneNumber: string) {
  console.log(typeof phoneNumber);
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
}

function formatProfileSex(sex: number) {
  if (sex === 0) return '-';
  if (sex === 1) return 'Laki-laki';
  else return 'Perempuan';
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  return (
    <StyledProfileCardContainer tw="justify-center align-top">
      <StyledProfileCardImageDiv src={props.customerProfilePicture} />

      <div tw="w-full">
        <div
          tw="mb-0.5 w-full text-[12px] leading-normal"
          css={css`
            color: #003366;
          `}
        >
          Nama
        </div>
        <div
          tw="mb-4 w-full text-[16px] leading-normal"
          css={css`
            color: #003366;
            word-wrap: break-word;
          `}
        >
          {props.customerName}
        </div>

        <div
          tw="mb-0.5 w-full text-[12px] leading-normal"
          css={css`
            color: #003366;
          `}
        >
          Tanggal Lahir
        </div>
        <div
          tw="mb-4 w-full text-[16px] leading-normal"
          css={css`
            color: #003366;
            word-wrap: break-word;
          `}
        >
          {formatDateOfBirth(props.customerDateOfBirth)}
        </div>

        <div
          tw="mb-0.5 w-full text-[12px] leading-normal"
          css={css`
            color: #003366;
          `}
        >
          Jenis Kelamin
        </div>
        <div
          tw="mb-4 w-full text-[16px] leading-normal"
          css={css`
            color: #003366;
            word-wrap: break-word;
          `}
        >
          {formatProfileSex(props.customerSex)}
        </div>

        <div
          tw="mb-0.5 w-full text-[12px] leading-normal"
          css={css`
            color: #003366;
          `}
        >
          Nomor Telepon
        </div>
        <div
          tw="mb-4 w-full text-[16px] leading-normal"
          css={css`
            color: #003366;
            word-wrap: break-word;
          `}
        >
          {formatPhoneNumber(props.customerPhoneNumber)}
        </div>
      </div>
    </StyledProfileCardContainer>
  );
};

export default ProfileCard;

const StyledProfileCardContainer = styled.div`
  margin: 1.875rem 2.5rem 0;
  align-items: center;
  padding: 0 0 2rem 0;
`;

type StyledProfileCardImageDivProps = {
  src: string;
};

const StyledProfileCardImageDiv = styled.div<StyledProfileCardImageDivProps>`
  margin: 0 auto 2rem;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-box-shadow: inset 0px 0px 0px 2px #003366;
  -moz-box-shadow: inset 0px 0px 0px 2px #003366;
  box-shadow: inset 0px 0px 0px 2px #003366;
`;
