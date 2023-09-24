import React from 'react';
import Link from "next/link"

const TeamCard = ({team}) => {
    console.log(team)
    return (
     <>
        <Link href={`/teams/${team?.teamName}`}>
        <div className="border-[1px] border-[#4C54F8] rounded-lg py-8 px-6 hover:bg-[#fefefe] hover:transform  hover:scale-105 hover:transition-transform duration-300 ease-in-out">
            <div className="avatar online border-none">
                <div className="w-20 rounded-full">
                    <img src={team?.teamLogo} alt={team?.teamName} />
                </div>
            </div>
            
            <h2 className="text-lg font-[900] text-[#202020]">{team?.teamName}</h2>
          
            <h2 className="text-md font-semibold text-[#202020] mt-2 mb-4">{team?.teamCategory}</h2>
            <p className="text-[#000000]">{team?.description}</p>
        </div>
          </Link>
     </>
    );
};

export default TeamCard;