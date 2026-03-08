'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { ClipboardList, Plus, History, Wifi, WifiOff, ScanLine, Camera, X, Activity } from 'lucide-react';
import QRScanner from '../components/QRScanner';

export default function RegistrationPage() {
    const [cajas, setCajas] = useState(0);
    const [eas, setEas] = useState(0);
    const [headcount, setHeadcount] = useState(1);
    const [uptime, setUptime] = useState(60);
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
            tiempo_muerto_minutos: 60 - uptime,
            synced: false,
            created_at: new Date().toISOString(),
        };

        await db.registros.add(registro);
        setCajas(0);
        setEas(0);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen p-4 md:p-8 flex justify-center">
            <main className="w-full max-w-[1280px] bg-white dark:bg-slate-900 shadow-2xl rounded-xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
                {/* Header Navigation */}
                <header className="flex items-center justify-between px-6 py-5 md:px-8 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-6">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                            <ClipboardList className="text-primary" size={28} />
                        </div>
                        <div className="hidden md:block h-8 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Linea 01</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`relative flex h-3 w-3`}>
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-emerald-green' : 'bg-red-500'}`}></span>
                                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-green' : 'bg-red-500'}`}></span>
                                </span>
                                <span className={`text-xs font-bold uppercase tracking-wider ${isOnline ? 'text-emerald-green' : 'text-red-500'}`}>
                                    {isOnline ? 'En Línea' : 'Sin Conexión'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right mr-2 hidden sm:block">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operador</p>
                            <p className="text-lg font-semibold">Turno Actual</p>
                        </div>
                        <div className="h-12 w-12 rounded-full md:h-14 md:w-14 bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                            <Activity className="text-primary" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6">
                    <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                        {/* Production Input */}
                        <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 flex flex-col p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Producción Real</h2>
                                <span className="bg-primary/5 border border-primary/10 text-primary px-3 py-1.5 rounded-lg font-bold text-xs uppercase">Captura de Datos</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 items-center">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase text-slate-400 tracking-widest block text-center">Cajas (Unidades)</label>
                                    <div className="flex items-center justify-center gap-4">
                                        <button onClick={() => setCajas(Math.max(0, cajas - 1))} className="h-12 w-12 rounded-xl bg-white dark:bg-slate-700 shadow border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 active:scale-95 transition-all">
                                            <span className="text-2xl font-black text-slate-400">-</span>
                                        </button>
                                        <input
                                            type="number"
                                            value={cajas}
                                            onChange={(e) => setCajas(parseInt(e.target.value) || 0)}
                                            className="w-24 md:w-32 bg-transparent text-5xl md:text-6xl font-black text-center focus:ring-0 outline-none text-slate-900 dark:text-white"
                                        />
                                        <button onClick={() => setCajas(cajas + 1)} className="h-12 w-12 rounded-xl bg-white dark:bg-slate-700 shadow border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 active:scale-95 transition-all">
                                            <span className="text-2xl font-black text-slate-400">+</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase text-slate-400 tracking-widest block text-center">EAs (Sueltos)</label>
                                    <div className="flex items-center justify-center gap-4">
                                        <button onClick={() => setEas(Math.max(0, eas - 1))} className="h-12 w-12 rounded-xl bg-white dark:bg-slate-700 shadow border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 active:scale-95 transition-all">
                                            <span className="text-2xl font-black text-slate-400">-</span>
                                        </button>
                                        <input
                                            type="number"
                                            value={eas}
                                            onChange={(e) => setEas(parseInt(e.target.value) || 0)}
                                            className="w-24 md:w-32 bg-transparent text-5xl md:text-6xl font-black text-center focus:ring-0 outline-none text-slate-900 dark:text-white"
                                        />
                                        <button onClick={() => setEas(eas + 1)} className="h-12 w-12 rounded-xl bg-white dark:bg-slate-700 shadow border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 active:scale-95 transition-all">
                                            <span className="text-2xl font-black text-slate-400">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resources Section*/}
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            <div className="bg-emerald-green rounded-xl p-6 text-white flex flex-col justify-between shadow-xl shadow-emerald-green/20 h-full">
                                <div className="flex justify-between items-start">
                                    <p className="text-emerald-100 font-bold uppercase tracking-widest text-xs">Headcount Asignado</p>
                                    <Activity className="opacity-50" size={20} />
                                </div>
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <button onClick={() => setHeadcount(Math.max(1, headcount - 1))} className="h-12 w-12 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-2xl font-bold transition-all">-</button>
                                    <span className="text-6xl font-black">{headcount}</span>
                                    <button onClick={() => setHeadcount(headcount + 1)} className="h-12 w-12 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-2xl font-bold transition-all">+</button>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700/50">
                                <div className="flex justify-between font-bold text-xs uppercase tracking-widest mb-3">
                                    <span className="text-slate-400">Tiempo Activo</span>
                                    <span className={uptime < 60 ? 'text-red-500' : 'text-emerald-green'}>{uptime} min / 60</span>
                                </div>
                                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2 border border-slate-300 dark:border-slate-600">
                                    <div className={`h-full rounded-full ${uptime < 60 ? 'bg-red-500' : 'bg-emerald-green'}`} style={{ width: `${(uptime / 60) * 100}%` }}></div>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="60"
                                    value={uptime}
                                    onChange={(e) => setUptime(parseInt(e.target.value))}
                                    className="w-full mt-4"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* History Table */}
                        <div className="card-glass flex flex-col p-6 bg-slate-50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-700/50 rounded-xl overflow-hidden">
                            <div className="flex items-center gap-2 mb-4">
                                <History className="text-primary" size={20} />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Últimos Registros</h2>
                            </div>
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 text-xs uppercase tracking-widest">
                                            <th className="py-3 px-2 font-bold">Hora</th>
                                            <th className="py-3 px-2 font-bold">Resumen (C/E)</th>
                                            <th className="py-3 px-2 font-bold">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {localRegistros?.map((reg) => (
                                            <tr key={reg.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                                                <td className="py-3 px-2 font-mono font-bold">{reg.hora_reloj}</td>
                                                <td className="py-3 px-2 font-black">{reg.cajas_producidas} / {reg.eas_producidas}</td>
                                                <td className="py-3 px-2">
                                                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md border ${reg.synced ? 'bg-emerald-green/10 text-emerald-green border-emerald-green/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                                                        {reg.synced ? 'Enviado' : 'Local'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Scrap Section */}
                        <div className="card-glass bg-slate-50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-700/50 p-6 rounded-xl flex flex-col justify-center">
                            <div className="text-center mb-6">
                                <div className="h-16 w-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-300 dark:border-slate-700">
                                    <ScanLine size={28} className="text-slate-500" />
                                </div>
                                <h2 className="text-sm font-bold uppercase text-slate-500 tracking-widest">Material Retenido (Scrap)</h2>
                                <p className="text-xs text-slate-400 mt-2 max-w-[200px] mx-auto">Escanea el código QR del componente para registrar anomalías.</p>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setIsScanning(true)}
                                    className="px-6 py-3 bg-white dark:bg-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-300 font-bold border border-slate-300 dark:border-slate-600 flex items-center gap-3 shadow-sm"
                                >
                                    <Camera size={20} /> INICIAR ESCÁNER
                                </button>
                            </div>

                            {lastQR && (
                                <div className="mt-6 bg-primary/10 border border-primary/20 p-4 rounded-xl flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary p-2 rounded-lg">
                                            <Camera size={16} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-500">Último Escaneo:</p>
                                            <p className="font-mono font-black text-sm">{lastQR}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setLastQR(null)}
                                        className="text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Footer Action Bar */}
                <footer className="bg-slate-100 dark:bg-slate-950 p-4 md:p-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-200 dark:border-slate-800">
                    <div className="flex gap-4 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none h-14 md:h-16 px-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center gap-3 transition-colors shadow-sm" onClick={() => { setCajas(0); setEas(0); }}>
                            <X size={24} className="text-slate-400" />
                            <span className="font-bold text-base uppercase tracking-wide">Limpiar</span>
                        </button>
                    </div>

                    <div className="w-full sm:w-auto flex-1 max-w-sm">
                        <button className="w-full h-14 md:h-16 rounded-xl bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-primary/20" onClick={handleSave}>
                            <Plus size={24} strokeWidth={3} />
                            <span className="font-bold text-lg uppercase tracking-wider">Guardar Registro</span>
                        </button>
                    </div>
                </footer>
            </main>

            {isScanning && (
                <QRScanner
                    onScan={(data) => setLastQR(data)}
                    onClose={() => setIsScanning(false)}
                />
            )}
        </div>
    );
}
