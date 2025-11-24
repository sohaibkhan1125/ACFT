import React from 'react';

const EventCard = ({ 
  icon, 
  title, 
  subtitle, 
  value, 
  unit, 
  points, 
  isTime = false,
  className = '' 
}) => {
  const formatValue = (val) => {
    if (isTime) {
      const minutes = Math.floor(val / 60);
      const seconds = Math.floor(val % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return val;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-400 ${className}`}>
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
          <p className="text-xs text-gray-600">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-900">
          {formatValue(value)}
          {unit && <span className="text-sm text-gray-600 ml-1">{unit}</span>}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">{points} POINTS</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
