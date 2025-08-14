"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = require("express");
const data_1 = require("./data");
exports.api = (0, express_1.Router)();
exports.api.get("/hospitals", (_req, res) => {
    res.json(data_1.hospitals);
});
exports.api.get("/drivers", (_req, res) => {
    res.json(data_1.drivers);
});
exports.api.post("/assign", (req, res) => {
    const { hospitalId, routeId, driverId } = req.body;
    let success = false;
    for (const h of data_1.hospitals) {
        if (h.id !== hospitalId)
            continue;
        for (const r of h.routes) {
            if (r.id !== routeId)
                continue;
            r.assignedDriverId = driverId;
            r.status = "assigned";
            success = true;
        }
    }
    const response = {
        success,
        hospitalId,
        routeId,
        driverId
    };
    res.json(response);
});
