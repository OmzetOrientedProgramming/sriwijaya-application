import React from 'react';
import tw, { css } from 'twin.macro';
import Head from 'next/head';

import withAuth from '../../components/Utils/AuthHOC/withAuth';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Utils/Layout';
import Link from 'next/link';
import ProfileCard from '../../components/Profile/profileCard';
import { useGetViewProfile } from '../../apis/hooks/profilHooks';
import toast from 'react-hot-toast';

const CustomerProfile: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const { data: viewData, status: viewStatus } = useGetViewProfile({
    onError: (err: any) => {
      toast.error(err.response.data.message, { position: 'top-right' });
    },
  });

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
                color: #003366;
              `}
            >
              <div>Personal Data</div>
              <Link href={`/profil/edit`}>
                <img src="icons/profile-edit.png" tw="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        {viewStatus === 'success' && (
          <ProfileCard
            customerProfilePicture={viewData?.data.image}
            customerName={viewData?.data.name}
            customerDateOfBirth={new Date(viewData?.data.date_of_birth)}
            customerSex={viewData?.data.gender}
            customerPhoneNumber={viewData?.data.phone_number}
          />
        )}

        <div tw="w-full flex justify-center">
          <Link href={`/logout`}>
            <button
              css={[
                css`
                  box-shadow: 0px 3px 0px 0px #888888;
                  border: 2px solid #fe3131;
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
                  color: #fe3131;
                `}
              >
                <div>Log Out Account</div>
                <Link href={`/profil/edit`}>
                  <img src="icons/profile-logout.png" tw="h-5" />
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
