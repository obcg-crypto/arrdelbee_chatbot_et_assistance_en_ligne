"use client"

import { PiWechatLogoBold } from "react-icons/pi";
import { HiOutlineShare } from "react-icons/hi2";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import DiscussionBtn from "@/components/DiscussionBtn"
import ConversationBtn from "@/components/ConversationBtn"
import BotBtn from "@/components/BotBtn"
import { useEffect, useState } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { DiscussionCardType } from "@/types/Discussion";


export default function PageGestion() {

    const [userInput, setUserInput] = useState<string>('');
    const [CONVESATION_LIST, setDiscussionList] = useState<DiscussionCardType[]>([]);
  


    const handleSubmit = async () => {
        try {
            // Envoi de la requête POST
            const response = await fetch('http://localhost:2000/api/suggestion/getAll', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Récupération des données de la réponse
            const responseData = await response.json();
            console.log(responseData['suggestion'][0])

            // Mise à jour de DISCUSSION_LIST avec la réponse

            for(let i = 0;i<responseData['suggestion'].length;i++){
                setDiscussionList((prevList) => [
                    ...prevList,
                    responseData['suggestion'][i],
                  ]);
            }

            
            
        } catch (error) {
            console.error('Erreur lors de la requête GET :', error);
        }
    };

    

    useEffect(() => {
        handleSubmit();
      }, []);
    
      
    //console.log(CONVESATION_LIST)


    return (
        <div className="relative justify-between pl-5 flex flex-row w-full h-[70%]">
            <div>
            </div>
            {/* Chatbot Page */}
            <div className=" relative w-full bg-white">
                <div className="flex justify-center items-center h-[60px]">
                    <h1 className="text-center text-2xl font-bold">Liste des suggestions</h1>
                </div>



                <div className="flex flex-col overflow-y-auto h-full">
                    {
                        CONVESATION_LIST.map((conversation, index: number) => {

                            return <BotBtn
                                texte={conversation.message}
                                time={conversation.date} 
                                type={""} />
                        })
                    }
                </div>

            </div>
        </div>
    )
}

