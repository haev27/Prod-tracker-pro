"use client";

import React, { useState, useEffect } from "react";
import {
    Settings,
    Wifi,
    WifiOff,
    Clock,
    AlertTriangle,
    Plus,
    Minus,
    ChevronRight,
    TrendingUp,
    BarChart3,
    Box
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Mock Data for the demonstration
const INITIAL_HOURS = [
    { hour: "06:00", target: 120, actual: 115, scrap: 2, status: "completed" },
    { hour: "07:00", target: 120, actual: 122, scrap: 1, status: "completed" },
    { hour: "08:00", target: 120, actual: 98, scrap: 12, status: "completed" },
    { hour: "09:00", target: 120, actual: 0, scrap: 0, status: "active" },
    { hour: "10:00", target: 120, actual: 0, scrap: 0, status: "pending" },
    { hour: "11:00", target: 120, actual: 0, scrap: 0, status: "pending" },
];

export default function HourlyProductionPage() {
    const [isOnline, setIsOnline] = useState(true);
    const [hours, setHours] = useState(INITIAL_HOURS);
    const [currentView, setCurrentView] = useState<"capture" | "history">("capture");

    // Update online status
    useEffect(() => {
        setIsOnline(navigator.onLine);
        window.addEventListener("online", () => setIsOnline(true));
        window.addEventListener("offline", () => setIsOnline(false));
        return () => {
            window.removeEventListener("online", () => setIsOnline(true));
            window.removeEventListener("offline", () => setIsOnline(false));
        };
    }, []);

    const activeHourIndex = hours.findIndex(h => h.status === "active");
    const activeHour = hours[activeHourIndex];

    const updateActual = (increment: number) => {
        const newHours = [...hours];
        newHours[activeHourIndex].actual = Math.max(0, newHours[activeHourIndex].actual + increment);
        setHours(newHours);
    };

    const updateScrap = (increment: number) => {
        const newHours = [...hours];
        newHours[activeHourIndex].scrap = Math.max(0, newHours[activeHourIndex].scrap + increment);
        setHours(newHours);
    };

    const totalActual = hours.reduce((acc, h) => acc + h.actual, 0);
    const totalTarget = hours.reduce((acc, h) => acc + h.target, 0);
    const totalScrap = hours.reduce((acc, h) => acc + h.scrap, 0);
    const efficiency = totalTarget > 0 ? Math.round((totalActual / totalTarget) * 100) : 0;

    return (
        <main className="min-h-screen bg-[#17191b] text-slate-100 p-4 md:p-8 font-display">
            {/* Header Section */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#6a7d90] rounded-lg flex items-center justify-center">
                            <Box className="w-6 h-6 text-white" />
                        </div>
                        Captura de Producción
                    </h1>
                    <p className="text-slate-400 mt-1">Línea de Ensamble A-12 • Turno 1</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider",
                        isOnline ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                    )}>
                        {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                        {isOnline ? "En Línea" : "Sin Conexión"}
                    </div>
                    <button className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors">
                        <Settings className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
            </header>

            {/* KPI Ticker */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <KPICard title="Eficiencia" value={`${efficiency}%`} icon={<TrendingUp className="w-4 h-4" />} color="text-emerald-400" />
                <KPICard title="Meta Total" value={totalTarget} icon={<BarChart3 className="w-4 h-4" />} color="text-blue-400" />
                <KPICard title="Real Total" value={totalActual} icon={<Box className="w-4 h-4" />} color="text-white" />
                <KPICard title="Scrap" value={totalScrap} icon={<AlertTriangle className="w-4 h-4" />} color="text-amber-400" />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Capture Area */}
                <div className="lg:col-span-8">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 text-xs font-bold uppercase mb-3">
                                    <Clock className="w-3 h-3" /> Hora En Curso
                                </span>
                                <h2 className="text-5xl font-black text-white">{activeHour?.hour}</h2>
                            </div>
                            <div className="text-right">
                                <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">Meta de la Hora</span>
                                <p className="text-3xl font-bold text-[#6a7d90]">{activeHour?.target}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Actual Control */}
                            <div className="space-y-4">
                                <label className="text-slate-400 font-semibold uppercase text-xs tracking-wider">Producción Realizada</label>
                                <div className="flex items-center justify-between bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-inner">
                                    <button
                                        onClick={() => updateActual(-1)}
                                        className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center active:bg-slate-700 transition-colors"
                                    >
                                        <Minus className="w-8 h-8 text-white" />
                                    </button>
                                    <span className="text-7xl font-black text-white px-4">{activeHour?.actual}</span>
                                    <button
                                        onClick={() => updateActual(1)}
                                        className="w-16 h-16 rounded-xl bg-[#6a7d90] flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-blue-900/20"
                                    >
                                        <Plus className="w-8 h-8 text-white" />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    {[5, 10, 20].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => updateActual(val)}
                                            className="flex-1 py-3 rounded-lg bg-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-700 transition-colors border border-slate-700"
                                        >
                                            +{val}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Scrap Control */}
                            <div className="space-y-4">
                                <label className="text-slate-400 font-semibold uppercase text-xs tracking-wider">Piezas Defectuosas (Scrap)</label>
                                <div className="flex items-center justify-between bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-inner">
                                    <button
                                        onClick={() => updateScrap(-1)}
                                        className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center active:bg-slate-700 transition-colors"
                                    >
                                        <Minus className="w-8 h-8 text-white" />
                                    </button>
                                    <span className="text-7xl font-black text-amber-500 px-4">{activeHour?.scrap}</span>
                                    <button
                                        onClick={() => updateScrap(1)}
                                        className="w-16 h-16 rounded-xl bg-amber-600 flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-amber-900/20"
                                    >
                                        <Plus className="w-8 h-8 text-white" />
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-4 bg-red-900/20 text-red-400 border border-red-900/30 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-900/30 transition-colors">
                                        <AlertTriangle className="w-4 h-4" /> Registrar Tiempo Muerto
                                    </button>
                                </div>
                            </div>
                        </div>

                        <footer className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
                            <div className="text-slate-500 text-sm">
                                Última actualización: <span className="text-slate-300">Hace 2 minutos</span>
                            </div>
                            <button className="px-10 py-4 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 active:scale-95 transition-all">
                                Cerrar Hora
                            </button>
                        </footer>
                    </div>
                </div>

                {/* Sidebar History */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[#6a7d90]" /> Historial del Turno
                        </h3>
                        <div className="space-y-3">
                            {hours.map((h, i) => (
                                <div key={i} className={cn(
                                    "flex items-center justify-between p-4 rounded-2xl border transition-all",
                                    h.status === "active" ? "bg-blue-500/10 border-blue-500/30" : "bg-slate-800/40 border-slate-700/50 opacity-80"
                                )}>
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            h.status === "completed" ? (h.actual >= h.target ? "bg-emerald-500" : "bg-amber-500") :
                                                h.status === "active" ? "bg-blue-500 animate-pulse" : "bg-slate-600"
                                        )} />
                                        <div>
                                            <p className="font-bold text-white">{h.hour}</p>
                                            <p className="text-xs text-slate-400">Target: {h.target}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn(
                                            "font-black text-xl",
                                            h.actual >= h.target ? "text-emerald-400" : "text-white"
                                        )}>{h.actual}</p>
                                        <p className="text-xs text-amber-500 font-medium">Scrap: {h.scrap}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-4 bg-slate-800/60 text-slate-400 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                            Ver Reporte Completo <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-[#6a7d90]/20 to-[#1e3a5f]/20 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-white font-bold mb-2">Ayuda Técnica</h4>
                            <p className="text-slate-400 text-sm mb-4">Si tienes problemas con la báscula o el contador automático, contacta a mantenimiento.</p>
                            <button className="text-blue-400 font-bold text-sm">Llamar Supervisor →</button>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <Settings className="w-24 h-24" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function KPICard({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) {
    return (
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
            <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
                <p className={cn("text-2xl font-black", color)}>{value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400">
                {icon}
            </div>
        </div>
    );
}
