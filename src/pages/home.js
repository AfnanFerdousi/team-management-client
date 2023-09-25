import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layouts/MainLayout';
import Head from "next/head"
import useSingleUser from '../hooks/useSingleUser';
import Cookies from 'js-cookie';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, selectError, selectStatus, selectTeams, openModal } from '../redux/features/team/teamSlice';
import TeamCard from '../components/shared/TeamCard';
import Loader from '../components/shared/Loader';
import CreateTeamModal from '../components/CreateTeamModal';
import { withAuth } from '../auth';
import { useRouter } from 'next/router';

const AdminHome = () => {
    const router = useRouter()
    const email = Cookies.get("email")
    const token = Cookies.get("accessToken")
    const singleUser = useSingleUser(email)
    const dispatch = useDispatch();
    const teamData = useSelector(selectTeams);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if(!token){
        router.push('/login')
    }

    const openCreateTeamModal = () => {
        setIsModalOpen(true);
    };

    const closeCreateTeamModal = () => {
        setIsModalOpen(false);
    };
    console.log(teamData)
    const teams = singleUser && singleUser?.singleUser?.role === "admin" ? teamData?.data : singleUser?.singleUser?.teams
     
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
                            <button onClick={() => openCreateTeamModal()} className="btn capitalize bg-transparent text-[#4C54F8] font-bold hover:border-[#4C54F8] hover:bg-[#4C54F8] hover:text-[#fff] border-[2px] border-[#4C54F8] flex items-center gap-x-2 text-md"><BsPlus className="text-lg"/>Create a team</button>
                        </div>
                    </div>
                ) : (
                    <h2 className="text-[#000] text-xl font-bold">My teams</h2>
                )}

                <div className="grid grid-cols-3 gap-x-6 my-16 gap-y-10">
                    {status === "loading" ?
                     <Loader/> 
                     : status === "failed" ? (
                        <p>Error: {error}</p>
                     ) : (
                        teams && teams.map((team) => {
                            return(
                                <TeamCard team={team} key={team?._id}/>
                            )
                        })
                     )
                    }
                </div>
            </div>         
                        <dialog
                id="my_modal_1"
                className="modal"
                open={isModalOpen} 
            >
                <CreateTeamModal closeModal={closeCreateTeamModal} />
            </dialog>
        </div>
    );
};

AdminHome.getLayout = function getLayout(page) {
    return <MainLayout> {page} </MainLayout>;
}
export default AdminHome;
