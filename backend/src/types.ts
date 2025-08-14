export type Status = "unassigned" | "assigned" | "delayed";
export type PharmacyType = "Hub" | "Satellite" | "Clinic";
export type StopStatus = "on-time" | "delayed";

export interface Driver {
  id: string;
  name: string;
  score: number;
}

export interface BestDriver {
  id: string;
  name: string;
  score: number;
}

export interface Stop {
  id: string;
  eta: string;
  status: StopStatus;
}

export interface Route {
  id: string;
  code: string;
  status: Status;
  totalOrders: number;
  totalStops: number;
  sla: number;
  bestDriver: BestDriver;
  line: [number, number][];
  pharmacyType: PharmacyType;
  assignedDriverId: string; // "" means not assigned yet
  window: string;
  stops: Stop[];
}

export interface Hospital {
  id: string;
  name: string;
  color: string;
  routes: Route[];
}

export interface AssignDriverRequest {
  hospitalId: string;
  routeId: string;
  driverId: string;
}

export interface AssignDriverResponse {
  success: boolean;
  hospitalId: string;
  routeId: string;
  driverId: string;
}
