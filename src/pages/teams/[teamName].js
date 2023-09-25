import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import socketService from '../../hooks/socketService';
import InviteModal from '../../components/InviteModal';
import MainLayout from '../../components/Layouts/MainLayout';
import { setLatestInvite } from '../../redux/features/invite/inviteSlice';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loader from '../../components/shared/Loader';
import { IoIosArrowDown, IoIosClose } from 'react-icons/io';
import useSingleUser from '../../hooks/useSingleUser';
import { withAuth } from '../../auth';
import { useRouter } from 'next/router';

const SingleTeam = () => {
    const router = useRouter()
    const token = Cookies.get("accessToken");
    const email = Cookies.get("email");
    const { teamName } = useRouter().query;
    const user = useUser();
    const singleUser = useSingleUser(email)
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState("active");
    const [loading, setLoading] = useState(true);
    const [activeMembers, setActiveMembers] = useState([]);
    const [pendingMembers, setPendingMembers] = useState([]);
    const latestInvite = useAppSelector((state) => state.invitations.latestInvite);

    useEffect(() => {
        if (!token) {
            // Run this on the client side
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        socketService.onInvitationSent((data) => {
            dispatch(setLatestInvite(data));
        });
        return () => {
            socketService.removeInvitationSentListener();
        };
    }, [dispatch, user]);

    useEffect(() => {
        const fetchData = async (status) => {
            try {
                setLoading(true);
                const url = `http://localhost:5000/api/v1/user?teamName=${teamName}&status=${status}`
                const result = await axios.get(url, {
                    headers: {
                        authorization: `${token}`,
                    },
                });
                if (result.status === 200) {
                    if (status === "active") {
                        setActiveMembers(result?.data?.data);
                    } else if (status === "pending") {
                        setPendingMembers(result?.data?.data);
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData(status);
    }, [teamName, status, token]);


    return (
        <div>
            <Head>
                <title>{teamName} | Agile</title>
            </Head>
            <div className="bg-[#FFF8F8] px-8 py-8 relative">
                {user && user?.user?.role === "admin" ? (
                    <div className="flex items-center justify-between">
                        <h2 className="text-[#000] text-xl font-bold">Team ({teamName})</h2>
                        <div className="flex items-center gap-x-4">
                            <button className="btn capitalize bg-transparent text-[#4C54F8] font-bold hover:border-[#4C54F8] hover:bg-[#4C54F8] hover:text-[#fff] border-[2px] border-[#4C54F8]">Assign a group </button>
                            <button className="btn capitalize bg-[#4C54F8] text-[#fff] font-bold hover:border-[#4C54F8] hover:bg-transparent border-[2px] border-[#4C54F8] hover:text-[#4C54F8]">Add a member </button>
                        </div>
                    </div>
                ) : (
                    <h2 className="text-[#000] text-xl font-bold">Team ({teamName})</h2>
                )}

                <div className="flex items-center gap-x-4 pt-4">
                    <button
                        className={`btn bg-[#fff] border-[2px]rounded-lg   font-bold text-md capitalize hover:bg-[#CECECE] hover:border-[#4C54F84D] ${status === "active" ? 'border-[#4C54F8] border-[2px] text-[#4C54F8]' : 'border-[#4C54F84D] text-[#4C54F84D]'}`}
                        onClick={() => setStatus("active")}
                    >
                        Active members ({activeMembers?.length})
                    </button>
                    <button
                        className={`btn bg-[#fff] border-[2px]rounded-lg   font-bold text-md capitalize hover:bg-[#CECECE] hover:border-[#4C54F84D] ${status === "pending" ? 'border-[#4C54F8] border-[2px] text-[#4C54F8]' : 'border-[#4C54F84D] text-[#4C54F84D]'}`}
                        onClick={() => setStatus("pending")}
                    >
                        Pending ({pendingMembers?.length})
                    </button>
                </div>

                <div className=" -space-x-2 my-6">
                    {user && (status === "active" ? activeMembers : pendingMembers).map((user) => {
                        return (
                            <div className="avatar placeholder">
                                <div className="bg-[#FEFEFE] text-[#3267B1] rounded-full w-12 border-[2px] border-[#3267B1]">
                                    <span className="capitalize font-bold">{user?.username?.charAt(0)}</span>
                                </div>
                            </div>
                        )
                    })}

                </div>

                {/* table */}
                <div className="bg-[#fff] border-[1px] border-[#4C54F8] p-4 rounded-lg mt-8">
                    <table className="w-full text-left">
                        <thead className="text-[#202020] text-[16px] font-bold border-b-none">
                            <tr>
                                <th className='pl-[4rem] pb-4 w-[41%]'>Name</th>
                                <th>Title</th>
                                <th className="w-[20%]">Status</th>
                                <th className="w-[21%]">Role</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>

                    {loading ? (
                        <Loader />
                    ) : (
                        <table className="w-full text-left">
                            <tbody className="pt-4 gap-y-2">
                                {user && (status === "active" ? activeMembers : pendingMembers).map((user) => {
                                    const team = user?.teams.find((team) => team.teamName === teamName);
                                    const teamRole = team ? team.teamRole : "";
                                    const status = team ? team.status : "";
                                    return (
                                        <tr className="mb-2 border-[1px] border-[#3267B1] !rounded-xl" key={user?._id}>
                                            <td className="flex items-center gap-x-4 p-2 ">
                                                <div className="avatar placeholder">
                                                    <div className="bg-[#FEFEFE] text-[#3267B1] rounded-full w-10 border-[2px] border-[#00000033]">
                                                        <span className="capitalize">{user?.username?.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="text-[#202020] font-bold text-[16px] capitalize">{user?.username}</h2>
                                                    <h2 className="text-[#20202099]  text-[12px]">{user?.email}</h2>
                                                </div>
                                            </td>
                                            <td className=" capitalize">{teamRole}</td>
                                            <td className=" capitalize">{status}</td>
                                            <td className="capitalize text-center">{teamRole}</td>
                                            <td className="flex items-center gap-x-2">
                                                <button><IoIosArrowDown /></button>
                                                <button><IoIosClose /></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {latestInvite &&
                <div className="flex justify-center items-center absolute   top-[35%] left-[35%]">
                    <InviteModal invitation={latestInvite} user={singleUser} />
                </div>
            }
        </div>
    );
};

export default SingleTeam;

SingleTeam.getLayout = function getLayout(page) {
    return <MainLayout> {page} </MainLayout>;
};
