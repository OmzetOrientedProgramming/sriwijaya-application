import React from 'react';
import tw, {css} from 'twin.macro';
import Head from 'next/head';

import withAuth from '../../components/Utils/AuthHOC/withAuth';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Utils/Layout';
import Link from 'next/link';
import ProfileCard from '../../components/Profile/profileCard';


const CustomerProfile: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  return (
    <>
      <Head>
        <title>Profil</title>
      </Head>
      <Layout title="Profile">

        <div
          css={css`
            height: 100%;
            align-items: flex-start;
          `}
        >
          <div
            data-testid="wrapper"
            tw="mt-5 flex flex-col items-start justify-center w-full"
          >
            <div
              tw="w-full text-[20px] leading-normal flex justify-between items-center"
              css={css`
                word-wrap: break-word;
                padding: 0 2.5rem;
                color:#003366;
              `}
            >
              <div>
                Personal Data
              </div>
              <Link href={`/profil/edit`}>
                <img src="icons/profile-edit.png" tw="h-5 w-5"/>
              </Link>
            </div>
          </div>
        </div>
        <ProfileCard
          // images/dummy.jpg
          customerProfilePicture="images/dummy.jpg"
          customerName='Teofanus Gary'
          customerDateOfBirth={ new Date("2001-08-01") }
          customerSex='M'
          customerPhoneNumber='081234567890'
        />

        <div tw="w-full flex justify-center">
          <Link href={`/logout`}>
            <button
              css={[
                css`
                  box-shadow: 0px 3px 0px 0px #888888;
                  border: 2px solid #FE3131;
                  font-size: 16px;
                  border-radius: 10px;
                  
                `,
                tw`w-full mx-10 font-bold text-[#FE3131] border[2px solid #FE3131]`,
              ]}
            >
              
              <div
                tw="w-full text-[16px] leading-normal flex justify-between items-center"
                css={css`
                  word-wrap: break-word;
                  padding: 0.375rem 1.5rem;
                  color:#FE3131;
                `}
              >
                <div>
                  Log Out Account
                </div>
                <Link href={`/profil/edit`}>
                  <img src="icons/profile-logout.png" tw="h-5"/>
                </Link>
              </div>

            </button>
          </Link>
        </div>



      </Layout>
    </>
  );
};

export default withAuth(CustomerProfile);
