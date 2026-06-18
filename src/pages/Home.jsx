import { Footer, Hero, ListingJobs, TrustedCompany } from "@/components"
import { useState } from "react"


const Home = () => {

// filter jobs  
// const [search, setSearch] = useState()


  return (
    <>
      <Hero />
      <TrustedCompany />
      <ListingJobs />
      <Footer />
    </>
  )
}

export default Home