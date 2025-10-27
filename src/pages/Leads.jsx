import { useContext, useState } from "react";
import { SideBar } from "../components/Sidebar"
import { GiHamburgerMenu } from "react-icons/gi";
import CRMContext from "../CRMContext";
import { useNavigate, Link } from "react-router-dom";

export const Leads = () => {
  const {leads, loading, sidebarOpen, setSidebarOpen} = useContext(CRMContext)
  const [leadAgent, setLeadAgent] = useState('All')
  const [leadPriority, setLeadPriority] = useState('All')
  const navigate = useNavigate()
  
  const filteredLeads = leads?.filter((lead) => {
    const agentMatch = leadAgent === "All" || lead.salesAgent?.name === leadAgent;
    const priorityMatch = leadPriority === "All" || lead.priority === leadPriority;
    return agentMatch && priorityMatch;
  });

  console.log(filteredLeads)
  
    
    return (
        <>
          <div className="d-flex body-style">
            <SideBar />
            <div className="container main-content py-5 ps-md-5">
              <button className="sidebar-toggle-btn d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
                  <GiHamburgerMenu />
              </button>
              
              <div
                  id="Header"
                  className="fs-1 fw-bold mb-4 py-3"
                  style={{background: "linear-gradient(90deg,#1e88e5 60%,#60a9f7 100%)", color: "white", borderRadius: "18px"}}>
                  Lead List
              </div>

              <section className="px-md-5 pe-5 py-5 table-responsive">
                <h3 className="fw-semibold">Lead Overview</h3>
                <div className="d-flex flex-wrap gap-2 mt-3">
                <table className="table table-bordered text-center table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Lead Name</th>
                      <th scope="col">Lead Status</th>
                      <th scope="col">Sales Agent</th>
                      <th scope="col">Lead Priority</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {loading ? (
                      <tr>
                        <td colSpan="4">Loading...</td>
                      </tr>
                    ) : filteredLeads && filteredLeads.length > 0 ? (
                      filteredLeads.map(lead => (
                        <tr key={lead._id} onClick={() => navigate(`/leads/leadDetails/${lead._id}`)} style={{ cursor: 'pointer' }} tabIndex={0} // improves keyboard accessibility
                        aria-label={`View details for ${lead.name}`}
                        >
                          <td>{lead?.name}</td>
                          <td>{lead?.status}</td>
                          <td>{lead?.salesAgent?.name}</td>
                          <td>{lead?.priority}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No leads found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                </div>
              </section>

              <hr />

              <section className="px-md-5 mb-5">
                    <h3 className="fw-semibold">Filters</h3>
                    <div className="quick-filter-group mt-3">
                        {["All", "John Doe", "Jane Smith", "Robert Litt", "Matthew Sanders", "Rebecca Gutenberg"].map(agent => (
                            <button
                                key={agent}
                                className={`btn btn-outline-primary px-4 fw-semibold`}
                                style={{ borderRadius: "30px", minWidth: "120px" }}
                                onClick={() => setLeadAgent(agent)}
                            >
                                {agent}
                            </button>
                        ))}
                    </div>
                </section>

                <hr />

                <section className="px-md-5 mb-5">
                    <h3 className="fw-semibold">Sort By Priority</h3>
                    <div className="priority-filter-group mt-3">
                        {["All", "High", "Medium", "Low"].map(priority => (
                            <button key={priority} className="btn btn-outline-info px-4 fw-semibold" style={{borderRadius: '30px', minWidth: '120px'}} onClick={() => setLeadPriority(priority)}>
                              {priority}
                            </button>
                        ))}
                    </div>
                    <div className="mt-5">
                        <Link
                            className="btn btn-dark px-5 py-2 fw-semibold addLeadBtn-style"
                            style={{
                                borderRadius: "30px",
                                boxShadow: "0 2px 8px rgba(30,40,70,.1)"
                            }}
                            to={'/leadForm'}
                        >
                            Add New Lead
                        </Link> 
                    </div>
                </section>

            </div>
          </div>
        </>
    )
}
