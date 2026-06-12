import { Aside, TextInput } from "@/components"
import { useState } from "react"
import ponyo from '../assets/images/ponyo.jpg'

const EditedProfile = () => {

   const [isSidebarOpen, setSidebarOpen] = useState(false)
   const toggleSidebar = () => setSidebarOpen((prev) => !prev)

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
                     Edit Profile & Account Settings
                  </h1>
               </header>

               <section className="content-section">

                  <form className="bg-white p-8 rounded-xl shadow-lg space-y-8">

                     <h3 className="text-lg font-semibold text-purple-700 border-b pb-2 mb-4">Personal Information</h3>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <TextInput
                           label='First Name'
                           name="first_name"
                           required
                        />

                        <TextInput
                           label='Last Name'
                           name="last_name"
                           required
                        />
                        <div>
                           <TextInput
                              label='Email Address'
                              type="email"
                              name="email"
                              required
                           />
                           <p className="mt-1 text-xs text-gray-500">Email address cannot be changed here.</p>
                        </div>

                        <div className="max-w-md">
                           <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                           <div className="flex items-center space-x-4 mt-2">

                              <img
                                 src={ponyo}
                                 alt="Profile"
                                 referrerPolicy="no-referrer"
                                 className="w-16 h-16 rounded-full ring-2 ring-purple-400 bg-purple-100 flex items-center justify-center text-purple-600 text-xl font-bold" />

                              <input
                                 ref={null}
                                 type="file"
                                 accept="image/*"
                                 className="block w-full text-sm border-purple-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer focus:outline-none" />
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-end pt-2 border-t border-gray-200">
                        <button
                           type="submit"
                           className="px-5 py-2 text-base md:px-6 md:py-2.5 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-150 shadow-lg">
                           <i className="fa-solid fa-save mr-2"></i> Save Changes
                        </button>
                     </div>
                  </form>
               </section>

            </main>
         </div>
      </div>
   )
}

export default EditedProfile