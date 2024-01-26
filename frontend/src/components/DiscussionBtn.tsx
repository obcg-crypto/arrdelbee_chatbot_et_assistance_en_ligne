import React from 'react'
import { IoCalendarNumberOutline, IoTimeOutline } from "react-icons/io5";
import {DiscussionCardType} from "@/types/Discussion"

const DiscussionBtn:React.FC<DiscussionCardType> = () => {
  return (
    <div className='group w-full h-[75px] flex flex-row hover:bg-[#e5ead7] hover:border-r-4 hover:border-secondary-yellow'>
        
        <div className="w-full h-full p-2 flew flex-col gap-5 justify-start items-start">
            <span className="w-full text-left text-primary-blue font-bold text-base group-hover:text-blacki">Mental Health</span>
            <div className="w-full flex flex-col text-xs">
                <span className="flex flex-row items-center gap-1"><IoCalendarNumberOutline/> Mardi 12 Decembre 2023</span>
                <span className="flex flex-row items-center gap-1"><IoTimeOutline/> 10h45</span>
            </div>
        </div>

        <div className="h-full pr-4 flex flex-col justify-center items-center">
            <span className="aspect-square text-center rounded-full text-white bg-secondary-yellow">8</span>
        </div>

    </div>
  )
}

export default DiscussionBtn