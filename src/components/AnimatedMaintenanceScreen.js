import React from 'react';

const AnimatedMaintenanceScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Gears */}
        <div className="absolute top-10 left-10 w-16 h-16 opacity-20">
          <div className="gear-animation">
            <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="8" fill="currentColor"/>
              <rect x="48" y="10" width="4" height="20" fill="currentColor"/>
              <rect x="48" y="70" width="4" height="20" fill="currentColor"/>
              <rect x="10" y="48" width="20" height="4" fill="currentColor"/>
              <rect x="70" y="48" width="20" height="4" fill="currentColor"/>
              <rect x="20" y="20" width="4" height="20" fill="currentColor" transform="rotate(45 22 30)"/>
              <rect x="76" y="76" width="4" height="20" fill="currentColor" transform="rotate(45 78 86)"/>
              <rect x="76" y="20" width="4" height="20" fill="currentColor" transform="rotate(-45 78 30)"/>
              <rect x="20" y="76" width="4" height="20" fill="currentColor" transform="rotate(-45 22 86)"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-20 right-20 w-12 h-12 opacity-15">
          <div className="gear-animation-reverse">
            <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="6" fill="currentColor"/>
              <rect x="48" y="15" width="4" height="15" fill="currentColor"/>
              <rect x="48" y="70" width="4" height="15" fill="currentColor"/>
              <rect x="15" y="48" width="15" height="4" fill="currentColor"/>
              <rect x="70" y="48" width="15" height="4" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-20 left-20 w-14 h-14 opacity-10">
          <div className="gear-animation-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="50" cy="50" r="8" fill="currentColor"/>
              <rect x="48" y="12" width="4" height="18" fill="currentColor"/>
              <rect x="48" y="70" width="4" height="18" fill="currentColor"/>
              <rect x="12" y="48" width="18" height="4" fill="currentColor"/>
              <rect x="70" y="48" width="18" height="4" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* Floating Tools */}
        <div className="absolute top-1/3 right-1/4 w-8 h-8 opacity-20">
          <div className="tool-bounce">
            <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
              <path d="M20 20 L80 20 L80 30 L30 30 L30 70 L20 70 Z" fill="currentColor"/>
              <rect x="25" y="25" width="50" height="5" fill="white"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 opacity-15">
          <div className="tool-bounce-delayed">
            <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="50" r="25" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="text-center z-10 relative">
        {/* Animated Icon */}
        <div className="mb-8">
          <div className="maintenance-icon-container">
            <div className="maintenance-icon">
              <svg viewBox="0 0 200 200" className="w-24 h-24 text-yellow-400 mx-auto">
                {/* Construction Hat */}
                <path d="M50 80 L150 80 L140 100 L60 100 Z" fill="#F59E0B" className="hat-shadow"/>
                <path d="M50 80 L150 80 L140 100 L60 100 Z" fill="#FCD34D" className="hat-main"/>
                <rect x="70" y="70" width="60" height="10" fill="#92400E" className="hat-band"/>
                
                {/* Gear */}
                <circle cx="100" cy="100" r="35" fill="none" stroke="#F59E0B" strokeWidth="3" className="gear-outer"/>
                <circle cx="100" cy="100" r="15" fill="#F59E0B" className="gear-inner"/>
                <rect x="98" y="65" width="4" height="15" fill="#F59E0B"/>
                <rect x="98" y="120" width="4" height="15" fill="#F59E0B"/>
                <rect x="65" y="98" width="15" height="4" fill="#F59E0B"/>
                <rect x="120" y="98" width="15" height="4" fill="#F59E0B"/>
                <rect x="75" y="75" width="4" height="15" fill="#F59E0B" transform="rotate(45 77 82.5)"/>
                <rect x="121" y="121" width="4" height="15" fill="#F59E0B" transform="rotate(45 123 128.5)"/>
                <rect x="121" y="75" width="4" height="15" fill="#F59E0B" transform="rotate(-45 123 82.5)"/>
                <rect x="75" y="121" width="4" height="15" fill="#F59E0B" transform="rotate(-45 77 128.5)"/>
                
                {/* Wrench */}
                <path d="M130 120 L160 120 L165 125 L160 130 L130 130 Z" fill="#6B7280" className="wrench-handle"/>
                <circle cx="140" cy="125" r="8" fill="none" stroke="#6B7280" strokeWidth="2" className="wrench-head"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Main Text */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 maintenance-title">
          🚧 Website Under Maintenance
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 maintenance-subtitle">
          We're working hard to improve your experience. We'll be back soon!
        </p>
        
        {/* Animated Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="text-sm text-gray-400 mt-2 progress-text">
              System updates in progress...
            </p>
          </div>
        </div>
        
        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
        </div>
        
        {/* Contact Info */}
        <div className="text-gray-400 text-sm">
          <p>For urgent matters, please contact us at:</p>
          <p className="text-yellow-400 font-semibold">support@acftcalculator.com</p>
          <p className="text-xs text-gray-500 mt-2">
            Estimated time: 15-30 minutes
          </p>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        .gear-animation {
          animation: rotate 4s linear infinite;
        }
        
        .gear-animation-reverse {
          animation: rotate-reverse 3s linear infinite;
        }
        
        .gear-animation-slow {
          animation: rotate 6s linear infinite;
        }
        
        .tool-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .tool-bounce-delayed {
          animation: bounce 2s ease-in-out infinite 0.5s;
        }
        
        .maintenance-icon {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .maintenance-title {
          animation: fadeInUp 1s ease-out;
        }
        
        .maintenance-subtitle {
          animation: fadeInUp 1s ease-out 0.3s both;
        }
        
        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B);
          background-size: 200% 100%;
          animation: progress 3s ease-in-out infinite;
        }
        
        .loading-dot {
          width: 8px;
          height: 8px;
          background: #F59E0B;
          border-radius: 50%;
          animation: dot-bounce 1.4s ease-in-out infinite both;
        }
        
        .loading-dot:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .loading-dot:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progress {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        @keyframes dot-bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedMaintenanceScreen;
