import React, { useState, useEffect } from 'react';
import logo from "../../../public/logo.png";
import Image from 'next/image';
import man from "../../../public/man.png";
import { CiBellOn } from 'react-icons/ci';
import useSingleUser from '../../hooks/useSingleUser';
import Loader from './../shared/Loader'; // Import your loader component
import Cookies from 'js-cookie'
import Link from "next/link"
import { useDispatch } from 'react-redux';
import { acceptInvitation, rejectInvitation } from '../../redux/features/invite/inviteSlice';
import { useAppSelector } from '../../redux/hook';
import { toast } from 'react-toastify';

const Navbar = () => {
    const email = Cookies.get('email');
    const { singleUser, loading } =  useSingleUser(email);
    const [showInvitations, setShowInvitations] = useState(false);
    const [show, setShow] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [dismissedInvitations, setDismissedInvitations] = useState([]);
    const toggleInvitations = () => {
        setShowInvitations(!showInvitations);
    };
    const toggle = () => {
        setShow(!show)
    }

    const logout = () => {
        Cookies.remove("accessToken")
        Cookies.remove("email")

        window.location.href = "/login"
    }

    const dispatch = useDispatch(); // Get the dispatch function from Redux
    // console.log(user)
    useEffect(() => {
        if (singleUser) {
            setDismissedInvitations([]);
            setNotificationCount(singleUser.notifications.length);
        }
    }, [singleUser]);

    const onReject = (teamName) => {
        // Dispatch the rejectInvitation action
        dispatch(rejectInvitation({ userId: singleUser._id, teamName }));
        setDismissedInvitations([...dismissedInvitations, teamName]);
        toast.success('Invitation rejected!');
       setNotificationCount(notificationCount - 1)
        // You can also handle the modal closing logic here
        setShow(false);
    };

    const onAccept = (teamName) => {
        // Dispatch the acceptInvitation action
        dispatch(acceptInvitation({ userId: singleUser._id, teamName }));
        setDismissedInvitations([...dismissedInvitations, teamName]);
        toast.success('Invitation accepted!');
        setNotificationCount(notificationCount - 1)
        // You can also handle the modal closing logic here
        setShow(false);
    };

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
                    <li className="relative z-10">
                        <CiBellOn className="text-[40px] border-[1px] border-[#283163] rounded-full p-2 cursor-pointer" onClick={toggleInvitations} />
                        {showInvitations && (
                            <div className="absolute top-[30px] right-0 bg-white border border-[#b8b7b5] p-4 rounded-lg shadow w-72 max-h-[50vh] overflow-y-auto">
                                <h3 className="text-[#283163] font-semibold mb-2 w-full">Team Invitations</h3>
                                {loading ? (
                                    <Loader /> // Display the loader while loading
                                ) : (
                                        singleUser?.notifications.map((invitation) => {
                                            if (dismissedInvitations.includes(invitation?.teamName)) {
                                                // Skip rendering dismissed invitations
                                                return null;
                                            }
                                            return (
                                                <div
                                                    className={`alert flex flex-col mb-2 bg-[#f7f7f7] transition-opacity duration-500 ease-in-out ${dismissedInvitations.includes(invitation?.teamName)
                                                        ? 'opacity-0' // Apply opacity transition
                                                        : ''
                                                        }`}
                                                    style={{ border: ".3px #ddd solid" }}
                                                    key={invitation?._id}
                                                >
                                            <div className="flex" >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <span className="pl-2 text-[#283163]">You got an invitation from {invitation?.teamName}</span>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <button onClick={() => onReject(invitation?.teamName)} className="text-red-500 font-bold">Reject</button>
                                                <button onClick={() => onAccept(invitation?.teamName)} className="text-green-500 font-bold">Accept</button>
                                            </div>
                                        </div>
                                    )}
                                    )
                                )}
                            </div>
                        )}

                        {/* Notification count badge */}
                        {!loading && singleUser && (
                            <div className="bg-[#679AFA] text-white rounded-full w-6 h-6 flex items-center justify-center absolute -top-1 -right-1 text-[12px] font-bold">
                                {notificationCount}
                            </div>
                        )}
                    </li>
                    <li className="border-[1px] border-[#283163] rounded-full p-[4px] relative z-10">
                        <div className="avatar placeholder cursor-pointer" onClick={toggle}>
                            <div className="bg-neutral-focus text-[#fff] rounded-full w-[35px] h-[35px] ">
                                <span className="capitalize">{singleUser?.username.charAt(0)}</span>
                            </div>
                        </div>

                        {show && <div className="absolute top-[30px] right-0 bg-white border border-[#b8b7b5] p-4 rounded-lg shadow w-64">
                            <ul>
                                <li><Link href="/teams">My teams</Link></li>
                                <li className="text-red-500 font-bold pt-2"><button onClick={logout}>logout</button></li>
                            </ul>
                            
                        </div>}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
