import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { SideBar } from "../components/Sidebar"
import { GiHamburgerMenu } from "react-icons/gi";   
import { useContext, useState } from "react";
import CRMContext from "../CRMContext";
import { toast } from "react-toastify";

export const LeadDetails = () => {
    const {leadId} = useParams()
    const {leads, loading, sidebarOpen, setSidebarOpen, comments} = useContext(CRMContext)
    const {register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm()
    const navigate = useNavigate()

    const leadDetails = leads.find(detail => detail._id === leadId)
    // console.log(leadDetails)
    const commentDetails = comments.filter(detail => detail.lead._id === leadId)

    const [addComment, setAddComment] = useState(false)

    const handleEditLead = () => {
        navigate('/leadForm', {state: { leadToEdit: leadDetails} })
    }

    const onCommentSubmit = async (data) => {
        try {
            const response = await axios.post(`https://be-mp-2.vercel.app/leads/comments`, data, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.status === 201){
                reset()
                navigate('/leads')
                window.location.reload()
                toast.success("Comment Added Successfully")
            }

        } catch (error) {
            toast.error('Error Submitting Comment !!!')
            console.log(error)
        }
    }

    return (
        <div className="d-flex body-style">
            <SideBar />
            <div className="container main-content py-5 ps-md-5">
                <button className="sidebar-toggle-btn d-md-none" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
                    <GiHamburgerMenu />
                </button>

                <div id="Header" className="fs-1 fw-bold mb-4 py-3" style={{background: "linear-gradient(90deg,#1e88e5 60%,#60a9f7 100%)", color: "white", borderRadius: "18px"}}>
                  Lead Management <span className="text-primary-emphasis">[ {leadDetails.name} ]</span>
                </div>

                <section className="px-md-5 pt-5">
                    <h3 className="fw-semibold">Lead Details</h3>
                        <ul className="list-group w-lg-50 w-100">
                            <li className="list-group-item list-group-item-primary ps-6"><span className="fw-semibold">Lead Name :</span> {leadDetails?.name}</li>
                            <li className="list-group-item list-group-item-primary ps-6"><span className="fw-semibold">Sales Agent :</span> {leadDetails?.salesAgent.name}</li>
                            <li className="list-group-item list-group-item-primary ps-6"><span className="fw-semibold">Lead Source :</span> {leadDetails?.source}</li>
                            <li className="list-group-item list-group-item-primary ps-6"><span className="fw-semibold">Lead Status :</span> {leadDetails?.status}</li>
                            <li className="list-group-item list-group-item-primary ps-6"><span className="fw-semibold">Priority :</span> {leadDetails?.priority}</li>
                            <li className="list-group-item list-group-item-primary ps-6"><span className="fw-semibold">Time to Close :</span> {leadDetails?.timeToClose} Days</li>
                        </ul>
                                        <button className="btn btn-outline-danger px-5 mt-3 py-2 fw-semibold addLeadBtn-style" style={{ borderRadius: "30px", boxShadow: "0 2px 8px rgba(30,40,70,.1)" }} onClick={handleEditLead}>
                                            Edit Lead Details
                                        </button>
                </section>
                
                <section className="px-md-5 pt-5">
                    <h3 className="fw-semibold">Comment Section</h3>
                    {commentDetails.length > 0 ? (commentDetails.map(comment => {
                        const formattedDate = new Date(comment.createdAt).toLocaleString()
                        return (
                        <ul className="list-group w-lg-50 w-100 mt-3">
                            <li className="list-group-item list-group-item-primary">
                            <b>Comment By:</b> {comment?.author?.name} at ({formattedDate})
                            </li>
                            <li className="list-group-item list-group-item-primary">
                            <b>Comment:</b> {comment?.commentText}
                            </li>
                        </ul>
                    )})
                        ) : (<p>No comments yet. Be the first to comment!</p>)}

                    {addComment ? (
                        <div className="py-4 w-lg-50">
                            <form onSubmit={handleSubmit(onCommentSubmit)}>
                                <div className="pb-1">
                                    <label className="form-label">Lead: </label>
                                    <input className="form-control" type="text" defaultValue={leadDetails?._id} {...register('lead')} readOnly />
                                </div>
                                <div className="pb-1">
                                    <label className="form-label">Author: </label>
                                    <select className="form-control" {...register('author', { required: true })}>
                                        <option value="">Select Comment Author</option>
                                        <option value="68e3b61d99b44377621fbae7">John Doe</option>
                                        <option value="68e3b64799b44377621fbae9">Jane Smith</option>
                                        <option value="68e3b67b99b44377621fbaeb">Robert Litt</option>
                                        <option value="68e3bb37921c0ea63bf06042">Matthew Sanders</option>
                                        <option value="68e4aef2074bb7513f8d69e3">Rebecca Gutenberg</option>
                                    </select>
                                    {errors.author && <p className="text-danger">Select a comment author</p>}
                                </div>
                                <div className="pb-1">
                                    <label className="form-label">Comment Text: </label>
                                    <input className="form-control" type="text" {...register('commentText', {required: true})} placeholder="Type Comment" />
                                    {errors.commentText && <p className="text-danger">Comment is required</p>}
                                </div>
                                <div className="pt-1">
                                    <input type="submit" className="btn btn-outline-primary" disabled={isSubmitting} value={isSubmitting ? 'Submitting...' : 'Submit'} />
                                </div>
                            </form>
                        </div>
                    ) : null}

                    <div className="my-3">
                        <button className="btn btn-outline-primary" onClick={() => setAddComment(!addComment)}>{addComment ? "Done" : "Add Comment"}</button> <br />
                    </div>
                </section>

            </div>
        </div>
    )
}