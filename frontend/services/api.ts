import {
  Hospital,
  Driver,
  AssignDriverRequest,
  AssignDriverResponse,
  Route,
} from "../components/AutoAssign/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001/api";

const normalizeRoute = (r: any): Route => ({
  id: String(r.id),
  code: String(r.code),
  status: r.status === "assigned" || r.status === "delayed" ? r.status : "unassigned",
  totalOrders: Number(r.totalOrders),
  totalStops: Number(r.totalStops),
  sla: Number(r.sla),
  bestDriver: {
    id: String(r.bestDriver.id),
    name: String(r.bestDriver.name),
    score: Number(r.bestDriver.score),
  },
  line: Array.isArray(r.line) ? r.line.map((p: any) => [Number(p[0]), Number(p[1])]) : [],
  pharmacyType: r.pharmacyType === "Hub" || r.pharmacyType === "Clinic" ? r.pharmacyType : "Satellite",
  assignedDriverId: typeof r.assignedDriverId === "string" ? r.assignedDriverId : "",
  window: String(r.window),
  stops: Array.isArray(r.stops)
    ? r.stops.map((s: any) => ({
        id: String(s.id),
        eta: String(s.eta),
        status: s.status === "delayed" ? "delayed" : "on-time",
      }))
    : [],
});

const normalizeHospital = (h: any): Hospital => ({
  id: String(h.id),
  name: String(h.name),
  color: String(h.color),
  routes: Array.isArray(h.routes) ? h.routes.map(normalizeRoute) : [],
});

const normalizeDriver = (d: any): Driver => ({
  id: String(d.id),
  name: String(d.name),
  score: Number(d.score),
});

export const fetchHospitals = async (): Promise<Hospital[]> => {
  const res = await fetch(`${API_BASE}/hospitals`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch hospitals");
  const raw = await res.json();
  return (Array.isArray(raw) ? raw : []).map(normalizeHospital);
};

export const fetchDrivers = async (): Promise<Driver[]> => {
  const res = await fetch(`${API_BASE}/drivers`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch drivers");
  const raw = await res.json();
  return (Array.isArray(raw) ? raw : []).map(normalizeDriver);
};

export const postAssignDriver = async (
  payload: AssignDriverRequest
): Promise<AssignDriverResponse> => {
  const res = await fetch(`${API_BASE}/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to assign driver");
  const data = (await res.json()) as AssignDriverResponse;
  return {
    success: Boolean(data.success),
    hospitalId: String(data.hospitalId),
    routeId: String(data.routeId),
    driverId: String(data.driverId),
  };
};
