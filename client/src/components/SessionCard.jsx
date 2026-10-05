import React from 'react';

const SessionCard = ({ session }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="bg-indigo-50 text-indigo-600 font-semibold p-3 rounded-xl text-center min-w-[60px]">
          <p className="text-xs uppercase">{session?.month || 'JUL'}</p>
          <p className="text-lg">{session?.date || '22'}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{session?.topic || 'React State Management'}</h4>
          <p className="text-xs text-gray-500">With {session?.peer || 'Priya'} • {session?.time || '4:00 PM'}</p>
        </div>
      </div>
      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
        session?.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {session?.status || 'Pending'}
      </span>
    </div>
  );
};

export default SessionCard;