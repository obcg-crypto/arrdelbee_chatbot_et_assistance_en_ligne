import React from 'react';
import { IoTimeOutline } from "react-icons/io5";
import { ConversationCardType } from '@/types/Conversation';

const ConversationBtn: React.FC<ConversationCardType> = ({ texte, time}) => {
  return (
    <div className='flex py-4 flex-row-reverse p-4 '>
       <div className="w-[438px] p-4 bg-blue-800 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl justify-start items-start gap-2.5 inline-flex">
                        <div className="grow shrink basis-0 justify-start items-center gap-3 flex">
                            <div className="grow shrink basis-0 flex-col justify-center items-start gap-4 inline-flex">
                                <div className="self-stretch text-white text-lg font-semibold font-['Urbanist']">{texte}</div>
                                <div className="w-full flex flex-col text-xs">
                               <span className="flex flex-row-reverse items-center gap-1">You at {time}</span>
                                </div>
                                </div>
                          </div>
         </div>
      </div> 
    
  );
}

export default ConversationBtn;