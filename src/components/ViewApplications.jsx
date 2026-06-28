import { useState, useEffect, useRef } from "react"
import api from "@/api/axios"
import { toast } from "react-toastify"
import defaultLogo from "@/assets/images/default_logo.jpg"


const STATUS_STYLES = {
   applied: 'bg-blue-100 text-blue-800',
   reviewing: 'bg-yellow-100 text-yellow-800',
   accepted: 'bg-green-100 text-green-800',
   rejected: 'bg-red-100 text-red-800',
   default: "bg-gray-100 text-gray-800"
}

const STATUS_LABELS = {
   applied: "Applied",
   reviewing: "Reviewing",
   accepted: "Accepted",
   rejected: "Rejected"
}

const DropdownAction = ({ app, onStatusUpdate, actionLoading }) => {
   const [open, setOpen] = useState(false)
   const ref = useRef(null)

   useEffect(() => {
      const handler = (e) => {
         if (ref.current && !ref.current.contains(e.target)) setOpen(false)
      }

      // click outside
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)

   }, [])

   const isLoading = actionLoading === app.id
   const isFinalized = app.status === 'accepted' || app.status === 'rejected'

   if (isFinalized) return <span className="text-sm text-gray-400 italic">Closed</span>

   return (
      <div className="relative inline-block text-left" ref={ref}>
         <button
            onClick={() => setOpen(prev => !prev)}
            disabled={isLoading}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors"
         >
            {isLoading
               ? <svg className="animate-spin h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
               </svg>
               : <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
               </svg>
            }
         </button>

         {open && (
            <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
               <div className="py-1">
                  <button
                     onClick={() => { onStatusUpdate(app.id, 'accepted'); setOpen(false) }}
                     className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-green-700 hover:bg-green-50 transition-colors"
                  >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                     </svg>
                     Accept
                  </button>
                  <button
                     onClick={() => { onStatusUpdate(app.id, 'rejected'); setOpen(false) }}
                     className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                  >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                     Reject
                  </button>
               </div>
            </div>
         )}
      </div>
   )

}


const ViewApplications = ({ userRole }) => {

   const [applications, setApplications] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [actionLoading, setActionLoading] = useState(null)

   // charger les données
   useEffect(() => {

      const fetchApplications = async () => {
         try {
            const res = await api.get('/applications', {
               withCredentials: true
            })

            setApplications(res.data.data ?? [])

         } catch (error) {
            if (error.response?.data?.status === 403) setError("Access denied.")
            else if (error.response?.data?.status === 401) setError("Unauthorized. Please try again.")
            else setError("Failed to load applications.")
         } finally {
            setLoading(false)
         }
      }

      fetchApplications()

   }, [])

   const handleStatusUpdate = async (appId, status) => {
      try {
         setActionLoading(appId)
         await api.patch(`/applications/${appId}/status`,
            { status },
            { withCredentials: true }
         )

         // Mise à jour locale. Evite un nouvel appel API
         setApplications(prev => prev.map(
            app => app.id === appId
               ? { ...app, status }
               : app
         )
         )
      } catch {
         toast.error("Unable to update application status.")
      } finally {
         setActionLoading(null)
      }
   }

   const formatDate = (date) => {
      if (!date) return "-"

      return new Date(date).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'short',
         day: 'numeric'
      })
   }


   return (
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white">
         <header className="mb-6 sm:mb-8 pb-4 border-b border-gray-300">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
               Application Pipeline
            </h1>
         </header>

         <section className="content-section">

            <div className="bg-white p-6 rounded-xl shadow-lg">

               {loading && (
                  <div className="flex justify-center items-center py-16">
                     <svg className="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                     </svg>
                  </div>
               )}

               {!loading && error && (
                  <div className="text-center py-12 text-red-500 font-medium">{error}</div>
               )}

               {!loading && !error && applications.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                     <svg className="mx-auto h-12 w-12 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" />
                     </svg>
                     <p>No applications yet.</p>
                  </div>
               )}

               {!loading && !error && applications.length > 0 && (
                  <>
                     {/* Desktop Table */}
                     <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead>
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Applied For</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                 {userRole === 'recruiter' && (
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                 )}

                              </tr>
                           </thead>
                           <tbody className="bg-white divide-y divide-gray-200">

                              {applications.map((app) => (
                                 <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <div className="flex items-center gap-3">

                                          <img
                                             src={app.job?.company_logo_url || defaultLogo}
                                             alt="company"
                                             onError={(e) => {
                                                e.currentTarget.src = defaultLogo
                                             }}
                                             className="h-8 w-8 rounded-full object-cover border border-gray-200"
                                          />

                                          <span className="text-sm font-medium text-gray-900">
                                             {app.first_name} {app.last_name}
                                          </span>
                                       </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.job?.title ?? '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(app.created_at)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                       {app.resume_url
                                          ? <a
                                             href={app.resume_url}
                                             download={`${app.first_name}_resume.pdf`}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                          >
                                             Download
                                          </a>

                                          : <span className="text-sm text-gray-400">No resume</span>

                                       }

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                          ${STATUS_STYLES[app.status] ?? STATUS_STYLES.default} `}>
                                          {STATUS_LABELS[status] ?? "Applied"}
                                       </span>
                                    </td>
                                    {userRole === 'recruiter' && (
                                       <td className="px-6 py-4 whitespace-nowrap text-center">
                                          <DropdownAction
                                             app={app}
                                             onStatusUpdate={handleStatusUpdate}
                                             actionLoading={actionLoading}
                                          />
                                       </td>
                                    )}
                                 </tr>
                              ))}

                           </tbody>
                        </table>
                     </div>

                     {/* Mobile Cards */}
                     <div className="sm:hidden space-y-4">
                        {applications.map((app) => (

                           <div key={app.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                              <div className="flex justify-between items-start mb-2">

                                 <div className="flex items-center gap-2">
                                    <img
                                       src={app.job?.company_logo_url || defaultLogo}
                                       alt="company"
                                       onError={(e) => {
                                          e.currentTarget.src = defaultLogo
                                       }}
                                       className="h-6 w-6 rounded-full object-cover border border-gray-200"
                                    />
                                    <p className="text-sm font-bold text-gray-900">{app.first_name} {app.last_name}</p>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                       ${STATUS_STYLES[app.status] ?? STATUS_STYLES.default} `}>
                                       {STATUS_LABELS[status] ?? "Applied"}
                                    </span>
                                    {userRole === 'recruiter' && (
                                       <DropdownAction
                                          app={app}
                                          onStatusUpdate={handleStatusUpdate}
                                          actionLoading={actionLoading}
                                       />
                                    )}

                                 </div>
                              </div>
                              <div className="text-sm space-y-1 text-gray-600">
                                 <p><span className="font-medium text-gray-800">Job:</span> {app.job?.title ?? '-'}</p>
                                 <p><span className="font-medium text-gray-800">Email:</span> {app.email}</p>
                                 <p><span className="font-medium text-gray-800">Applied:</span> {formatDate(app.created_at)}</p>
                              </div>
                              <div className="mt-4">

                                 {app.resume_url

                                    ? <a
                                       href={app.resume_url}
                                       download={`${app.first_name}_resume.pdf`}
                                       className="text-indigo-600 hover:text-indigo-900 flex items-center text-sm font-medium gap-1"
                                    >
                                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                       Download Resume
                                    </a>

                                    : <span className="text-sm text-gray-400">No resume</span>

                                 }

                              </div>
                           </div>
                        ))}
                     </div>
                  </>
               )}

            </div>
         </section>
      </main>
   )
}

export default ViewApplications