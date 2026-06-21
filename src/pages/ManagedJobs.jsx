import { Aside } from "@/components"
import { useEffect, useState } from "react"
import { FaTrash, FaEdit } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import api from "@/api/axios"

const ManagedJobs = () => {

   const [isSidebarOpen, setSidebarOpen] = useState(false)
   const toggleSidebar = () => setSidebarOpen((prev) => !prev)

   const [selectedId, setSelectedId] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [jobs, setJobs] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   const getDaysLeft = (deadline) => {
      const today = new Date()
      const endDate = new Date(deadline)

      const diffTime = endDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      return diffDays
   }


   // fetch data from api
   useEffect(() => {
      const fetchJobs = async () => {
         try {
            const res = await api.get('/my-jobs')

            if (res.data.status === "success") {
               setJobs(res.data.data || [])
            }
         } catch (error) {
            console.log(error);
            setError("Failed to fetch jobs")
         } finally {
            setLoading(false)
         }
      }

      fetchJobs()
   }, [])

   if (loading) {
      return <p>Loading...</p>
   }

   if (error) {
      return (
         <div className="text-red-500">{error}</div>
      )
   }

   return (
      <div className="flex flex-col min-h-screen bg-white">

         {/* header for mobile */}
         <header className="h-16 flex items-center bg-white shadow-md border-b lg:hidden">
            <button onClick={toggleSidebar} className="p-4 text-purple-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
               </svg>
            </button>
            <div className="ml-4 text-xl font-semibold text-purple-800">Talent Hub</div>
         </header>

         <div className="flex flex-1 overflow-hidden">
            {isSidebarOpen && (
               <div
                  onClick={toggleSidebar}
                  className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
               />
            )}

            <Aside isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white">
               <header className="mb-6 sm:mb-8 pb-4 border-b border-gray-300">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                     Manage Jobs
                  </h1>
               </header>
               <section className="content-section">
                  <div className="bg-white p-6 rounded-xl shadow-lg">


                     <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-white">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Status</th>
                                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                              </tr>
                           </thead>
                           <tbody className="bg-white divide-y divide-gray-200">

                              {jobs.map((job) => {
                                 const daysLeft = getDaysLeft(job.application_deadline)

                                 return (
                                    <tr key={job.id} >
                                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.department}</td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                                       <td className="px-6 py-4">
                                          {daysLeft > 0 ?
                                             (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                                   Active
                                                </span>
                                             ) : (
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                                                   Expired
                                                </span>
                                             )}
                                       </td>

                                       <td className="px-6 py-4 text-sm text-center flex justify-center items-center space-x-4">
                                          <NavLink to={`/editJob/${job.id}`} className="text-blue-600 hover:text-blue-900">
                                             <FaEdit size={18} />
                                          </NavLink>

                                          <button
                                             className="text-red-600 hover:text-red-900"
                                          >
                                             <FaTrash size={18} />
                                          </button>
                                       </td>
                                    </tr>
                                 )
                              })}


                           </tbody>
                        </table>

                     </div>

                     {/* For mobile size */}
                     <div className="sm:hidden space-y-4">
                        {jobs.map((job) => {
                           const daysLeft = getDaysLeft(job.application_deadline)

                           return (
                              <div key={job.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                                 <div className="flex justify-between items-start mb-2">
                                    <p className="text-lg font-bold text-gray-900">{job.title}</p>
                                    <span className={`px-2 py-1 rounded text-xs ${daysLeft > 0
                                       ? "bg-green-100 text-green-700"
                                       : "bg-red-100 text-red-700"
                                       }`}>
                                       {daysLeft > 0 ? "Active" : "Expired"}
                                    </span>
                                 </div>
                                 <p className="text-sm text-gray-600">
                                    <span className="font-medium text-gray-800">
                                       Dept:
                                    </span>{" "}
                                    {job.department} • {job.location}
                                 </p>
                                 <div className="flex justify-end space-x-4 pt-2 border-t border-gray-100 mt-3">
                                    <NavLink to={`/editJob/${job.id}`} className="text-blue-600 hover:text-blue-900" title="Edit">
                                       <FaEdit size={18} />
                                    </NavLink>
                                    <button
                                       className="text-red-600 hover:text-red-900"
                                       title="Delete"
                                    >
                                       <FaTrash size={18} />
                                    </button>
                                 </div>
                              </div>
                           )
                        })}


                     </div>

                  </div>
               </section>
            </main>
         </div>
      </div>
   )
}

export default ManagedJobs