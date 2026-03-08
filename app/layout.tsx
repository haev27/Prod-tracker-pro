import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'ProdTracker Pro',
    description: 'Sistema de Inteligencia Operacional Industrial',
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
