import { Routes, Route } from "react-router-dom"
import { Dashboard, Home, JobDetails } from '@/pages'
import { Navbar } from '@/components'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobDetails' element={<JobDetails />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App