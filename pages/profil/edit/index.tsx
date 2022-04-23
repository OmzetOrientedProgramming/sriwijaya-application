import React from 'react';
import tw, {css} from 'twin.macro';
import Head from 'next/head';

import withAuth from '../../../components/Utils/AuthHOC/withAuth';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/Utils/Layout';
import Link from 'next/link';
import ProfileCardForm from '../../../components/Profile/profileCardForm';


const CustomerProfileForm: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  return (
    <>
      <Head>
        <title>Edit Profil</title>
      </Head>
      <Layout title="Edit Profile" hasNavbar={false} back>
        <ProfileCardForm
            customerProfilePicture='../images/dummy.jpg'
            customerName='Teofanus Gary'
            customerDateOfBirth={ new Date("2001-08-01") }
            customerSex='M'
            customerPhoneNumber='081234567890'>

        </ProfileCardForm>

        <div tw="w-full flex justify-center">
          <Link href={`/profil`}>
            <button
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
                  color:#FFFFFF;
                `}
              >
                <div>
                  Simpan
                </div>
              </div>
            </button>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default withAuth(CustomerProfileForm);
