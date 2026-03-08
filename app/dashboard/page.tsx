'use client';

import { supabase } from '../../lib/supabase';
import { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Download } from 'lucide-react';
import Navbar from '../../components/Navbar';

interface KPI {
    registro_id: string;
    area_nombre: string;
    linea_numero: number;
    numero_parte: string;
    cajas_producidas: number;
    pph_actual: number;
    porcentaje_eficiencia: number;
    semaforo_visual: 'ROJO' | 'VERDE';
}

export default function Dashboard() {
    const [kpis, setKpis] = useState<KPI[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKPIs = async () => {
            const { data, error } = await supabase
                .from('v_kpi_produccion')
                .select('*')
                .order('fecha', { ascending: false })
                .limit(10);

            if (!error && data) setKpis(data);
            setLoading(false);
        };

        fetchKPIs();

        // Real-time subscription
        const channel = supabase
            .channel('schema-db-changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'registros_produccion' }, fetchKPIs)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
            <Navbar />

            <main className="flex-1 p-6 md:p-10 space-y-8 pb-24 md:pb-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
                            <LayoutDashboard size={40} className="text-industrial-accent" />
                            Intelligence Hub
                        </h1>
                        <p className="text-gray-400 font-mono">Monitoreo de Planta en Tiempo Real</p>
                    </div>
                    <button className="btn-primary !py-4 !px-6 flex items-center gap-2">
                        <Download size={20} /> EXPORTAR EXCEL
                    </button>
                </header>

                {/* Top Level Stats */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Eficiencia Promedio" value="92.4%" icon={<TrendingUp className="text-industrial-accent" />} />
                    <StatCard title="Líneas en Alerta" value="02" icon={<AlertTriangle className="text-industrial-danger" />} />
                    <StatCard title="Meta Cumplida" value="18/20" icon={<CheckCircle className="text-industrial-success" />} />
                </section>

                {/* KPI Table */}
                <section className="card-glass overflow-hidden border-white/5">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h2 className="text-xl font-bold uppercase tracking-widest">Estado por Línea</h2>
                        <span className="text-xs bg-industrial-success/20 text-industrial-success px-3 py-1 rounded-full font-black animate-pulse">LIVE DATA</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 text-gray-400 text-xs uppercase font-black">
                                    <th className="p-4">Área / Línea</th>
                                    <th className="p-4">N. Parte</th>
                                    <th className="p-4">Cant.</th>
                                    <th className="p-4">PPH</th>
                                    <th className="p-4">Eficiencia</th>
                                    <th className="p-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {kpis.map((kpi: KPI) => (
                                    <tr key={kpi.registro_id} className="hover:bg-white/5 transition-all group">
                                        <td className="p-4">
                                            <div className="font-black text-lg">{kpi.area_nombre}</div>
                                            <div className="text-xs text-industrial-accent font-mono uppercase">Línea {kpi.linea_numero}</div>
                                        </td>
                                        <td className="p-4 font-mono text-sm">{kpi.numero_parte}</td>
                                        <td className="p-4 font-black text-xl">{kpi.cajas_producidas}</td>
                                        <td className="p-4">
                                            <div className="font-bold">{kpi.pph_actual.toFixed(1)}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden w-24">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${kpi.semaforo_visual === 'ROJO' ? 'bg-industrial-danger' : 'bg-industrial-success'}`}
                                                        style={{ width: `${Math.min(100, kpi.porcentaje_eficiencia)}%` }}
                                                    ></div>
                                                </div>
                                                <span className={`font-black ${kpi.semaforo_visual === 'ROJO' ? 'text-industrial-danger' : 'text-industrial-success'}`}>
                                                    {kpi.porcentaje_eficiencia.toFixed(0)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <button className="p-3 bg-white/5 rounded-xl group-hover:bg-industrial-accent group-hover:text-black transition-all">
                                                <ArrowRight size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="card-glass p-8 flex justify-between items-center group hover:border-industrial-accent/50 transition-all">
            <div>
                <p className="text-xs font-black uppercase text-gray-500 mb-1">{title}</p>
                <p className="text-4xl font-black">{value}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
        </div>
    );
}
