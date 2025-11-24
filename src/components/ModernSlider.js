import React, { useState, useRef, useEffect } from 'react';

const ModernSlider = ({ 
  min, 
  max, 
  value, 
  onChange, 
  step = 1, 
  label, 
  unit = '', 
  isTime = false,
  className = '' 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMove = (e) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newValue = min + (max - min) * percentage;
    const steppedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    
    setLocalValue(clampedValue);
    onChange(clampedValue);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    handleTouchMove(e);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
      const newValue = min + (max - min) * percentage;
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      
      setLocalValue(clampedValue);
      onChange(clampedValue);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const formatValue = (val) => {
    if (isTime) {
      const minutes = Math.floor(val / 60);
      const seconds = Math.floor(val % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return val.toFixed(step < 1 ? 2 : 0);
  };

  const percentage = ((localValue - min) / (max - min)) * 100;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
          {formatValue(localValue)}{unit}
        </div>
      </div>
      
      <div className="relative">
        <div
          ref={sliderRef}
          className="relative h-6 bg-gray-200 rounded-full cursor-pointer shadow-inner"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Track */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full opacity-30"></div>
          
          {/* Active track */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg"
            style={{ width: `${percentage}%` }}
          ></div>
          
          {/* Thumb */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-lg border-3 border-yellow-400 cursor-grab transition-all duration-200 ${
              isDragging ? 'scale-125 shadow-2xl border-yellow-500' : 'hover:scale-110 hover:border-yellow-500'
            }`}
            style={{ left: `calc(${percentage}% - 14px)` }}
          >
            <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent rounded-full opacity-30"></div>
          </div>
        </div>
        
        {/* Min/Max labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatValue(min)}{unit}</span>
          <span>{formatValue(max)}{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default ModernSlider;
