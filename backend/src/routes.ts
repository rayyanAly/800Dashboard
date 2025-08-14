import { Router } from "express";
import { hospitals, drivers } from "./data";
import { AssignDriverRequest, AssignDriverResponse } from "./types";

export const api = Router();

api.get("/hospitals", (_req, res) => {
  res.json(hospitals);
});

api.get("/drivers", (_req, res) => {
  res.json(drivers);
});

api.post("/assign", (req, res) => {
  const { hospitalId, routeId, driverId } = req.body as AssignDriverRequest;

  let success = false;

  for (const h of hospitals) {
    if (h.id !== hospitalId) continue;
    for (const r of h.routes) {
      if (r.id !== routeId) continue;
      r.assignedDriverId = driverId;
      r.status = "assigned";
      success = true;
    }
  }

  const response: AssignDriverResponse = {
    success,
    hospitalId,
    routeId,
    driverId
  };
  res.json(response);
});
