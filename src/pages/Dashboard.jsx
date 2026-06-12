import { Aside, ViewApplications } from "@/components"
import { useState } from "react"


const Dashboard = () => {

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
            <ViewApplications />
         </div>
      </div>
   )
}

export default Dashboard