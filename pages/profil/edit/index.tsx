import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import moment from 'moment';

import withAuth from '../../../components/Utils/AuthHOC/withAuth';
import { Layout } from '../../../components/Utils/Layout';
import ProfileCardForm from '../../../components/Profile/profileCardForm';
import { useGetViewProfile } from '../../../apis/hooks/profilHooks';

const CustomerProfileForm: React.FC = () => {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const { data: viewResponse, status: viewStatus } = useGetViewProfile({
    onError: (err: any) => {
      toast.error(err.response.data.message, { position: 'top-right' });
    },
  });

  return (
    <>
      <Head>
        <title>Edit Profil</title>
      </Head>
      <Layout title="Edit Profile" hasNavbar={false} back>
        {viewStatus === 'success' && (
          <ProfileCardForm
            customerProfilePicture={viewResponse?.data.image}
            customerName={viewResponse?.data.name}
            customerDateOfBirth={moment(
              viewResponse?.data.date_of_birth
            ).toDate()}
            customerSex={viewResponse?.data.gender}
            customerPhoneNumber={viewResponse?.data.phone_number}
          />
        )}
      </Layout>
    </>
  );
};

export default withAuth(CustomerProfileForm);
