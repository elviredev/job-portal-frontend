const SelectInput = ({ label, name, value, onChange, options = [], placeholder, required = false, className = '' }) => {
   return (
      <div className='mb-4'>
         <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
            {label} {required && <span className="text-red-500">*</span>}
         </label>

         <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`w-full px-4 py-3 text-gray-700 bg-white rounded-lg border border-gray-200 placeholder-gray-500 transition-all appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 focus:shadow-none ${className}`}
         >
            <option value="">
               {placeholder || `Select ${label}`}
            </option>

            {options.map((option) =>
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            )}
         </select>

      </div>
   )
}

export default SelectInput