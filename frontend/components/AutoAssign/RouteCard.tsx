import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import { Route } from "./types";
import { statusBadge as defaultStatusBadge, typeDot } from "./utils";

export interface RouteCardProps {
  route: Route;
  hospitalId: string;
  assignDriver: (hospitalId: string, routeId: string, driverId: string) => void;
  statusBadge: (status: "unassigned" | "assigned" | "delayed") => string;
}

const RouteCard: React.FC<RouteCardProps> = ({
  route,
  hospitalId,
  assignDriver,
  statusBadge = defaultStatusBadge,
}) => {
  const handleAssign = () => {
    const targetDriverId = route.assignedDriverId || route.bestDriver.id;
    if (!targetDriverId) return;
    assignDriver(hospitalId, route.id, targetDriverId);
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${typeDot(route.pharmacyType)}`} />
            <div className="text-sm font-semibold">Route {route.code}</div>
            <Badge className={statusBadge(route.status)}>
              {route.status === "unassigned"
                ? "Unassigned"
                : route.status === "assigned"
                ? "Assigned"
                : "Delayed"}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
            <span>
              Total Orders:{" "}
              <span className="font-medium text-slate-700">{route.totalOrders}</span>
            </span>
            <span>
              Total Stops:{" "}
              <span className="font-medium text-slate-700">{route.totalStops}</span>
            </span>
            <span>
              SLA Compliance:{" "}
              <span className="font-medium text-emerald-600">{route.sla}%</span>
            </span>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-[10px] uppercase tracking-wide text-slate-400">
            Best Match Driver
          </div>
          <div className="text-sm font-medium text-slate-700">
            {`${route.bestDriver.name} (${route.bestDriver.score}%)`}
          </div>
          <button
            className="mt-2 w-auto sm:w-auto rounded-lg bg-sky-600 px-5 py-2.5 text-xs font-medium text-white hover:bg-sky-700 disabled:opacity-50"
            onClick={handleAssign}
            disabled={false}
            aria-disabled={false}
          >
            Assign
          </button>
        </div>
      </div>
    </Card>
  );
};

export default RouteCard;
