import { Routes, Route } from "react-router-dom"
import { CreateJob, Dashboard, EditedProfile, EditJob, Home, JobDetails, ManagedJobs } from '@/pages'
import { Navbar } from '@/components'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobDetails' element={<JobDetails />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createJob' element={<CreateJob />} />
        <Route path='/managedJobs' element={<ManagedJobs />} />
        <Route path='/editJob' element={<EditJob />} />
        <Route path='/editedProfile' element={<EditedProfile />} />
      </Routes>
    </>
  )
}

export default App