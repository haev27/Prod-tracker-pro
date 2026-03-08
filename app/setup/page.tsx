'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Factory,
    X,
    Search,
    Check,
    ArrowLeft,
    ArrowRight,
    LayoutGrid,
    Package,
    Clock,
    MapPin,
    ClipboardCheck,
    Box
} from 'lucide-react';
import Link from 'next/link';

type Step = 1 | 2 | 3 | 4;

export default function SetupWizard() {
    const [step, setStep] = useState<Step>(1);
    const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null);
    const router = useRouter();

    const catalogs = [
        { id: '29657-001', name: 'Industrial Fastener Set', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_D1Kxm8TpmNliKJqs-VlPTzPEjmMHwyEjun08UYW5-ntcXxHHLajbcwR4WxVjf3Clnz1htseK5RQVGxOaPBvcF8TKJ6V761lMUVaDdd2lFrxzOjDv5AVvx4rKAChyVX0SGk3Zv8barW5EQNbFVI2KUcQa5Osyp7jAhBBabwTw-4wtt1H3u1KHr0GDY4g0AUjZfRSt0YdFYaw5GFeq5XrgmQXUC30Waiq4NOUx45gshCbnuLknZnld8H7vWRhnfr2SInqMKkWiNGT8' },
        { id: '7772020LP', name: 'Hydraulic Pump Valve', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5sAdBSDyCs43ncwrpNo0a9Ag5v9ARyGiposUU74PDDua-wATAAIR5JSh90e5aa4-e83SfJOTbKwGdICp5sNPkhfCisIzljddr9PfyVZt9bVhQ53-jYJafm4EnXcVauGXPtfqvEkqRH103eMtvHAmiuB3Gb36EXRIy5iq0xkZ2XgAUOwJOsM0Dn8O322z2FBgrulNcRIOd3TD63B69afxfs5ATD3K2xdNHYGpEnL6Oo7dDxo9NVkPulqdcqbtQDeXYUNTVHCHKil91' },
        { id: '001851', name: 'Connector Housing', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4RmQA3OEg0tbD87-l-hRjlHy-lk7NO18C-lkJD0J8nj6C7Mt8MmYdGx7DLZc4bt9ECLuR4IU7sjAAOY3hu86mDG6HJ2JWv68ZjysveRnVH8sBJI7_HYg-QQ8STGwLoiFA0maSVwKnpBjlaC5BspghPSegtBxOjyl4fl31IODRPHurN419UO5Krfg-AvPGMNDaA1VU2vgxDG596gd5AkU8_B8JLK8nGuqHT-MboK85bPlv1pfshmEfFG2KeshE6N0hwECLXJl3TStV' },
    ];

    const nextStep = () => setStep((s) => (s < 4 ? s + 1 : s) as Step);
    const prevStep = () => setStep((s) => (s > 1 ? s - 1 : s) as Step);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased">
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-[1000px] bg-white dark:bg-slate-900 shadow-2xl rounded-3xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 transition-all">

                    {/* Header Component */}
                    <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-8 py-6 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary flex items-center justify-center rounded-xl text-white shadow-lg shadow-primary/20">
                                <Factory size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Start New Order</h2>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Configuración Inicial</p>
                            </div>
                        </div>
                        <Link href="/" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors">
                            <X size={20} />
                        </Link>
                    </header>

                    {/* Progress Section */}
                    <div className="flex flex-col gap-4 p-8 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Step</p>
                                <p className="text-2xl font-black tracking-tight">{step} of 4</p>
                            </div>
                            <p className="text-primary text-2xl font-black italic">{(step * 25)}%</p>
                        </div>
                        <div className="w-full rounded-full bg-slate-100 dark:bg-slate-800 h-3 overflow-hidden shadow-inner">
                            <div className="h-full rounded-full bg-primary transition-all duration-700 shadow-[0_0_15px_rgba(106,125,144,0.4)]" style={{ width: `${step * 25}%` }}></div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 overflow-y-auto min-h-[400px]">

                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Área y Turno</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">Selecciona la ubicación y el horario de trabajo.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Planta / Área</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {['Planta Principal', 'Ensamble B', 'Logística'].map(area => (
                                                <button key={area} className={`p-5 rounded-2xl border-2 text-left font-black transition-all ${area === 'Planta Principal' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <MapPin size={20} />
                                                        {area}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Turno Activo</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {['Mañana (06:00 - 14:00)', 'Tarde (14:00 - 22:00)', 'Noche (22:00 - 06:00)'].map(shift => (
                                                <button key={shift} className={`p-5 rounded-2xl border-2 text-left font-black transition-all ${shift.startsWith('Mañana') ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <Clock size={20} />
                                                        {shift}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Select Catalog</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Search or select a catalog item to continue with the production order.</p>
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                        <Search size={22} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        className="w-full h-16 pl-14 pr-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none font-bold text-lg"
                                        placeholder="Search catalog numbers..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {catalogs.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedCatalog(item.id)}
                                            className={`flex flex-col text-left p-4 rounded-2xl border-2 transition-all active:scale-[0.98] group relative ${selectedCatalog === item.id ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 hover:border-primary/30'}`}
                                        >
                                            <div className="w-full aspect-video rounded-xl mb-4 overflow-hidden relative shadow-md">
                                                <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                                                {selectedCatalog === item.id && (
                                                    <div className="absolute top-3 right-3 bg-primary text-white rounded-lg p-1.5 shadow-xl">
                                                        <Check size={16} strokeWidth={4} />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-slate-900 dark:text-white text-lg font-black tracking-tight leading-none">{item.id}</p>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">{item.name}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Batch Information</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">Define los parámetros de la orden.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Number</label>
                                        <input className="w-full h-14 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-primary/50 font-bold outline-none" defaultValue="ORD-2024-X45" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Batch Size</label>
                                        <input className="w-full h-14 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-primary/50 font-bold outline-none" defaultValue="1500" type="number" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</label>
                                        <div className="flex gap-4">
                                            {['Low', 'Normal', 'Urgent'].map(p => (
                                                <button key={p} className={`flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest border-2 transition-all ${p === 'Normal' ? 'border-primary bg-primary text-white' : 'border-slate-100 dark:border-slate-800 dark:text-white'}`}>{p}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator Count</label>
                                        <div className="flex items-center gap-6">
                                            <button className="h-14 w-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-black hover:bg-slate-200 transition-colors">−</button>
                                            <span className="text-3xl font-black tracking-tight">12</span>
                                            <button className="h-14 w-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-black hover:bg-slate-200 transition-colors">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Final Review</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">Confirma los detalles antes de iniciar la línea.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-start gap-5">
                                        <div className="h-12 w-12 bg-airlife-blue/10 text-airlife-blue rounded-xl flex items-center justify-center shrink-0">
                                            <Package size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Item</p>
                                            <p className="text-xl font-black mt-1">7772020LP</p>
                                            <p className="text-sm text-slate-500 font-bold">Hydraulic Pump Valve</p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-start gap-5">
                                        <div className="h-12 w-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                                            <ClipboardCheck size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Status</p>
                                            <p className="text-xl font-black mt-1">Ready to Start</p>
                                            <p className="text-sm text-slate-500 font-bold">1,500 Units • High Priority</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-primary/10 border-2 border-primary/20 p-8 rounded-3xl flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
                                            <Box size={32} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black tracking-tight">Line A-1 is available</h4>
                                            <p className="text-slate-500 font-bold text-sm tracking-tight">System validated: all components in stock.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Footer Navigation */}
                    <div className="flex items-center justify-between p-8 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
                        <button
                            onClick={prevStep}
                            className={`flex items-center justify-center gap-3 px-8 h-16 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-sm uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 ${step === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                            disabled={step === 1}
                        >
                            <ArrowLeft size={18} strokeWidth={3} />
                            Back
                        </button>

                        {step < 4 ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center justify-center gap-3 px-10 h-16 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
                            >
                                Next Step
                                <ArrowRight size={18} strokeWidth={3} />
                            </button>
                        ) : (
                            <button
                                onClick={() => router.push('/line/01')}
                                className="flex items-center justify-center gap-3 px-12 h-16 rounded-2xl bg-emerald-600 text-white font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
                            >
                                START PRODUCTION
                                <Check size={20} strokeWidth={4} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.05]">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#6a7d90 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
            </div>
        </div>
    );
}
