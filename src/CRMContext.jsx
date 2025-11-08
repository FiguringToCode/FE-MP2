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


    const [salesAgents, setSalesAgents] = useState()
    const [loading2, setLoading2] = useState(true)
    const fetchAgents = async () => {
        setLoading2(true)
        const response = await axios.get("https://be-mp-2.vercel.app/salesAgent")
        setSalesAgents(response.data)
        setLoading2(false)
    }
    useEffect(() => {
        fetchAgents()
    }, [])


    const [sidebarOpen, setSidebarOpen] = useState(false)

    const { data: closedLeads, loading: loading3, error: error3 } = useFetch("https://be-mp-2.vercel.app/report/last-week/closed")

    const { data: pipelineLeads, loading: loading4, error: error4 } = useFetch("https://be-mp-2.vercel.app/report/pipeline")

    const [deleteLead, setDeleteLead] = useState(null)
    const [deleteLoad1, setDeleteLoad1] = useState(false)
    const deleteLeadFunction = async (leadId) => {
        try {
            setDeleteLoad1(true)
            const response = await axios.delete(`https://be-mp-2.vercel.app/leads/delete/${leadId}`)
            setDeleteLead(response.data)
            
        } catch (error) {
            console.error("Error deleting lead: ", error)
        } finally{
            setDeleteLoad1(false)
        }
    }


    const [deleteAgent, setDeleteAgent] = useState(null)
    const [deleteLoad2, setDeleteLoad2] = useState(false)
    const deleteAgentFunction = async (agentId) => {
        try {
            setDeleteLoad2(true)
            const response = await axios.delete(`https://be-mp-2.vercel.app/salesAgent/delete/${agentId}`)
            setDeleteAgent(response.data)

        } catch (error) {
            console.error("Error deleting agent: ", error)
        } finally{
            setDeleteLoad2(false)
        }
    }


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
            fetchAgents,
            closedLeads,
            loading3,
            pipelineLeads,
            loading4,
            deleteLead,
            deleteLoad1,
            deleteLeadFunction,
            deleteAgent,
            deleteLoad2,
            deleteAgentFunction 
        }}>
            {children}
        </CRMContext.Provider>
    )
}