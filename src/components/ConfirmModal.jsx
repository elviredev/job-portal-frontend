import { AlertTriangleIcon, Trash2Icon, Loader2Icon, X } from 'lucide-react'

const ConfirmModal = ({
   isOpen,
   onClose,
   onConfirm,
   title = "Confirm Delete",
   message = "Are you sure you want to delete this item ?",
   confirmText = "Delete",
   cancelText = "Cancel",
   variant = "danger",
   isLoading = false
}) => {

   if (!isOpen) return null

   const variantStyles = {
      danger: {
         icon: <AlertTriangleIcon className='w-5 h-5 text-red-600' />,
         iconBg: 'bg-red-100',
         btn: 'bg-red-600 hover:bg-red-700'
      },
      warning: {
         icon: <AlertTriangleIcon className='w-5 h-5 text-yellow-600' />,
         iconBg: 'bg-yellow-100',
         btn: 'bg-yellow-600 hover:bg-yellow-700'
      },
      info: {
         icon: <AlertTriangleIcon className='w-5 h-5 text-blue-600' />,
         iconBg: 'bg-blue-100',
         btn: 'bg-blue-600 hover:bg-blue-700'
      }
   }

   const style = variantStyles[variant] || variantStyles.danger

   const handleConfirm = () => {
      if (typeof onConfirm === "function") onConfirm()
   }

   // close on backdrop click
   const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) onClose()
   }

   return (
      <div
         onClick={handleBackdropClick}
         className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
      >
         <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6'>
            {/* Header */}
            <div className='flex items-start justify-between mb-4'>
               <div className='flex items-center gap-3'>
                  <div className={`p-2 rounded-full ${style.iconBg}`}>
                     {style.icon}
                  </div>
                  <h2 className='text-lg font-semibold text-gray-800'>
                     {title}
                  </h2>
               </div>

               <button
                  onClick={onClose}
                  disabled={isLoading}
                  className='text-gray-400 hover:text-gray-600 transition disabled:opacity-40'
               >
                  <X className='w-5 h-5' />
               </button>
            </div>

            <hr className='mb-4 border-gray-100' />
            
            {/* Message */}
            <p className='text-gray-600 text-sm mb-6'>{message}</p>

            {/* Action */}
            <div className='flex justify-end gap-3'>
               <button
                  onClick={onClose}
                  disabled={isLoading}
                  className='px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium transition disabled:opacity-40'
               >
                  {cancelText}
               </button>

               <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className={`px-4 py-2 flex items-center gap-2 rounded-lg text-white text-sm font-medium transition disabled:opacity-60 ${style.btn}`}
               >
                  {isLoading
                     ? <><Loader2Icon className='w-4 h-4 animate-spin' />Deleting...</>
                     : <><Trash2Icon className='w-4 h-4' />{confirmText}</>
                  }
               </button>
            </div>
         </div>

      </div>
   )
}

export default ConfirmModal