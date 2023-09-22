import Head from 'next/head';
import React from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';
import { useForm } from "react-hook-form"
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onLogin = async (data) => {
        try {
            const result = await axios.post('http://localhost:5000/api/v1/auth/login', data);
            if (result.data.statusCode === 200) {
                console.log(result.data.data);
                toast.success('Login successful!');
                Cookies.set('accessToken', result?.data?.data.accessToken, { expires: 7 });
                if (result?.data?.data?.user?.role === "user") {
                    window.location.href = "/userHome";
                } else if (result?.data?.data?.user?.role === "admin") {
                    window.location.href = "/adminHome";
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please try again.');
        }

    }
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

                    <form className="text-center"
                        onSubmit={handleSubmit(onLogin)}>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="border-[#5242F0] border-[1px] rounded-sm w-[100%] max-w-sm input bg-[#FEFEFE]"
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

                        <p className="text-[#202020CC]">Forgot password?</p>
                        <button type="submit" className='bg-[#533FF0] text-[#FEFEFE] lg:md:text-2xl text-lg font-normal px-8 py-2 rounded-sm mt-4 w-[100%] max-w-sm'>Continue</button>
                    </form>
                    <div className="flex items-center">
                        <p className="text-[#202020CC] mr-2">Don't have an account?</p>
                        <Link href="/signup" className="text-[#2020204D]">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;