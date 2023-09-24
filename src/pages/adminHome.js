import React from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import Head from "next/head"
import useSingleUser from '../hooks/useSingleUser';
import Cookies from 'js-cookie';
import { BsPlus } from 'react-icons/bs';

const AdminHome = () => {
    const email = Cookies.get("email")
     const singleUser = useSingleUser(email)
     console.log(singleUser)
    return (
        <div>
            <Head>
                <title>Teams | Agile</title>
            </Head>

            <div className="bg-[#FFF8F8] px-8 py-8 relative">
                 {singleUser && singleUser?.singleUser?.role === "admin" ? (
                    <div className="flex items-center justify-between">
                      <div>
                          <h2 className="text-[#000] text-xl font-bold">Team Creation management system</h2>
                          <p className="mt-2 font-semibold text-md text-[#20202099]">Existing teams</p>
                      </div>
                        <div className="flex items-center gap-x-4 hover:text-[#fff]">
                            <button className="btn capitalize bg-transparent text-[#4C54F8] font-bold hover:border-[#4C54F8] hover:bg-[#4C54F8] hover:text-[#fff] border-[2px] border-[#4C54F8] flex items-center gap-x-2 text-md"><BsPlus className="text-lg"/>Create a team</button>
                        </div>
                    </div>
                ) : (
                    <h2 className="text-[#000] text-xl font-bold">My teams</h2>
                )}
            </div>
            
        </div>
    );
};

export default AdminHome;
AdminHome.getLayout = function getLayout(page) {
    return <MainLayout> {page} </MainLayout>;
}
