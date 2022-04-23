// components/Profile/profileCard.tsx
import { filterProps } from 'framer-motion';
import React from 'react';
import tw, { styled, css } from 'twin.macro';

interface ProfileCardProps {
  customerProfilePicture: string;  
  customerName: string;
  customerDateOfBirth: Date;
  customerSex: string;
  customerPhoneNumber: string;
}

const options: Intl.DateTimeFormatOptions = { year: "numeric", month: 'long', day: 'numeric' };

function formatDate(date : Date){
    return date.toLocaleDateString("id-ID", options);
}

function formatPhoneNumber(phoneNumber : string){
    return phoneNumber.slice(0, 4) + "-" + phoneNumber.slice(4, 8) + "-" + phoneNumber.slice(8)
}

function formatProfileSex(sex : string){
    if (sex === "M") return "Laki-laki";
    else return "Perempuan";
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {  
  return (
    <StyledProfileCardContainer tw="justify-center align-top">
        <StyledProfileCardImageDiv>
            <StyledProfileCardImage src={props.customerProfilePicture}/>
        </StyledProfileCardImageDiv>

        <div tw="w-full">
            <div tw="mb-0.5 w-full text-[12px] leading-normal" css={css`color: #003366;`}>
                Nama
            </div>
            <div tw="mb-4 w-full text-[16px] leading-normal" 
                css={css`color: #003366; word-wrap: break-word;`}
            >
                {props.customerName}
            </div>

            <div tw="mb-0.5 w-full text-[12px] leading-normal" css={css`color: #003366;`}>
                Tanggal Lahir
            </div>
            <div tw="mb-4 w-full text-[16px] leading-normal" 
                css={css`color: #003366; word-wrap: break-word;`}
            >
                {formatDate(props.customerDateOfBirth)}
            </div>

            <div tw="mb-0.5 w-full text-[12px] leading-normal" css={css`color: #003366;`}>
                Jenis Kelamin
            </div>
            <div tw="mb-4 w-full text-[16px] leading-normal" 
                css={css`color: #003366; word-wrap: break-word;`}
            >
                {formatProfileSex(props.customerSex)}
            </div>

            <div tw="mb-0.5 w-full text-[12px] leading-normal" css={css`color: #003366;`}>
                Nomor Telepon
            </div>
            <div tw="mb-4 w-full text-[16px] leading-normal" 
                css={css`color: #003366; word-wrap: break-word;`}
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

const StyledProfileCardImageDiv = styled.div`
  margin: 0 auto 2rem;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-image: url(${("../icons/user-circle-dark.png")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-box-shadow:inset 0px 0px 0px 2px #003366;
  -moz-box-shadow:inset 0px 0px 0px 2px #003366;
  box-shadow:inset 0px 0px 0px 2px #003366;
`;

interface StyledProfileCardImageProps {
    src?: string;
  }

const StyledProfileCardImage = styled.div<StyledProfileCardImageProps>`
    margin: 0 auto 2rem;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #FFFFFF;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-box-shadow:inset 0px 0px 0px 2px #003366;
    -moz-box-shadow:inset 0px 0px 0px 2px #003366;
    box-shadow:inset 0px 0px 0px 2px #003366;
`;