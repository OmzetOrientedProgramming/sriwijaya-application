import React from 'react';
import tw, { css } from 'twin.macro';
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
          customerProfilePicture=""
          customerName="test full name"
          customerDateOfBirth={new Date('0001-01-01T00:00:00Z')}
          customerSex={1}
          customerPhoneNumber="+62123456789"
        />
      </Layout>
    </>
  );
};

export default withAuth(CustomerProfileForm);
