"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaBell,
  FaUserCircle,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaChevronRight,
  FaCheck,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import ProgressBar from "./ProgressBar";
import Tabs from "./Tabs";
import HospitalCard from "./HospitalCard";
import MapMock from "./MapMock";
import Card from "./Card";
import { Hospital, Driver } from "./types";
import { fetchHospitals, fetchDrivers, postAssignDriver } from "../../services/api";

const AutoAssignPage: React.FC<{ hospitalsSeed: Hospital[]; drivers: Driver[] }> = ({
  hospitalsSeed,
  drivers,
}) => {
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [tab, setTab] = useState<"hospital" | "map" | "manual">("hospital");
  const [hospitals, setHospitals] = useState<Hospital[]>(hospitalsSeed);
  const [driverList, setDriverList] = useState<Driver[]>(drivers);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const totalOrders = useMemo(
    () =>
      hospitals.reduce(
        (sum, h) => sum + h.routes.reduce((s, r) => s + r.totalOrders, 0),
        0
      ),
    [hospitals]
  );

  const assignedOrders = useMemo(
    () =>
      hospitals.reduce(
        (sum, h) =>
          sum +
          h.routes
            .filter((r) => r.status === "assigned")
            .reduce((s, r) => s + r.totalOrders, 0),
        0
      ),
    [hospitals]
  );

  const [animatedPercent, setAnimatedPercent] = useState<number>(0);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  const targetPercent = useMemo(() => {
    if (totalOrders === 0) return 0;
    return Math.min(100, Math.round((assignedOrders / totalOrders) * 100));
  }, [assignedOrders, totalOrders]);

  const animateToTarget = (target: number) => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
    setAnimatedPercent(0);
    const steps = 20;
    const tickMs = 100;
    const inc = Math.max(1, Math.ceil(target / steps));
    progressTimer.current = setInterval(() => {
      setAnimatedPercent((curr) => {
        const next = Math.min(target, curr + inc);
        if (next >= target && progressTimer.current) {
          clearInterval(progressTimer.current);
          progressTimer.current = null;
        }
        return next;
      });
    }, tickMs);
  };

  useEffect(() => {
    setTab("hospital");
    setExpanded({});
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  const handleLoadOptimize = async () => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }

    const [freshHospitals, freshDrivers] = await Promise.all([fetchHospitals(), fetchDrivers()]);
    setHospitals(freshHospitals);
    setDriverList(freshDrivers);

    const nextExpanded: Record<string, boolean> = {};
    freshHospitals.forEach((h) => (nextExpanded[h.id] = true));
    setExpanded(nextExpanded);

    const freshTotal =
      freshHospitals.reduce(
        (sum, h) => sum + h.routes.reduce((s, r) => s + r.totalOrders, 0),
        0
      ) || 0;

    const freshAssigned =
      freshHospitals.reduce(
        (sum, h) =>
          sum +
          h.routes
            .filter((r) => r.status === "assigned")
            .reduce((s, r) => s + r.totalOrders, 0),
        0
      ) || 0;

    const freshTarget =
      freshTotal === 0 ? 0 : Math.min(100, Math.round((freshAssigned / freshTotal) * 100));

    animateToTarget(freshTarget);
  };

  const assignDriver = async (hospitalId: string, routeId: string, driverId: string) => {
    setHospitals((prev) =>
      prev.map((h) =>
        h.id !== hospitalId
          ? h
          : {
              ...h,
              routes: h.routes.map((r) =>
                r.id !== routeId
                  ? r
                  : {
                      ...r,
                      assignedDriverId: driverId,
                      status: "assigned",
                    }
              ),
            }
      )
    );

    try {
      await postAssignDriver({ hospitalId, routeId, driverId });
    } catch {
      setHospitals((prev) =>
        prev.map((h) =>
          h.id !== hospitalId
            ? h
            : {
                ...h,
                routes: h.routes.map((r) =>
                  r.id !== routeId
                    ? r
                    : {
                        ...r,
                        assignedDriverId: "",
                        status: "unassigned",
                      }
                ),
              }
        )
      );
    }
  };

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDate = () => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
      
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border-b border-slate-200 py-3 px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-blue-300 transition-colors">
                <FaArrowLeft className="text-slate-600" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <div className="hidden sm:block h-6 w-px bg-slate-200 mx-2" />

              {/* Title */}
              <div className="px-3 py-1.5 rounded-lg ml-10 md:ml-0 hover:bg-slate-100 transition-colors">
                <span className="text-xl md:text-sm font-medium text-slate-800">800 Pharmacy Dispatch</span>
              </div>

              <div className="hidden sm:block h-6 w-px bg-slate-200 mx-2" />

              {/* Date  */}
              <div className="hidden sm:block text-sm text-slate-500 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                {formattedDate()}
              </div>
            </div>

            {/* RIGHT cluster */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Stats (DESKTOP only) */}
              <div className="hidden sm:flex flex-wrap items-center divide-x divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                <div className="px-4 py-2 hover:bg-blue-100 transition-colors">
                  <span className="text-xs text-slate-500">Orders Today: </span>
                  <span className="font-bold text-sm text-slate-800">425</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-100 transition-colors">
                  <span className="text-xs text-slate-500">SLA: </span>
                  <span className="font-bold text-sm text-emerald-600">92%</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-100 transition-colors">
                  <span className="text-xs text-slate-500">Active Drivers: </span>
                  <span className="font-bold text-sm text-slate-800">32</span>
                </div>
                <div className="px-4 py-2 hover:bg-blue-100 transition-colors">
                  <span className="text-xs text-slate-500">At Risk: </span>
                  <span className="font-bold text-sm text-red-600">32</span>
                </div>
              </div>

              {/* Mobile: User → Bell → Back  */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 pl-0 sm:pl-2 sm:border-l border-slate-200">
                  <FaUserCircle className="text-slate-600 text-2xl" />
                  <div className="hidden sm:block leading-tight">
                    <div className="font-medium text-sm">John Smith</div>
                    <div className="text-xs text-slate-500">Dispatcher</div>
                  </div>
                </div>

                <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
                  <FaBell className="text-slate-600 text-lg" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Back (MOBILE only) */}
                <button className="flex sm:hidden items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-blue-300 transition-colors">
                  <FaArrowLeft className="text-slate-600" />
                  <span className="text-sm font-medium">Back</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main  */}
        <main className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-auto">
          {/* Section 1: Title + Date + Load */}
          <Card className="">
            <div className="p-4 sm:p-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-600">
                  Auto-Assign Orders
                </h1>
                <p className="text-sm sm:text-base text-slate-500 mt-1">
                  Automatically assign and optimize delivery routes
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <div className="relative">
                  <FaCalendarAlt className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-sm shadow-sm focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleLoadOptimize}
                  className="flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-sky-700 transition-colors"
                >
                  <span>Load & Optimize</span>
                  <FaCheck className="text-xs" />
                </button>
              </div>
            </div>
          </Card>

          {/* Section 2: Overall Assignment Progress */}
          <Card className="">
            <div className="p-4 sm:p-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-slate-600">
                  Overall Assignment Progress
                </h2>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs hover:bg-blue-200 hover:border-slate-300 transition-colors">
                    <span>Monitor Progress</span>
                    <FaChevronRight className="text-xs" />
                  </button>
                  <button className="flex items-center gap-1 rounded-lg bg-amber-100 border border-amber-200 px-2 py-1.5 text-xs text-amber-800 hover:bg-amber-200 transition-colors">
                    <FaExclamationTriangle className="text-xs" />
                    <span>Need Attention</span>
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <ProgressBar value={animatedPercent} label="" className="" />
                <div className="mt-2 text-sm text-slate-500 break-words">
                  {assignedOrders} of {totalOrders} orders assigned ({targetPercent}% complete)
                </div>
              </div>
            </div>
          </Card>

          {/* Section 3: Tabs (no Card) */}
<div className="mt-4 sm:mt-6">
  <Tabs tab={tab} setTab={setTab} />
</div>

{/* Section 4: Body (no Card) */}
<div className="mt-3 sm:mt-4">
  {tab === "hospital" && (
    <div className="space-y-4">
      {hospitals.map((h) => (
        <HospitalCard
          key={h.id}
          hospital={h}
          expanded={expanded[h.id]}
          setExpanded={setExpanded}
          assignDriver={assignDriver}
          drivers={driverList}
        />
      ))}
    </div>
  )}

  {tab === "map" && (
    <div className="mt-2">
      <MapMock hospitals={hospitals} />
    </div>
  )}

  {tab === "manual" && (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 text-sm text-slate-600">
      <div className="flex items-center justify-center h-32 sm:h-40">
        <p>Manual selection tools go here</p>
      </div>
    </div>
  )}
</div>

        </main>
      </div>
    </div>
  );
};

export default AutoAssignPage;
