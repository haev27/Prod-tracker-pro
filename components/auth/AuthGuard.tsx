'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { db } from '@/lib/db';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            // Unprotected routes
            if (pathname === '/login') {
                setIsChecking(false);
                return;
            }

            try {
                const activeSession = await db.sessions.where('is_active').equals(1).first();
                if (!activeSession) {
                    router.push('/login');
                } else {
                    setIsChecking(false);
                }
            } catch (error) {
                console.error("Auth check failed", error);
                router.push('/login');
            }
        };

        checkAuth();
    }, [pathname, router]);

    if (isChecking && pathname !== '/login') {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="text-primary animate-spin" size={48} />
                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Validando Terminal...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
