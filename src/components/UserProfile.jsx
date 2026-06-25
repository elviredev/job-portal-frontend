import { TextInput } from "@/components"
import { useRef, useState, useEffect } from "react"
import defaultLogo from '../assets/images/default_logo.jpg'
import { useAuth } from "@/context/AuthContext"
import { toast } from "react-toastify"
import api from "@/api/axios"


const UserProfile = () => {

   const { user, refreshUser } = useAuth()
   const [loading, setLoading] = useState(false)
   const [formData, setFormData] = useState({
      full_name: "",
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
            full_name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
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

      if (file.size > 2 * 1024 * 1024) {
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
         // split full_name into first + last for the controller
         const parts = formData.full_name.trim().split(/\s+/);
         const first_name = parts[0] || '';
         const last_name = parts.slice(1).join(' ') || '';

         const data = new FormData()
         data.append('first_name', first_name)
         data.append('last_name', last_name)

         if (selectedFile) {
            data.append('image', selectedFile)
         }

         const res = await api.post('/auth/update-profile', data)
         
         // refresh du user après mise à jour
         await refreshUser()

         // mise à jour du state après la réponse API
         setFormData(prev => ({
            ...prev,
            full_name: `${res.data.user.first_name || ''} ${res.data.user.last_name || ''}`.trim(),
         }));

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
      <aside className="lg:w-1/3 w-full px-4 sm:px-6 lg:px-8">
         <div className="lg:sticky lg:top-8 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Edit Your Profile </h3>
            <form onSubmit={handleSubmit} >

               <TextInput
                  label='Full Name'
                  type='text'
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
               />

               <div>
                  <TextInput
                     label='Email Address'
                     type='email'
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     disabled
                  />
                  <p className="mt-1 text-xs text-gray-400 flex items-center gap-1">
                     <i className="fa-solid fa-lock text-[10px]" />
                     Email address cannot be updated
                  </p>
               </div>


               <div className="max-w-md mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                     {/* Avatar */}
                     <div className="shrink-0">
                        <img
                           src={currentImage || defaultLogo}
                           alt="Profile"
                           referrerPolicy="no-referrer"
                           className="w-16 h-16 rounded-full    object-cover bg-purple-100"
                        />
                     </div>

                     {/* File Input */}
                     <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-1">JPG, PNG, GIF or WEBP · Max 2MB</p>
                        <input
                           ref={fileInputRef}
                           type="file"
                           accept="image/*"
                           onChange={handleFileChange}
                           className="block w-full text-sm text-gray-500
                                file:mr-3 file:py-1.5 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-purple-100 file:text-purple-700
                                hover:file:bg-purple-200
                                file:transition file:duration-150
                                cursor-pointer focus:outline-none"
                        />
                     </div>
                  </div>

                  {/* Submit Button */}
                  <button
                     type="submit"
                     disabled={loading}
                     className="mt-4 w-full bg-purple-600 text-white py-2.5 rounded-xl font-semibold
                            hover:bg-purple-700 active:scale-95
                            transition duration-150 shadow-md"
                  >
                     {loading ? 'Saving...' : 'Save Profile'}
                  </button>
               </div>

            </form>
         </div>
      </aside>
   )
}

export default UserProfile