import axios from "axios";
import { useForm } from "react-hook-form";
import { SideBar } from "../components/Sidebar";
import { useContext, useEffect } from "react";
import CRMContext from "../CRMContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

export const AddLeadForm = () => {
    const {leads, loading, sidebarOpen, setSidebarOpen} = useContext(CRMContext)
    // console.log(leads)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
    const location = useLocation()
    const navigate = useNavigate()
    const leadToEdit = location.state?.leadToEdit

    useEffect(() => {
        if(leadToEdit) reset(leadToEdit)
    }, [leadToEdit, reset])

    const onSubmit = async (data) => {
        console.log(data)
        try {
            if(leadToEdit){
                const response = await axios.post(`https://be-mp-2.vercel.app/leads/update/${leadToEdit._id}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.status === 200){
                    navigate(`/leads`)
                    window.location.reload()
                    toast.success("Lead Updated Successfully")
                }
            } else {
                const response = await axios.post('https://be-mp-2.vercel.app/leads', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.status === 201){
                    toast.success("Lead Added Successfully")
                    reset()
                }
            }

        } catch (error) {
            toast.error('Error Submitting Lead !!!')
            console.log(error.message)
        }
    }

    return (
        <>
            <div className="d-flex body-style">
                <SideBar />
                <div className="container-fluid p-4">
                    <button className="sidebar-toggle-btn d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
                        <GiHamburgerMenu />
                    </button>
                    <div
                        id="Header"
                        className="fs-1 fw-bold mb-4 py-3"
                        style={{
                            background: "linear-gradient(90deg,#1e88e5 60%,#60a9f7 100%)",
                            color: "white",
                            borderRadius: "18px"
                        }}>
                        { leadToEdit ? "Edit Lead" : "Add New Lead" }
                    </div>
                    <form className="px-5 py-3" onSubmit={handleSubmit(onSubmit)}>

                        <div className="py-3">
                            <label htmlFor="name">Lead Name: </label><br />
                            <input className="w-100 border border-subtle-dark p-1 rounded-2" {...register('name', { required: true, minLength: 3 })} id="name" type="text" name="name" placeholder="Customer or Company Name" />
                            {errors.name && <p className="text-danger">Lead Name is required</p>}
                        </div>
                        <div className="pb-3">
                            <label htmlFor="source">Lead Source :</label><br />
                            <select className="w-100 border border-subtle-dark p-1 rounded-2" id="source" {...register('source', {required: true})} name="source">
                                <option value="">Select Source</option>
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Cold Call">Cold Call</option>
                                <option value="Advertisement">Advertisement</option>
                                <option value="Email">Email</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.source && <p className="text-danger">Select Lead Source</p>}
                        </div>
                        <div className="pb-3">
                            <label htmlFor="salesAgents">Sales Agent :</label><br />
                            <select className="w-100 border border-subtle-dark p-1 rounded-2" {...register('salesAgent', {required: true})} name="salesAgent" id="salesAgent">
                                <option value="">Select Sales Agent</option>
                                <option value="68e3b61d99b44377621fbae7">John Doe</option>
                                <option value="68e3b64799b44377621fbae9">Jane Smith</option>
                                <option value="68e3b67b99b44377621fbaeb">Robert Litt</option>
                                <option value="68e3bb37921c0ea63bf06042">Matthew Sanders</option>
                                <option value="68e4aef2074bb7513f8d69e3">Rebecca Gutenberg</option>
                            </select>
                            {errors.salesAgent && <p className="text-danger">Select Sales Agent</p>}
                        </div>
                        <div className="pb-3">
                            <label htmlFor="status">Lead Status :</label><br />
                            <select className="w-100 border border-subtle-dark p-1 rounded-2" {...register('status', {required: true})} name="status" id="status">
                                <option value="">Select Lead Status</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                            </select>
                            {errors.status && <p className="text-danger">Select Lead Status</p>}
                        </div>
                        <div className="pb-3">
                            <label htmlFor="tags">Tags :</label><br />
                            <select className="w-100 border border-subtle-dark p-1 rounded-2" {...register('tags', {required: true})} name="tags" id="tags">
                                <option value="">Select Tags</option>
                                {leads && leads.length > 0 ? 
                                leads.map(lead => (<option value={lead.tags.join(',')}>{lead.tags.join(', ')}</option>))
                            :loading}
                            </select>
                            {errors.tags && <p className="text-danger">Select Tags</p>}
                        </div>
                        <div className="pb-3">
                            <label htmlFor="timeToClose">Time to Close :</label><br />
                            <input className="w-100 border border-subtle-dark p-1 rounded-2" type="number" {...register('timeToClose', {required: true, min: {value:1, message:'Min Days altleast 1'}, max: {value: 45, message: 'Max Days atmost 45'}})} name="timeToClose" id="timeToClose"></input>
                            {errors.timeToClose && <p className="text-danger">Specify Lead Closing Days</p> || errors.timeToClose && <p className="text-danger">{errors.timeToClose.minLength.message}</p> || errors.timeToClose && <p className="text-danger">{errors.timeToClose.maxLength.message}</p>}
                        </div>
                        <div className="pb-3">
                            <label htmlFor="priority">Priority :</label><br />
                            <select className="w-100 border border-subtle-dark p-1 rounded-2" {...register('priority', {required: true})} name="priority" id="priority">
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            {errors.priority && <p className="text-danger">Select the Priority</p>}
                        </div>
                        <div className="pt-1">
                            <input className="btn btn-outline-primary fw-semibold" type="submit" disabled={isSubmitting} value={isSubmitting ? 'Submitting...' : leadToEdit ? "Update Lead" : "Submit"} />
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    )
}