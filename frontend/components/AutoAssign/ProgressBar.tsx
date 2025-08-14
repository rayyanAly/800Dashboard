import * as React from "react";

export interface ProgressBarProps {
  value: number;     // 0 to 100
  label: string;
  className: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, className }) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={`w-full min-w-0 ${className}`}>
      <div className="mb-1 text-xs sm:text-sm font-medium text-slate-600 break-words">
        {label}
      </div>

      <div className="w-full mt-3 sm:mt-3.5 md:mt-4 h-2 md:h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-red-200 transition-[width] duration-300"
          style={{ width: `${clamped}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={clamped}
          role="progressbar"
          aria-label={label}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
