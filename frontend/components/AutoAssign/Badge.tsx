import * as React from "react";

export interface BadgeProps {
  className: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ className, children }) => {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
