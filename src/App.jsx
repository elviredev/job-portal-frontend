import { Routes, Route } from "react-router-dom"
import { Home, JobDetails } from '@/pages'
import { Navbar } from '@/components'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobDetails' element={<JobDetails />} />
      </Routes>
    </>
  )
}

export default App