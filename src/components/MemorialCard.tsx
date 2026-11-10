'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Flame, Calendar, MapPin, Heart, Share2 } from 'lucide-react'

export interface MemorialProps {
  id: string
  full_name: string
  date_of_birth: string
  date_of_passing: string
  biography: string | null
  cover_image_url: string | null
  service_venue: string | null
  service_date: string | null
  tributesCount?: number
  candlesLit?: number
}

export default function MemorialCard({ memorial }: { memorial: MemorialProps }) {
  const [candles, setCandles] = useState(memorial.candlesLit || 12)
  const [hasLit, setHasLit] = useState(false)

  const handleLightCandle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!hasLit) {
      setCandles(prev => prev + 1)
      setHasLit(true)
    }
  }

  const formatYear = (dateStr: string) => {
    try {
      return new Date(dateStr).getFullYear()
    } catch {
      return dateStr
    }
  }

  return (
    <div className="glass-panel" style={{
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Cover / Portrait image */}
      <div style={{
        height: '220px',
        width: '100%',
        position: 'relative',
        backgroundColor: '#161d2b',
        overflow: 'hidden'
      }}>
        {memorial.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={memorial.cover_image_url} 
            alt={memorial.full_name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(25%) contrast(105%)',
              transition: 'transform 0.5s ease',
            }}
          />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--text-muted)'
          }}>
            Portrait in Remembrance
          </div>
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(11, 15, 23, 0.95) 0%, rgba(11, 15, 23, 0.2) 60%, transparent 100%)'
        }} />

        {/* Lifespan badge */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <div>
            <span className="badge-gold">
              {formatYear(memorial.date_of_birth)} – {formatYear(memorial.date_of_passing)}
            </span>
          </div>
          
          <button
            onClick={handleLightCandle}
            title={hasLit ? 'Candle Lit' : 'Light a Memorial Candle'}
            style={{
              background: hasLit ? 'rgba(245, 158, 11, 0.25)' : 'rgba(15, 20, 30, 0.8)',
              border: `1px solid ${hasLit ? 'rgba(245, 158, 11, 0.6)' : 'var(--border-subtle)'}`,
              color: hasLit ? '#fde047' : 'var(--text-secondary)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-sans)',
              backdropFilter: 'blur(8px)',
              transition: 'var(--transition)'
            }}
          >
            <Flame size={14} className={hasLit ? 'candle-flame' : ''} color={hasLit ? '#f59e0b' : 'currentColor'} />
            <span>{candles} Lit</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          lineHeight: 1.25
        }}>
          {memorial.full_name}
        </h3>

        {memorial.biography && (
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.25rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {memorial.biography}
          </p>
        )}

        <div style={{
          marginTop: 'auto',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem'
        }}>
          {memorial.service_venue && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={14} color="var(--accent-gold)" />
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {memorial.service_venue}
              </span>
            </div>
          )}
          {memorial.service_date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={14} color="var(--accent-gold)" />
              <span>Service: {new Date(memorial.service_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
          <Link 
            href={`/memorials`}
            className="btn btn-outline"
            style={{ flex: 1, padding: '0.5rem 0.8rem', fontSize: '0.82rem' }}
          >
            <Heart size={14} /> Send Tribute
          </Link>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `In Memory of ${memorial.full_name}`,
                  url: window.location.href,
                }).catch(() => {})
              } else {
                navigator.clipboard.writeText(window.location.href)
                alert('Memorial link copied to clipboard')
              }
            }}
            className="btn btn-outline" 
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.82rem' }}
            title="Share Memorial"
          >
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
