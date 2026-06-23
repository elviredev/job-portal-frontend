import { ApplyJobModal, Footer } from "@/components"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "@/api/axios"
import { capitalizeFirst, formatSalary, getDaysAgo } from "@/utils/formatters"
import { useAuth } from "@/context/AuthContext"



const JobDetails = () => {

   const { id } = useParams()
   const { user } = useAuth()
   const [showModal, setShowModal] = useState(false)
   const [job, setJob] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)
   const [hasApplied, setHasApplied] = useState(false)
   const navigate = useNavigate()

   // fetch job
   useEffect(() => {
      const fetchJob = async () => {
         try {
            const res = await api.get(`/public-job/${id}`)
            if (res.data.status === "success") setJob(res.data.data)
         } catch (error) {
            console.log(error);
            setError("Failed to fetch job")
         } finally {
            setLoading(false)
         }
      }

      fetchJob()
   }, [id])

   // check applied job
   useEffect(() => {
      const checkIfApplied = async () => {
         try {
            const res = await api.get(`/applied-jobs/check/${id}`)
            setHasApplied(res.data.applied)
         } catch {
            setHasApplied(false)
         }
      }

      if (user?.role === "user") {
         checkIfApplied()
      }
   }, [id, user])

   if (loading) return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-purple-200 rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">Loading job details ...</p>
         </div>
      </div>
   )

   if (error) return <div className="text-center text-red-500 p-10">{error}</div>
   if (!job) return <div className="text-center p-10">Job not found</div>

   return (
      <>
         <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8 lg:px-10 lg:py-10 max-w-7xl">

               {/* ── Hero Header ─────────────────────────────────────── */}
               <header className="relative bg-linear-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-2xl shadow-xl shadow-purple-200 mb-8 overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute inset-0 opacity-10">
                     <div className="absolute -top-10 -right-10 w-64 h-64 bg-white rounded-full" />
                     <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-white rounded-full" />
                  </div>

                  <div className="relative p-6 lg:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                     {/* Left — Logo + Info */}
                     <div className="flex items-start gap-5">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center shrink-0 p-2">
                           {job.company_logo_url ? (
                              <img
                                 src={job.company_logo_url}
                                 alt="Company logo"
                                 className="w-full h-full object-contain rounded-xl"
                              />
                           ) : (
                              <div className="w-full h-full bg-purple-100 rounded-xl flex items-center justify-center">
                                 <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                 </svg>
                              </div>
                           )}
                        </div>

                        <div>
                           <h1 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">{job.title}</h1>
                           <p className="text-purple-200 font-semibold mt-1">{job.company_name}</p>

                           {/* Tags */}
                           <div className="mt-3 flex flex-wrap gap-2">
                              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                 </svg>
                                 {capitalizeFirst(job.location)}
                              </span>
                              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                                 {capitalizeFirst(job.location_type)}
                              </span>
                              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                 </svg>
                                 {capitalizeFirst(job.level)}
                              </span>
                           </div>
                        </div>
                     </div>

                     {/* Right — Apply button */}
                     <div className="shrink-0 w-full lg:w-auto">
                        {hasApplied ? (
                           <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/40 text-green-100 px-6 py-3 rounded-xl font-semibold">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Already Applied
                           </div>
                        ) : (
                           <button
                              onClick={() => {
                                 if(!user) {
                                    navigate('/userLogin')
                                    return
                                 }

                                 setShowModal(true)
                              }}
                              className="w-full lg:w-auto px-8 py-3 bg-white text-purple-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                           >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                              {user ? 'Apply Now' : 'Login to Apply'}
                           </button>
                        )}
                     </div>
                  </div>
               </header>

               {/* ── Content Grid ────────────────────────────────────── */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                  {/* Main */}
                  <main className="lg:col-span-2 space-y-6">

                     <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-l-4 border-purple-500 px-6 py-5">
                           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              <span className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                                 <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                              </span>
                              About The Role
                           </h2>
                        </div>
                        <div className="px-6 pb-6">
                           <p className="text-gray-600 leading-relaxed">{job?.description?.key_role}</p>
                        </div>
                     </section>

                     <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-l-4 border-indigo-500 px-6 py-5">
                           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              <span className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
                                 <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                 </svg>
                              </span>
                              Key Responsibilities
                           </h2>
                        </div>
                        <div className="px-6 pb-6">
                           <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job?.description?.responsability}</p>
                        </div>
                     </section>

                     <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="border-l-4 border-violet-500 px-6 py-5">
                           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              <span className="w-7 h-7 bg-violet-100 rounded-lg flex items-center justify-center">
                                 <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                 </svg>
                              </span>
                              Skills & Experience Required
                           </h2>
                        </div>
                        <div className="px-6 pb-6">
                           <p className="text-gray-600 leading-relaxed whitespace-pre-line">{job?.description?.skill_and_experience}</p>
                        </div>
                     </section>
                  </main>

                  {/* Sidebar */}
                  <aside className="space-y-6">

                     {/* Quick Facts */}
                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-linear-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                           <h3 className="text-base font-bold text-gray-800">Job Quick Facts</h3>
                        </div>
                        <div className="p-6 space-y-4">

                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-500">
                                 <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                 </div>
                                 <span className="text-sm font-medium">Salary</span>
                              </div>
                              <span className="text-sm font-bold text-purple-700">
                                 {formatSalary(job.min_salary * 12)} – {formatSalary(job.max_salary * 12)}/yr
                              </span>
                           </div>

                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-500">
                                 <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                 </div>
                                 <span className="text-sm font-medium">Level</span>
                              </div>
                              <span className="text-sm font-bold text-gray-800">{capitalizeFirst(job.level)}</span>
                           </div>

                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-500">
                                 <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                 </div>
                                 <span className="text-sm font-medium">Posted</span>
                              </div>
                              <span>{getDaysAgo(job.posted_date)}</span>
                           </div>

                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-gray-500">
                                 <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                 </div>
                                 <span className="text-sm font-medium">Deadline</span>
                              </div>
                              <span className="text-sm font-bold text-red-600">
                                 {job?.application_deadline
                                    ? new Date(job.application_deadline).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                                    : "N/A"
                                 }
                              </span>
                           </div>
                        </div>

                        {/* Apply CTA inside sidebar */}
                        {!hasApplied && (
                           <div className="px-6 pb-6">
                              <button
                                 onClick={() => {
                                    if(!user) {
                                       navigate('/userLogin')
                                       return
                                    }

                                    setShowModal(true)
                                 }}
                                 className="w-full py-2.5 bg-linear-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition shadow-md shadow-purple-200"
                              >
                                 {user ? 'Apply for this Job' : 'Login to Apply'}
                              </button>
                           </div>
                        )}

                     </div>

                     {/* About Company */}
                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-linear-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                           <h3 className="text-base font-bold text-gray-800"> About {job.company_name}</h3>
                        </div>
                        <div className="p-6">
                           <p className="text-sm text-gray-600 leading-relaxed">{job.company_description}</p>
                        </div>
                     </div>

                  </aside>
               </div>
            </div>
         </div>

         <ApplyJobModal
            isOpen={user && showModal}
            onClose={() => setShowModal(false)}
            onSuccess={() => {
               setShowModal(false)
               setHasApplied(true)
            }}
            job={job}
         />

         <Footer />
      </>
   )
}

export default JobDetails