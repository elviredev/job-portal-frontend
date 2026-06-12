import user from "../assets/images/user.png"

const ViewApplications = () => {
   return (
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white">
         <header className="mb-6 sm:mb-8 pb-4 border-b border-gray-300">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
               Application Pipeline
            </h1>
         </header>
         <section className="content-section">

            <div className="bg-white p-6 rounded-xl shadow-lg">
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

                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                           </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">

                           <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center gap-3">
                                    <img src={user} alt="company" className="h-8 w-8 rounded-full object-cover border border-gray-200" />

                                    <span className="text-sm font-medium text-gray-900">
                                       Nit Virak
                                    </span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Full Stack Developer</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">virak@gmail.com</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">09.02.2026</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                 <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    Download
                                 </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                 <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800`}>
                                    Applied
                                 </span>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                 Applied
                              </td>

                           </tr>                         

                        </tbody>
                     </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="sm:hidden space-y-4">

                     <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-2">

                              <img src={user} alt="company" className="h-8 w-8 rounded-full object-cover border border-gray-200" />

                              <p className="text-lg font-bold text-gray-900">Nit Virak</p>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800`}>
                                 Applied
                              </span>

                           </div>
                        </div>
                        <div className="text-sm space-y-1 text-gray-600">
                           <p><span className="font-medium text-gray-800">Job:</span> Full Stack Developer</p>
                           <p><span className="font-medium text-gray-800">Email:</span> virak@gmail.com</p>
                           <p><span className="font-medium text-gray-800">Applied:</span> 30.06.2026</p>
                        </div>
                        <div className="mt-4">

                           <a href={null} className="text-indigo-600 hover:text-indigo-900 flex items-center text-sm font-medium gap-1" download>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                              Download Resume
                           </a>

                        </div>
                     </div>

                  </div>
               </>

            </div>
         </section>
      </main>
   )
}

export default ViewApplications