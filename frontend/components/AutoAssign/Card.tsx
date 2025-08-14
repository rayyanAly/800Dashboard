import * as React from "react";

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = "", children }) => {
  return (
    <div
      className={`
        rounded-xl border border-slate-200 bg-white shadow-sm
        p-3 sm:p-4 md:p-5
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
