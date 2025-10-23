import { Link, useLocation } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { LuChartSpline, LuFileChartColumnIncreasing } from "react-icons/lu";
import { MdAddIcCall } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { useContext } from 'react';
import CRMContext from '../CRMContext';

export const SideBar = () => {
    const {sidebarOpen} = useContext(CRMContext)

    const location = useLocation();
    const navItems = [
        { to: "/", icon: <IoHome style={{marginRight: "1rem"}} />, label: "Dashboard" },
        { to: "/leads", icon: <MdAddIcCall style={{marginRight: "1rem"}} />, label: "Leads" },
        { to: "/sales", icon: <LuFileChartColumnIncreasing style={{marginRight: "1rem"}} />, label: "Sales" },
        { to: "/salesAgent", icon: <FaUserTie style={{marginRight: "1rem"}} />, label: "Agents" },
        { to: "/report", icon: <LuChartSpline style={{marginRight: "1rem"}} />, label: "Reports" },
    ];

    return (

            <div className={`sidebar-container shadow-lg sidebar-style ${sidebarOpen ? "open" : ""} position-sticky`}>
                <nav className="navbar flex-column p-4 position-sticky">
                    <div className="mb-4 text-center">
                        <Link to={"/"} className='text-decoration-none text-white'>
                            <img src="/Anvaya-Logo.png" alt="Anvaya Logo" width="70" height="70" style={{ borderRadius: "12px" }} />
                            <div className="mt-2 fw-bold fs-5">Anvaya CRM</div>
                        </Link>
                    </div>
                    
                    <div className="nav flex-column nav-pills mt-5 gap-2 position-sticky">
                        {navItems.map(({ to, icon, label }) => (
                            <Link
                                key={label}
                                to={to}
                                className={`nav-link d-flex align-items-center px-4 py-3 fs-6 fw-semibold
                                    ${location.pathname === to ? "active-link" : "inactive-link"}`}
                                style={{
                                    borderRadius: "18px",
                                    transition: "background 0.2s",
                                    background: location.pathname === to ? "rgba(255,255,255,.18)" : "none",
                                    color: location.pathname === to ? "#fff" : "#e2eafe"
                                }}
                            >
                                {icon} 
                                {label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
    );
};
