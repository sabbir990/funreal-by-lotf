import { Suspense } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Lilies of the Field — Memorial Keepsakes | Brooklyn, NY',
  description: 'Every Life Deserves to Be Celebrated. Premium memorial programs, prayer cards, photo keepsakes and tribute pieces thoughtfully created to honor every life and every story.',
  keywords: ['Lilies of the Field', 'memorial programs', 'prayer cards', 'funeral keepsakes', 'digital memorials', 'funeral print Brooklyn'],
  openGraph: {
    title: 'Lilies of the Field — Memorial Keepsakes',
    description: 'Bespoke Memorial Design & Fine Printing · Brooklyn, NY',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap" />
      </head>
      <body suppressHydrationWarning>
        <Suspense fallback={<div style={{ height: '115px', background: '#fff' }} />}>
          <Navbar />
        </Suspense>
        <main style={{ width: '100%' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
