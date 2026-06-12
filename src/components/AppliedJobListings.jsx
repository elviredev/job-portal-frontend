import { NavLink } from "react-router-dom"
import kfcLogo from '../assets/images/kfc.png'
import { Trash2 } from "lucide-react"


const AppliedJobListings = () => {
   return (
      <section className="lg:w-2/3 w-full bg-white p-6 rounded-xl shadow-lg px-4 sm:px-6 lg:px-8">
         <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Your Saved Jobs</h3>

         <ul className="divide-y divide-gray-200">

            <li className="py-4 flex items-center justify-between hover:bg-gray-50 transition duration-100 rounded-md -mx-2 px-2">
               <div className="flex items-center min-w-0 flex-1">
                  <div className="h-12 w-12 shrink-0 rounded-lg bg-indigo-100 p-2 mr-4 flex items-center justify-center">


                     <img
                        src={kfcLogo}
                        alt="Default Logo"
                        className="max-h-full max-w-full object-contain"
                     />

                  </div>
                  <div className="min-w-0 flex-1">
                     <p className="text-lg font-semibold text-gray-900 truncate">Full Stack Developer</p>
                     <p className="text-sm text-gray-500 truncate">Google Inc · Remote</p>
                  </div>
               </div>

               <div className="hidden sm:block min-w-min mx-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Active</span>

               </div>

               <div className="flex items-center gap-3">
                  <NavLink to='/jobDetail' className="text-indigo-600 hover:text-indigo-800 text-sm font-medium whitespace-nowrap">View Job</NavLink>
                  <button
                     className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition" title="Delete Job">
                     <Trash2 className="w-5 h-5" />

                  </button>
               </div>
            </li>

         </ul>

      </section>
   )
}

export default AppliedJobListings