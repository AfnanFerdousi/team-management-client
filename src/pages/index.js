import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import logo from '../public/logo.png';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Welcome | Agile</title>
      </Head>

      <div className='bg-[#FEFEFE]'>
        <div className='grid grid-flow-col gap-4 justify-center items-center'>
          <Image src={logo} alt='logo' width={200} height={200} />
          <h2 className='text-3xl font-medium text-[#1E2D40]'>Welcome to Agile Team Management Application</h2>
          <h2 className='text-3xl font-medium text-[#1E2D40]'>Log in with your account to continue </h2>

          <div className='flex gap-4'>
            <button className='bg-[#533FF0] text-[#FEFEFE] text-2xl font-medium'>Login</button>
            <button className='bg-[#533FF0] text-[#FEFEFE] text-2xl font-medium'>Sign Up</button>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default Home;