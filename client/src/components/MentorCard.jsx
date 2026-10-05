import React from 'react';

const MentorCard = ({ name, role, rating, sessions, bio, skills, avatarText }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-purple-200">
          {avatarText}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500 font-medium">{role}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
            <span className="text-amber-500 font-bold">★ {rating}</span>
            <span>•</span>
            <span>{sessions} sessions</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">{bio}</p>

      {/* Skills list */}
      <div className="flex flex-wrap gap-2 mb-5">
        {skills.map((skill, index) => (
          <span key={index} className="bg-purple-50 text-purple-600 text-xs px-3 py-1 rounded-full font-medium">
            {skill}
          </span>
        ))}
      </div>

      <button className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors shadow-sm">
        View profile
      </button>
    </div>
  );
};

export default MentorCard;