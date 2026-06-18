import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
   const { user, loading } = useAuth()

   // still checking auth
   if (loading) return (
      <div className="flex justify-center items-center h-screen">
         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-600"></div>
      </div>
   )

   // not logged in
   if (!user) {
      const loginPage = allowedRoles?.includes('recruiter')
         ? '/recruiterLogin'
         : '/userLogin'

      return <Navigate to={loginPage} replace />

   }

   // wrong role
   if(allowedRoles && !allowedRoles.includes(user.role)) {
      const loginPage = user.role === 'recruiter'
         ? '/recruiterLogin'
         : '/userLogin'

      return <Navigate to={loginPage} replace />
   }

   return <Outlet />
}

export default ProtectedRoute

