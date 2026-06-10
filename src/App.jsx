import { Routes, Route } from "react-router-dom"
import { Home } from '@/pages'
import { Navbar } from '@/components'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App