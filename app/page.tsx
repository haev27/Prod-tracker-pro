'use client';

import Link from 'next/link';
import {
    Factory,
    LogOut,
    Clock,
    MapPin,
    ArrowRight,
    Settings,
    HelpCircle,
    LayoutGrid,
    PlusCircle,
    BarChart3
} from 'lucide-react';

import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';

export default function Home() {
    const router = useRouter();
    const userProfile = {
        name: "Juan Pérez",
        role: "Supervisor de Planta • Turno Mañana",
        area: "Planta Principal"
    };

    const handleLogout = async () => {
        try {
            await db.sessions.where('is_active').equals(1).modify({ is_active: false, end_time: new Date().toISOString() });
            router.push('/login');
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased">
            {/* Top Navigation Bar */}
            <header className="w-full bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-[#48abbc] h-10 w-10 flex items-center justify-center rounded-lg text-white shadow-md">
                        <span className="font-black text-[8px] tracking-tighter">AirLife</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tighter text-airlife-blue dark:text-slate-100 uppercase leading-none">AirLife Hub</h1>
                        <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mt-1">Industrial Intelligence</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block border-r border-slate-200 dark:border-slate-700 pr-6">
                        <p className="text-sm font-black text-slate-900 dark:text-slate-100">{userProfile.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{userProfile.role}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors px-4 py-2.5 rounded-xl text-xs font-black text-slate-700 dark:text-white uppercase tracking-wider"
                    >
                        <LogOut size={16} />
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-7xl mx-auto w-full">
                {/* Welcome Section */}
                <div className="w-full text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">
                        Bienvenido, <span className="text-primary">{userProfile.name}</span>
                    </h2>
                    <div className="flex items-center justify-center gap-6 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2">
                            <Clock size={14} className="text-primary" />
                            Turno: Mañana
                        </span>
                        <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                        <span className="flex items-center gap-2">
                            <MapPin size={14} className="text-primary" />
                            Área: {userProfile.area}
                        </span>
                    </div>
                </div>

                {/* Navigation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

                    {/* Card 1: Producción */}
                    <Link href="/line/01" className="group relative flex flex-col bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-[6px] border-airlife-blue text-left items-start overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <LayoutGrid size={120} />
                        </div>
                        <div className="h-16 w-16 bg-airlife-blue/10 text-airlife-blue rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
                            <Factory size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Producción / Multi-Line Hub</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-10">
                            Gestionar líneas activas, monitorear rendimiento en tiempo real e ingresar datos de producción por hora.
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-airlife-blue font-black text-xs uppercase tracking-[0.2em]">
                            Acceder a líneas
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Card 2: Nueva Orden */}
                    <Link href="/setup" className="group relative flex flex-col bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-[6px] border-primary text-left items-start overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <PlusCircle size={120} />
                        </div>
                        <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
                            <PlusCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Nueva Orden / Setup</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-10">
                            Configurar parámetros de máquina, asignar personal e iniciar una nueva orden de producción desde cero.
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em]">
                            Configurar orden
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Card 3: Reportes */}
                    <Link href="/dashboard" className="group relative flex flex-col bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-b-[6px] border-airlife-green text-left items-start overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <BarChart3 size={120} />
                        </div>
                        <div className="h-16 w-16 bg-airlife-green/10 text-airlife-green rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
                            <BarChart3 size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Reportes y Analítica</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-10">
                            Visualizar KPIs globales, eficiencia horaria, tiempos de inactividad y exportar datos para auditoría.
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-airlife-green font-black text-xs uppercase tracking-[0.2em]">
                            Ver analíticas
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>

                {/* System Status Footer */}
                <div className="mt-20 w-full max-w-2xl flex items-center justify-between px-8 py-5 bg-slate-100 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Sistemas Operacionales OK
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden sm:block">
                        V2.4.0 • AIRLIFE INDUSTRIAL SOLUTIONS
                    </div>
                    <div className="flex items-center gap-6">
                        <Settings size={18} className="text-slate-400 cursor-pointer hover:text-primary transition-colors" />
                        <HelpCircle size={18} className="text-slate-400 cursor-pointer hover:text-primary transition-colors" />
                    </div>
                </div>
            </main>

            {/* Decorative Industrial Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.05]">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#6a7d90 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>
        </div>
    );
}
