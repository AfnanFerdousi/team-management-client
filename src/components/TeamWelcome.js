import React, { useEffect, useState } from 'react';
import Image from "next/image"

const TeamWelcome = ({role}) => {

    return (
       <div className="bg-[#f4f1f2] border-[#4C54F8] border-[1px] p-4 rounded-lg ">
                        <h2 className="text-xl text-[#202020] font-bold text-center">Welcome to the team!</h2>
                        <p className="text-[#202020] text-center mt-2">Here are some things for you to get started...</p>
                        {role === "admin" ? (

                        <div className="flex items-center justify-center gap-x-12 mt-6 pb-12">
                             <div className="flex flex-col justify-center gap-y-6">
                             <div className="avatar">
                                <div className="w-[14rem] rounded-full">
                                    <Image
                                    src="https://miro.medium.com/v2/resize:fit:915/0*FdLLSjLPudGd-Pt5"
                                    alt="add more people"
                                    width={300}
                                    height={300}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-sm capitalize border-none bg-[#fff] shadow-lg text-[#000] rounded-md hover:text-[#fff]">Add more people</button>
                           </div>
                          
                             <div className="flex flex-col justify-center gap-y-6">
                             <div className="avatar">
                                <div className="w-[14rem] rounded-full">
                                    <Image
                                    src="https://miro.medium.com/v2/resize:fit:915/0*FdLLSjLPudGd-Pt5"
                                    alt="add more people"
                                    width={300}
                                    height={300}
                                    />
                                </div>
                            </div>
                            <button className="btn btn-sm capitalize border-none bg-[#fff] shadow-lg text-[#000] rounded-md hover:text-[#fff]">Create more channels</button>
                           </div>
                             <div className="flex flex-col justify-center gap-y-6">
                             <div className="avatar">
                                <div className="w-[14rem] rounded-full">
                                    <Image
                                    src="https://miro.medium.com/v2/resize:fit:915/0*FdLLSjLPudGd-Pt5"
                                    alt="add more people"
                                    width={300}
                                    height={300}
                                    />
                                </div>
                            </div>
                        <button className="btn btn-sm capitalize border-none bg-[#fff] shadow-lg text-[#000] rounded-md hover:text-[#fff]">Open the FAQ&apos;s</button>
                           </div>

                        </div>
) : (
     <div className="flex flex-col gap-y-6 items-center mt-6">
                             <div className="avatar">
                                <div className="w-[14rem] rounded-full">
                                    <Image
                                    src="https://miro.medium.com/v2/resize:fit:915/0*FdLLSjLPudGd-Pt5"
                                    alt="add more people"
                                    width={300}
                                    height={300}
                                    />
                                </div>
                            </div>
                        <button className="btn btn-sm capitalize border-none bg-[#fff] shadow-lg text-[#000] rounded-md hover:text-[#fff]">Open the FAQ&apos;s</button>
                           </div>
)}
                    </div>
    );
};

export default TeamWelcome;