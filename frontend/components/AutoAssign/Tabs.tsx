import React from "react";
import { 
  FaHospital, 
  FaMapMarkedAlt, 
  FaUserCog,
  FaCheck 
} from "react-icons/fa";

export type TabId = "hospital" | "map" | "manual";

export interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

export interface TabsProps {
  tab: TabId;
  setTab: (tab: TabId) => void;
}

const Tabs: React.FC<TabsProps> = ({ tab, setTab }) => {
  const tabs: Tab[] = [
    { id: "hospital", label: "Hospital Overview", icon: <FaHospital className="text-sm" /> },
    { id: "map", label: "Map View", icon: <FaMapMarkedAlt className="text-sm" /> },
    { id: "manual", label: "Manual Selection", icon: <FaUserCog className="text-sm" /> },
  ];

  return (
    <div className="mt-6 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 min-w-full sm:min-w-0">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-selected={active}
              className={[
                "shrink-0 whitespace-nowrap rounded-xl border text-sm font-medium transition-all",
                "px-3 py-2 sm:px-4",
                active
                  ? "border-sky-300 bg-sky-100 text-sky-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-200 hover:text-slate-800",
                "flex items-center gap-2",
              ].join(" ")}
            >
              <span className={active ? "text-sky-600" : "text-slate-500"}>
                {t.icon}
              </span>
              {t.label}
              {active && <FaCheck className="text-xs text-sky-600 ml-1" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
