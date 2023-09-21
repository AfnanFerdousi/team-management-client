import Head from "next/head";
import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Welcome | Agile</title>
      </Head>

      <div className="bg-[#FEFEFE]">
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <Image src={logo} alt="logo" width={150} height={150} className="mb-4" />
          <h2 className="lg:md:text-3xl text-xl text-center font-medium text-[#1E2D40]">
            Welcome to Agile
          </h2>
          <h2 className="lg:md:text-3xl text-xl font-medium text-[#1E2D40] text-center">
            Log in with your account to continue{" "}
          </h2>

          <div className="flex gap-4 mt-4">
            <Link href="/login" className="bg-[#533FF0] text-[#FEFEFE] lg:md:text-2xl text-lg font-medium px-4 py-2 rounded-xl">
              Login
            </Link>
            <Link href="/signup" className="bg-[#533FF0] text-[#FEFEFE] lg:md:text-2xl text-lg font-medium px-4 py-2 rounded-xl">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
