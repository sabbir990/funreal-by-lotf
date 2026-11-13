'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2026')

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="cr ft" style={{ width: '100%', borderTop: '1px solid var(--border-cream)', paddingTop: '56px', paddingBottom: '28px' }}>
      <div className="site-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: 'clamp(24px, 3.5vw, 36px)'
        }}>
          {/* Brand & Contact */}
          <div style={{ gridColumn: 'span 1' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="Lilies of the Field" 
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                marginBottom: '12px'
              }}
            />
            <p className="tx" style={{ margin: '12px 0 16px', lineHeight: 1.6, color: '#555' }}>
              Every Life Deserves to Be Celebrated. Premium memorial programs, prayer cards, photo keepsakes and tribute pieces thoughtfully created to honor every life and every story.
            </p>
            <p className="tx" style={{ color: '#262626', lineHeight: 1.6 }}>
              <a href="tel:9173001104" style={{ color: '#262626', textDecoration: 'none', fontWeight: 600 }}>(917) 300-1104</a><br />
              orders@liliesofthefield.design<br />
              Monday–Friday · 10am–6pm
            </p>
            <p className="tx" style={{ fontStyle: 'italic', marginTop: '10px', color: '#1f6f68', fontWeight: 600 }}>
              Design Studio By Appointment Only
            </p>
          </div>

          {/* Collection */}
          <div>
            <p className="fh">Our Collection</p>
            <Link href="/gallery" style={{ fontWeight: 600, color: '#1f6f68' }}>Design Gallery &amp; Collections</Link>
            <Link href="/services#programs">Memorial Programs</Link>
            <Link href="/services/prayer-cards">Prayer Cards &amp; Keepsakes</Link>
            <Link href="/services#digital">Digital Memorials</Link>
            <Link href="/services#displays">Posters &amp; Large Format</Link>
          </div>

          {/* Helpful Links */}
          <div>
            <p className="fh">Helpful Links</p>
            <Link href="/services#about">About Lilies of the Field</Link>
            <Link href="/memorials">Forever Remembered</Link>
            <Link href="/resources">Resources Hub</Link>
            <Link href="/resources">FAQs</Link>
          </div>

          {/* Professionals */}
          <div>
            <p className="fh">Professionals</p>
            <Link href="/funeral-service-providers">Funeral Service Providers</Link>
            <Link href="/login">Provider Login</Link>
            <Link href="/funeral-service-providers#register">Submit an Order</Link>
          </div>

          {/* Connect */}
          <div>
            <p className="fh">Connect</p>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #e0d5c2',
          marginTop: '36px',
          paddingTop: '18px',
          fontSize: '12px',
          color: '#555',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>© {currentYear} Lilies of the Field Memorial Keepsakes. All rights reserved.</div>
          <div style={{ color: '#888' }}>Brooklyn, NY · Dedicated Memorial Craftsmanship</div>
        </div>
      </div>
    </footer>
  )
}
