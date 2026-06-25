import { useState, useEffect } from "react"
import api from "@/api/axios"
import { toast } from "react-toastify"
import { TextInput } from "."
import { useAuth } from "@/context/AuthContext"



const ApplyJobModal = ({ isOpen, onClose, job, onSuccess }) => {

  const { user } = useAuth()

  const isAuthorized = user?.role === "user"

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    linkedin: "",
    resume: null
  })


  const [resumeName, setResumeName] = useState(null)

  // pré remplir le formulaire
  useEffect(() => {
    if (isOpen && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({
        ...prev,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        linkedin: user.linkedin || ""
      }))
    }
  }, [isOpen, user])


  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] })
      setResumeName(files[0]?.name || null)
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthorized) return;

    const data = new FormData()
    data.append("job_id", job.id)
    data.append("first_name", formData.first_name)
    data.append("last_name", formData.last_name)
    data.append("email", formData.email)
    if (formData.linkedin) data.append("linkedin", formData.linkedin)
    if (formData.resume) data.append("resume", formData.resume)


    try {
      await api.post('/applied-jobs', data)

      toast.success("Application submitted successfully!")

      onSuccess()
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors

        if (errors) {
          Object.values(errors).forEach(fieldErrors => {
            toast.error(fieldErrors[0])
          })
        }

        return
      }

      toast.error('Something went wrong')
    }

  }

  // permet de fermer la modal sinon toujours affichée à cause de "fixed inset-0"
  if (!isOpen) return null


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-violet-600 to-indigo-600 px-8 py-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl leading-tight">Job Application</h2>
              <p className="text-white/70 text-sm truncate max-w-xs">{job.title}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto max-h-[70vh]">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Personal Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label='First Name'
                  name='first_name'
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />

                <TextInput
                  label='Last Name'
                  name='last_name'
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />

                <div className="md:col-span-2">
                  <TextInput
                    label='Email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Resume & Links */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Resume & Links</h3>
              </div>

              {/* Custom file upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Resume
                  <span className="text-gray-400 font-normal ml-1">(PDF only, max 5MB)</span>
                </label>

                <label className={`flex items-center gap-3 border-2 border-dashed rounded-xl p-4 cursor-pointer transition
                  ${resumeName ? 'border-violet-400 bg-violet-50' : 'border-gray-200 hover:border-violet-300 hover:bg-gray-50'}`
                }>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                    ${resumeName ? 'bg-violet-100' : 'bg-gray-100'}`}>
                    <svg className={`w-5 h-5 ${resumeName ? 'text-violet-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    {resumeName
                      ? <p className="text-sm font-medium text-violet-700 truncate">{resumeName}</p>
                      : <p className="text-sm text-gray-500">Click to upload your resume</p>
                    }
                    {!resumeName && <p className="text-xs text-gray-400 mt-0.5">PDF format only</p>}
                  </div>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    accept=".pdf"
                    className="hidden"
                  />
                </label>
              </div>

              <TextInput
                label='LinkedIn URL'
                name='linkedin'
                value={formData.linkedin}
                onChange={handleChange}
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
              />

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Submit Application
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default ApplyJobModal