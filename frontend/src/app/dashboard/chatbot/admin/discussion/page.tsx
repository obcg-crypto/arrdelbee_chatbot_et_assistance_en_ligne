"use client"

import { PiArrowElbowDownRightBold } from "react-icons/pi";
import  ConversationBtn  from "@/components/ConversationBtn"
import BotBtn from "@/components/BotBtn"
import { ConversationCardType } from "@/types/Conversation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { io } from "socket.io-client";


export default function Discussion(){

    const socket = io("http://localhost:2000");

    const [userInput, setUserInput] = useState<string>('');
    const [CONVESATION_LIST, setDiscussionList] = useState<ConversationCardType[]>([]);


    useEffect(() => {
      const handleBotMessage = (msg: string) => {
        if (msg !== "") {
          console.log(msg);
          setDiscussionList((prevList) => [
            ...prevList,
            { texte: msg, time: getCurrentTime(), type: "bot" },
          ]);
        }
      };
    
      // Attacher le gestionnaire d'événements lors du montage du composant
      socket.on("bot message", handleBotMessage);
    
      // Détacher le gestionnaire d'événements lors du démontage du composant
      return () => {
        socket.off("bot message", handleBotMessage);
      };
    }, []); // Le tableau de dépendances vide indique que cette fonction useEffect ne doit être exécutée qu'une seule fois lors du montage du composant
    


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

    socket.emit("client message", userInput);

    try {
      // Envoi de la requête POST
      const response = await fetch('http://localhost:2000/api/message/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: userInput,
            sender: '65a7d86019a88c910d4bc7c0',
            receiver: '65a7d8db19a88c910d4bc7c2',
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
                <Link href="/dashboard/chatbot">
                    
                    <button className="p-4 rounded-full bg-yellow-500 text-white text-xs font-bold border-radius">Revenir a la adiscussion avec le chatbot</button>
                    
                </Link>
                </div>                
            </div>
        </div>
    )
}

