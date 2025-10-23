import { createContext, useState } from "react";
import useFetch from './useFetch'
import useLocalStorage from './useLocalStorage'


const CRMContext = createContext()
export default CRMContext


export const DataProvider = ({children}) => {
    const { data: leads, loading, error } = useFetch("https://be-mp-2.vercel.app/leads")
    // console.log(leads)

    const { data: comments, loading: loading1, error: error1 } = useFetch("https://be-mp-2.vercel.app/leads/comments")

    const { data: salesAgents, loading: loading2, error: error2 } = useFetch("https://be-mp-2.vercel.app/salesAgent")

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const { data: closedLeads, loading: loading3, error: error3 } = useFetch("https://be-mp-2.vercel.app/report/last-week/closed")

    const { data: pipelineLeads, loading: loading4, error: error4 } = useFetch("https://be-mp-2.vercel.app/report/pipeline")


    return (
        <CRMContext.Provider 
        value={{
            leads, 
            loading,
            sidebarOpen,
            setSidebarOpen,
            comments,
            loading1,
            salesAgents,
            loading2,
            closedLeads,
            loading3,
            pipelineLeads,
            loading4
        }}>
            {children}
        </CRMContext.Provider>
    )
}