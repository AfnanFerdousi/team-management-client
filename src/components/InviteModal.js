import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const InviteModal = ({ invitation, user }) => {
  const [show, setShow] = useState(true)
  const onReject = () => {

  }
  const onAccept = () => {
    
  }
  return (
    <div className={`bg-[#FEFEFE] border-[1px] border-[#2020204D] rounded-lg w-[35vw]  ${show ? ' block' : 'hidden'} `}>
      <div className="p-4 m-6">
        {/* Close modal button */}
        <button
          onClick={() => setShow(false)}
          className={`absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl bg-[#ddd] rounded-full`}
        >
          <IoIosClose />
        </button>
        <h2 className="text-[#000000] text-xl ">You have received a team invitation from <span className="font-bold">{invitation?.teamName}</span></h2>

        <div className="mt-6 mb-4 ">
          <h3 className="text-[#6C7172] text-md">Join the {invitation?.teamName} as a new team member</h3>
          <div className="flex items-center gap-x-4 pt-2">
            <div className="avatar placeholder">
              <div className="bg-[#DEDEDE] text-[#000] rounded-full w-12 ]">
                <span className="capitalize font-bold">{invitation?.user?.email?.charAt(0)}</span>
              </div>
            </div>
            <div>
              <h2 className="text-md text-[#202020] font-normal">{invitation?.teamName}</h2>
              <p className="text-[13px] text-[#6C7172]">{invitation?.user?.email}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <button onClick={onReject} className="btn bg-transparent border-[2px] border-[#000] rounded-full text-[#000] text-md font-bold capitalize px-6">Reject</button>
          <button onClick={onAccept} className="text-[#fff] text-md text-bold bg-[#0A6AF6] btn border-none rounded-full capitalize px-6">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
