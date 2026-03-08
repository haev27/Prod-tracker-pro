'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { ClipboardList, Plus, History, Cloud, CloudOff, ScanLine, Camera, X } from 'lucide-react';
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
            sesion_catalogo_id: 'temp-session-id', // Will be dynamic in full implementation
            hora_reloj: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            cajas_producidas: cajas,
            eas_producidas: eas,
            headcount_hora: headcount,
            tiempo_muerto_minutos: 60 - uptime,
            synced: false,
            created_at: new Date().toISOString(),
        };

        await db.registros.add(registro);
        // Reset inputs
        setCajas(0);
        setEas(0);
    };

    return (
        <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            <header className="flex justify-between items-center card-glass">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-industrial-accent rounded-lg">
                        <ClipboardList className="text-black" size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight">ProdTracker Pro</h1>
                        <p className="text-industrial-accent font-mono text-sm">LINEA 01 - ENSAMBLE 1</p>
                    </div>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {isOnline ? <Cloud size={20} /> : <CloudOff size={20} />}
                    <span className="font-bold text-sm uppercase">{isOnline ? 'En Línea' : 'Offline'}</span>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Production Input */}
                <div className="card-glass space-y-6">
                    <h2 className="text-xl font-bold uppercase text-gray-400">Producción Real</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase">Cajas</label>
                            <input
                                type="number"
                                value={cajas}
                                onChange={(e) => setCajas(parseInt(e.target.value) || 0)}
                                className="w-full bg-white/10 text-5xl font-black p-6 rounded-xl border border-white/20 focus:border-industrial-accent outline-none text-center"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase">EAs</label>
                            <input
                                type="number"
                                value={eas}
                                onChange={(e) => setEas(parseInt(e.target.value) || 0)}
                                className="w-full bg-white/10 text-5xl font-black p-6 rounded-xl border border-white/20 focus:border-industrial-accent outline-none text-center"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 btn-danger" onClick={() => { setCajas(0); setEas(0); }}>Borrar</button>
                        <button className="flex-1 btn-primary flex justify-center items-center gap-2" onClick={handleSave}>
                            <Plus strokeWidth={3} /> GUARDAR
                        </button>
                    </div>
                </div>

                {/* Headcount & Status */}
                <div className="card-glass space-y-6">
                    <h2 className="text-xl font-bold uppercase text-gray-400">Recursos y Tiempo</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-2xl">
                            <span className="font-bold uppercase">Headcount</span>
                            <div className="flex items-center gap-6">
                                <button onClick={() => setHeadcount(Math.max(1, headcount - 1))} className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-4xl font-bold">-</button>
                                <span className="font-black w-8 text-center">{headcount}</span>
                                <button onClick={() => setHeadcount(headcount + 1)} className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-4xl font-bold">+</button>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <div className="flex justify-between font-bold uppercase text-sm">
                                <span>Tiempo Activo</span>
                                <span className={uptime < 60 ? 'text-industrial-danger' : 'text-industrial-success'}>{uptime} min / 60</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="60"
                                value={uptime}
                                onChange={(e) => setUptime(parseInt(e.target.value))}
                                className="w-full accent-industrial-accent h-3 rounded-lg appearance-none cursor-pointer bg-white/10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Scrap Section */}
            <section className="card-glass space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold uppercase text-gray-400">Registro de Scrap</h2>
                    <button
                        onClick={() => setIsScanning(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all text-industrial-accent font-bold border border-industrial-accent/30"
                    >
                        <ScanLine size={24} /> ESCANEAR QR
                    </button>
                </div>

                {lastQR && (
                    <div className="bg-industrial-accent/10 border border-industrial-accent/20 p-4 rounded-xl flex justify-between items-center animate-pulse">
                        <div className="flex items-center gap-3">
                            <Camera size={24} className="text-industrial-accent" />
                            <div>
                                <p className="text-xs uppercase font-bold text-gray-400">Material Detectado:</p>
                                <p className="font-mono font-black">{lastQR}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setLastQR(null)}
                            className="bg-industrial-danger/20 text-industrial-danger p-2 rounded-lg hover:bg-industrial-danger/40 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
            </section>

            {isScanning && (
                <QRScanner
                    onScan={(data) => setLastQR(data)}
                    onClose={() => setIsScanning(false)}
                />
            )}

            {/* History Table */}
            <section className="card-glass overflow-hidden">
                <div className="flex items-center gap-2 mb-4 px-2">
                    <History className="text-industrial-accent" size={24} />
                    <h2 className="text-xl font-bold uppercase">Últimos Registros</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-400 text-sm uppercase">
                                <th className="p-4">Hora</th>
                                <th className="p-4">Cajas / EAs</th>
                                <th className="p-4">HC</th>
                                <th className="p-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localRegistros?.map((reg) => (
                                <tr key={reg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono font-bold">{reg.hora_reloj}</td>
                                    <td className="p-4 font-black">{reg.cajas_producidas} / {reg.eas_producidas}</td>
                                    <td className="p-4 font-bold">{reg.headcount_hora}</td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${reg.synced ? 'bg-industrial-success/20 text-industrial-success' : 'bg-industrial-accent/20 text-industrial-accent'}`}>
                                            {reg.synced ? 'Enviado' : 'Pendiente'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
