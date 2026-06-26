import { NavLink, useNavigate } from "react-router-dom"
import { FaPlusCircle, FaUsers, FaUserEdit, FaTimes, FaListUl } from "react-icons/fa"
import defaultLogo from '../assets/images/default_logo.jpg'
import { useAuth } from '@/context/AuthContext'
import { googleLogout } from '@react-oauth/google'

const Aside = ({ isOpen, toggleSidebar }) => {

   const { user, logout } = useAuth() // fetch data from AuthContext
   const navigate = useNavigate()

   const getNavLinkClass = ({ isActive }) =>
      `flex items-center p-3 rounded-lg ${isActive
         ? 'text-purple-700'
         : 'text-gray-700 hover:text-purple-700 transition duration-200'
      }`

   // logout
   const handleLogout = async () => {
      try {
         await logout()
         googleLogout()
         // setMenuMobileOpen(false)

         navigate('/recruiterLogin')
      } catch (error) {
         console.log("Logout failed: ", error)
      }
   }


   return (
      <aside
         className={
            `fixed inset-y-0 left-0 z-50 w-64 bg-purple-50 text-gray-700 transform transition-transform duration-300 ease-in-out border-r border-purple-200 shadow-xl lg:translate-x-0 lg:static lg:inset-0 lg:z-0 lg:shadow-none 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
         }
      >
         <div className="p-6 text-2xl font-bold border-b border-purple-200 text-purple-800 flex justify-between items-center">
            Talent Hub
            <button onClick={toggleSidebar} className="text-purple-600 lg:hidden">
               <FaTimes size={22} />
            </button>
         </div>
         <nav className="grow p-4">
            <ul className="space-y-6">
               <li>
                  <NavLink to='/createJob' className={getNavLinkClass}>
                     <FaPlusCircle className="w-6 h-6" />
                     <span className="ml-3">Create Job</span>
                  </NavLink>
               </li>

               <li>
                  <NavLink to='/dashboard' className={getNavLinkClass}>
                     <FaUsers className="w-6 h-6" />
                     <span className="ml-3">View Applications</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink to='/managedJobs' className={getNavLinkClass}>
                     <FaListUl className="w-6 h-6" />
                     <span className="ml-3">Manage Jobs</span>
                  </NavLink>
               </li>
               <li>
                  <NavLink to='/editedProfile' className={getNavLinkClass}>
                     <FaUserEdit className="w-6 h-6" />
                     <span className="ml-3">Edit Profile</span>
                  </NavLink>
               </li>
            </ul>

            <div className="mt-10 mx-3 mb-3">
               <div className="relative flex items-center gap-3 p-3 rounded-xl bg-linear-to-r from-purple-50 to-violet-50 border border-purple-100 group hover:border-purple-200 hover:shadow-sm transition-all duration-300">

                  {/* Subtle background glow */}
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Avatar */}
                  <div className="relative shrink-0">
                     <img
                        className="w-8 h-8 rounded-lg object-cover shadow-sm ring-1 ring-purple-200"
                        src={user.image || defaultLogo}
                        referrerPolicy="no-referrer"
                        alt='image'
                     />
                     <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0 relative z-10">
                     <p className="text-xs font-semibold text-gray-800 truncate leading-none mb-0.5">{user.first_name}</p>
                     <p className="text-[10px] text-gray-400 truncate leading-none">{user.email}</p>
                  </div>

                  {/* Actions — always visible but subtle */}
                  <div className="relative z-10 flex items-center gap-0.5 shrink-0">
                     <NavLink
                        to="/editedProfile"
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-300 hover:text-purple-600 hover:bg-white hover:shadow-sm transition-all duration-150"
                        title="Edit Profile"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16.414H8v-2a2 2 0 01.586-1.414z" />
                        </svg>
                     </NavLink>

                     <button
                        onClick={() => handleLogout()}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-purple-300 hover:text-red-500 hover:bg-white hover:shadow-sm transition-all duration-150"
                        title="Logout"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                        </svg>
                     </button>
                  </div>
               </div>
            </div>
         </nav>

      </aside>
   )
}

export default Aside