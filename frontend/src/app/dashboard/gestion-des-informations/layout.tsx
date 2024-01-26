'use client'
import {
  TabBar
} from "@/components"
import { INFO_MANAGE_LINKS } from "@/constants/tabsLinks"
import { usePathname } from 'next/navigation'



export default function MonitoringLayout({
    children,
  }: {
    children: React.ReactNode
  }){
    const PATHNAME = usePathname()
    const LINK_ARRAY = PATHNAME.split("/")
    const PARENT = "ASSISTANCE EN LIGNE"
    const CHILD = PARENT.trim().toUpperCase() === LINK_ARRAY[LINK_ARRAY.length-1].replaceAll("-"," ").trim().toUpperCase() ? INFO_MANAGE_LINKS[0].label : LINK_ARRAY[LINK_ARRAY.length-1]
    
    return(
      <>
        <TabBar
            parent={PARENT}
            child={CHILD}
            tabLinkItems={INFO_MANAGE_LINKS}
        />
        {children}
      </>
    )
  }