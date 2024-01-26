"use client"

import { PiWechatLogoBold } from "react-icons/pi";
import { HiOutlineShare } from "react-icons/hi2";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import DiscussionBtn from "@/components/DiscussionBtn"
import ConversationBtn from "@/components/ConversationBtn"
import BotBtn from "@/components/BotBtn"
import { DiscussionCardType } from "@/types/Discussion"
import { ConversationCardType } from "@/types/Conversation";
import { useState } from "react";
import Link from "next/link";
import router, { useRouter } from "next/router";


export default function Suggestion() {

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
            const response = await fetch('http://localhost:2000/api/suggestion/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: userInput,
                    user: '65a7d86019a88c910d4bc7c0',
                    date: currentTime
                }),
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

            // Mise à jour de DISCUSSION_LIST avec la réponse
            setDiscussionList((prevList) => [
                ...prevList,
                { texte: responseData.bot_response, time: currentTime, type: "bot" },
            ]);
            console.log(CONVESATION_LIST)
        } catch (error) {
            console.error('Erreur lors de la requête POST :', error);
        }

        alert('Suggestion émise avec success !')
        location.reload();
    };


    return (
        <div className="relative justify-between pl-5 flex flex-row w-full h-[70%]">
            <div>
                <div className="p-5 absolute w-full">
                    <textarea
                        value={userInput}
                        onChange={handleUserInput}
                        className="z-9999 relative block w-full min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        id="exampleSearch"
                        rows="12" // Définissez le nombre de lignes visible dans la zone de texte
                        placeholder="Envoyer votre suggestion"
                    ></textarea>
                    <button
                        onClick={handleSubmit}
                        className="absolute right-8 top-[26px] w-6 h-6 p-2 ml-20 bg-yellow-500 rounded-full flex-col justify-center items-center gap-2.5 inline-flex"
                        type="button"
                    >
                        <PiArrowElbowDownRightBold />
                    </button>
                </div>


            </div>

        </div>
    )
}

