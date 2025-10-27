import { useContext } from "react";
import { SideBar } from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "react-toastify";
import CRMContext from "../CRMContext";


export const Settings = () => {
    const {sidebarOpen, setSidebarOpen, leads, loading, fetchLeads, salesAgents, loading2, fetchAgents, deleteLeadFunction, deleteLoad1, deleteAgentFunction, deleteLoad2} = useContext(CRMContext)
    // console.log(leads)
    // console.log(salesAgents)

    return (
        <div className="d-flex body-style">
            <SideBar />

            <main className="container main-content py-5 ps-md-5">

                <button className="sidebar-toggle-btn d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
                    <GiHamburgerMenu /> 
                </button>

                <div id="Header" className="fs-1 fw-bold mb-4 py-3" style={{background: "linear-gradient(90deg,#1e88e5 60%,#60a9f7 100%)", color: "white", borderRadius: "18px"}}>
                  Settings
                </div>

                <section className="my-5">
                    <h3 className="fw-semibold fs-2 text-center">All Leads</h3>
                    <hr />  
                    <div className="row">
                            {leads.length > 0 ? 
                            leads?.map((lead, index) => (
                                <div className="card col-sm-12 col-md-6 col-lg-4 my-1">
                                    <div className="card-header">
                                        Lead {index+1}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{lead?.name}</h5>
                                        <p className="card-text mb-0 mt-3"><b>Source: </b>{lead?.source}</p>
                                        <p className="card-text mb-0"><b>Status: </b>{lead?.status}</p>
                                        <p className="card-text mb-0"><b>Agent Assigned: </b>{lead?.salesAgent?.name}</p>
                                        <p className="card-text mb-0"><b>Priority: </b>{lead?.priority}</p>
                                        <p className="card-text mb-0"><b>Tag: </b>{lead?.tags.join(', ')}</p>
                                        <p className="card-text mb-3"><b>Closure Time: </b>{lead?.timeToClose > 1 ? lead?.timeToClose + ' Days' : lead?.timeToClose + ' Day'}</p>
                                        <button className="btn btn-outline-danger"
                                        onClick={async () => {
                                            await deleteLeadFunction(lead?._id);
                                            fetchLeads(); // refresh list after deletion
                                            toast.success("Lead Deleted Successfully")
                                        }} disabled={deleteLoad1}>
                                        Delete Lead
                                        </button>
                                    </div>
                                </div>
                            )) 
                            : <h1 className="text-danger">No leads Found</h1>}
                    </div>
                </section>

                <section style={{marginTop: "7rem"}}>
                    <h3 className="fw-semibold fs-2 text-center">All Sales Agents</h3>
                    <hr />
                    <div className="row">
                        {salesAgents?.length > 0 ? salesAgents?.map((agent, index) => (
                            <div className="card col-sm-12 col-md-6 col-lg-4 my-1">
                                <div className="card-header">
                                    Agent {index+1}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{agent?.name}</h5>
                                    <p className="card-text mb-0 mt-3"><b>Agent Id: </b>{agent?._id}</p>
                                    <p className="card-text mb-3"><b>Agent Email: </b>{agent?.email}</p>
                                    <button className="btn btn-outline-danger"
                                    onClick={async () => {
                                        await deleteAgentFunction(agent?._id);
                                        fetchAgents();
                                        toast.success("Agent Deleted Successfully")
                                    }} disabled={deleteLoad2}>
                                        Delete Agent
                                    </button>
                                </div>
                            </div>
                        ))
                        : <h1 className="text-danger">No Sales Agent Found</h1>}
                    </div>
                </section>

            </main>
        </div>
    )
}