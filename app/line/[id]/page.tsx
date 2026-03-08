'use client';

import { useState, useEffect } from 'react';
import { db } from '../../../lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import {
    ClipboardList,
    Plus,
    History,
    Wifi,
    WifiOff,
    ScanLine,
    Camera,
    X,
    Activity,
    User,
    Gauge,
    Timer,
    Package,
    ChevronUp,
    ChevronDown,
    AlertTriangle,
    RefreshCw,
    Settings,
    LogOut,
    ArrowLeft
} from 'lucide-react';
import QRScanner from '../../../components/QRScanner';
import Link from 'next/link';

export default function RegistrationPage() {
    const [cajas, setCajas] = useState(1248);
    const [eas, setEas] = useState(0);
    const [headcount, setHeadcount] = useState(12);
    const [uptime, setUptime] = useState(342); // 5h 42m
    const [isOnline, setIsOnline] = useState(true);
    const [isScanning, setIsScanning] = useState(false);
    const [lastQR, setLastQR] = useState<string | null>(null);

    const localRegistros = useLiveQuery(() => db.registros.reverse().limit(5).toArray());

    useEffect(() => {
        setIsOnline(navigator.onLine);
        const handleStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', handleStatus);
        window.addEventListener('offline', handleStatus);
        return () => {
            window.removeEventListener('online', handleStatus);
            window.removeEventListener('offline', handleStatus);
        };
    }, []);

    const handleSave = async () => {
        const registro = {
            sesion_catalogo_id: 'temp-session-id',
            hora_reloj: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            cajas_producidas: cajas,
            eas_producidas: eas,
            headcount_hora: headcount,
            tiempo_muerto_minutos: 0,
            synced: false,
            created_at: new Date().toISOString(),
        };

        await db.registros.add(registro);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-4 md:p-6 antialiased">
            {/* Tablet View Container (1280x800 focus) */}
            <main className="w-full max-w-[1280px] min-h-[800px] bg-white dark:bg-slate-900 shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-500">

                {/* Header Navigation */}
                <header className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <ArrowLeft size={24} className="text-slate-400" />
                        </Link>
                        <img
                            alt="AirLife Logo"
                            className="h-10 w-auto brightness-0 dark:invert"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgZeLXJHioccPwWGqUngQCu8YSkBZxdunFJ2h2W7La6yKNlNnCOUl2PzonKrcantSh56GtFI4-Re08gLIWzPc9fxwDAJeGNye9hTkfUqD2fdVaCTJDcC5iGj55cws7ppZ2JGRP5FPyUn37kEc2aVp_2LifKNzh_lw9K-RJxzQ7GtBrr3jYLEh-YF-K3ZTQnwoPj_6HnZh5KaZFMbZgUqjqBS3P5uHQA87Hd4pozxqwVzQmd8Bn_mzsU5N0XF2Q2I-xtjC_WO0GJGCI"
                        />
                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Line 01</h1>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-emerald-green' : 'bg-red-500'}`}></span>
                                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? 'bg-emerald-green' : 'bg-red-500'}`}></span>
                                </span>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isOnline ? 'text-emerald-green' : 'text-red-500'}`}>
                                    {isOnline ? 'On-Target' : 'Offline'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="text-right mr-2 hidden sm:block">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Shift Operator</p>
                            <p className="text-lg font-black tracking-tight">Juan Pérez</p>
                        </div>
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-inner">
                            <User className="text-primary" size={28} />
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col lg:flex-row gap-8 p-8 overflow-hidden">

                    {/* Production Counter Section (Left 60%) */}
                    <div className="flex-[3] flex flex-col gap-6">
                        <div className="bg-slate-50 dark:bg-slate-955/30 rounded-2xl p-8 flex-1 flex flex-col border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Current Output</h2>
                                <div className="flex gap-2">
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider border border-primary/20">Units: Cajas</span>
                                    {eas > 0 && <span className="bg-amber-500/10 text-amber-600 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider border border-amber-500/20">Loose: {eas}</span>}
                                </div>
                            </div>

                            <div className="flex-1 flex items-center justify-between gap-12 max-w-4xl mx-auto w-full">
                                <button
                                    onClick={() => setCajas(Math.max(0, cajas - 1))}
                                    className="h-28 w-28 md:h-36 md:w-36 rounded-3xl bg-white dark:bg-slate-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all group"
                                >
                                    <span className="text-6xl font-light text-slate-300 group-hover:text-primary transition-colors">−</span>
                                </button>

                                <div className="flex-1 text-center select-none">
                                    <div className="text-[120px] md:text-[160px] font-black tracking-tighter text-slate-900 dark:text-white leading-none drop-shadow-sm">
                                        {cajas.toLocaleString()}
                                    </div>
                                    <p className="text-slate-400 font-bold text-xl md:text-2xl mt-2 flex items-center justify-center gap-3">
                                        Target: 1,350 <span className="text-emerald-500 text-sm">On Track</span>
                                    </p>
                                </div>

                                <button
                                    onClick={() => setCajas(cajas + 1)}
                                    className="h-28 w-28 md:h-36 md:w-36 rounded-3xl bg-primary shadow-[0_20px_50px_rgba(106,125,144,0.4)] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all group"
                                >
                                    <Plus className="text-white" size={64} strokeWidth={2.5} />
                                </button>
                            </div>

                            <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                                    <span>Line Progress</span>
                                    <span className="text-slate-900 dark:text-white">{((cajas / 1350) * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-slate-400 rounded-full transition-all duration-700 shadow-[0_0_20px_rgba(106,125,144,0.3)]"
                                        style={{ width: `${Math.min(100, (cajas / 1350) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-50 dark:bg-slate-955/30 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active SKU</p>
                                    <p className="text-lg font-black mt-1 tracking-tight">CJ-450-X Premium</p>
                                </div>
                                <Activity className="text-slate-200 group-hover:text-primary transition-colors" size={32} />
                            </div>
                            <button
                                onClick={() => setIsScanning(true)}
                                className="bg-slate-900 text-white rounded-2xl p-6 flex items-center justify-between group hover:bg-black transition-all shadow-xl shadow-slate-900/20"
                            >
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Quick Action</p>
                                    <p className="text-lg font-black mt-1 tracking-tight">Report Scrap</p>
                                </div>
                                <Camera className="text-slate-400 group-hover:text-white transition-colors" size={32} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-[2] flex flex-col gap-6">
                        <div className="bg-emerald-green rounded-2xl p-8 text-white flex flex-col justify-between shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/4 -translate-y-1/4 rotate-12 scale-150">
                                <Activity size={180} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start">
                                    <p className="text-emerald-100 font-bold uppercase tracking-[0.2em] text-[10px]">Current Efficiency</p>
                                    <Activity className="opacity-50" size={20} />
                                </div>
                                <div className="mt-8 flex items-baseline gap-2">
                                    <span className="text-8xl font-black tracking-tighter">94</span>
                                    <span className="text-4xl font-bold opacity-60">%</span>
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-emerald-100 font-bold text-sm">
                                    <div className="bg-white/20 p-1 rounded-md">
                                        <ChevronUp size={16} strokeWidth={3} />
                                    </div>
                                    <span>+2.4% vs last hour</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-955/30 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Hourly History</h2>
                                <History size={16} className="text-slate-300" />
                            </div>
                            <div className="space-y-4 flex-1">
                                {localRegistros?.length ? (
                                    localRegistros.map((reg) => (
                                        <div key={reg.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                                    <span className="text-xs font-black text-slate-400">{reg.hora_reloj}</span>
                                                </div>
                                                <span className="font-black text-sm">{reg.cajas_producidas} Units</span>
                                            </div>
                                            <span className={`h-2 w-2 rounded-full ${reg.synced ? 'bg-emerald-green' : 'bg-primary'}`}></span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full opacity-20 py-10">
                                        <ClipboardList size={48} />
                                        <p className="font-bold text-sm mt-4 uppercase tracking-widest">No Records Yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-955/30 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Runtime</p>
                                <Timer size={16} className="text-slate-300" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black">05</span>
                                <span className="text-slate-400 font-bold mb-1 uppercase text-xs">h</span>
                                <span className="text-4xl font-black ml-2">42</span>
                                <span className="text-slate-400 font-bold mb-1 uppercase text-xs">m</span>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="bg-slate-900 p-6 flex flex-col sm:flex-row gap-6 items-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                    <div className="flex-1 flex gap-4 w-full h-full">
                        <button className="flex-1 h-20 rounded-2xl bg-slate-800 hover:bg-slate-800/80 text-white flex items-center justify-center gap-4 transition-all active:scale-[0.97] group border border-slate-700/50">
                            <AlertTriangle className="text-amber-500 group-hover:scale-110 transition-transform" size={32} />
                            <span className="font-black text-lg uppercase tracking-wider">Report Downtime</span>
                        </button>

                        <button
                            onClick={handleSave}
                            className="flex-[1.5] h-20 rounded-2xl bg-primary hover:brightness-110 text-white flex items-center justify-center gap-4 transition-all active:scale-[0.97] shadow-2xl shadow-primary/20"
                        >
                            <RefreshCw size={32} strokeWidth={3} className={`${localRegistros?.some(r => !r.synced) ? 'animate-spin-slow' : ''}`} />
                            <span className="font-black text-xl uppercase tracking-widest leading-none">Sync & Push</span>
                        </button>
                    </div>

                    <div className="hidden md:block h-12 w-[2px] bg-slate-800 mx-2"></div>

                    <div className="flex gap-4 w-full sm:w-auto h-full">
                        <button className="h-20 w-20 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-all active:scale-[0.9] border border-slate-700/50">
                            <Settings size={32} />
                        </button>
                        <button className="h-20 w-20 rounded-2xl bg-red-600/10 border-2 border-red-600/20 hover:bg-red-600 text-red-500 hover:text-white flex items-center justify-center transition-all active:scale-[0.9] group">
                            <LogOut size={32} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </footer>
            </main>

            {isScanning && (
                <QRScanner
                    onScan={(data) => {
                        setLastQR(data);
                        setIsScanning(false);
                    }}
                    onClose={() => setIsScanning(false)}
                />
            )}
        </div>
    );
}
