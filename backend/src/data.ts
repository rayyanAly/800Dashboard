import { Driver, Hospital } from "./types";

export const drivers: Driver[] = [
  { id: "d1", name: "Driver A", score: 95 },
  { id: "d2", name: "Driver B", score: 88 },
  { id: "d3", name: "Driver C", score: 77 }
];

export let hospitals: Hospital[] = [
  {
    id: "h1",
    name: "King Park Heights",
    color: "orange",
    routes: [
      {
        id: "r1",
        code: "A01",
        totalOrders: 1,
        totalStops: 3,
        sla: 98,
        status: "unassigned",
        bestDriver: { id: "d1", name: "Driver A", score: 95 },
        assignedDriverId: "",
        window: "18:00 - 21:00",
        pharmacyType: "Hub",
        stops: [
          { id: "s1", eta: "18:45", status: "delayed" },
          { id: "s2", eta: "19:10", status: "on-time" },
          { id: "s3", eta: "20:05", status: "on-time" }
        ],
        line: [
          [20, 30],
          [32, 44],
          [46, 52],
          [62, 60],
          [78, 68]
        ]
      }
    ]
  },
  {
    id: "h2",
    name: "King Dubai Hills Hospital",
    color: "blue",
    routes: [
      {
        id: "r2",
        code: "B04",
        totalOrders: 12,
        totalStops: 9,
        sla: 91,
        status: "unassigned",
        bestDriver: { id: "d2", name: "Driver B", score: 88 },
        assignedDriverId: "",
        window: "17:00 - 20:00",
        pharmacyType: "Clinic",
        stops: [{ id: "s4", eta: "17:25", status: "on-time" }],
        line: [
          [15, 70],
          [28, 64],
          [44, 58],
          [58, 48],
          [74, 40]
        ]
      },
      {
        id: "r3",
        code: "B07",
        totalOrders: 4,
        totalStops: 6,
        sla: 87,
        status: "unassigned",
        bestDriver: { id: "d3", name: "Driver C", score: 77 },
        assignedDriverId: "",
        window: "19:00 - 22:00",
        pharmacyType: "Satellite",
        stops: [],
        line: [
          [10, 20],
          [26, 28],
          [40, 36],
          [56, 42],
          [82, 54]
        ]
      }
    ]
  }
];
