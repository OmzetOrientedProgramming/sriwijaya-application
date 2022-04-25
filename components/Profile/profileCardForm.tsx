import React from 'react';
import Link from 'next/link';
import tw, { styled, css } from 'twin.macro';

interface ProfileCardFormProps {
  customerProfilePicture: string;  
  customerName: string;
  customerDateOfBirth: Date;
  customerSex: number;
  customerPhoneNumber: string;
}

const options: Intl.DateTimeFormatOptions = { year: "numeric", month: 'long', day: 'numeric' };

function formatDateOfBirthField(dateOfBirth : Date){
    if (!(dateOfBirth.getTime() === new Date("0001-01-01T00:00:00Z").getTime())){
        return(
            <input
                id="date-of-birth" type="date"
                tw="w-full py-2 px-3 border border-[#003366] rounded-lg" css={css`color: #003366;`}
                defaultValue={dateOfBirth.toISOString().substr(0, 10)}
                />
        )
    }
    return(
        <input
            id="date-of-birth" type="date"
            tw="w-full py-2 px-3 border border-[#003366] rounded-lg" css={css`color: #003366;`}
        />
    )
}

function formatPhoneNumber(phoneNumber : string){
    return "(" + phoneNumber.slice(0, 3) + ") " + phoneNumber.slice(3, 6) + "-" + phoneNumber.slice(6, 10) + "-" + phoneNumber.slice(10)
}

const ProfileCardForm: React.FC<ProfileCardFormProps> = (props) => {  
  return (
    <StyledProfileCardContainer tw="justify-center align-top">
        <label htmlFor="profile-picture">
            <StyledProfileCardImageEditDiv src={props.customerProfilePicture}>
                <img src="../icons/profile-edit-add-image.png" css={css`display: block; margin: auto; width: 36px;`}/>
            </StyledProfileCardImageEditDiv>
        </label>
        <input type="file" id="profile-picture" name="profilePicture" accept="image/png, image/jpeg" css={css`display:none;`} />

        <div tw="w-full">

            <label htmlFor="name" tw="w-full text-[16px] leading-normal" css={css`color: #003366;`}>
                Nama<span tw="color[#FE3131]">*</span>
            </label>
            <div tw="mt-1 mb-4 flex">
                <input
                id="name"
                tw="w-full py-2 px-3 border border-[#003366] rounded-lg" css={css`color: #003366;`}
                defaultValue={props.customerName}
                />
            </div>

            <label htmlFor="date-of-birth" tw="w-full text-[16px] leading-normal" css={css`color: #003366;`}>
                Tanggal Lahir<span tw="color[#FE3131]">*</span>
            </label>
            <div tw="mt-1 mb-4 flex">
                {formatDateOfBirthField(props.customerDateOfBirth)}
            </div>

            <div id="sex" tw="w-full text-[16px] leading-normal" css={css`color: #003366;`}>
                Jenis Kelamin<span tw="color[#FE3131]">*</span>
            </div>
            <div tw="mt-1 mb-4 flex space-x-3">
                <label tw="w-full py-2 px-3 border border-[#003366] text-[#003366] rounded-lg ">
                    <input type="radio" className="form-radio h-5 w-5" value="M" name="sex" defaultChecked={props.customerSex === 1}/> Laki-laki
                </label>
                <label tw="w-full py-2 px-3 border border-[#003366] text-[#003366] rounded-lg ">
                    <input type="radio" className="form-radio h-5 w-5" value="F" name="sex" defaultChecked={props.customerSex === 2}/> Perempuan
                </label>
            </div>

            <label htmlFor="phone-number" tw="w-full text-[16px] leading-normal" css={css`color: #003366;`}>
                Nomor Telepon
            </label>
            <div tw="mt-1 mb-4 ml-3 w-full text-[16px] leading-normal" 
                css={css`color: #003366; word-wrap: break-word;`}
            >
                {formatPhoneNumber(props.customerPhoneNumber)}
            </div>
        </div>
    </StyledProfileCardContainer>
  );
};

export default ProfileCardForm;

const StyledProfileCardContainer = styled.div`
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
  background-color:#AAAAAA;
  -webkit-box-shadow:inset 0px 0px 0px 2px #003366;
  -moz-box-shadow:inset 0px 0px 0px 2px #003366;
  box-shadow:inset 0px 0px 0px 2px #003366;
  display: flex;
  justify-content: center;
  align-items: center;
  `;






  
