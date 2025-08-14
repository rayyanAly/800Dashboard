import React from "react";
import HospitalCard from "./HospitalCard";
import { Hospital, Driver } from "./types";

export interface HospitalListProps {
  hospitals: Hospital[];
  expanded: Record<string, boolean>;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  drivers: Driver[];
  assignDriver: (hospitalId: string, routeId: string, driverId: string) => void;
}

const HospitalList: React.FC<HospitalListProps> = ({
  hospitals,
  expanded,
  setExpanded,
  drivers,
  assignDriver,
}) => {
  return (
    <div className="space-y-4">
      {hospitals.map((h) => (
        <HospitalCard
          key={h.id}
          hospital={h}
          expanded={!!expanded[h.id]}
          setExpanded={setExpanded}
          assignDriver={assignDriver}
          drivers={drivers}
        />
      ))}
    </div>
  );
};

export default HospitalList;
