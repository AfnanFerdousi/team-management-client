import React from 'react';
import logo from "../../../public/logo.png"
import Image from 'next/image';
import man from "../../../public/man.png"
import { CiBellOn } from 'react-icons/ci';


const Navbar = () => {
    return (
        <div className="bg-[#FFF9F9] flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-x-2">
                <Image src={logo} alt="logo" width={50} height={50} className="mb-4" />
                <h2 className="text-[#283163] font-semibold text-2xl">Agile</h2>
            </div>
            <div>
                <ul className="flex items-center gap-x-4 text-[#283163]">
                    <li>Availability</li>
                    <li>Integration</li>
                    <li>Community</li>
                    <li className="border-[.3px] border-[#283163] rounded-full p-2  text-[#283163]">
                        <CiBellOn className="text-[25px]"/>
                    </li>
                    <li className="border-[1px] border-[#283163] rounded-full p-[4px]">
                        <Image src={man} alt="man" width={35} height={35} className="rounded-full " />
                    </li>
                    
                </ul>
            </div>  
        </div>
    );
};

export default Navbar;