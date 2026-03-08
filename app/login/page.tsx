'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Clock,
    Monitor,
    Delete,
    X,
    LogIn,
    BadgeCheck,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { db, seedInitialData } from '@/lib/db';

export default function LoginPage() {
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Prepare DB with initial user on first load
        seedInitialData();

        // Check if there's an active session
        db.sessions.where('is_active').equals(1).first().then(session => {
            if (session) {
                router.push('/');
            }
        });
    }, [router]);

    const handleKeypadClick = (val: string) => {
        if (pin.length < 6) {
            setError(null);
            setPin(prev => prev + val);
        }
    };

    const handleBackspace = () => {
        setPin(prev => prev.slice(0, -1));
    };

    const handleLogin = async () => {
        if (pin.length < 6) {
            setError('PIN debe ser de 6 dígitos');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Find user with this PIN (simplified for local demo)
            // In a real app, you'd match badge_id AND pin
            const user = await db.users.where('pin').equals(pin).first();

            if (user) {
                // Create active session
                await db.sessions.add({
                    user_id: user.id!,
                    start_time: new Date().toISOString(),
                    is_active: true,
                    area: 'Planta Principal'
                });

                // Update last login
                await db.users.update(user.id!, { last_login: new Date().toISOString() });

                // Redirect to Hub
                router.push('/');
            } else {
                setError('PIN Incorrecto');
                setPin('');
            }
        } catch (err) {
            console.error(err);
            setError('Error de sistema');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center font-display antialiased p-6">
            <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl w-full max-w-[540px] p-10 flex flex-col items-center border border-slate-200 dark:border-slate-800 transition-all">

                <div className="mb-8 text-center">
                    <img
                        alt="AirLife Logo"
                        className="h-10 w-auto brightness-0 dark:invert mx-auto"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgZeLXJHioccPwWGqUngQCu8YSkBZxdunFJ2h2W7La6yKNlNnCOUl2PzonKrcantSh56GtFI4-Re08gLIWzPc9fxwDAJeGNye9hTkfUqD2fdVaCTJDcC5iGj55cws7ppZ2JGRP5FPyUn37kEc2aVp_2LifKNzh_lw9K-RJxzQ7GtBrr3jYLEh-YF-K3ZTQnwoPj_6HnZh5KaZFMbZgUqjqBS3P5uHQA87Hd4pozxqwVzQmd8Bn_mzsU5N0XF2Q2I-xtjC_WO0GJGCI"
                    />
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mt-4 block">Production Terminal</span>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black tracking-tighter mb-2">Shift Entry</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Enter your PIN to begin</p>
                </div>

                {error && (
                    <div className="w-full mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-black uppercase tracking-wider">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <div className="w-full mb-8">
                    <div className="relative">
                        <div className="w-full h-24 flex items-center justify-center text-5xl font-black tracking-[0.3em] rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all shadow-inner">
                            {pin.padEnd(6, '•').split('').map((char, i) => (
                                <span key={i} className={char === '•' ? 'text-slate-200 dark:text-slate-700' : 'text-primary'}>
                                    {char}
                                </span>
                            ))}
                        </div>
                        <div className="absolute inset-y-0 right-6 flex items-center">
                            <BadgeCheck size={24} className={pin.length === 6 ? 'text-emerald-500' : 'text-slate-300'} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full mb-10">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeypadClick(num)}
                            disabled={isLoading}
                            className="h-20 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-2xl font-black text-slate-800 dark:text-slate-200 active:scale-95 active:bg-slate-200 transition-all hover:border-primary/50 disabled:opacity-50"
                        >
                            {num}
                        </button>
                    ))}
                    <button onClick={handleBackspace} disabled={isLoading} className="h-20 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-400 active:scale-95 transition-all hover:text-red-500">
                        <Delete size={28} />
                    </button>
                    <button onClick={() => handleKeypadClick('0')} disabled={isLoading} className="h-20 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-2xl font-black text-slate-800 dark:text-slate-200 active:scale-95 active:bg-slate-200 transition-all hover:border-primary/50">
                        0
                    </button>
                    <button onClick={() => setPin('')} disabled={isLoading} className="h-20 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-400 active:scale-95 transition-all hover:text-slate-900">
                        <X size={28} />
                    </button>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={isLoading || pin.length < 6}
                    className="w-full h-20 bg-primary hover:brightness-110 text-white rounded-2xl text-xl font-black tracking-widest shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-4 active:scale-[0.98] uppercase disabled:opacity-50 disabled:grayscale"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={24} />
                    ) : (
                        <>
                            <span>Start Shift</span>
                            <LogIn size={24} strokeWidth={3} />
                        </>
                    )}
                </button>

                <div className="mt-10 flex items-center gap-8 text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-primary" />
                        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <Monitor size={14} />
                        <span>TEST PIN: 123456</span>
                    </div>
                </div>
            </div>

            <div className="fixed top-0 left-0 w-full h-2 bg-primary/20"></div>
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.05]">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#6a7d90 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
            </div>
        </div>
    );
}
