import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { incrementInviteStep, selectCurrentInviteStep, sendInvitation, updateInviteFormData } from '../redux/features/invite/inviteSlice';
import { fetchUsers } from '../redux/features/user/userSlice';

const SendInvitationModal = ({ closeModal, teamName }) => {
    const dispatch = useDispatch();
    const currentInviteStep = useSelector(selectCurrentInviteStep);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            teamRole: '', // Initialize form values here
            email: '',
        },
    });
    const [filteredUsers, setFilteredUsers] = useState([]);
    const userEmail = watch("email");
    const formInviteData = useSelector((state) => state.invitations.formInviteData);
    useEffect(() => {
        if (userEmail) {
            dispatch(fetchUsers());
        }
    }, [userEmail, dispatch]);

    const users = useSelector((state) => state.users.users);
    useEffect(() => {
        if (userEmail) {
            const filtered = users?.data?.filter((user) =>
                user.email.toLowerCase().includes(userEmail.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    }, [userEmail, users]);


    const handleNextStep = async (data) => {
        if (currentInviteStep === 3) {
            try {
                const response = await dispatch(sendInvitation({ data: data, teamName: teamName }));
                const statusCode = response.payload?.statusCode;
                if (statusCode === 200) {
                    reset();
                    closeModal();
                    toast.success('Invitation sent successfully!');
                } else {
                    reset();
                    closeModal();
                    toast.error('Invitation sending failed.');
                }
            } catch (error) {
                reset();
                closeModal();
                console.error('Team creation error:', error);
            }
        } else {
            dispatch(updateInviteFormData(formInviteData));
            dispatch(incrementInviteStep());
        }
    };
    const handleCancel = () => {
        reset();
        closeModal();
    };
    return (
        <div className="modal-box bg-[#FFFFFF] border-[1px] border-[#A5ECD7] p-8 w-[35vw]">

            <form onSubmit={handleSubmit(handleNextStep)}>
                {currentInviteStep === 1 && (
                    <div>
                        <h2 className='text-[#000000] font-bold text-lg mb-6'>Assign a new member</h2>
                        <div className="flex flex-col">
                            <label className='text-[#AEB7B4] font-bold text-[14px] mb-2 '>Group member can</label>
                            <ul className="text-[#000000] text-[16px]">
                                <li>1. Identify skills needed.</li>
                                <li>2. Define clear roles.</li>
                                <li>3. Assign a leader.</li>
                                <li>4. Set clear goals.</li>
                            </ul>
                        </div>
                    </div>
                )}
                {currentInviteStep === 2 && (
                    <div>
                        <h2 className='text-[#000000] font-bold text-lg mb-6'>Role of new member</h2>
                        <div className="flex flex-col">
                            <label className="text-[#AEB7B4] font-bold text-[14px] mb-2">Role</label>
                            <input
                                type="text"
                                placeholder="Type a name to assign group member"
                                className="border-[#0A6AF6] border-[2px] rounded-lg w-[100%] max-w-lg input bg-[#FEFEFE]"
                                {...register("teamRole", { required: true })}
                            />
                            {errors.teamRole && <span className="text-red-500 text-[12px] mt-[4px]">Role is required</span>}
                        </div>
                    </div>
                )}
                {currentInviteStep === 3 && (
                    <div>
                        <h2 className='text-[#000000] font-bold text-lg mb-6'>Who do you want to add as a new team member?</h2>
                        <div className="flex flex-col">
                            <label className="text-[#AEB7B4] font-bold text-[14px] mb-2">Add new member to join the group</label>
                            <input
                                type="text"
                                placeholder="Type a name to assign group member"
                                className="border-[#0A6AF6] border-[2px] rounded-lg w-[100%] max-w-lg input bg-[#FEFEFE]"
                                {...register("email", { required: true })}
                            />
                            {filteredUsers && filteredUsers.length > 0 && (
                                <div className="flex items-center gap-x-4 my-4">
                                    <div className="avatar placeholder">
                                        <div className="bg-[#DEDEDE] text-neutral-content rounded-full w-10 h-10">
                                            <span className="text-xs capitalize">{filteredUsers[0]?.username.charAt(0)}</span>
                                        </div>

                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-md text-[#000] font-semibold">{filteredUsers[0]?.username}</h2>
                                        <h2 className="text-sm text-[#6C7172] font-semibold">{filteredUsers[0]?.email}</h2>
                                    </div>
                                </div>
                            )}
                            {errors.email && <span className="text-red-500 text-[12px] mt-[4px]">email is required</span>}
                        </div>
                    </div>
                )}
                <div className="flex items-center justify-between mt-6">
                    <button onClick={handleCancel} className="btn capitalize border-[2px] border-[#000] font-bold text-md px-12 rounded-full bg-transparent text-[#000] hover:text-[#fff]">Cancel</button>
                    <button className="btn capitalize bg-[#0A6AF6] border-[#0A6AF6] text-[#fff] font-bold text-md px-12 rounded-full" type="submit">{currentInviteStep === 3 ? `Add member` : `Continue`}</button>
                </div>
            </form>
        </div>
    );
};

export default SendInvitationModal;
