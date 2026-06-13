import { TextInput } from "@/components"
import { NavLink } from "react-router-dom"


const UserSignup = () => {
   return (
      <main className="grow flex justify-center items-center p-4 ">

         <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">

            <div className="p-8 sm:p-10">
               <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-center">User Create Account</h2>

               <form className="space-y-6">

                  <div className="flex space-x-4">
                     <TextInput
                        label="First Name"
                        name="firstName"
                        placeholder="First Name"
                        required
                     />

                     <TextInput
                        label="Last Name"
                        name="lastName"
                        placeholder="Last Name"
                        required
                     />
                  </div>

                  <TextInput
                     label="Email"
                     type="email"
                     name="email"
                     placeholder="Enter your email"
                     required
                  />

                  <TextInput
                     label="Password"
                     type="password"
                     name="password"
                     placeholder="Create a password"
                     required
                  />

                  <TextInput
                     label="Confirm Password"
                     type="password"
                     name="password_confirmation"
                     placeholder="Confirm your password"
                     required
                  />

                  <button
                     type="submit"
                     className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-200 shadow-sm shadow-purple-200"
                  >
                     Sign Up
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