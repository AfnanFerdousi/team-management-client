import React, { useState, useEffect } from 'react';
import logo from "../../../public/logo.png";
import Image from 'next/image';
import man from "../../../public/man.png";
import { CiBellOn } from 'react-icons/ci';
import useSingleUser from '../../hooks/useSingleUser';
import useUser from '../../hooks/useUser';
import Loader from './../shared/Loader'; // Import your loader component
import Cookies from 'js-cookie'

const Navbar = () => {
    const email = Cookies.get('email');
    const [showInvitations, setShowInvitations] = useState(false);

    const toggleInvitations = () => {
        setShowInvitations(!showInvitations);
    };
    // Ensure user is available before fetching singleUser
    const { singleUser, loading } =  useSingleUser(email);
    return (
        <div className="bg-[#FFF9F9] flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-x-2">
                <Image src={logo} alt="logo" width={50} height={50} className="mb-4" />
                <h2 className="text-[#283163] font-semibold text-2xl">Agile</h2>
            </div>
            <div>
                <ul className="flex items-center gap-x-4 text-[#283163] relative">
                    <li>Availability</li>
                    <li>Integration</li>
                    <li>Community</li>
                    <li className="relative">
                        <CiBellOn className="text-[40px] border-[1px] border-[#283163] rounded-full p-2" onClick={toggleInvitations} />
                        {showInvitations && (
                            <div className="absolute top-[30px] right-0 bg-white border border-[#b8b7b5] p-4 rounded-lg shadow w-72">
                                <h3 className="text-[#283163] font-semibold mb-2 w-full">Team Invitations</h3>
                                {loading ? (
                                    <Loader /> // Display the loader while loading
                                ) : (
                                    singleUser?.notifications.map((invitation) => (
                                        <div className="alert flex flex-col mb-2 bg-[#f7f7f7] " style={{ border: ".3px #ddd solid" }} key={invitation?._id}>
                                            <div className="flex" >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <span className="pl-2 text-[#283163]">You got an invitation from {invitation?.teamName}</span>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <button className="text-red-500 font-bold">Reject</button>
                                                <button className="text-green-500 font-bold">Accept</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Notification count badge */}
                        {!loading && singleUser && (
                            <div className="bg-[#679AFA] text-white rounded-full w-6 h-6 flex items-center justify-center absolute -top-1 -right-1 text-[12px] font-bold">
                                {singleUser.notifications.length}
                            </div>
                        )}
                    </li>
                    <li className="border-[1px] border-[#283163] rounded-full p-[4px]">
                        <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-[#fff] rounded-full w-[35px] h-[35px] ">
                                <span className="capitalize">{singleUser.username.charAt(0)}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
