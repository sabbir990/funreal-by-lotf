'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MessageSquare, ArrowRight, BookOpen, Heart, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ForeverMemorial {
  id: string
  full_name: string
  date_of_birth: string
  date_of_passing: string
  years_span: string
  quote: string
  button_label: string
  cover_image_url: string
  image_position?: string
  is_public?: boolean
}

const DEFAULT_MEMORIALS: ForeverMemorial[] = [
  {
    id: 'eleanor-grace-dawson',
    full_name: 'Eleanor Grace Dawson',
    date_of_birth: '1948-04-12',
    date_of_passing: '2024-02-18',
    years_span: '1948 — 2024',
    quote: '“Her kindness was a quiet river, nourishing every heart she touched throughout her vibrant seventy-five years.”',
    button_label: 'Visit Legacy Tribute',
    cover_image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=800&h=650&q=80',
    image_position: 'center 20%'
  },
  {
    id: 'robert-james-miller',
    full_name: 'Robert James Miller',
    date_of_birth: '1935-08-20',
    date_of_passing: '2023-11-04',
    years_span: '1935 — 2023',
    quote: '“A man of steadfast honor, quiet strength, and everlasting devotion to his family.”',
    button_label: 'View Memorial Program',
    cover_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&w=800&h=650&q=80',
    image_position: 'center 20%'
  },
  {
    id: 'elizabeth-mae-reed',
    full_name: 'Elizabeth Mae Reed',
    date_of_birth: '1951-06-15',
    date_of_passing: '2023-09-22',
    years_span: '1951 — 2023',
    quote: '“A life lived with gentle grace and deep, unconditional love for all.”',
    button_label: 'Visit Legacy Tribute',
    cover_image_url: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&crop=faces&w=800&h=650&q=80',
    image_position: 'center center'
  }
]

export default function ForeverRememberedPage() {
  const [memorials, setMemorials] = useState<ForeverMemorial[]>(DEFAULT_MEMORIALS)
  const [searchQuery, setSearchQuery] = useState('')

  // Optional: load additional public memorials from Supabase if real project is configured
  useEffect(() => {
    async function loadSupabaseMemorials() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      const isConfigured = 
        supabaseUrl.startsWith('https://') &&
        !supabaseUrl.includes('placeholder-project') &&
        !supabaseUrl.includes('your-project-id') &&
        Boolean(supabaseAnonKey) &&
        !supabaseAnonKey.includes('placeholder')

      // Do not attempt network request if using placeholder/unconfigured environment
      if (!isConfigured) {
        return
      }

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('memorials')
          .select('*')
          .eq('is_public', true)
          .order('date_of_passing', { ascending: false })

        if (!error && data && data.length > 0) {
          const formatted: ForeverMemorial[] = data.map((item) => ({
            id: item.id,
            full_name: item.full_name,
            date_of_birth: item.date_of_birth,
            date_of_passing: item.date_of_passing,
            years_span: `${new Date(item.date_of_birth).getFullYear()} — ${new Date(item.date_of_passing).getFullYear()}`,
            quote: item.biography || '“Forever cherished in our hearts and enduring memories.”',
            button_label: 'Visit Legacy Tribute',
            cover_image_url: item.cover_image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=800&h=650&q=80',
            image_position: 'center 20%'
          }))
          // Merge with defaults while avoiding duplicates
          setMemorials(prev => {
            const ids = new Set(formatted.map(f => f.id))
            return [...formatted, ...prev.filter(d => !ids.has(d.id))]
          })
        }
      } catch {
        // Silently fallback to default memorials on network failure
      }
    }

    loadSupabaseMemorials()
  }, [])

  const filteredMemorials = memorials.filter(m => 
    m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.quote.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ width: '100%', background: '#ffffff', minHeight: 'calc(100vh - 200px)' }}>
      {/* 1. Header Section */}
      <section style={{
        textAlign: 'center',
        paddingTop: 'clamp(48px, 6vw, 64px)',
        paddingBottom: '36px',
        width: '100%'
      }}>
        <div className="site-container">
          <p className="eb">Virtual Remembrance</p>

          <h1 className="s" style={{
            fontSize: 'clamp(36px, 4.5vw, 52px)',
            lineHeight: 1.15,
            color: '#262626',
            marginBottom: '16px'
          }}>
            Remembering Lives.<br />Preserving Legacies.
          </h1>

          <p style={{
            maxWidth: '680px',
            margin: '0 auto 28px',
            fontSize: '17px',
            lineHeight: 1.65,
            color: '#555'
          }}>
            Welcome to Forever Remembered by Lilies of the Field. Here we celebrate lives richly lived, offering a quiet digital sanctuary where family and friends can revisit programs, read life stories, and leave heartfelt remembrances.
          </p>

          {/* Search Box */}
          <div style={{
            maxWidth: '480px',
            margin: '0 auto',
            border: '1px solid #cfcfcf',
            background: '#faf8f4',
            borderRadius: '4px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <Search size={18} color="#888" style={{ flexShrink: 0 }} />
            <input 
              type="text"
              placeholder="Find a memorial by loved one’s name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: '#262626'
              }}
            />
          </div>

          <p className="tx" style={{ fontSize: '12px', marginTop: '12px', color: '#777' }}>
            Showing {filteredMemorials.length} of {memorials.length} public memorials
          </p>
        </div>
      </section>

      {/* 2. Memorials 3-Grid */}
      <section style={{ paddingBottom: '48px', width: '100%' }}>
        <div className="site-container">
          {filteredMemorials.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              background: '#faf8f4'
            }}>
              <p className="s" style={{ fontSize: '20px', color: '#444', marginBottom: '10px' }}>
                No memorials found matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="b"
                style={{ padding: '8px 18px', fontSize: '12px' }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="g3">
              {filteredMemorials.map((memorial) => (
                <div key={memorial.id} className="cd" style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Photo Container with Face-Safe Height & Centering */}
                  <div className="im" style={{ height: '280px', overflow: 'hidden', background: '#f0ede8' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={memorial.cover_image_url} 
                      alt={memorial.full_name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: memorial.image_position || 'center 20%'
                      }}
                    />
                  </div>

                  <div className="cb" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 className="ct" style={{ fontSize: '22px', marginBottom: '4px' }}>
                      {memorial.full_name}
                    </h3>
                    <p className="tx" style={{ color: '#a87a22', fontWeight: 600, fontSize: '14px' }}>
                      {memorial.years_span}
                    </p>
                    <p className="tx" style={{
                      fontStyle: 'italic',
                      margin: '10px 0 18px',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: '#555',
                      flex: 1
                    }}>
                      {memorial.quote}
                    </p>
                    <Link 
                      href={`/memorials/${memorial.id}`} 
                      className="b" 
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        width: '100%',
                        marginTop: 'auto',
                        padding: '13px'
                      }}
                    >
                      {memorial.button_label}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Privacy Information Box (Full-Width Site-Container) */}
      <section style={{ paddingBottom: '64px', width: '100%' }}>
        <div className="site-container">
          <div className="cr" style={{
            width: '100%',
            border: '1px solid #e0d5c2',
            borderRadius: '6px',
            padding: 'clamp(20px, 3vw, 32px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{ marginBottom: '18px' }}>
              <h2 className="s" style={{ fontSize: '20px', marginBottom: '4px', color: '#262626' }}>
                Forever Remembered Privacy Information
              </h2>
              <p className="tx" style={{ fontSize: '14px', color: '#555' }}>
                Honoring family wishes and privacy is paramount.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '18px'
            }}>
              {/* Public Memorials */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e3dacd',
                borderRadius: '4px',
                padding: '18px 20px'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1f6f68',
                  marginBottom: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>●</span> Public Memorials
                </div>
                <p className="tx" style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#444' }}>
                  Featured with express family permission and open to browse, read tributes, and leave memories.
                </p>
              </div>

              {/* Private Memorials */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e3dacd',
                borderRadius: '4px',
                padding: '18px 20px'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#a87a22',
                  marginBottom: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>🔒</span> Private (Unlisted) Memorials
                </div>
                <p className="tx" style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#444' }}>
                  Hidden from this directory and public search; only those with the private link or printed QR card can access them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pinned Bottom-Right "Message Our Team" Floating Action Button */}
      <a 
        href="mailto:orders@liliesofthefield.design" 
        style={{
          position: 'fixed',
          bottom: 'clamp(14px, 2vw, 24px)',
          right: 'clamp(14px, 2.5vw, 24px)',
          zIndex: 9999,
          background: '#1f6f68',
          color: '#ffffff',
          padding: 'clamp(10px, 1.5vw, 13px) clamp(16px, 2vw, 22px)',
          borderRadius: '50px',
          fontSize: 'clamp(11px, 1.2vw, 12.5px)',
          fontWeight: 700,
          letterSpacing: '.08em',
          textDecoration: 'none',
          textTransform: 'uppercase',
          boxShadow: '0 8px 24px rgba(31, 111, 104, 0.45)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(31, 111, 104, 0.55)'
          e.currentTarget.style.background = '#14504b'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(31, 111, 104, 0.45)'
          e.currentTarget.style.background = '#1f6f68'
        }}
      >
        <MessageSquare size={17} /> Message Our Team
      </a>
    </div>
  )
}
