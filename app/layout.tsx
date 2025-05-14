import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MenuProvider } from './context/MenuContext'
import { PerformanceMonitor } from './components/PerformanceMonitor'
import { LegalCompliance } from './components/LegalCompliance'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Analytics } from './components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reagan Matthew',
  description: 'Portfolio website of Reagan Matthew',
  keywords: ['filmmaker', 'photographer', 'storyteller', 'portfolio', 'creative'],
  authors: [{ name: 'Reagan Petrehn' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Reagan Petrehn',
    description: 'Portfolio website of Reagan Petrehn - Filmmaker, Photographer, and Storyteller',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reagan Petrehn',
    description: 'Portfolio website of Reagan Petrehn - Filmmaker, Photographer, and Storyteller',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <MenuProvider>
            <main className="min-h-screen bg-white dark:bg-gray-900">
              {children}
            </main>
          </MenuProvider>
          <PerformanceMonitor />
          <LegalCompliance />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  )
} 