const TextAreaInput = ({ label, name, value, onChange, rows = 3, placeholder, required = false, className = '' }) => {
   return (
      <div className='mb-4'>
         <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
            {label} {required && <span className="text-red-500">*</span>}
         </label>

         <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-4 py-3 text-gray-700 bg-white rounded-lg border border-gray-200 transition-all focus:outline-none focus:ring-0 focus:border-purple-500 focus:shadow-none ${className}`}
         />
      </div>
   )
}

export default TextAreaInput