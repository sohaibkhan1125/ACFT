import React from 'react';

const Hero = () => {
  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 border border-yellow-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 border border-yellow-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-yellow-400 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Maximize Your{' '}
              <span className="text-yellow-400">ACFT Potential</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Calculate your Army Combat Fitness Test score, track your progress, 
              and ensure you meet the standards for your MOS physical demand category.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToCalculator}
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Calculate My Score
              </button>
              <button
                onClick={() => document.getElementById('standards').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors"
              >
                View Standards
              </button>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-8 shadow-2xl">
              <div className="text-center text-gray-900">
                <div className="text-6xl mb-4">💪</div>
                <h3 className="text-2xl font-bold mb-2">ACFT Calculator</h3>
                <p className="text-lg mb-4">Track your fitness progress</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-900 text-yellow-400 p-3 rounded-lg">
                    <div className="font-bold">MDL</div>
                    <div>Deadlift</div>
                  </div>
                  <div className="bg-gray-900 text-yellow-400 p-3 rounded-lg">
                    <div className="font-bold">SPT</div>
                    <div>Standing Power Throw</div>
                  </div>
                  <div className="bg-gray-900 text-yellow-400 p-3 rounded-lg">
                    <div className="font-bold">HRP</div>
                    <div>Hand Release Push-ups</div>
                  </div>
                  <div className="bg-gray-900 text-yellow-400 p-3 rounded-lg">
                    <div className="font-bold">SDC</div>
                    <div>Sprint-Drag-Carry</div>
                  </div>
                  <div className="bg-gray-900 text-yellow-400 p-3 rounded-lg">
                    <div className="font-bold">PLK</div>
                    <div>Plank</div>
                  </div>
                  <div className="bg-gray-900 text-yellow-400 p-3 rounded-lg">
                    <div className="font-bold">2MR</div>
                    <div>2-Mile Run</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
