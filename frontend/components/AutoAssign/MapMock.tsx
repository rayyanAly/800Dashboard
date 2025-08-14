import React from "react";
import Card from "./Card";
import { Hospital, PharmacyType } from "./types";

const typeDot = (type: PharmacyType) => {
  switch (type) {
    case "Hub":
      return "bg-red-500";
    case "Satellite":
      return "bg-amber-500";
    case "Clinic":
      return "bg-blue-500";
  }
};

const MapMock: React.FC<{ hospitals: Hospital[] }> = ({ hospitals }) => {
  return (
    <Card className="p-4 md:p-5">
      <div className="relative w-full rounded-xl bg-gradient-to-b from-sky-50 to-indigo-50 h-[300px] sm:h-[380px] md:h-[520px] lg:h-[560px]">
        <div className="absolute right-4 top-4 md:right-auto md:top-auto md:left-4 md:bottom-4 space-y-2 rounded-xl bg-white/80 p-3 shadow">
          <p className="text-xs font-semibold text-slate-600">Routes</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span>Hub</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span>Satellite</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>Clinic</span>
            </div>
          </div>
        </div>

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label="Route polylines and stops by pharmacy type"
        >
          {hospitals
            .flatMap((h) => h.routes)
            .map((r) => (
              <g key={r.id}>
                <polyline
                  points={r.line.map(([x, y]) => `${x},${y}`).join(" ")}
                  fill="none"
                  stroke="#6B7280"
                  strokeWidth={0.6}
                  strokeDasharray="2,2"
                  opacity={0.9}
                  vectorEffect="non-scaling-stroke"
                />
                {r.line.map(([x, y], i) => (
                  <circle
                    key={`${r.id}-${i}`}
                    cx={x}
                    cy={y}
                    r={1.1}
                    className={typeDot(r.pharmacyType)}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
            ))}
        </svg>
      </div>
    </Card>
  );
};

export default MapMock;
