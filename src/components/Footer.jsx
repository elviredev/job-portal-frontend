

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">JobBoard</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            ©  JobBoard. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-purple-400 transition duration-200">Privacy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-purple-400 transition duration-200">Terms</a>
            <a href="#" className="text-xs text-gray-500 hover:text-purple-400 transition duration-200">Contact</a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer