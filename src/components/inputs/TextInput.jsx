const TextInput = ({ label, name, value, onChange, type = 'text', placeholder, required = false, disabled = false, className = '' }) => {
   return (
      <div className='mb-4'>
         <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
            {label} {required && <span className="text-red-500">*</span>}
         </label>

         <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full px-4 py-3 text-gray-700 bg-white rounded-lg border border-gray-200 placeholder-gray-500 transition-all focus:outline-none focus:ring-0 focus:border-purple-500 focus:shadow-none ${className}`}
         />
      </div>
   )
}

export default TextInput