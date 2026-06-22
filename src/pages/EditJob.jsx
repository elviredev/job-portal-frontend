import { Aside, TextInput, SelectInput, TextAreaInput } from "@/components"
import { useState, useEffect } from "react"
import { FaCloudUploadAlt } from "react-icons/fa"
import { ImSpinner2 } from "react-icons/im"
import defaultLogo from '../assets/images/default_logo.jpg'
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import api from "@/api/axios"

const EditJob = () => {

   const [isSidebarOpen, setSidebarOpen] = useState(false)
   const toggleSidebar = () => setSidebarOpen((prev) => !prev)

   const navigate = useNavigate()
   const { id } = useParams()

   const [loading, setLoading] = useState(false)
   const [fetchLoading, setFetchLoading] = useState(true)

   const initialFormData = {
      title: "",
      department: "",
      level: "",
      key_role: "",
      responsability: "",
      skill_and_experience: "",
      location: "",
      location_type: "",
      job_type: "",
      application_deadline: "",
      min_salary: "",
      max_salary: "",
      company_description: "",
      company_name: "",
      website: "",
      contact_person: "",
      company_email: "",
      company_logo: null,
      company_logo_url: ""
   }

   const [formData, setFormData] = useState(initialFormData)

   useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFetchLoading(true)

      api.get(`/jobs/${id}`)
         .then((res) => {
            const job = res.data.data
            setFormData({
               title: job.title || "",
               department: job.department || "",
               level: job.level || "",
               key_role: job.description?.key_role || "",
               responsability: job.description?.responsability || "",
               skill_and_experience: job.description?.skill_and_experience || "",
               location: job.location || "",
               location_type: job.location_type || "",
               job_type: job.job_type || "",
               application_deadline: job.application_deadline?.split('T')[0] || "",
               min_salary: job.min_salary || "",
               max_salary: job.max_salary || "",
               company_description: job.company_description || "",
               company_name: job.company_name || "",
               website: job.website || "",
               contact_person: job.contact_person || "",
               company_email: job.company_email || "",
               company_logo: null,
               company_logo_url: job.company_logo_url || "",
            })
         })
         .catch(() => toast.error("Failed to load job details."))
         .finally(() => setFetchLoading(false))
   }, [id])

   const handleChange = (e) => {
      const { name, value, files } = e.target
      if (name === "company_logo") {
         const file = files[0]
         setFormData(prev => ({
            ...prev,
            company_logo: file, // store the selected file
            company_logo_url: URL.createObjectURL(file) // preview file
         }))
      } else {
         setFormData(prev => ({
            ...prev,
            [name]: value.trimStart()
         }))
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)

      const data = new FormData()
      Object.keys(formData).forEach((key) => {
         if (key === "company_logo_url") return; // skip preview
         if (key === "company_logo" && !formData[key]) return; // skip if no new file
         data.append(key, formData[key])
      })

      try {
         data.append('_method', 'PUT')
         await api.post(`/jobs/${id}`, data)
         toast.success("Job updated successfully !")
         navigate('/managedJobs')
      } catch (error) {
         const firstError =
            error.response?.data?.errors
               ? Object.values(error.response.data.errors)[0][0]
               : error.response?.data?.message || "Error updating job"
         toast.error(firstError)
      } finally {
         setLoading(false)
      }
   }


   return (
      <div className="flex flex-col min-h-screen bg-white">

         {/* header for mobile */}
         <header className="h-16 flex items-center bg-white shadow-md border-b lg:hidden">
            <button onClick={toggleSidebar} className="p-4 text-purple-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
               </svg>
            </button>
            <div className="ml-4 text-xl font-semibold text-purple-800">Talent Hub</div>
         </header>

         <div className="flex flex-1 overflow-hidden">
            {isSidebarOpen && (
               <div
                  onClick={toggleSidebar}
                  className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
               />
            )}

            <Aside isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white">
               <header className="mb-6 sm:mb-8 pb-4 border-b border-gray-300">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                     Edit Job
                  </h1>
               </header>

               <section className="content-section">

                  {fetchLoading && (
                     <div className="flex justify-center py-20">
                        <ImSpinner2 className="w-8 h-8 animate-spin" />
                     </div>
                  )}

                  <form
                     onSubmit={handleSubmit}
                     className="bg-white p-4 sm:p-8 rounded-xl shadow-lg space-y-8"
                  >

                     <h3 className="text-lg font-semibold text-purple-700 border-b pb-2 mb-4 border-gray-300">Job Details</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <TextInput
                           label="Job Title"
                           name="title"
                           value={formData.title}
                           onChange={handleChange}
                           placeholder="e.g., Senior Frontend Developer"
                           required
                        />
                        <SelectInput
                           label="Department"
                           name="department"
                           value={formData.department}
                           onChange={handleChange}
                           required
                           options={[
                              { value: "Administration", label: "Administration" },
                              { value: "Customer Service", label: "Customer Service" },
                              { value: "Design", label: "Design" },
                              { value: "Engineering", label: "Engineering" },
                              { value: "Finance", label: "Finance" },
                              { value: "Human Resources", label: "Human Resources" },
                              { value: "Information Technology", label: "Information Technology" },
                              { value: "Legal", label: "Legal" },
                              { value: "Marketing", label: "Marketing" },
                              { value: "Operations", label: "Operations" },
                              { value: "Product", label: "Product" },
                              { value: "Research & Development", label: "Research & Development" },
                              { value: "Sales", label: "Sales" },
                           ]}
                        />
                        <SelectInput
                           label="Job Level"
                           name="level"
                           value={formData.level}
                           onChange={handleChange}
                           required
                           options={[
                              { value: "intern", label: "Intern" },
                              { value: "junior", label: "Junior" },
                              { value: "mid", label: "Mid" },
                              { value: "senior", label: "Senior" },
                              { value: "lead", label: "Lead" },
                              { value: "manager", label: "Manager" },
                           ]}
                        />
                     </div>

                     <h3 className="text-lg font-semibold text-purple-700 border-b pb-2 mb-4 border-gray-300">Job Description Details</h3>
                     <div className="space-y-6">

                        <TextAreaInput
                           label="Key Role / Summary"
                           name="key_role"
                           value={formData.key_role}
                           onChange={handleChange}
                           placeholder="A brief summary of the position and its impact."
                           rows={3}
                           required
                        />

                        <TextAreaInput
                           label="Responsabilities"
                           name="responsability"
                           value={formData.responsability}
                           onChange={handleChange}
                           placeholder="List the primary day-to-day duties and deliverables (e.g., Develop new features, Collaborate with design team, etc.)"
                           rows={6}
                           required
                        />

                        <TextAreaInput
                           label="Skills & Experience"
                           name="skill_and_experience"
                           value={formData.skill_and_experience}
                           onChange={handleChange}
                           placeholder="List required qualifications, technical skills, and years of experience (e.g., 5+ years with React, Proficient in Tailwind CSS, Bachelor's degree, etc.)"
                           rows={6}
                           required
                        />
                     </div>

                     <h3 className="text-lg font-semibold text-purple-700 border-b pb-2 mb-4 border-gray-300">Location, Salary & Schedule</h3>
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                        <TextInput
                           label="Location"
                           name="location"
                           value={formData.location}
                           onChange={handleChange}
                           placeholder="City, State, or Country"
                           required
                        />

                        <SelectInput
                           label="Work Setup"
                           name="location_type"
                           value={formData.location_type}
                           onChange={handleChange}
                           required
                           options={[
                              { value: "on-site", label: "On-site" },
                              { value: "remote", label: "Remote" },
                              { value: "hybrid", label: "Hybrid" },
                           ]}
                        />

                        <SelectInput
                           label="Job Type "
                           name="job_type"
                           value={formData.job_type}
                           onChange={handleChange}
                           options={[
                              { value: "Full-time", label: "Full-time" },
                              { value: "Part-time", label: "Part-time" },
                              { value: "Contract", label: "Contract" },
                              { value: "Internship", label: "Internship" },
                              { value: "Freelance", label: "Freelance" },
                           ]}
                        />

                        <TextInput
                           label="Application Deadline"
                           type="date"
                           name="application_deadline"
                           value={formData.application_deadline}
                           onChange={handleChange}
                           required
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <TextInput
                           label="Minimum Salary"
                           type="number"
                           name="min_salary"
                           value={formData.min_salary}
                           onChange={handleChange}
                           placeholder="70000"
                           min="0"
                           required
                        />

                        <TextInput
                           label="Maximum Salary"
                           type="number"
                           name="max_salary"
                           value={formData.max_salary}
                           onChange={handleChange}
                           placeholder="95000"
                           min="0"
                        />
                     </div>

                     <h3 className="text-lg font-semibold text-purple-700 border-b pb-2 mb-4 border-gray-300">Company & Contact Info</h3>
                     <div className="grid grid-cols-1 gap-6">

                        <TextAreaInput
                           label="Company Description"
                           name="company_description"
                           value={formData.company_description}
                           onChange={handleChange}
                           placeholder="Briefly describe your company, its mission, and culture."
                           rows={4}
                           required
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <TextInput
                           label="Company Name"
                           name="company_name"
                           value={formData.company_name}
                           onChange={handleChange}
                           placeholder="e.g., Microsoft, Google, etc."
                           required
                        />

                        <TextInput
                           label="Company Website"
                           type="url"
                           name="website"
                           value={formData.website}
                           onChange={handleChange}
                           placeholder="https://www.company.com"
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <TextInput
                           label="Contact Person (Hiring Manager)"
                           name="contact_person"
                           value={formData.contact_person}
                           onChange={handleChange}
                           placeholder="Name or HR Contact"
                           required
                        />
                        <TextInput
                           label="Company Email"
                           type="email"
                           name="company_email"
                           value={formData.company_email}
                           onChange={handleChange}
                           placeholder="hr@company.com"
                           required
                        />

                        <div>
                           <label className="block text-sm font-medium text-gray-700">Company Logo (image)</label>
                           <img
                              src={formData.company_logo_url || defaultLogo}
                              alt="Company Logo"
                              className="h-24 w-24 object-cover m-2 rounded border"
                           />
                           <TextInput
                              type="file"
                              name="company_logo"
                              accept="image/*"
                              onChange={handleChange}
                              className="mt-1 block w-full cursor-pointer"
                           />
                        </div>
                     </div>

                     <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                           type="submit"
                           className="px-4 py-2 sm:px-8 sm:py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-150 shadow-lg focus:outline-none flex items-center justify-center space-x-2"
                        >
                           {loading ? (
                              <>
                                 <ImSpinner2 className="w-5 h-5 animate-spin text-white" />
                                 <span>Posting...</span>
                              </>
                           ) : (
                              <>
                                 <FaCloudUploadAlt className="w-5 h-5" />
                                 <span>Edit Job Now</span>
                              </>
                           )
                           }
                        </button>
                     </div>
                  </form>
               </section>
            </main>
         </div>
      </div>
   )
}

export default EditJob