import { Footer, Hero, ListingJobs, TrustedCompany } from "@/components"
import { useState } from "react"


const Home = () => {

  // filter jobs  
  const [searchParams, setSearchParams] = useState({ keyword: "", location: "" })


  return (
    <>
      <Hero onSearch={setSearchParams} />
      <TrustedCompany />
      <ListingJobs searchParams={searchParams} />
      <Footer />
    </>
  )
}

export default Home