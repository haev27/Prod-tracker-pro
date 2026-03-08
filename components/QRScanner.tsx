'use client';

import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X } from 'lucide-react';

interface QRScannerProps {
    onScan: (decodedText: string) => void;
    onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        scannerRef.current = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 300, height: 300 },
                aspectRatio: 1.0
            },
      /* verbose= */ false
        );

        scannerRef.current.render(
            (decodedText) => {
                onScan(decodedText);
                scannerRef.current?.clear();
                onClose();
            },
            (error) => {
                // Handle scan errors silently or log them
            }
        );

        return () => {
            // Cleanup on unmount
            if (scannerRef.current) {
                scannerRef.current.clear().catch(e => console.error("Failed to clear scanner", e));
            }
        };
    }, [onScan, onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="relative w-full max-w-lg card-glass p-0 overflow-hidden border-industrial-accent">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[60] p-2 bg-white/10 rounded-full hover:bg-white/20"
                >
                    <X size={24} />
                </button>

                <div id="reader" className="w-full"></div>

                <div className="p-6 text-center">
                    <h3 className="text-xl font-bold uppercase mb-2">Escáner de Código QR</h3>
                    <p className="text-gray-400 text-sm">Escanea el código del material para registrar scrap o validar componentes.</p>
                </div>
            </div>
        </div>
    );
}
