import TabLinkType from "@/types/tabLinks";

export const INFO_MANAGE_PATH:string = "/dashboard/gestion-des-informations" 
export const INFO_MANAGE_LINKS:Array<TabLinkType> = [
    {
        label: "Discussion_ArrdelBee",
        href: `${INFO_MANAGE_PATH}`
    },
    {
        label: "Suggestion_ArrdelBee",
        href: `${INFO_MANAGE_PATH}/gestion`
    },

]
export const CHATBOT_PATH:string = "/dashboard/chatbot" 
export const CHATBOT_LINKS:Array<TabLinkType> = [
    {
        label: "Discussion",
        href: `${CHATBOT_PATH}`
    },
    {
        label: "Suggestion",
        href: `${CHATBOT_PATH}/admin/suggestion`
    },

]