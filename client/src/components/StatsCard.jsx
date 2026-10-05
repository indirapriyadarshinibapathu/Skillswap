import React from 'react';

const StatsCard = ({ title, value, icon, change }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex justify-between items-center">
      <div>
        <p className="text-xs font-medium text-gray-500">{title || 'Upcoming Sessions'}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value || '0'}</p>
        {change && <p className="text-xs text-emerald-600 mt-1 font-medium">{change}</p>}
      </div>
      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl">
        {icon || '📅'}
      </div>
    </div>
  );
};

export default StatsCard;