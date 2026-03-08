'use client';

import {
    Factory,
    TrendingUp,
    BarChart,
    TimerOff,
    Calendar,
    FileDown,
    MoreHorizontal,
    LayoutDashboard,
    ArrowUp,
    ArrowDown,
    LayoutGrid,
    History,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function SupervisorDashboard() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased">
            {/* Header Section */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl px-8 py-4">
                <div className="flex items-center gap-6">
                    <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <ArrowLeft size={20} className="text-slate-400" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                            <Factory size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-slate-100 uppercase leading-none">Assembly A</h1>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Morning Shift • 06:00 - 14:00</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-xs font-black text-airlife-blue dark:text-white border-b-2 border-airlife-blue pb-1 uppercase tracking-widest" href="#">Dashboard</a>
                        <a className="text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest" href="#">Lines</a>
                        <a className="text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest" href="#">Reports</a>
                    </nav>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Synced</span>
                        </div>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <div className="text-right">
                                <p className="text-sm font-black text-slate-900 dark:text-slate-100 leading-none">John Doe</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Supervisor</p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <LayoutDashboard size={20} className="text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-8 space-y-8 max-w-[1440px] mx-auto w-full">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Area Efficiency */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Area Efficiency</p>
                                <h3 className="text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tighter">94.2%</h3>
                            </div>
                            <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl border border-emerald-500/20">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.3)]" style={{ width: '94.2%' }}></div>
                        </div>
                        <p className="mt-4 text-[10px] font-black text-emerald-600 flex items-center gap-1 uppercase tracking-wider">
                            <ArrowUp size={12} strokeWidth={3} />
                            2.1% above target
                        </p>
                    </div>

                    {/* Total Output */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Output vs Target</p>
                                <h3 className="text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tighter">
                                    8,420 <span className="text-xl text-slate-400 font-bold tracking-normal italic">/ 9k</span>
                                </h3>
                            </div>
                            <div className="p-3 bg-airlife-blue/10 text-airlife-blue rounded-xl border border-airlife-blue/20">
                                <BarChart size={24} />
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-airlife-blue h-full rounded-full transition-all duration-1000" style={{ width: '82%' }}></div>
                        </div>
                        <p className="mt-4 text-[10px] font-black text-red-500 flex items-center gap-1 uppercase tracking-wider">
                            <ArrowDown size={12} strokeWidth={3} />
                            5.8% behind schedule
                        </p>
                    </div>

                    {/* Downtime */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Downtime</p>
                                <h3 className="text-4xl font-black mt-2 text-slate-900 dark:text-white tracking-tighter">12<span className="text-xl text-slate-400">m</span></h3>
                            </div>
                            <div className="p-3 bg-red-500/10 text-red-600 rounded-xl border border-red-500/20">
                                <TimerOff size={24} />
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: '15%' }}></div>
                        </div>
                        <p className="mt-4 text-[10px] font-black text-emerald-600 flex items-center gap-1 uppercase tracking-wider">
                            <ArrowDown size={12} strokeWidth={3} />
                            15% reduction vs shift A
                        </p>
                    </div>
                </div>

                {/* Filter Bar & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mr-2">Filter by:</span>
                        <button className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">All Lines</button>
                        <button className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Line 1</button>
                        <button className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Line 2</button>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
                        <button className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Shift Morning</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-3 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            <Calendar size={16} className="text-primary" />
                            June 14, 2024
                        </button>
                        <button className="flex items-center gap-3 px-8 py-2.5 rounded-xl bg-airlife-blue text-white text-[10px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg shadow-airlife-blue/20 transition-all">
                            <FileDown size={16} />
                            Export Excel
                        </button>
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Real-Time Line Performance</h2>
                        <div className="flex items-center gap-3 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Live Update: Just Now
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Line ID</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current SKU</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Output (A/T)</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Downtime</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {[
                                    { id: 'Line 01', sku: 'TSLA-MD3-CH', actual: 1240, target: 1300, eff: '95.4%', status: 'Active', dt: '0m' },
                                    { id: 'Line 02', sku: 'TSLA-MD3-DR', actual: 980, target: 1300, eff: '75.3%', status: 'Stoppage', dt: '8m' },
                                    { id: 'Line 03', sku: 'TSLA-MD3-BT', actual: 1310, target: 1300, eff: '100.8%', status: 'Active', dt: '4m' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-black text-slate-900 dark:text-slate-200">{row.id}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900 dark:text-slate-200">{row.sku}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sub-Assembly</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm font-black text-slate-900 dark:text-slate-200">{row.actual} <span className="text-slate-400 font-normal italic">/ {row.target}</span></span>
                                                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className={`h-full ${row.actual >= row.target ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, (row.actual / row.target) * 100)}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`text-sm font-black ${parseFloat(row.eff) >= 90 ? 'text-emerald-500' : 'text-red-500'}`}>{row.eff}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${row.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className={`text-sm font-black ${row.dt !== '0m' ? 'text-red-500' : 'text-slate-400'}`}>{row.dt}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Charts Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-72 flex flex-col">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase mb-8 tracking-[0.2em]">Efficiency Trend (8h)</h2>
                        <div className="flex-1 w-full flex items-end justify-between px-2 gap-3">
                            {[60, 75, 90, 85, 95].map((h, i) => (
                                <div key={i} className="bg-slate-100 dark:bg-slate-800 w-full rounded-xl relative group cursor-pointer transition-all hover:scale-105" style={{ height: `${h}%` }}>
                                    <div className="absolute inset-0 bg-airlife-blue opacity-20 rounded-xl group-hover:opacity-40 transition-opacity"></div>
                                    <div className="absolute inset-x-0 bottom-0 bg-airlife-blue h-1.5 rounded-b-xl"></div>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-airlife-blue hidden group-hover:block">{h}%</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>06:00</span>
                            <span>08:00</span>
                            <span>10:00</span>
                            <span>12:00</span>
                            <span>14:00</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-8">
                        <div className="relative flex items-center justify-center shrink-0">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle className="text-slate-100 dark:text-slate-800 shadow-inner" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="10"></circle>
                                <circle className="text-airlife-blue transition-all duration-1000" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="439.8" strokeDashoffset="43.9" strokeWidth="10" strokeLinecap="round"></circle>
                            </svg>
                            <span className="absolute text-3xl font-black text-slate-900 dark:text-white">90%</span>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Daily Progress</h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[240px]">On track to complete 12,000 units by end of day. No critical shortages reported in supply chain.</p>
                            <button className="flex items-center gap-2 text-[10px] font-black text-airlife-blue hover:underline uppercase tracking-widest pt-2 group">
                                View full area report
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-auto px-8 py-6 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-background-dark/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest group">
                            <LayoutGrid size={16} className="text-primary group-hover:scale-110 transition-transform" />
                            Multi-Line Hub
                        </button>
                        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
                        <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest group">
                            <History size={16} className="text-primary group-hover:scale-110 transition-transform" />
                            Shift Logs
                        </button>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        ProTrack Industrial v4.2.1 • System Online
                    </div>
                </div>
            </footer>
        </div>
    );
}
