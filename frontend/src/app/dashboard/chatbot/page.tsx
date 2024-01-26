"use client"

import { PiWechatLogoBold } from "react-icons/pi";
import { HiOutlineShare } from "react-icons/hi2";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import  DiscussionBtn   from "@/components/DiscussionBtn"
import  ConversationBtn  from "@/components/ConversationBtn"
import BotBtn from "@/components/BotBtn"
import {DiscussionCardType} from "@/types/Discussion"
import { ConversationCardType } from "@/types/Conversation";
import { useState } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";


export default function Chatbot(){

    const [userInput, setUserInput] = useState<string>('');
    const [CONVESATION_LIST, setDiscussionList] = useState<ConversationCardType[]>([]);


    function getCurrentTime(): string {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
        const minutes = now.getMinutes().toString().padStart(2, '0');
      
        return `${hours}:${minutes}`;
    }

 
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    const currentTime: string = getCurrentTime();
    try {
      // Envoi de la requête POST
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
      });

      setDiscussionList((prevList) => [
        ...prevList,
        { texte: userInput, time: currentTime, type: "client" },
      ]);

      // Vérification de la réussite de la requête
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }

      // Récupération des données de la réponse
      const responseData = await response.json();

      const response2 = await fetch('http://localhost:5000/save_conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"user_input": userInput, "bot_response": responseData.bot_response}),
      });

      // Mise à jour de DISCUSSION_LIST avec la réponse
      setDiscussionList((prevList) => [
        ...prevList,
        { texte: responseData.bot_response, time: currentTime, type: "bot" },
      ]);
      console.log(CONVESATION_LIST)
    } catch (error) {
      console.error('Erreur lors de la requête POST :', error);
    }



    

  };

  
    return(
        <div className="relative justify-between pl-5 flex flex-row w-full h-[70%]">
        <div>
        </div>
            {/* Chatbot Page */}
             <div className=" relative w-full bg-white">
              
        
                    
                    <div className="flex flex-col overflow-y-auto h-full">
                    {
                        CONVESATION_LIST.map((conversation:ConversationCardType, index:number)=>{
                           
                            if (conversation.type == "client") {
                                return <ConversationBtn
                                            texte={conversation.texte}
                                            time={conversation.time}
                                            type={conversation.type}
                                        />
                            } else {
                                return <BotBtn
                                texte={conversation.texte}
                                time={conversation.time}
                                type={conversation.type}
                                />
                            }

                        })
                    }
                </div>


               
                    <div className="p-5 absolute w-full">
                        <input value={userInput} onChange={handleUserInput} type="search" className="z-9999 relative block w-full min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary " id="exampleSearch"
                             placeholder="Envoyer votre message" />
                        <button onClick={handleSubmit} className="absolute right-8 top-[26px] w-6 h-6 p-2 ml-20 bg-yellow-500 rounded-full flex-col justify-center items-center gap-2.5 inline-flex" type="button">
                            <PiArrowElbowDownRightBold />
                        </button>
                    </div>
            

            </div>
           {/* second division  */}

            <div className=" w-[300px] flex flex-col border-b border-b-lime-900 border-solid  dark:border-neutral-600  bg-stone-200 border-r-4">
                <div className="w-full h-[100px]   bg-stone-200 border-r-4 border-solid flex flex-row">
                    <p className=" mt-10 ml-1 text-blue-700 font-bold" ></p>
                    <p className="text-yellow-800 mt-10 ml-20 font-['Urbanist'] uppercase tracking-wide"></p>
                </div>
                <div className="overflow-y-auto h-full">
                  
                </div>
                <div className="w-full p-4 flex flex-col justify-center gap-2">
                <Link href="chatbot/admin/discussion">
                    
                    <button className="p-4 rounded-full bg-yellow-500 text-white text-xs font-bold border-radius">Demander une assistance humaine</button>
                    
                </Link>
                </div>                
            </div>
        </div>
    )
}

