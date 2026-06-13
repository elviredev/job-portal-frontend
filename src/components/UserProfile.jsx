import { TextInput } from "@/components"
import ponyo from '../assets/images/ponyo.jpg'


const UserProfile = () => {
  return (
    <aside className="lg:w-1/3 w-full px-4 sm:px-6 lg:px-8">
         <div className="lg:sticky lg:top-8 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Edit Your Profile </h3>
            <form  >

               <TextInput
                  label='Full Name'
                  type='text'
                  name="full_name"
                  required={true}
               />

               <div>
                  <TextInput
                     label='Email Address'
                     type='email'
                     name="email"
                     required={true}
                     disabled={true}
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
                           src={ponyo}
                           alt="Profile"
                           referrerPolicy="no-referrer"
                           className="w-16 h-16 rounded-full    object-cover bg-purple-100"
                        />
                     </div>

                     {/* File Input */}
                     <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-1">JPG, PNG, GIF or WEBP · Max 2MB</p>
                        <input
                           type="file"
                           accept="image/*"
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
                     className="mt-4 w-full bg-purple-600 text-white py-2.5 rounded-xl font-semibold
                            hover:bg-purple-700 active:scale-95
                            transition duration-150 shadow-md"
                  >
                     Save Profile
                  </button>
               </div>

            </form>
         </div>
      </aside>
  )
}

export default UserProfile