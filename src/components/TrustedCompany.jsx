import facebookLogo from '../assets/images/facebook_logo.jpg'
import googleLogo from '../assets/images/google_logo.jpg'
import microsoftLogo from '../assets/images/microsoft_logo.jpg'
import appleLogo from '../assets/images/apple.png'
import amazonLogo from '../assets/images/amazon.webp'
import kfcLogo from '../assets/images/kfc.png'
import oracleLogo from '../assets/images/oracle.png'
import teslaLogo from '../assets/images/tesla.png'

const companies = [
   { src: facebookLogo, alt: "Facebook" },
   { src: googleLogo, alt: "Google" },
   { src: microsoftLogo, alt: "Microsoft" },
   { src: appleLogo, alt: "Apple" },
   { src: amazonLogo, alt: "Amazon" },
   { src: kfcLogo, alt: "Kfc" },
   { src: oracleLogo, alt: "Oracle" },
   { src: teslaLogo, alt: "Tesla" },
]

const duplicated = [...companies, ...companies]

const TrustedCompany = () => {
   return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
         <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .header-animate {
          animation: fadeSlideUp 0.6s ease both;
        }
        .header-animate:nth-child(1) { animation-delay: 0.1s; }
        .header-animate:nth-child(2) { animation-delay: 0.25s; }
        .header-animate:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

         <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-10">
               <p className="header-animate text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">
                  Our Partners
               </p>
               <h2 className="header-animate text-2xl font-extrabold text-gray-800">
                  Trusted by Leading Companies
               </h2>
               <p className="header-animate text-sm text-gray-400 mt-1">
                  Join thousands of professionals hired through our platform
               </p>
            </div>

            {/* Fade edges */}
            <div className="relative">
               <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
                  style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} />
               <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
                  style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} />

               {/* Marquee */}
               <div className="overflow-hidden">
                  <div className="marquee-track">
                     {duplicated.map(({ src, alt }, i) => (
                        <div
                           key={`${alt}-${i}`}
                           className="mx-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 hover:scale-110 transition-all duration-300 p-4 flex items-center justify-center group shrink-0"
                           style={{ width: '96px', height: '72px' }}
                        >
                           <img
                              src={src}
                              alt={alt}
                              className="h-8 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300"
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

         </div>
      </section>
   )
}

export default TrustedCompany