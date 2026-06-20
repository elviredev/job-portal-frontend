
// Affiche et modifie les filtres
const FilteredListings = ({ filters, updateFilter, resetFilters }) => {

   // gestion des checkbox et remise auto à la page 1
   const handleCheckbox = (field, value) => {
      const newValues = filters[field].includes(value) // vérifier si valeur déja sélectionnée
         ? filters[field].filter(v => v !== value) // uncheck
         : [...filters[field], value] // check

      updateFilter(field, newValues)
   }

   return (
      <aside className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:h-fit lg:sticky lg:top-8">

         {/* Header */}
         <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
               <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
               </svg>
            </div>
            <h2 className="text-base font-bold text-gray-800">Filter Jobs</h2>
         </div>

         <div className="space-y-4 mb-6">

            {/* Keyword */}
            <div>
               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Keyword
               </label>
               <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                     type="text"
                     value={filters.keyword}
                     onChange={(e) => updateFilter("keyword", e.target.value)}
                     placeholder="Title or company..."
                     className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-0 hover:border-purple-400 transition duration-200"
                  />
               </div>
            </div>

            {/* Location */}
            <div>
               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Location
               </label>
               <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                     type="text"
                     value={filters.location}
                     onChange={(e) => updateFilter("location", e.target.value)}
                     placeholder="City or remote..."
                     className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-0 hover:border-purple-400 transition duration-200"
                  />
               </div>
            </div>

            {/* Min Salary */}
            <div>
               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Min. Salary
               </label>
               <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <select
                     value={filters.min_salary}
                     onChange={(e) =>  updateFilter("min_salary", e.target.value)}
                     className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-0 hover:border-purple-400 transition duration-200" >
                     <option value="">Any Amount</option>
                     <option value="40000">$40,000+</option>
                     <option value="60000">$60,000+</option>
                     <option value="80000">$80,000+</option>
                     <option value="100000">$100,000+</option>
                  </select>
               </div>
            </div>
         </div>

         {/* Job Type */}

         <div className="border-t border-gray-100 pt-5 mb-5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Job Type</h3>
            <div className="space-y-2">
               {['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'].map((label) => (
                  <label key={label} className="flex items-center gap-2.5 group cursor-pointer">
                     <div
                        className={`w-4 h-4 rounded border-2 transition duration-200 flex items-center justify-center shrink-0
                           ${filters.job_type.includes(label)
                              ? 'bg-purple-600 group-hover:border-purple-400'
                              : 'border-gray-300 group-hover:border-purple-400'
                           }
                        `}>

                        {filters.job_type.includes(label) && (
                           <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                           </svg>
                        )}

                        <input type="checkbox" onChange={() => handleCheckbox('job_type', label)} className="sr-only" />
                     </div>
                     <span className="text-sm text-gray-600 group-hover:text-gray-900 transition duration-200">{label}</span>
                  </label>
               ))}
            </div>
         </div>

         {/* Work Mode */}


         <div className="border-t border-gray-100 pt-5 mb-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Work Mode</h3>
            <div className="space-y-2">
               {['remote', 'hybrid', 'on-site'].map((label) => (
                  <label key={label} className="flex items-center gap-2.5 group cursor-pointer">
                     <div
                        className={`w-4 h-4 rounded border-2 transition duration-200 flex items-center justify-center shrink-0
                           ${filters.location_type.includes(label)
                              ? 'bg-purple-600 group-hover:border-purple-400'
                              : 'border-gray-300 group-hover:border-purple-400'
                           }
                        `}>

                        {filters.location_type.includes(label) && (
                           <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                           </svg>
                        )}


                        <input type="checkbox" onChange={() => handleCheckbox('location_type', label)} className="sr-only" />
                     </div>
                     <span className="text-sm text-gray-600 group-hover:text-gray-900 capitalize transition duration-200">{label}</span>
                  </label>
               ))}
            </div>
         </div>



         {/* Clear Button */}
         <button
            onClick={resetFilters}
            className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2.5 rounded-xl font-semibold text-sm transition duration-200 shadow-md shadow-purple-100 flex items-center justify-center gap-2"
         >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Clear Filters
         </button>
      </aside>
   )
}

export default FilteredListings