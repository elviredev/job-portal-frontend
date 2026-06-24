import { TextInput } from "@/components"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "@/api/axios"
import { toast } from "react-toastify"



const UserSignup = () => {

   const navigate = useNavigate()
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)

   const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "user"
   })


   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      setError(null)

      if (formData.password !== formData.password_confirmation) {
         return toast.error("Passwords not match.")
      }

      setLoading(true)

      try {
         await api.post(
            `/auth/register`,
            formData,
            { withCredentials: true }
         )

         toast.success("User account created successfully!")

         navigate('/userLogin')
      } catch (error) {
         if (error.response?.status === 422) {
            const validationErrors = error.response.data.errors
            const firstError = Object.values(validationErrors)[0][0]

            toast.error(firstError)
         } else {
            toast.error('Something went wrong. Please try again.')
         }
      } finally {
         setLoading(false)
      }
   }



   return (
      <main className="grow flex justify-center items-center p-4 ">

         <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">

            <div className="p-8 sm:p-10">
               <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-center">User Create Account</h2>

               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

               <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="flex space-x-4">
                     <TextInput
                        label="First Name"
                        name="first_name"
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                     />

                     <TextInput
                        label="Last Name"
                        name="last_name"
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                     />
                  </div>

                  <TextInput
                     label="Email"
                     type="email"
                     name="email"
                     onChange={handleChange}
                     placeholder="Enter your email"
                     required
                  />

                  <TextInput
                     label="Password"
                     type="password"
                     name="password"
                     onChange={handleChange}
                     placeholder="Create a password"
                     required
                  />

                  <TextInput
                     label="Confirm Password"
                     type="password"
                     name="password_confirmation"
                     onChange={handleChange}
                     placeholder="Confirm your password"
                     required
                  />

                  <button
                     type="submit"
                     disabled={loading}
                     className={`w-full px-4 py-3 text-white font-semibold transition duration-300 shadow-md shadow-purple-200  rounded-lg
                        ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'}`}
                  >
                     {loading ? "Create Account..." : "Sign Up"}
                  </button>
               </form>

               <div className="mt-6 text-sm flex justify-center">
                  <NavLink to="/userLogin" className="text-blue-600 hover:text-blue-700 transition duration-150">Back to Login</NavLink>
               </div>
            </div>
         </div>
      </main>
   )
}

export default UserSignup