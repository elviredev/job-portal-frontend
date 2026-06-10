import jobCover from '../assets/images/job_cover.jpg'

 const Hero = () => {
   return (
      <main>
         <div className="relative bg-gray-900 overflow-hidden h-auto md:h-100 flex items-center">

            {/* Background image */}
            <div className="absolute inset-0">
               <img
                  className="h-full w-full object-cover opacity-20"
                  src={jobCover}
                  alt="People working in an office"
               />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-900/60 via-gray-900/40 to-indigo-900/60" />

            <div className="relative max-w-7xl mx-auto py-10 px-4 sm:py-12 sm:px-6 lg:px-8">

               {/* Heading */}
               <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
                     Find Your{' '}
                     <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-400">
                        Dream Job
                     </span>
                  </h1>
                  <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
                     Explore thousands of listings from leading companies, all in one place.
                  </p>
               </div>

               {/* Search form */}
               <form className="max-w-3xl mx-auto bg-white p-3 rounded-2xl shadow-2xl shadow-purple-900/30">
                  <div className="flex flex-col md:flex-row items-center gap-3">

                     {/* Keyword */}
                     <div className="grow relative w-full md:w-auto">
                        <label htmlFor="keyword" className="sr-only">Job Title or Keyword</label>
                        <div className="relative border border-gray-200 rounded-xl focus-within:border-purple-400 hover:border-purple-400 transition duration-200">
                           <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                           </svg>
                           <input
                              type="text"
                              name="keyword"
                              placeholder="Job title or keyword..."
                              className="w-full pl-11 pr-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-0 placeholder-gray-400 rounded-xl"
                              style={{ border: "none" }}
                           />
                        </div>
                     </div>

                     {/* Location */}
                     <div className="grow relative w-full md:w-auto">
                        <label htmlFor="location" className="sr-only">Location</label>
                        <div className="relative border border-gray-200 rounded-xl focus-within:border-purple-400 hover:border-purple-400 transition duration-200">
                           <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                           </svg>
                           <input
                              type="text"
                              name="location"
                              placeholder="City or remote..."
                              className="w-full pl-11 pr-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-0 placeholder-gray-400 rounded-xl"
                              style={{ border: "none" }}
                           />
                        </div>
                     </div>

                     {/* Button */}
                     <button
                        type="submit"
                        className="w-full md:w-auto bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 shadow-md shadow-purple-200 flex items-center justify-center gap-2 whitespace-nowrap"
                     >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search Jobs
                     </button>

                  </div>
               </form>

               {/* Stats */}
               <div className="mt-10 flex flex-wrap justify-center gap-6">
                  {[
                     { label: 'Jobs Posted', value: '1,200+' },
                     { label: 'Companies', value: '300+' },
                     { label: 'Hired This Month', value: '850+' },
                  ].map(({ label, value }) => (
                     <div key={label} className="text-center">
                        <p className="text-2xl font-extrabold text-white">{value}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                     </div>
                  ))}
               </div>

            </div>
         </div>
      </main>
   )
}

export default Hero