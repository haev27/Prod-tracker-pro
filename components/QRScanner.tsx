'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera, Flashlight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface QRScannerProps {
    onScan: (decodedText: string, comment?: string) => void;
    onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [comment, setComment] = useState('');
    const [scanSuccess, setScanSuccess] = useState(false);
    const [lastScan, setLastScan] = useState<string | null>(null);

    useEffect(() => {
        scannerRef.current = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
                showTorchButtonIfSupported: true
            },
      /* verbose= */ false
        );

        scannerRef.current.render(
            (decodedText) => {
                setLastScan(decodedText);
                setScanSuccess(true);
                // We don't close immediately to allow adding comments
            },
            (error) => {
                // Handle scan errors silently
            }
        );

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(e => console.error("Failed to clear scanner", e));
            }
        };
    }, []);

    const handleConfirm = () => {
        if (lastScan) {
            onScan(lastScan, comment);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 font-display">
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]">

                {/* Header */}
                <header className="flex items-center justify-between px-8 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                            <Camera size={20} />
                        </div>
                        <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Report Scrap</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Viewfinder Section */}
                    <div className="relative">
                        <div className={`w-full aspect-square md:aspect-video max-h-[400px] rounded-2xl bg-black overflow-hidden border-4 transition-colors ${scanSuccess ? 'border-emerald-500' : 'border-slate-800'}`}>
                            <div id="reader" className="w-full h-full"></div>

                            {!scanSuccess && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-64 h-64 border-2 border-primary/40 rounded-3xl flex items-center justify-center">
                                        <div className="absolute inset-0 border-[32px] border-black/40"></div>
                                        {/* Corners */}
                                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
                                        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
                                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
                                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-xl"></div>
                                        <div className="w-full h-0.5 bg-primary/40 shadow-[0_0_15px_rgba(106,125,144,0.8)] animate-scan"></div>
                                    </div>
                                </div>
                            )}

                            {scanSuccess && (
                                <div className="absolute inset-0 bg-emerald-500/10 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                                    <div className="bg-emerald-500 text-white rounded-full p-4 shadow-xl">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <p className="mt-4 text-emerald-600 font-black uppercase tracking-widest text-sm">Code Detected</p>
                                    <p className="mt-1 text-slate-400 font-bold text-xs">{lastScan}</p>
                                </div>
                            )}
                        </div>

                        <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-6 py-2 text-[10px] font-black text-white uppercase tracking-widest backdrop-blur-md border border-white/10">
                            {scanSuccess ? 'Scan Complete' : 'Align QR code within frame'}
                        </div>
                    </div>

                    {/* Details Form */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                                Additional Details / Defect Type
                            </label>
                            <textarea
                                className="w-full rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary/50 outline-none transition-all resize-none min-h-[120px] font-bold"
                                placeholder="Enter defect category or batch number..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="h-14 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700">
                                <Flashlight size={16} />
                                Toggle Flash
                            </button>
                            <button className="h-14 rounded-xl bg-red-500/10 text-red-500 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all border border-red-500/20">
                                <AlertCircle size={16} />
                                Manual Input
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <footer className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 h-16 rounded-2xl bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-200 dark:border-slate-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!scanSuccess}
                        className={`flex-[2] h-16 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all ${scanSuccess ? 'bg-primary text-white shadow-primary/30 hover:brightness-110 active:scale-[0.98]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                    >
                        Submit Report
                    </button>
                </footer>
            </div>
        </div>
    );
}
