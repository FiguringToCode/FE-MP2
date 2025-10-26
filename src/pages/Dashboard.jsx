import {useContext, useState } from "react";
import CRMContext from "../CRMContext";
import {useNavigate, Link} from 'react-router-dom'
import { SideBar } from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";   

export const Dashboard = () => {
    const { leads, loading, sidebarOpen, setSidebarOpen } = useContext(CRMContext);

    const [leadStatus, setLeadStatus] = useState('All')

    const filteredLeads = leadStatus === 'All' ? leads : leads.filter(lead => lead.status === leadStatus)

    const navigate = useNavigate()
    const handleStatusNavigate = (status) => {
        navigate(`/status/${status}`)
    }

    return (
        <div className="d-flex body-style"> 
            <SideBar />
            {/* Main Content */}
            <main className="container main-content py-5 ps-md-5">
            <button
                className="sidebar-toggle-btn d-md-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
            >
               <GiHamburgerMenu />
            </button>
                {/* Header */}
                <div
                    id="Header"
                    className="fs-1 fw-bold mb-4 py-3"
                    style={{
                        background: "linear-gradient(90deg,#1e88e5 60%,#60a9f7 100%)",
                        color: "white",
                        borderRadius: "18px"
                    }}>
                    Anvaya CRM Dashboard
                </div>

                {/* Quick Filters */}
                <section className="mb-5">
                    <h3 className="fw-semibold">Quick Filters</h3>
                    <div className="d-flex flex-wrap gap-2 mt-3">
                        {["All", "New", "Contacted", "Qualified", "Proposal Sent", "Closed"].map(status => (
                            <button
                                key={status}
                                className={`btn btn-outline-primary px-4 fw-semibold`}
                                style={{ borderRadius: "30px", minWidth: "120px" }}
                                onClick={() => setLeadStatus(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </section>
                <hr />

                {/* Lead Cards */}
                <section className="mb-5">
                    <h3 className="fw-semibold mb-4">Leads</h3>
                    <div className="row g-4">
                        {filteredLeads && filteredLeads.length > 0 ? (
                            filteredLeads.map((lead) => (
                                <div className="col-12 col-md-6 col-lg-4" key={lead._id}>
                                    <div className="card shadow-sm border-0 h-100">
                                        <div className="card-body py-3">
                                            <h5 className="card-title mb-1 text-primary">
                                                {lead.name}
                                            </h5>
                                            <span className="badge rounded-pill bg-info text-dark my-3 px-4 py-2">
                                                {lead.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : loading ? (
                            <div className="text-center my-5">
                                <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
                                <p className="mt-2 fw-semibold text-secondary">Loading leads…</p>
                            </div>
                        ) : (
                            <div className="text-center text-muted my-5">No Leads Available</div>
                        )}
                    </div>
                </section>
                <hr />

                {/* Lead Status Summary */}
                <section className="mb-5 w-lg-50 ">
                    <div>
                        <h3 className="fw-semibold">Lead Status</h3>
                        <div className="card bg-light shadow-sm p-4 mt-3 d-flex flex-wrap gap-4">
                            <div className="fs-5 fw-semibold" style={{cursor: 'pointer'}} onClick={() => handleStatusNavigate('New')}>- New: <span className="fw-bold text-info">[{leads?.filter(l => l.status === 'New').length}]</span> Leads</div>

                            <div className="fs-5 fw-semibold" style={{cursor: 'pointer'}} onClick={() => handleStatusNavigate('Contacted')}>- Contacted: <span className="fw-bold text-primary">[{leads?.filter(l => l.status === 'Contacted').length}]</span> Leads</div>

                            <div className="fs-5 fw-semibold" style={{cursor: 'pointer'}} onClick={() => handleStatusNavigate('Qualified')}>- Qualified: <span className="fw-bold text-warning">[{leads?.filter(l => l.status === 'Qualified').length}]</span> Leads</div>

                            <div className="fs-5 fw-semibold" style={{cursor: 'pointer'}} onClick={() => handleStatusNavigate('Proposal Sent')}>- Proposal Sent: <span className="fw-bold text-success">[{leads?.filter(l => l.status === 'Proposal Sent').length}]</span> Leads</div>

                            <div className="fs-5 fw-semibold" style={{cursor: 'pointer'}} onClick={() => handleStatusNavigate('Closed')}>- Closed: <span className="fw-bold text-danger fs-5">[{leads?.filter(l => l.status === 'Closed').length}]</span> Leads</div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Link
                            className="btn btn-dark px-5 py-2 fw-semibold"
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

            </main>
        </div>
    );
};
