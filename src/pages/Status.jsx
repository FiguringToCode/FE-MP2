import { useContext, useState } from "react";
import { SideBar } from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import CRMContext from "../CRMContext";
import { useParams } from "react-router-dom";   

export const Status = () => {
  const { leads, loading, sidebarOpen, setSidebarOpen } = useContext(CRMContext);
  const { status } = useParams();

  const [agentFilter, setAgentFilter] = useState(null);

  const filteredLeads = leads?.filter((lead) => lead.status === status) || [];

  const visibleLeads = agentFilter ? filteredLeads.filter(lead => lead.salesAgent?.name === agentFilter) : filteredLeads

  return (
    <div className="d-flex body-style">
      <SideBar sidebarOpen={sidebarOpen} />
      <div className="container main-content py-5 ps-md-5">
        <button
          className="sidebar-toggle-btn d-md-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <GiHamburgerMenu />
        </button>

        <div
          id="Header"
          className="fs-1 fw-bold mb-4 py-3"
          style={{
            background: "linear-gradient(90deg,#1e88e5 60%,#60a9f7 100%)",
            color: "white",
            borderRadius: "18px",
          }}
        >
          Leads By Status
        </div>

        <section className="my-5">
          <h3 className="fw-semibold fs-2 text-center">Lead List by Status</h3>
          <hr />
          <h3 className="ps-md-5">
            Status : <span className="mx-2">{status}</span>
          </h3>
        </section>
        <hr />

        <section className="mb-5">
          {loading ? (
            <p>Loading....</p>
          ) : visibleLeads.length > 0 ? (
            visibleLeads.map((lead, index) => (
              <h3 key={lead._id} className="ps-md-5 my-4">
                Lead {index + 1} - ( Sales Agent = {lead.salesAgent?.name || "Unknown"} )
              </h3>
            ))
          ) : (
            <p>No leads found with this status.</p>
          )}
        </section>
        <hr />

        <section>
          <h3 className="ps-md-5">
            Filters:
            <span>
              {filteredLeads.map((lead) => lead.salesAgent?.name).filter((name, i, arr) => name && arr.indexOf(name) === i)
              .map(name => (
                    <button key={name}
                    className={`btn px-4 mx-2 fw-semibold btn-outline-primary`}
                    style={{ borderRadius: "30px", minWidth: "120px" }}
                    onClick={() => setAgentFilter(name)}
                    >
                        {name}
                    </button>
              ))}
            </span>
            <button className="btn btn-sm btn-outline-secondary" onClick={() => setAgentFilter(null)}>Clear</button>
          </h3>
        </section>
      </div>
    </div>
  );
};
