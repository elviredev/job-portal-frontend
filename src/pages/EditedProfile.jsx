import { Aside, TextInput } from "@/components"
import { useRef, useState, useEffect } from "react"
import defaultLogo from '../assets/images/default_logo.jpg'
import { useAuth } from "@/context/AuthContext"
import { toast } from "react-toastify"
import api from "@/api/axios"
import { FaSave } from "react-icons/fa"

const EditedProfile = () => {

   const [isSidebarOpen, setSidebarOpen] = useState(false)
   const toggleSidebar = () => setSidebarOpen((prev) => !prev)

   const { user, refreshUser } = useAuth()
   const [loading, setLoading] = useState(false)
   const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: ""
   })
   const [previewImage, setPreviewImage] = useState(null)
   const [selectedFile, setSelectedFile] = useState(null)
   const fileInputRef = useRef()

   // populate form when user is loaded
   useEffect(() => {
      if (user) {
         // eslint-disable-next-line react-hooks/set-state-in-effect
         setFormData({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || ''
         })
      }
   }, [user])

   // Nettoyage lors du démontage du composant. Eviter fuites de mémoire après plusieurs changements d'image.
   useEffect(() => {
      return () => {
         if (previewImage) {
            URL.revokeObjectURL(previewImage)
         }
      }
   }, [previewImage])

   const handleChange = (e) => {
      setFormData(prev => (
         {
            ...prev,
            [e.target.name]: e.target.value
         }
      ))
   }

   const handleFileChange = (e) => {
      const file = e.target.files[0]

      if (!file) return;

      // validation
      const allowedTypes = [
         'image/jpeg',
         'image/png',
         'image/webp',
         'image/avif'
      ]

      if (!allowedTypes.includes(file.type)) {
         toast.error('Only JPG, PNG, WEBP and AVIF images are allowed.')
         e.target.value = ''
         return
      }

      if (file.size > 4 * 1024 * 1024) {
         toast.error('Image size must not exceed 4MB.')
         e.target.value = ''
         return
      }

      // libérer l'ancienne URL avant d'en créer une nouvelle
      if (previewImage) {
         URL.revokeObjectURL(previewImage)
      }

      const objectURL = URL.createObjectURL(file)

      setSelectedFile(file)
      setPreviewImage(objectURL)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)

      try {
         const data = new FormData()
         data.append('first_name', formData.first_name)
         data.append('last_name', formData.last_name)

         if (selectedFile) {
            data.append('image', selectedFile)
         }

         await api.post('/auth/update-profile', data)

         await refreshUser()

         toast.success('Profile updated successfully!')

      } catch (error) {
         console.log(error);
         toast.error(error.response?.data?.message || 'Something went wrong. please try again.')
      } finally {
         setLoading(false)
      }
   }

   const currentImage = previewImage || user?.image || defaultLogo



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
                     Edit Profile & Account Settings
                  </h1>
               </header>

               <section className="content-section">

                  <form
                     onSubmit={handleSubmit}
                     className="bg-white p-8 rounded-xl shadow-lg space-y-8"
                  >

                     <h3 className="text-lg font-semibold text-purple-700 border-b pb-2 mb-4">Personal Information</h3>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <TextInput
                           label='First Name'
                           name="first_name"
                           value={formData.first_name}
                           onChange={handleChange}
                           required
                        />

                        <TextInput
                           label='Last Name'
                           name="last_name"
                           value={formData.last_name}
                           onChange={handleChange}
                           required
                        />
                        <div>
                           <TextInput
                              label='Email Address'
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              disabled
                           />
                           <p className="mt-1 text-xs text-gray-500">Email address cannot be changed here.</p>
                        </div>

                        <div className="max-w-md">
                           <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                           <div className="flex items-center space-x-4 mt-2">

                              <img
                                 src={currentImage || defaultLogo}
                                 alt="Profile"
                                 referrerPolicy="no-referrer"
                                 className="w-16 h-16 rounded-full ring-2 ring-purple-400 bg-purple-100 flex items-center justify-center text-purple-600 text-xl font-bold" />

                              <input
                                 ref={fileInputRef}
                                 type="file"
                                 onChange={handleFileChange}
                                 accept="image/*"
                                 className="block w-full text-sm border-purple-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer focus:outline-none" />
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-end pt-2 border-t border-gray-200">
                        <button
                           type="submit"
                           disabled={loading}
                           className="flex px-5 py-2 text-base md:px-6 md:py-2.5 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-150 shadow-lg">
                           <FaSave className="place-self-center mr-2" />
                           {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                     </div>
                  </form>
               </section>

            </main>
         </div>
      </div>
   )
}

export default EditedProfile