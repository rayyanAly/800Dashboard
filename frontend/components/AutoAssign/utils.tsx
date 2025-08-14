import { Route } from "./types";

export const statusBadge = (status: Route["status"]) => {
  switch (status) {
    case "assigned":
      return "bg-emerald-100 text-emerald-700 ring-emerald-200";
    case "delayed":
      return "bg-red-100 text-red-700 ring-red-200";
    default:
      return "bg-slate-100 text-slate-700 ring-slate-200";
  }
};

export const typeDot = (type: Route["pharmacyType"]) => {
  switch (type) {
    case "Hub":
      return "bg-red-500";
    case "Satellite":
      return "bg-amber-500";
    case "Clinic":
      return "bg-blue-500";
  }
};
