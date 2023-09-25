import Head from 'next/head';
import React from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';
import { useForm } from "react-hook-form"
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from './../../config';


const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSignup = async (data) => {
        try {
            const result = await axios.post(`${baseUrl}/user/create-user`, data);
            if (result.status === 200) {
                toast.success('Signup successful!');
                window.location.href = "/login";
            } else {
                toast.error('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            // Display an error toast notification
            toast.error('Signup failed. Please try again.');
        }
    }
    return (
        <div>
            <Head>
                <title>Sign up | Agile</title>
            </Head>

            <div className="bg-[#FEFEFE]">
                <div className="flex flex-col justify-center items-center h-screen gap-4">
                    <Image src={logo} alt="logo" width={150} height={150} className="mb-4" />
                    <h2 className="lg:md:text-3xl text-xl text-center font-medium text-[#1E2D40]">
                        Welcome to <span className="font-bold">Agile</span>
                    </h2>

                    <form className="text-center flex flex-col items-center w-full"
                        onSubmit={handleSubmit(onSignup)}>
                        <input
                            type="text"
                            placeholder="Name"
                            className="border-[#5242F0] border-[1px] rounded-sm w-[100%] max-w-sm input bg-[#FEFEFE]"
                            {...register("username", { required: true })}
                        />
                        {errors.username && <span className="text-red-500 text-[12px] mt-[4px]">name is required</span>}
                        <input
                            type="email"
                            placeholder="Email address"
                            className="border-[#5242F0] border-[1px] rounded-sm w-[100%] max-w-sm input bg-[#FEFEFE] mt-4"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500 text-[12px] mt-[4px]">email is required</span>}
                        <input
                            type="password"
                            placeholder="Password"
                            className="border-[#5242F0] border-[1px] rounded-sm w-[100%] max-w-sm input bg-[#FEFEFE] my-4"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className="text-red-500 text-[12px] mt-[4px]">password is required</span>}

                        <button type="submit" className='bg-[#533FF0] text-[#FEFEFE] lg:md:text-2xl text-lg font-normal px-8 py-2 rounded-sm mt-4 w-[100%] max-w-sm'>Continue</button>
                    </form>
                    <div className="flex items-center">
                        <p className="text-[#202020CC] mr-2">Already have an account?</p>
                        <Link href="/login" className="text-[#2020204D]">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;