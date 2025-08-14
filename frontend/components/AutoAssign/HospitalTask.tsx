import * as React from "react";
import Card from "./Card";

export interface HospitalTaskProps {
  title: string;
  subtitle: string;
  rightNode: React.ReactNode;
}

const HospitalTask: React.FC<HospitalTaskProps> = ({ title, subtitle, rightNode }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-800">{title}</div>
          <div className="text-xs text-slate-500">{subtitle}</div>
        </div>
        {rightNode}
      </div>
    </Card>
  );
};

export default HospitalTask;
