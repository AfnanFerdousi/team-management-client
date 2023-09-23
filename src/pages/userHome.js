import Head from 'next/head';
import React, { useEffect } from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import InviteModal from '../components/InviteModal';
import useUser from '../hooks/useUser';
import { useAppSelector, useAppDispatch } from '../redux/hook.js';
import socketService from './../hooks/socketService';
import { setLatestInvite } from '../redux/features/invite/inviteSlice';

const UserHome = () => {
    const user = useUser();
    const dispatch = useAppDispatch();
    const latestInvite = useAppSelector((state) => state.invitations.latestInvite); 

    useEffect(() => {
        socketService.onInvitationSent((data) => {
            dispatch(setLatestInvite(data));
        });
        return () => {
            socketService.removeInvitationSentListener();
        };
    }, [dispatch]);

    console.log(user);
    console.log(latestInvite);

    return (
        <div>
            <Head>
                <title>User Home | Agile</title>
            </Head>
            <div className="bg-[#FFF8F8] px-8">
                <h2></h2>
            </div>
            {latestInvite && <div className="flex justify-center items-center">
            <InviteModal invitation={latestInvite} user={user}/>
            </div>}
        </div>
    );
};

export default UserHome;

UserHome.getLayout = function getLayout(page) {
    return <MainLayout> {page} </MainLayout>;
}
