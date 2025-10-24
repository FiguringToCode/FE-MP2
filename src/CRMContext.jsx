import { createContext, useEffect, useState } from "react";
import useFetch from './useFetch'
import useLocalStorage from './useLocalStorage'
import axios from "axios";


const CRMContext = createContext()
export default CRMContext


export const DataProvider = ({children}) => {
    
    const [leads, setLeads] = useState()
    const [loading, setLoading] = useState(true)
    const fetchLeads = async () => {
        setLoading(true)
        const response = await axios.get("https://be-mp-2.vercel.app/leads")
        setLeads(response.data)
        setLoading(false)
    }
    useEffect(() => {
        fetchLeads()
    }, [])


    const [comments, setComments] = useState()
    const [loading1, setLoading1] = useState(true)
    const fetchComments = async () => {
        setLoading1(true)
        const response = await axios.get("https://be-mp-2.vercel.app/leads/comments")
        setComments(response.data)
        setLoading1(false)
    }
    useEffect(() => {
        fetchComments()
    }, [])

    const { data: salesAgents, loading: loading2, error: error2 } = useFetch("https://be-mp-2.vercel.app/salesAgent")

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const { data: closedLeads, loading: loading3, error: error3 } = useFetch("https://be-mp-2.vercel.app/report/last-week/closed")

    const { data: pipelineLeads, loading: loading4, error: error4 } = useFetch("https://be-mp-2.vercel.app/report/pipeline")


    return (
        <CRMContext.Provider 
        value={{
            leads, 
            loading,
            fetchLeads,
            sidebarOpen,
            setSidebarOpen,
            comments,
            loading1,
            fetchComments,
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