import { TextInput } from "@/components"
import { NavLink } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"


const UserLogin = () => {
   return (
      <div className="grow flex justify-center items-center p-6">
         <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <div className="p-8 sm:p-10">

               {/* Title */}
               <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                  User Login
               </h2>
               <p className="text-sm text-gray-500 text-center mb-8">
                  Access your saved jobs
               </p>

               {/* Google Login */}
               <div className="mb-6">
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                     <GoogleLogin
                        onSuccess={(credentialResponse) => {
                           console.log('SUCCESS', credentialResponse)
                        }}
                        onError={() => {
                           console.log('ERROR')
                        }}
                     />
                  </div>
               </div>

               {/* Divider */}
               <div className="flex items-center my-6">
                  <div className="grow h-px bg-gray-200"></div>
                  <span className="px-3 text-sm text-gray-400">OR</span>
                  <div className="grow h-px bg-gray-200"></div>
               </div>

               {/* Manual Login Form */}
               <form className="space-y-5">

                  {/* Email */}

                  <TextInput
                     label="Email Address"
                     type="email"
                     name="email"
                     placeholder="Enter your email"
                     required
                  />

                  {/* Password */}
                  <TextInput
                     label="Password"
                     type="password"
                     name="password"
                     placeholder="Enter your password"
                     required
                  />

                  {/* Submit Button */}

                  <button
                     type="submit"
                     className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-200 shadow-sm shadow-purple-200"
                  >
                     Log In as User
                  </button>
               </form>

               {/* Footer */}
               <p className="mt-6 text-center text-sm text-gray-500">
                  Don’t have an account?{" "}
                  <NavLink to='/userSignup' className="text-purple-600 font-medium cursor-pointer hover:underline">
                     Register here
                  </NavLink>
               </p>

            </div>
         </div>
      </div>
   )
}

export default UserLogin