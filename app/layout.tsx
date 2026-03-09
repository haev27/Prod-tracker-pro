import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'ProdTracker Pro',
    description: 'Sistema de Inteligencia Operacional Industrial',
    manifest: '/manifest.json',
    themeColor: '#17191b',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
}

import AuthGuard from '@/components/auth/AuthGuard'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <AuthGuard>
                    {children}
                </AuthGuard>
            </body>
        </html>
    )
}
