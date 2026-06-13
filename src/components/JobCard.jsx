import { NavLink } from "react-router-dom"
import defaultLogo from '../assets/images/default_logo.jpg'


const JobCard = ({ job }) => {

   const formatSalary = (salary) => {
      return new Intl.NumberFormat('en-US', {
         style: 'currency',
         currency: 'USD',
         maximumFractionDigits: 0,
      }).format(salary)
   }

   return (
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-100 transition-all duration-300 p-5 flex flex-col justify-between">

         {/* Top — Logo + Title */}
         <div>
            <div className="flex items-start gap-4 mb-4">
               {/* Logo */}
               <div className="w-14 h-14 shrink-0 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center overflow-hidden">
                  {job.company_logo_url ? (
                     <img
                        src={job.company_logo_url}
                        alt={job.company_name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { e.currentTarget.src = defaultLogo }}
                     />
                  ) : (
                     <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                     </svg>
                  )
                  }

               </div>

               {/* Title + Company */}
               <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-purple-700 transition duration-200">
                     {job.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5 truncate">{job.company_name}</p>
               </div>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
               {job.description?.key_role}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
               <span className="inline-flex items-center gap-1 text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.location_type}
               </span>
               <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatSalary(job.min_salary)} - {formatSalary(job.max_salary)}
               </span>
               <span className="inline-flex items-center gap-1 text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {job.level}
               </span>
            </div>
         </div>

         {/* Bottom — divider + button */}
         <div className="border-t border-gray-100 pt-4">
            <NavLink
               to={`/jobDetails/${job.id}`}
               className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2.5 rounded-xl font-semibold text-sm transition duration-200 shadow-md shadow-purple-100 text-center inline-block"
            >
               View & Apply
            </NavLink>
         </div>

      </div>
   )
}

export default JobCard