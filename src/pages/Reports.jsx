import { useContext } from "react";
import { SideBar} from "../components/Sidebar.jsx"
import { GiHamburgerMenu } from "react-icons/gi";
import CRMContext from "../CRMContext.jsx";
import {Chart as ChartJS, defaults} from 'chart.js/auto'
import { Doughnut, Pie, Bar } from "react-chartjs-2";


export const Reports = () => {
    const {sidebarOpen, setSidebarOpen, closedLeads, loading3, pipelineLeads, loading4} = useContext(CRMContext)

    const totalLeads = [
        {label: "Closed Leads", value: closedLeads?.length},
        {label: "Pipeline Leads", value: pipelineLeads?.length},
    ]
    
    const leadStatusData = [
        {label: "New", value: pipelineLeads?.filter(lead => lead.status === "New").length},
        {label: "Contacted", value: pipelineLeads?.filter(lead => lead.status === "Contacted").length},
        {label: "Qualified", value: pipelineLeads?.filter(lead => lead.status === "Qualified").length},
        {label: "Proposal Sent", value: pipelineLeads?.filter(lead => lead.status === "Proposal Sent").length},
        {label: "Closed", value: closedLeads?.length},
    ]
    

    return (
        <>
            <div className="d-flex body-style">
                <SideBar sidebarOpen={sidebarOpen} />
                
                <div className="container main-content py-5 ps-md-5">

                    <button className="sidebar-toggle-btn d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
                            <GiHamburgerMenu />
                    </button>

                    <div id="Header" className="fs-1 fw-bold mb-4 py-3" style={{background: "linear-gradient(90deg,#1e88e5 60%,#60a9f7 100%)", color: "white", borderRadius: "18px",}}>
                        Anvaya CRM Reports
                    </div>

                    <section className="my-5">
                        <h3 className="fw-semibold fs-2 text-center">Report Overview</h3>
                    </section>
                    <hr />

                    <section className="my-5 d-flex flex-column align-items-center gap-5">
                        <div className="card w-50 text-center">
                            <div className="card-header fs-4 fw-semibold">
                                Total Leads ( Closed vs Pipeline )
                            </div>
                            <div className="card-body">
                                <Pie data={{
                                    labels: totalLeads?.map(data => data.label),
                                    datasets: [
                                        {
                                            data: totalLeads?.map(data => data.value),
                                            backgroundColor: ["rgba(106, 90, 205, 0.8)", "rgba(72, 209, 204, 0.8)"]
                                        }
                                    ]
                                }} />
                            </div>
                        </div>
                        <div className="card w-50 text-center">
                            <div className="card-header fs-4 fw-semibold">
                                Closed Leads By Sales Agent
                            </div>
                            <div className="card-body">
                                <Bar data={{
                                    labels: closedLeads?.map(data => data.salesAgent.name),
                                    datasets: [
                                        {
                                            label: closedLeads?.map(data => data.name),
                                            data: closedLeads?.map(data => data.status === 'Closed'),
                                            backgroundColor: ["rgba(106, 90, 205, 0.8)", "rgba(72, 209, 204, 0.8)"]
                                        }
                                    ]
                                }} />
                            </div>
                        </div>
                        <div className="card w-50 text-center">
                            <div className="card-header fs-4 fw-semibold">
                                Lead Status Distribution
                            </div>
                            <div className="card-body">
                                <Doughnut data={{
                                    labels: leadStatusData?.map(data => data.label),
                                    datasets: [
                                        {
                                            data: leadStatusData?.map(data => data.value),
                                            backgroundColor: ["rgba(106, 90, 205, 0.8)", "rgba(72, 209, 204, 0.8)", "rgba(172, 25, 204, 0.8)", "rgba(209, 186, 72, 0.74)", "rgba(209, 72, 72, 0.8)"]
                                        }
                                    ]
                                }} />
                            </div>
                        </div>
                    </section>

                </div>

            </div>
        </>
    )
}