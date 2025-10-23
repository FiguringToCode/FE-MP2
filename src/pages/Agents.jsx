import axios from "axios";
import { useContext, useState } from "react"
import { SideBar} from "../components/Sidebar"
import CRMContext from "../CRMContext"
import { GiHamburgerMenu } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const Agents = () => {
    const {salesAgents, loading2, sidebarOpen, setSidebarOpen} = useContext(CRMContext)
    // console.log(salesAgents)
    
    const [addAgent, setAddAgent] = useState(false)
    const {register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm()
    const navigate = useNavigate()

    const onAgentSubmit = async (data) => {
        try {
            const response = await axios.post(`https://be-mp-2.vercel.app/salesAgent`, data, 
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
                if(response.status === 201){
                    reset()
                    navigate('/')
                    window.location.reload()
                    toast.success('Agent Added Successfully')
                }

        } catch (error) {
            toast.error('Error Submitting Agent !!!')
            console.log(error)
        }
    }

    return (
        <>
            <div className="d-flex body-style">
                <SideBar />
                <div className="container main-content py-5 ps-md-5">
                    <button className="sidebar-toggle-btn d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
                        <GiHamburgerMenu />
                    </button>

                    <div id="Header" className="fs-1 fw-bold mb-4 py-3" style={{background: "linear-gradient(90deg,#1e88e5 60%,#60a9f7 100%)", color: "white", borderRadius: "18px"}}>
                        Sales Agent Management 
                    </div>

                    <section className="px-md-5 pt-5">
                        <h3 className="fw-semibold fs-2 pb-3">Sales Agent List</h3>
                        <ul className="list-group w-lg-50 w-100 mb-4">
                            {loading2 ? (
                                <div className="text-center my-5">
                                    <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
                                    <p className="mt-2 fw-semibold text-secondary">Loading leads…</p>
                                </div>
                            ) : salesAgents && salesAgents.length > 0 && salesAgents.map(agent => (
                                <li key={agent._id} className="list-group-item"><span className="fw-semibold">Agent : </span>{agent.name} -- [ {agent.email} ]</li>
                            ))}
                        </ul>

                        {addAgent ? (
                            <div className="py-5 w-lg-50">
                                <h3 className="fw-semibold fs-2 mb-4 text-primary">Add Agent Form</h3>
                                <form onSubmit={handleSubmit(onAgentSubmit)}>
                                    <div className="pb-2">
                                        <label className="form-label">Agent Name: </label>
                                        <input className="form-control" type="text" {...register('name', {required: true})} placeholder="Enter Agent Name" />
                                        {errors.name && <p className="text-danger">Agent name is required</p>}
                                    </div>
                                    <div className="">
                                        <label className="form-label">Agent Email: </label>
                                        <input className="form-control" type="email" {...register('email', {required: true})} placeholder="Enter Agent Email" />
                                        {errors.email && <p className="text-danger">Agent email is required</p>}
                                    </div>
                                    <input type="submit" className="mt-4" />
                                </form>
                            </div>
                        ) : null}

                        <button className="btn btn-outline-dark px-5 py-2 fw-semibold addLeadBtn-style" style={{ borderRadius: "30px", boxShadow: "0 2px 8px rgba(30,40,70,.1)" }} onClick={() => setAddAgent(!addAgent)}>
                            {addAgent ? 'Hide Form' : 'Add Sales Agent'}
                        </button>
                    </section>

                </div>
            </div>
        </>
    )
}