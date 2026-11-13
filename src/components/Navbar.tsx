'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Flower2, ShieldCheck, Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header style={{ width: '100%', background: '#ffffff', borderBottom: '1px solid #eee' }}>
      {/* 1. Top Announcement & Utility Bar (Full-Width Edge-to-Edge) */}
      <div style={{
        background: '#f5efe6',
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div className="site-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: '#444',
          paddingTop: '8px',
          paddingBottom: '8px',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px 12px', flexWrap: 'wrap', fontSize: 'clamp(11px, 1.5vw, 12px)' }}>
            <span>Monday–Friday, 10:00am – 6:00pm</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <a href="tel:9173001104" style={{ color: '#444', fontWeight: 600 }}>
              (917) 300-1104
            </a>
            <span style={{ opacity: 0.5 }}>·</span>
            <a href="mailto:orders@liliesofthefield.design" style={{ color: '#444' }}>
              orders@liliesofthefield.design
            </a>
          </div>

          <div>
            <Link 
              href="/login" 
              style={{
                fontWeight: 700,
                color: '#1f6f68',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: 'clamp(11px, 1.5vw, 12px)'
              }}
            >
              <ShieldCheck size={14} /> Provider Login
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="site-container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '74px',
          gap: '16px'
        }}>
          {/* Brand Logo */}
          <Link 
            href="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              flexShrink: 0
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="Lilies of the Field" 
              style={{
                height: 'clamp(36px, 5vw, 48px)',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </Link>

          {/* Desktop Navigation Links (Single-Line, No-Wrap) */}
          <nav 
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(14px, 1.8vw, 26px)',
              flexShrink: 1
            }}
          >
            <Link 
              href="/" 
              style={{
                color: pathname === '/' ? '#1f6f68' : '#262626',
                borderBottom: pathname === '/' ? '2px solid #1f6f68' : 'none',
                paddingBottom: '4px',
                fontSize: '14px',
                fontWeight: pathname === '/' ? 600 : 500,
                whiteSpace: 'nowrap'
              }}
            >
              Home
            </Link>

            {/* Collection Dropdown - Design Gallery is a subpage under Our Collection */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setCollectionOpen(true)}
              onMouseLeave={() => setCollectionOpen(false)}
            >
              <button style={{
                background: 'none',
                border: 'none',
                color: (pathname?.startsWith('/services') || pathname?.startsWith('/gallery')) ? '#1f6f68' : '#262626',
                borderBottom: (pathname?.startsWith('/services') || pathname?.startsWith('/gallery')) ? '2px solid #1f6f68' : 'none',
                fontSize: '14px',
                fontWeight: (pathname?.startsWith('/services') || pathname?.startsWith('/gallery')) ? 600 : 500,
                fontFamily: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 0',
                whiteSpace: 'nowrap'
              }}>
                Our Collection <ChevronDown size={14} />
              </button>
              {collectionOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: '#ffffff',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  padding: '8px 0',
                  minWidth: '220px',
                  zIndex: 100
                }}>
                  <Link href="/gallery" style={{ display: 'block', padding: '8px 18px', color: pathname?.startsWith('/gallery') ? '#1f6f68' : '#333', fontWeight: pathname?.startsWith('/gallery') ? 700 : 500, fontSize: '13px', whiteSpace: 'nowrap', background: pathname?.startsWith('/gallery') ? '#f5efe6' : 'transparent' }}>
                    ✦ Design Gallery
                  </Link>
                  <Link href="/services#programs" style={{ display: 'block', padding: '8px 18px', color: '#333', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    Memorial Programs
                  </Link>
                  <Link 
                    href="/services/prayer-cards" 
                    style={{ 
                      display: 'block', 
                      padding: '8px 18px', 
                      color: (pathname === '/services/prayer-cards' || pathname === '/prayer-cards-keepsakes') ? '#1f6f68' : '#333', 
                      fontWeight: (pathname === '/services/prayer-cards' || pathname === '/prayer-cards-keepsakes') ? 700 : 400,
                      fontSize: '13px', 
                      whiteSpace: 'nowrap',
                      background: (pathname === '/services/prayer-cards' || pathname === '/prayer-cards-keepsakes') ? '#f5efe6' : 'transparent'
                    }}
                  >
                    Prayer Cards &amp; Keepsakes
                  </Link>
                  <Link href="/services#digital" style={{ display: 'block', padding: '8px 18px', color: '#333', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    Digital Memorials &amp; QR
                  </Link>
                  <Link href="/services#displays" style={{ display: 'block', padding: '8px 18px', color: '#333', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    Photo &amp; Tribute Products
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/memorials" 
              style={{
                color: pathname?.startsWith('/memorials') ? '#1f6f68' : '#262626',
                borderBottom: pathname?.startsWith('/memorials') ? '2px solid #1f6f68' : 'none',
                paddingBottom: '4px',
                fontSize: '14px',
                fontWeight: pathname?.startsWith('/memorials') ? 600 : 500,
                whiteSpace: 'nowrap'
              }}
            >
              Forever Remembered
            </Link>

            {/* Resources Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button style={{
                background: 'none',
                border: 'none',
                color: pathname?.startsWith('/resources') ? '#1f6f68' : '#262626',
                borderBottom: pathname?.startsWith('/resources') ? '2px solid #1f6f68' : 'none',
                fontSize: '14px',
                fontWeight: pathname?.startsWith('/resources') ? 600 : 500,
                fontFamily: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 0',
                whiteSpace: 'nowrap'
              }}>
                Resources <ChevronDown size={14} />
              </button>
              {resourcesOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: '#ffffff',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  padding: '8px 0',
                  minWidth: '220px',
                  zIndex: 100
                }}>
                  <Link href="/resources" style={{ display: 'block', padding: '8px 18px', color: '#333', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    Memorial Planning Guides
                  </Link>
                  <Link href="/resources#consultation" style={{ display: 'block', padding: '8px 18px', color: '#333', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    Virtual Consultation
                  </Link>
                  <Link href="/resources" style={{ display: 'block', padding: '8px 18px', color: '#333', fontSize: '13px', whiteSpace: 'nowrap' }}>
                    Frequently Asked Questions
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/funeral-service-providers" 
              style={{
                color: (pathname === '/funeral-service-providers' || pathname === '/providers') ? '#1f6f68' : '#262626',
                borderBottom: (pathname === '/funeral-service-providers' || pathname === '/providers') ? '2px solid #1f6f68' : 'none',
                paddingBottom: '4px',
                fontSize: '14px',
                fontWeight: (pathname === '/funeral-service-providers' || pathname === '/providers') ? 600 : 500,
                whiteSpace: 'nowrap'
              }}
            >
              Funeral Service Providers
            </Link>

            <Link 
              href="/services#contact" 
              style={{
                color: '#262626',
                fontSize: '14px',
                fontWeight: 500,
                whiteSpace: 'nowrap'
              }}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <Link 
              href="/order" 
              className="b bg" 
              style={{
                padding: 'clamp(8px, 1.5vw, 11px) clamp(12px, 2vw, 22px)',
                fontSize: 'clamp(11.5px, 1.2vw, 13px)',
                fontWeight: 700,
                letterSpacing: '.06em',
                borderRadius: '4px',
                boxShadow: '0 3px 10px rgba(201,150,59,.35)',
                whiteSpace: 'nowrap'
              }}
            >
              Place an Order
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#262626',
                padding: '6px'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div style={{
            padding: '18px 0 24px',
            borderTop: '1px solid #eee',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '6px 0', fontSize: '15px', fontWeight: 600, color: pathname === '/' ? '#1f6f68' : '#262626' }}
            >
              Home
            </Link>
            
            <div style={{ paddingTop: '4px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1f6f68', marginBottom: '6px' }}>
                Our Collection
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px' }}>
                <Link 
                  href="/gallery" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: '14.5px', fontWeight: pathname?.startsWith('/gallery') ? 700 : 600, color: pathname?.startsWith('/gallery') ? '#1f6f68' : '#262626' }}
                >
                  ✦ Design Gallery
                </Link>
                <Link 
                  href="/services#programs" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: '14px', color: '#555' }}
                >
                  ↳ Memorial Programs
                </Link>
                <Link 
                  href="/services/prayer-cards" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: '14px', color: pathname?.includes('prayer-cards') ? '#1f6f68' : '#555', fontWeight: pathname?.includes('prayer-cards') ? 600 : 400 }}
                >
                  ↳ Prayer Cards &amp; Keepsakes
                </Link>
                <Link 
                  href="/services#digital" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: '14px', color: '#555' }}
                >
                  ↳ Digital Memorials &amp; QR
                </Link>
                <Link 
                  href="/services#displays" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ fontSize: '14px', color: '#555' }}
                >
                  ↳ Photo &amp; Tribute Products
                </Link>
              </div>
            </div>

            <Link 
              href="/order" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '6px 0', fontSize: '15px', fontWeight: 700, color: '#c9963b' }}
            >
              Place an Order
            </Link>
            <Link 
              href="/memorials" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '6px 0', fontSize: '15px', color: '#262626' }}
            >
              Forever Remembered
            </Link>
            <Link 
              href="/resources" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '6px 0', fontSize: '15px', color: '#262626' }}
            >
              Memorial Planning Guides
            </Link>
            <Link 
              href="/funeral-service-providers" 
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '6px 0',
                fontSize: '15px',
                color: (pathname === '/funeral-service-providers' || pathname === '/providers') ? '#1f6f68' : '#262626',
                fontWeight: (pathname === '/funeral-service-providers' || pathname === '/providers') ? 600 : 400
              }}
            >
              Funeral Service Providers
            </Link>
            <Link 
              href="/services#contact" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: '6px 0', fontSize: '15px', color: '#262626' }}
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 1080px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  )
}
