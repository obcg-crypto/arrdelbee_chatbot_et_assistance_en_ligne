'use client'
import {
  TabBar
} from "@/components"
import { CHATBOT_LINKS, INFO_MANAGE_LINKS } from "@/constants/tabsLinks"
import { usePathname } from 'next/navigation'



export default function ChatbotLayout({
    children,
  }: {
    children: React.ReactNode
  }){
    const PATHNAME = usePathname()
    const LINK_ARRAY = PATHNAME.split("/")
    const PARENT = "ChatBot"
    const CHILD = PARENT.trim().toUpperCase() === LINK_ARRAY[LINK_ARRAY.length-1].replaceAll("-"," ").trim().toUpperCase() ? CHATBOT_LINKS[0].label : LINK_ARRAY[LINK_ARRAY.length-1]
    
    return(
      <>
        <TabBar
            parent={PARENT}
            child={CHILD}
            tabLinkItems={CHATBOT_LINKS}
        />
        {children}
      </>
    )
  }