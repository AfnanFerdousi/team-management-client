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
import axios from 'axios'

const SingleTeam = () => {
    const token = Cookies.get("accessToken")
    const { teamName } = useRouter().query
    console.log(teamName)
    const user = useUser();
    const dispatch = useAppDispatch();
    const [singleTeam, setSingleTeam] = useState();
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState("active")
    const [activeMembers, setActiveMembers] = useState([])
    const [pendingMembers, setPendingMembers] = useState([])
    const latestInvite = useAppSelector((state) => state.invitations.latestInvite);

    useEffect(() => {
        socketService.onInvitationSent((data) => {
            dispatch(setLatestInvite(data));
        });
        return () => {
            socketService.removeInvitationSentListener();
        };
    }, [dispatch]);

    useEffect(() => {
        console.log(token)
        const getSingleTeam = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/v1/team/${teamName}`, {
                    headers: {
                        authorization: `${token}`
                    }
                });
                if (result.status === 200) {
                    console.log(result)
                    setSingleTeam(result.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        const getUsersWithSameTeam = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/v1/user?teamName=${teamName}`, {
                    headers: {
                        authorization: `${token}`
                    }
                });
                if (result.status === 200) {
                    setUsers(result?.data?.data)
                    console.log(result);
                }
            } catch (error) {
                console.error(error);
            }
        }

         const getUsersWithStatus = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/v1/user?teamName=${teamName}?status=${status}`, {
                    headers: {
                        authorization: `${token}`
                    }
                });
                if (result.status === 200) {
                   if(status === "active"){
                     setActiveMembers(result?.data?.data)
                   }
                    console.log(result);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getSingleTeam();
        getUsersWithSameTeam()
        getUsersWithStatus()
    }, [teamName])

    console.log(singleTeam)
    console.log(users)



    return (
        <div>
            <Head>
                <title>Team | Agile</title>
            </Head>
            <div className="bg-[#FFF8F8] px-8 py-8">
                <h2 className="text-[#000] text-xl font-bold">Team ({teamName})</h2>
                <div className="flex items-center gap-x-4 pt-4">
                    <button className="btn bg-[#fff] border-[2px] border-[#4C54F8] rounded-lg text-[#4C54F8] font-bold text-md capitalize hover:bg-[#CECECE] hover:border-[#4C54F8]">Active members ({activeMembers?.length})</button>
                    <button className="btn bg-[#fff] border-[2px] border-[#4C54F84D] rounded-lg text-[#4C54F84D] font-bold text-md capitalize hover:bg-[#CECECE] hover:border-[#4C54F84D]">Pending ({pendingMembers?.length})</button>
                </div>

                {/* table */}
                <div className="bg-[#fff] border-[1px] border-[#4C54F8] p-4 rounded-lg mt-8">
                    <table className="w-full border-initial">
                        <thead className="text-[#202020] text-[16px] font-bold border-b-none">
                             <tr>
                                <th>Name</th>
        <th>Title</th>
        <th>Status</th>
        <th>Role</th>
                             </tr>
                        </thead>
                        <tbody>
                            <tr className="border-[1px] border-[#3267B1] rounded-lg">
                                <td className="flex items-center gap-x-4 p-2">
                                    <div className="avatar placeholder">
  <div className="bg-[#FEFEFE] text-[#3267B1] rounded-full w-10 border-[2px] border-[#00000033]">
    <span>M</span>
  </div>
</div> 
<div>
    <h2 className="text-[#202020] font-bold text-[16px]">Muhammad</h2>
    <h2 className="text-[#20202099]  text-[12px]">info@gmail.com</h2>
</div>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>

                </div>
            </div>
            {latestInvite && <div className="flex justify-center items-center">
                <InviteModal invitation={latestInvite} user={user} />
            </div>}
        </div>
    );
};

export default SingleTeam;

SingleTeam.getLayout = function getLayout(page) {
    return <MainLayout> {page} </MainLayout>;
}
