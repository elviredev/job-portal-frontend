import { FilteredListings, JobCard } from "@/components"
import { useEffect, useState } from "react"
import api from "@/api/axios"
import { useDebounce } from "@/hooks/useDebounce"

/**
 * Affiche la liste des jobs
 * Centralise les appels API pour la recherche et les filtres
 */
const ListingJobs = ({ searchParams }) => {

   const [meta, setMeta] = useState({ current_page: 1, last_page: 1 })
   const [currentPage, setCurrentPage] = useState(1)
   const [perPage, setPerPage] = useState(9)
   const [jobs, setJobs] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   // filter state
   const [filters, setFilters] = useState({
      keyword: "",
      location: "",
      min_salary: "",
      job_type: [],
      location_type: []
   })

   // valeurs debouncées
   const debouncedKeyword = useDebounce(filters.keyword, 500)
   const debouncedLocation = useDebounce(filters.location, 500)

   // toute modification d'un filtre remet la pagination à la page 1
   const updateFilter = (field, value) => {
      setCurrentPage(1)

      setFilters(prev => ({
         ...prev,
         [field]: value
      }))
   }

   // reset des filtres
   const resetFilters = () => {
      setCurrentPage(1)

      setFilters({
         keyword: "",
         location: "",
         min_salary: "",
         job_type: [],
         location_type: []
      })
   }


   // fetch data & filters/search
   useEffect(() => {
      const fetchJobs = async () => {
         setLoading(true)
         setError(null)

         try {
            const params = new URLSearchParams()
            params.append("page", currentPage)
            params.append("per_page", perPage)

            // merge hero search + sidebar
            const keyword = debouncedKeyword?.trim() || searchParams?.keyword?.trim() || ""
            const location = debouncedLocation?.trim() || searchParams?.location?.trim() || ""

            if (keyword) params.append("keyword", keyword)
            if (location) params.append("location", location)

            if (filters.min_salary) params.append("min_salary", filters.min_salary)
            if (filters.job_type.length) params.append("job_type", filters.job_type.join(","))
            if (filters.location_type.length) params.append("location_type", filters.location_type.join(","))

            console.log(params.toString())

            // fetch data from laravel
            const res = await api.get(`/jobs?${params.toString()}`)

            if (res.data.status === "success") {
               // console.log(data);
               setJobs(res.data.data)
               setMeta(res.data.meta)
            } else {
               setJobs([])
            }

         } catch (err) {
            console.log("Error:", err);
            setError("Unable to load jobs")
         } finally {
            setLoading(false)
         }
      }

      fetchJobs()
   }, [
      currentPage,
      perPage,
      debouncedKeyword,
      debouncedLocation,
      filters.min_salary,
      filters.job_type,
      filters.location_type,
      searchParams?.keyword,
      searchParams?.location
   ])

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
               <FilteredListings
                  filters={filters}
                  updateFilter={updateFilter}
                  resetFilters={resetFilters}
               />


               <main className="lg:col-span-3">
                  {/* Header row */}
                  <div className="flex items-center justify-between mt-4 mb-4">
                     <div>
                        <h2 className="text-3xl font-bold text-gray-800">Latest jobs</h2>
                        <p className="text-lg text-gray-600">Filter. Tailor. Apply. Succeed.</p>
                        <p className="text-sm text-gray-500 mt-1">
                           {meta.total} jobs available
                        </p>
                     </div>

                     {/* Per page selector */}
                     <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm text-gray-500 whitespace-nowrap">Show:</span>
                        <select
                           value={perPage}
                           onChange={(e) => {
                              setPerPage(Number(e.target.value))
                              setCurrentPage(1)
                           }}
                           className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:border-purple-400 hover:border-purple-400 transition duration-200"
                        >
                           <option value={9}>9 / page</option>
                           <option value={18}>18 / page</option>
                           <option value={50}>50 / page</option>
                           <option value={100}>100 / page</option>
                        </select>
                     </div>
                  </div>

                  {loading && <p>Loading...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {!loading && !error && jobs.length === 0 && (
                     <p className="text-gray-500 text-center mt-8">No jobs found</p>
                  )}

                  {!loading && !error && jobs.length > 0 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Job Cards */}
                        {jobs.map((job) =>
                           <JobCard key={job.id} job={job} />
                        )}
                     </div>
                  )}

               </main>

            </div>

            {/* Pagination */}
            {meta.last_page > 1 && (
               <div className="flex items-center justify-center gap-3 mt-12">

                  <button
                     onClick={() => setCurrentPage(prev => prev - 1)}
                     disabled={currentPage === 1}
                     className="
                        px-3 sm:px-4 py-2
                        rounded-xl
                        border border-gray-200
                        bg-white
                        text-sm sm:text-base
                        text-gray-600
                        hover:border-purple-400
                        hover:text-purple-600
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        transition
                     "
                  >
                     ← <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div
                     className="
                        px-4 sm:px-5 py-2
                        rounded-xl
                        bg-purple-50
                        border border-purple-100
                        text-sm font-medium text-purple-700
                     "
                  >
                     {meta.current_page} / {meta.last_page}
                  </div>

                  <button
                     onClick={() => setCurrentPage(prev => prev + 1)}
                     disabled={currentPage === meta.last_page}
                     className="
                        px-3 sm:px-4 py-2
                        rounded-xl
                        border border-gray-200
                        bg-white
                        text-sm sm:text-base
                        text-gray-600
                        hover:border-purple-400
                        hover:text-purple-600
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        transition
                     "
                  >
                     <span className="hidden sm:inline">Next </span>→
                  </button>

               </div>
            )}
         </div>
      </section>
   )
}

export default ListingJobs