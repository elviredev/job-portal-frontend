import { Routes, Route, Navigate } from "react-router-dom"
import { CreateJob, Dashboard, EditedProfile, EditJob, Home, JobDetails, ManagedJobs, RecruiterLogin, RecruiterSignup, SavedJobs, UserLogin, UserSignup } from '@/pages'
import { Navbar } from '@/components'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { useContext } from "react"
import ProtectedRoute from "./components/ProtectedRoute"

// prevent login in users
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user?.role === 'recruiter') return <Navigate to='/dashboard' replace />
  if (user?.role === 'user') return <Navigate to='/' replace />

  return children
}

const App = () => {

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Navbar />
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/jobDetails' element={<JobDetails />} />
            <Route path='/createJob' element={<CreateJob />} />
            <Route path='/managedJobs' element={<ManagedJobs />} />
            <Route path='/editJob' element={<EditJob />} />
            <Route path='/editedProfile' element={<EditedProfile />} />
            <Route path='/recruiterLogin' element={<RecruiterLogin />} />
            <Route path='/recruiterSignup' element={<RecruiterSignup />} />
            <Route path='/userLogin' element={<UserLogin />} />
            <Route path='/UserSignup' element={<UserSignup />} />

            {/* User only routes */}
            <Route element={<ProtectedRoute allowedRoles={['user']} />}>
              <Route path='/savedJobs' element={<SavedJobs />} />
            </Route>

            {/* recruiter only routes */}
            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>

            <Route path='*' element={
              <h1 className="text-4xl font-bold text-gray-600 text-center mt-20">
                404 Not Found
              </h1>
            } />

          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App