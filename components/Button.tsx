
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-cyan-600 rounded-lg shadow-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
    >
      {children}
    </button>
  );
};
