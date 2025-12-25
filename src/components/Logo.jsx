import React from 'react';

const Logo = ({ width = "auto" }) => {
  return (
    <div className="flex items-center space-x-2" style={{ width }}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-primary"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          fill="currentColor"
          className="opacity-80"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        />
      </svg>
      <span className="text-2xl font-black tracking-tighter">
        <span className="text-primary">Blog</span>
        <span className="text-slate-800">&Build</span>
      </span>
    </div>
  );
};

export default Logo;
