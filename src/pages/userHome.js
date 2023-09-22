import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import socketService from '../hooks/socketService';
import useSocketFunctions from '../hooks/useSocketFunctions';
import InviteModal from '../components/InviteModal';
import useUser from '../hooks/useUser';

const UserHome = () => {
    const invitations = useSocketFunctions.useInvitations(socketService);
    const index = invitations.length === 0 ? 0 : invitations.length - 1;
    const invitationToShow = invitations[index];
    const user = useUser()
    console.log(user)

    console.log(invitations)
    console.log(invitationToShow)
    return (
        <div>
            <Head>
                <title>User Home | Agile</title>
            </Head>
            <div className="bg-[#FFF8F8] px-8">

            </div>
            <InviteModal invitation={invitationToShow} />
        </div>
    );
};

export default UserHome;

UserHome.getLayout = function getLayout(page) {
  return <MainLayout> {page} </MainLayout>;
}