import Head from 'next/head';
import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';

const UserHome = () => {
    return (
        <div>
            <Head>
                <title>User Home | Agile</title>
            </Head>
            <div className="bg-[#FFF8F8] px-8">

            </div>
            
        </div>
    );
};

export default UserHome;

UserHome.getLayout = function getLayout(page) {
  return <MainLayout> {page} </MainLayout>;
}