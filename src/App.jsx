import { Routes, Route } from "react-router-dom"
import { CreateJob, Dashboard, EditedProfile, EditJob, Home, JobDetails, ManagedJobs, RecruiterLogin, RecruiterSignup, SavedJobs } from '@/pages'
import { Navbar } from '@/components'
import { GoogleOAuthProvider } from '@react-oauth/google'


const App = () => {
  
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobDetails' element={<JobDetails />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/createJob' element={<CreateJob />} />
          <Route path='/managedJobs' element={<ManagedJobs />} />
          <Route path='/editJob' element={<EditJob />} />
          <Route path='/editedProfile' element={<EditedProfile />} />
          <Route path='/savedJobs' element={<SavedJobs />} />
          <Route path='/recruiterLogin' element={<RecruiterLogin />} />
          <Route path='/recruiterSignup' element={<RecruiterSignup />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  )
}

export default App