import React from 'react';
import logoImg from '../assets/images/logo.jpeg';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      {/* SkillSwap Logo & Name */}
      <div className="flex items-center gap-3">
        <img 
          src={logoImg} 
          alt="SkillSwap Logo" 
          className="w-10 h-10 object-contain rounded-md" 
        />
        <span className="text-xl font-bold text-gray-950">
          SkillSwap<span className="text-violet-600">+</span>
        </span>
      </div>

      {/* Product Dropdown / Menu Items */}
      <div className="flex items-center gap-6">
        <button className="text-gray-700 font-medium hover:text-gray-900 flex items-center gap-1">
          Product <span className="text-xs">▼</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;