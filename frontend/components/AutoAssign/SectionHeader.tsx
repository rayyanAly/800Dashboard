import React from "react";

export interface SectionHeaderProps {
  title: string;
  right: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, right }) => (
  <div className="flex items-center justify-between py-3">
    <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
    <div>{right}</div>
  </div>
);

export default SectionHeader;
