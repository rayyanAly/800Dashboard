import React from "react";
import { FaHospital } from "react-icons/fa";
import Card from "./Card";
import RouteCard from "./RouteCard";
import { Hospital, Driver } from "./types";
import { statusBadge as defaultStatusBadge } from "./utils";

const statusBadge = defaultStatusBadge;

export interface HospitalCardProps {
  hospital: Hospital;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  assignDriver: (hospitalId: string, routeId: string, driverId: string) => void;
  drivers: Driver[];
}

const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  expanded,
  setExpanded,
  assignDriver,
}) => {
  const totalOrders = hospital.routes.length;
  const assignedOrders = hospital.routes.filter((r) => r.status === "assigned").length;

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        expanded ? "bg-slate-500 shadow-md scale-[1.01]" : "bg-white hover:shadow-md"
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 p-4`}
      >
        <div className="flex items-center gap-3">
          <FaHospital
            className={`text-lg shrink-0 transition-colors ${
              expanded ? "text-blue-300" : "text-slate-600"
            }`}
          />
          <div>
            <h3
              className={`text-xl font-semibold tracking-wide transition-colors ${
                expanded ? "text-blue-500" : "text-slate-600"
              }`}
            >
              {hospital.name}
            </h3>
            <span className="text-sm text-slate-500">
              {assignedOrders} of {totalOrders} orders assigned
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() =>
              setExpanded((prev) => ({
                ...prev,
                [hospital.id]: !prev[hospital.id],
              }))
            }
            className={`rounded-lg border border-slate-200 px-3 py-1.5 text-lg sm:text-sm transition-colors ${
              expanded
                ? "bg-blue-100 hover:bg-blue-200 text-blue-700"
                : "hover:bg-blue-200"
            }`}
          >
            {expanded ? "Close" : "Open"}
          </button>
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-lg sm:text-sm hover:bg-blue-200 transition-colors">
            View Map
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-slate-200 p-4">
          <div className="text-xs font-medium text-slate-600">
            {hospital.routes[0]?.window}
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {hospital.routes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                hospitalId={hospital.id}
                assignDriver={assignDriver}
                statusBadge={statusBadge}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default HospitalCard;
