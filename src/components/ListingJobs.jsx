import { FilteredListings, JobCard } from "@/components"
import { useEffect, useState } from "react"
import api from "@/api/axios"


const ListingJobs = () => {

   // const [meta, setMeta] = useState(null)
   const [jobs, setJobs] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   // fetch data from json-server
   useEffect(() => {

      const fetchJobs = async () => {
         setLoading(true)
         setError(null)

         try {
            const res = await api.get('/jobs')
            // console.log(data);
            setJobs(res.data.data || [])
         } catch (err) {
            console.log("Error:", err);
            setError("Unable to load jobs")
         } finally {
            setLoading(false)
         }
      }

      fetchJobs()
   }, [])

   if (loading) {
      return (
         <div className="flex justify-center py-20">
            <p className="text-gray-500">Loading jobs...</p>
         </div>
      )
   }

   if (error) {
      return (
         <div className="flex justify-center py-20">
            <p className="text-red-500">{error}</p>
         </div>
      )
   }

   
   return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
         <div className="w-[95%] mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

               {/* job filters  */}
               <FilteredListings />


               <main className="lg:col-span-3">
                  {/* Header row */}
                  <div className="flex items-center justify-between mt-4 mb-4">
                     <div>
                        <h2 className="text-3xl font-bold text-gray-800">Latest jobs</h2>
                        <p className="text-lg text-gray-600">Filter. Tailor. Apply. Succeed.</p>
                     </div>

                     {/* Per page selector */}
                     <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm text-gray-500 whitespace-nowrap">Show:</span>
                        <select
                           className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-400 hover:border-purple-400 transition duration-200"
                        >
                           <option value=''>9 / page</option>
                           <option value=''>18 / page</option>
                           <option value=''>50 / page</option>
                           <option value=''>100 / page</option>
                        </select>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                     {/* Job Cards */}
                     {jobs.map((job) =>                      
                        <JobCard key={job.id} job={job} />
                     )}
                  </div>
               </main>

            </div>
         </div>
      </section>
   )
}

export default ListingJobs