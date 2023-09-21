import Head from 'next/head';
import React from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';

const Login = () => {
    return (
        <div>
            <Head>
                <title>Login | Agile</title>
            </Head>

            <div className="bg-[#FEFEFE]">
                <div className="flex flex-col justify-center items-center h-screen gap-4">
                    <Image src={logo} alt="logo" width={150} height={150} className="mb-4" />
                    <h2 className="lg:md:text-3xl text-xl text-center font-medium text-[#1E2D40]">
                        Welcome <span className="font-bold">Back</span>
                    </h2>

                    <form action="" className=" text-center ">

                        <input type="email" placeholder="Email address" className="border-[#5242F0] border-[1px] rounded-sm w-[100%] max-w-sm input bg-[#FEFEFE] " />
                        <input type="password" placeholder="Password" className="border-[#5242F0] border-[1px] rounded-sm w-[100%] max-w-sm input bg-[#FEFEFE] my-4" />

                        <p className="text-[#202020CC]">Forgot password?</p>
                        <button type="submit" className='bg-[#533FF0] text-[#FEFEFE] lg:md:text-2xl text-lg font-normal px-8 py-2 rounded-sm mt-4 w-[100%] max-w-sm'>Continue</button>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default Login;