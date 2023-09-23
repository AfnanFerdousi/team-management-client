import React from 'react';

const InviteModal = ({ invitation, user }) => {
    console.log(invitation)
    console.log(user)
    return (
        <div className='bg-[#FEFEFE] border-[1px] border-[#2020204D] rounded-lg'>
           {/* <div className="p-4">
             <h2 className="text-[#000000] text-xl">`You have received a team invitation from <span className="font-bold">{invitation.teamName}</span>`</h2>
           </div> */}
        </div>
    );
};

export default InviteModal;