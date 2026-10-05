import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Explore', path: '/explore', icon: '🧭' },
    { name: 'Smart Match', path: '/smart-match', icon: '✨' },
    { name: 'My Schedule', path: '/schedule', icon: '📅' },
    { name: 'Messages', path: '/chat', icon: '💬' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  // Get initial for avatar (e.g., "Indhu" -> "I")
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-purple-100 flex flex-col h-screen fixed left-0 top-0 p-5">
      {/* SkillSwap+ Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-purple-200">
          🎓
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          SkillSwap<span className="text-purple-600">+</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Dynamic Profile Bottom Box */}
      <div className="p-3 bg-purple-50 rounded-2xl flex items-center gap-3 border border-purple-100">
        <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center">
          {initial}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {user?.name || 'Guest User'}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {user?.classYear || 'Class of 2027'}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;