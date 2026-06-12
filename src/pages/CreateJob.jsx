import { Aside, TextInput, SelectInput, TextAreaInput } from "@/components"
import { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa"

const CreateJob = () => {

   const [isSidebarOpen, setSidebarOpen] = useState(false)
   const toggleSidebar = () => setSidebarOpen((prev) => !prev)

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
                     Create New Job
                  </h1>
               </header>

               <section className="content-section">

                  <form className="bg-white p-4 sm:p-8 rounded-xl shadow-lg space-y-8">

                     <h3 className="text-lg font-semibold text-purple-700 border-b pb-2 mb-4 border-gray-300">Job Details</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <TextInput
                           label="Job Title"
                           name="title"
                           placeholder="e.g., Senior Frontend Developer"
                           required
                        />
                        <SelectInput
                           label="Department"
                           name="department"
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
                           placeholder="A brief summary of the position and its impact."
                           rows={3}
                           required
                        />

                        <TextAreaInput
                           label="Responsibilities"
                           name="responsibility"
                           placeholder="List the primary day-to-day duties and deliverables (e.g., Develop new features, Collaborate with design team, etc.)"
                           rows={6}
                           required
                        />

                        <TextAreaInput
                           label="Skills & Experience"
                           name="skill_and_experience"
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
                           placeholder="City, State, or Country"
                           required
                        />

                        <SelectInput
                           label="Work Setup"
                           name="location_type"
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
                           required
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <TextInput
                           label="Minimum Salary"
                           type="number"
                           name="min_salary"
                           placeholder="70000"
                           min="0"
                           required
                        />

                        <TextInput
                           label="Maximum Salary"
                           type="number"
                           name="max_salary"
                           placeholder="95000"
                           min="0"
                        />
                     </div>

                     <h3 className="text-lg font-semibold text-purple-700 border-b pb-2 mb-4 border-gray-300">Company & Contact Info</h3>
                     <div className="grid grid-cols-1 gap-6">

                        <TextAreaInput
                           label="Company Description"
                           name="company_description"
                           placeholder="Briefly describe your company, its mission, and culture."
                           rows={4}
                           required
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <TextInput
                           label="Company Name"
                           name="company_name"
                           placeholder="e.g., Microsoft, Google, etc."
                           required
                        />

                        <TextInput
                           label="Company Website"
                           type="url"
                           name="website"
                           placeholder="https://www.company.com"
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <TextInput
                           label="Contact Person (Hiring Manager)"
                           name="contact_person"
                           placeholder="Name or HR Contact"
                           required
                        />
                        <TextInput
                           label="Company Email"
                           type="email"
                           name="company_email"
                           placeholder="hr@company.com"
                           required
                        />

                        <TextInput
                           label="Company Logo"
                           type="file"
                           name="company_logo"
                           accept="image/*"
                           required
                        />
                     </div>

                     <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                           type="submit"
                           className="px-4 py-2 sm:px-8 sm:py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-150 shadow-lg focus:outline-none flex items-center justify-center space-x-2"
                        >
                           <>
                              <FaCloudUploadAlt className="w-5 h-5" />
                              <span>Post Job Now</span>
                           </>

                        </button>
                     </div>
                  </form>
               </section>
            </main>
         </div>
      </div>
   )
}

export default CreateJob