import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiHome,
  FiPackage,
  FiTruck,
  FiZap,
  FiMap,
  FiClock,
  FiUpload,
  FiSettings,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  badge: number;
  active: boolean;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: <FiHome className="h-5 w-5" />, badge: 0, active: false },
    { label: "Orders", icon: <FiPackage className="h-5 w-5" />, badge: 12, active: false },
    { label: "Drivers", icon: <FiTruck className="h-5 w-5" />, badge: 0, active: false },
    { label: "Auto-Assign", icon: <FiZap className="h-5 w-5" />, badge: 0, active: true },
    { label: "Route Monitoring", icon: <FiMap className="h-5 w-5" />, badge: 0, active: false },
    { label: "SLA Monitor", icon: <FiClock className="h-5 w-5" />, badge: 3, active: false },
    { label: "Upload Orders", icon: <FiUpload className="h-5 w-5" />, badge: 0, active: false },
    { label: "Settings", icon: <FiSettings className="h-5 w-5" />, badge: 0, active: false },
  ];

  const SidebarContent = (
    <div className="flex h-full flex-col p-3">
      {/* Logo row */}
      <div className="flex items-center justify-between mb-3">
        <Image
          src={isCollapsed ? "/logo2.svg" : "/logo.svg"}
          alt="800 Pharmacy Logo"
          width={isCollapsed ? 40 : 150}
          height={isCollapsed ? 40 : 150}
          className="transition-all duration-200 ease-in-out"
        />
        <button
          className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm"
          onClick={() => setIsMobileOpen(false)}
        >
          <FiX className="h-4 w-4 text-slate-600" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-slate-200/70 mb-4" />

      {/* Navigation */}
<nav className="flex-1 space-y-2 text-lg">
  {menuItems.map((item) => (
    <div
      key={item.label}
      className={[
        "group relative flex items-center justify-between overflow-hidden rounded-xl px-3 py-3 transition-all duration-200 ease-in-out",
        item.active
          ? "bg-sky-50 text-sky-800 border-l-4 border-sky-500"
          : "text-slate-700 hover:bg-slate-100/80 hover:shadow-sm",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <span
          className={[
            "shrink-0 transition-colors duration-200",
            item.active ? "text-sky-600" : "text-slate-500 group-hover:text-slate-700",
            isCollapsed ? "h-6 w-6" : "",
          ].join(" ")}
        >
          {item.icon}
        </span>
        {!isCollapsed && <span className="truncate">{item.label}</span>}
      </div>
      {!isCollapsed && item.badge > 0 && (
        <span className="rounded-full bg-sky-50 text-sky-700 px-2 py-0.5 text-xs shadow-sm">
          {item.badge}
        </span>
      )}
    </div>
  ))}
</nav>


      {/* Profile */}
      <div className="mt-auto rounded-xl border border-slate-200 bg-white/70 backdrop-blur-md p-3.5 shadow-sm hover:green-300 transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 shadow-inner">
            <FiUser className="h-4 w-4 text-slate-500" />
          </div>
          {!isCollapsed && (
            <div>
              <div className="text-lg font-medium text-slate-800">John Smith</div>
              <div className="text-sm text-slate-500">Dispatcher</div>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        className="hidden md:flex absolute -right-3 top-1/2 h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <FiChevronRight className="h-4 w-4 text-slate-500" />
        ) : (
          <FiChevronLeft className="h-4 w-4 text-slate-500" />
        )}
      </button>
    </div>
  );

  return (
    <>
      {!isMobileOpen && (
        <button
          className="md:hidden fixed z-50 top-4 left-4 inline-flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-white shadow-sm"
          onClick={() => setIsMobileOpen(true)}
        >
          <FiMenu className="h-5 w-5 text-slate-700" />
        </button>
      )}

      {/* Desktop sidebar */}
      <aside
        className={`hidden md:block fixed h-screen z-40 flex-shrink-0 border-r border-slate-200 bg-gradient-to-b from-white to-slate-50 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 ${isMobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-64 border-r border-slate-200 bg-gradient-to-b from-white to-slate-50 transition-transform duration-300 ease-in-out ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {SidebarContent}
        </aside>
      </div>

      {/* Spacer */}
      <div className="hidden md:flex">
        <div
          className={`flex-shrink-0 transition-all duration-300 ease-in-out ${
            isCollapsed ? "w-20" : "w-64"
          }`}
        />
        <main className="flex-1"></main>
      </div>
    </>
  );
};

export default Sidebar;
