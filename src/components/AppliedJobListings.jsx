import { NavLink, Link } from "react-router-dom"
import { Trash2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import defaultLogo from '../assets/images/default_logo.jpg'
import api from "@/api/axios"
import { toast } from "react-toastify"
import { ConfirmModal } from "."
import { capitalizeFirst } from "@/utils/formatters"


// status badge
const StatusStyles = {
   applied: 'bg-green-100 text-green-800',
   accepted: 'bg-blue-100 text-blue-800',
   expired: 'bg-yellow-100 text-yellow-800',
   rejected: 'bg-red-100 text-red-800',
   default: 'bg-gray-100 text-gray-800',
}

const StatusBadge = ({ status }) => {
   const style = StatusStyles[status?.toLowerCase()] || StatusStyles.default
   return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${style}`}>
         {status || "Unknown"}
      </span>
   )
}


const AppliedJobListings = () => {

   const [jobs, setJobs] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [deleteId, setDeleteId] = useState(null)

   // confirm modal
   const [showModal, setShowModal] = useState(false)
   const [targetId, setTargetId] = useState(null)

   // fetch applied jobs
   useEffect(() => {
      const fetchAppliedJobs = async () => {
         try {
            setLoading(true)
            const response = await api.get('/applied-jobs')
            setJobs(response.data.data)
         } catch (error) {
            setError(error.response?.data?.message || 'Failed to load your applied jobs')
         } finally {
            setLoading(false)
         }
      }

      fetchAppliedJobs()
   }, [])

   // open modal
   const confirmDelete = (applicationId) => {
      setTargetId(applicationId)
      setShowModal(true)
   }

   // create delete applied job
   const handleDelete = async () => {
      setShowModal(false)

      try {
         setDeleteId(targetId)
         await api.delete(`/applied-jobs/${targetId}`)
         setJobs((prev) => prev.filter((app) => app.id !== targetId))
      } catch (error) {
         toast.error(error.response?.data?.message || "Failed to delete application")
      } finally {
         setDeleteId(null)
         setTargetId(null)
      }
   }

   if (loading) {
      return (
         <section className="lg:w-2/3 w-full bg-white p-6 rounded-xl shadow-lg px-4 sm:px-6 lg:px-8">
            <Loader2 className="w-20 h-20 mx-auto text-purple-300 animate-spin" />
         </section>
      )
   }

   if (error) {
      return (
         <section className="lg:w-2/3 w-full bg-white p-6 rounded-xl shadow-lg px-4 sm:px-6 lg:px-8">
            <p className="text-red-500 text-center">{error}</p>
         </section>
      )
   }


   return (
      <section className="lg:w-2/3 w-full bg-white p-6 rounded-xl shadow-lg px-4 sm:px-6 lg:px-8">
         <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Your Saved Jobs ({jobs.length})</h3>

         {jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
               <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                     d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v3" />
               </svg>
               <p className="text-sm">You haven't applied to any jobs yet.</p>
               <Link to="/" className="mt-3 inline-block text-indigo-600 hover:underline text-sm font-medium">
                  Browse Jobs →
               </Link>
            </div>
         ) : (
            <ul className="divide-y divide-gray-200">

               {jobs.map((application) => (

                  <li key={application.id} className="py-4 flex items-center justify-between hover:bg-gray-50 transition duration-100 rounded-md -mx-2 px-2">
                     <div className="flex items-center min-w-0 flex-1">
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-indigo-100 p-2 mr-4 flex items-center justify-center">
                           <img
                              src={application.job?.company_logo_url || defaultLogo}
                              alt={application.job?.company_name || "Default logo"}
                              className="max-h-full max-w-full object-contain"
                           />
                        </div>
                        <div className="min-w-0 flex-1">
                           <p className="text-lg font-semibold text-gray-900 truncate">{application.job?.title}</p>
                           <p className="text-sm text-gray-500 truncate">{application.job?.company_name} · {capitalizeFirst(application.job?.location_type)}</p>
                        </div>
                     </div>

                     <div className="hidden sm:block min-w-min mx-4">
                        {/* <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Active</span> */}
                        <StatusBadge status={application.status} />

                     </div>

                     <div className="flex items-center gap-3">
                        <NavLink to={`/jobDetails/${application.job?.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium whitespace-nowrap">View Job</NavLink>
                        <button
                           onClick={() => confirmDelete(application.id)}
                           disabled={deleteId === application.id}
                           className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition" title="Delete Job">
                           {deleteId === application.id
                              ? <Loader2 className="w-5 h-5 animate-spin" />
                              : <Trash2 className="w-5 h-5" />
                           }
                        </button>
                     </div>
                  </li>

               ))}

            </ul>
         )}

         <ConfirmModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
            isLoading={deleteId !== null}
            title="Delete Application"
            message="This action cannot be undone"
         />

      </section>
   )
}

export default AppliedJobListings