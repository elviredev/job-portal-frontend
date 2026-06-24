import { TextInput } from "@/components"
import { NavLink, useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { useState } from "react"
import { toast } from "react-toastify"
import api from "@/api/axios"
import { useAuth } from "@/context/AuthContext"


const RecruiterLogin = () => {

   // importer refreshUser() depuis le context 
   const { refreshUser } = useAuth()
   const navigate = useNavigate()

   const [loading, setLoading] = useState(false)
   const [formData, setFormData] = useState({
      email: "",
      password: ""
   })

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
         ...prev,
         [name]: value
      }))
   }

   // Google Login
   const handleSuccess = async (credentialResponse) => {
      try {
         setLoading(true)

         const token = credentialResponse.credential
         await api.post('/auth/google-login', {
            token,
            role: "recruiter"
         },
            {
               withCredentials: true // http-only cookie
            }
         )
         
         // met à jour le state "user" sans recharger la page d'accueil donc les infos du user s'affiche dans la navbar automatiquement
         await refreshUser()

         // after login success
         toast.success('Google logged successfully!')
         navigate('/')
      } catch (error) {
         toast.error(error.response?.data?.error || 'Google login failed')
      } finally {
         setLoading(false)
      }
   }

   const handleError = () => {
      console.log("Google login failed");
      toast.error("Google login failed, please try again!")
   }

   // Manual Login
   const handleManualLogin = async (e) => {
      e.preventDefault()

      try {
         setLoading(true)

         await api.post('/auth/login',
            {
               email: formData.email,
               password: formData.password,
               role: "recruiter"
            },
            {
               withCredentials: true // http-only cookie
            }
         )

         await refreshUser()

         // after login success
         toast.success('You are logged successfully!')         
         navigate('/')
      } catch (error) {
         const message = 
            error.response?.data?.error || 
            error.response?.data?.message || 
            error.message ||
            "Login failed"
         toast.error(message)
      } finally {
         setLoading(false)
      }
   }


   return (
      <div className="grow flex justify-center items-center p-6">
         <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <div className="p-8 sm:p-10">

               {/* Title */}
               <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                  Recruiter Login
               </h2>
               <p className="text-sm text-gray-500 text-center mb-8">
                  Access your recruiter dashboard
               </p>

               {/* Google Login */}
               <div className="mb-6">
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                     {!loading && (
                        <GoogleLogin
                           onSuccess={handleSuccess}
                           onError={handleError}
                        />
                     )}
                  </div>
               </div>

               {/* Divider */}
               <div className="flex items-center my-6">
                  <div className="grow h-px bg-gray-200"></div>
                  <span className="px-3 text-sm text-gray-400">OR</span>
                  <div className="grow h-px bg-gray-200"></div>
               </div>

               {/* Manual Login Form */}
               <form onSubmit={handleManualLogin} className="space-y-5">

                  {/* Email */}

                  <TextInput
                     label="Email Address"
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="Enter your email"
                     required
                  />

                  {/* Password */}
                  <TextInput
                     label="Password"
                     type="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Enter your password"
                     required
                  />

                  {/* Submit Button */}

                  <button
                     type="submit"
                     disabled={loading}
                     className={`w-full py-3 rounded-xl font-semibold transition duration-200
                        ${loading
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm shadow-purple-200"
                        } text-white `}
                  >
                     {loading ? 'Signin In...' : 'Log In as Recruiter'}
                  </button>
               </form>

               {/* Footer */}
               <p className="mt-6 text-center text-sm text-gray-500">
                  Don’t have an account?{" "}
                  <NavLink to='/recruiterSignup' className="text-purple-600 font-medium cursor-pointer hover:underline">
                     Register here
                  </NavLink>
               </p>

            </div>
         </div>
      </div>
   )
}

export default RecruiterLogin