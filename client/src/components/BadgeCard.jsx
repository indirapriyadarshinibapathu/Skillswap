import React from 'react';

const BadgeCard = () => {
  const badges = [
    { title: 'First Session Completed', icon: '🎉', status: 'unlocked' },
    { title: 'Master Tutor', icon: '🏆', status: 'locked' },
    { title: '5-Star Peer', icon: '⭐', status: 'locked' },
    { title: 'Polyglot', icon: '🗣️', status: 'locked' },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-3xl text-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Your badges</h3>
        <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
          1 unlocked • keep going!
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {badges.map((b, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl text-center backdrop-blur-md border ${
              b.status === 'unlocked'
                ? 'bg-white/20 border-white/30 text-white'
                : 'bg-white/5 border-white/10 text-white/50'
            }`}
          >
            <div className="text-2xl mb-1">{b.icon}</div>
            <p className="text-xs font-semibold leading-tight">{b.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeCard;