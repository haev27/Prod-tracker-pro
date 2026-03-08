'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Clock,
    Monitor,
    Delete,
    X,
    LogIn,
    BadgeCheck
} from 'lucide-react';

export default function LoginPage() {
    const [pin, setPin] = useState('');
    const router = useRouter();

    const handleKeypadClick = (val: string) => {
        if (pin.length < 6) {
            setPin(prev => prev + val);
        }
    };

    const handleBackspace = () => {
        setPin(prev => prev.slice(0, -1));
    };

    const handleLogin = () => {
        if (pin === '123456') { // Mock logic
            router.push('/');
        } else {
            alert('PIN Incorrecto (Prueba con 123456)');
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center font-display antialiased p-6">
            {/* Login Card */}
            <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-full max-w-[540px] p-10 flex flex-col items-center border border-slate-200 dark:border-slate-800 transition-all">

                {/* Logo Section */}
                <div className="mb-8 text-center">
                    <img
                        alt="AirLife Logo"
                        className="h-10 w-auto brightness-0 dark:invert mx-auto"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgZeLXJHioccPwWGqUngQCu8YSkBZxdunFJ2h2W7La6yKNlNnCOUl2PzonKrcantSh56GtFI4-Re08gLIWzPc9fxwDAJeGNye9hTkfUqD2fdVaCTJDcC5iGj55cws7ppZ2JGRP5FPyUn37kEc2aVp_2LifKNzh_lw9K-RJxzQ7GtBrr3jYLEh-YF-K3ZTQnwoPj_6HnZh5KaZFMbZgUqjqBS3P5uHQA87Hd4pozxqwVzQmd8Bn_mzsU5N0XF2Q2I-xtjC_WO0GJGCI"
                    />
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mt-4 block">Production Terminal</span>
                </div>

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black tracking-tighter mb-2">Shift Entry</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Scan badge or enter PIN to begin</p>
                </div>

                {/* Input Field */}
                <div className="w-full mb-8">
                    <div className="relative">
                        <div className="w-full h-24 flex items-center justify-center text-5xl font-black tracking-[0.5em] rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white transition-all shadow-inner">
                            {pin.padEnd(6, '•').split('').map((char, i) => (
                                <span key={i} className={char === '•' ? 'text-slate-200 dark:text-slate-700' : 'text-primary'}>
                                    {char}
                                </span>
                            ))}
                        </div>
                        <div className="absolute inset-y-0 right-6 flex items-center">
                            <BadgeCheck size={24} className="text-slate-300" />
                        </div>
                    </div>
                </div>

                {/* Numeric Keypad */}
                <div className="grid grid-cols-3 gap-4 w-full mb-10">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleKeypadClick(num)}
                            className="h-20 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-2xl font-black text-slate-800 dark:text-slate-200 active:scale-95 active:bg-slate-200 transition-all hover:border-primary/50"
                        >
                            {num}
                        </button>
                    ))}
                    <button onClick={handleBackspace} className="h-20 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-400 active:scale-95 transition-all hover:text-red-500">
                        <Delete size={28} />
                    </button>
                    <button onClick={() => handleKeypadClick('0')} className="h-20 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-2xl font-black text-slate-800 dark:text-slate-200 active:scale-95 active:bg-slate-200 transition-all hover:border-primary/50">
                        0
                    </button>
                    <button onClick={() => setPin('')} className="h-20 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-400 active:scale-95 transition-all hover:text-slate-900">
                        <X size={28} />
                    </button>
                </div>

                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full h-20 bg-primary hover:brightness-110 text-white rounded-2xl text-xl font-black tracking-widest shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-4 active:scale-[0.98] uppercase"
                >
                    <span>Start Shift</span>
                    <LogIn size={24} strokeWidth={3} />
                </button>

                {/* Footer Info */}
                <div className="mt-10 flex items-center gap-8 text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-primary" />
                        <span>08:42 AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Monitor size={14} className="text-primary" />
                        <span>Terminal A-12</span>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-2 bg-primary/20"></div>
            <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.05]">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#6a7d90 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
            </div>
        </div>
    );
}
