'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Phone, Mail, MapPin, Sparkles, HeartHandshake } from 'lucide-react'

interface ComingSoonProps {
  badge?: string
  title: string
  subtitle?: string
  description: string
  backHref?: string
  backLabel?: string
  primaryAction?: {
    href: string
    label: string
  }
}

export default function ComingSoon({
  badge = 'Coming Soon · In Development',
  title,
  subtitle,
  description,
  backHref = '/',
  backLabel = 'Back to Home',
  primaryAction = {
    href: '/memorials',
    label: 'Explore Forever Remembered'
  }
}: ComingSoonProps) {
  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 280px)',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '64px',
      paddingBottom: '80px'
    }}>
      <div className="site-container" style={{ width: '100%' }}>
        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {/* Back link */}
          <div style={{ marginBottom: '24px' }}>
            <Link 
              href={backHref}
              style={{
                fontSize: '11.5px',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#1f6f68',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={13} /> {backLabel}
            </Link>
          </div>

          {/* Icon Badge */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#faf8f4',
            border: '2px solid #c9963b',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1f6f68',
            marginBottom: '20px',
            boxShadow: '0 6px 18px rgba(201,150,59,0.18)'
          }}>
            <Clock size={28} color="#1f6f68" />
          </div>

          {/* Eyebrow */}
          <p className="eb" style={{ fontSize: '12px', letterSpacing: '.14em', color: '#a87a22', marginBottom: '8px' }}>
            {badge}
          </p>

          {/* Headline */}
          <h1 className="s" style={{
            fontSize: 'clamp(32px, 4.2vw, 46px)',
            color: '#262626',
            lineHeight: 1.2,
            marginBottom: '14px',
            fontWeight: 400
          }}>
            {title}
          </h1>

          {subtitle && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '17px',
              color: '#1f6f68',
              marginBottom: '16px'
            }}>
              {subtitle}
            </p>
          )}

          {/* Description */}
          <p style={{
            fontSize: '15.5px',
            lineHeight: 1.7,
            color: '#555',
            marginBottom: '36px',
            maxWidth: '620px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {description}
          </p>

          {/* Immediate Assistance Box */}
          <div style={{
            background: '#faf8f4',
            border: '1px solid #e0d5c2',
            borderRadius: '6px',
            padding: '24px 28px',
            marginBottom: '36px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <HeartHandshake size={18} color="#1f6f68" />
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: '#1f6f68'
              }}>
                Need Immediate Assistance or Orders?
              </span>
            </div>
            <p style={{ fontSize: '13.5px', color: '#444', lineHeight: 1.6, margin: '0 0 16px' }}>
              Our Brooklyn design studio is actively taking orders, reviewing photo keepsakes, and answering inquiries directly.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '12px',
              fontSize: '13px',
              color: '#262626'
            }}>
              <a 
                href="tel:9173001104" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#262626',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <Phone size={14} color="#1f6f68" /> (917) 300-1104
              </a>
              <a 
                href="mailto:orders@liliesofthefield.design"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#262626',
                  textDecoration: 'none'
                }}
              >
                <Mail size={14} color="#1f6f68" /> orders@liliesofthefield.design
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                <MapPin size={14} color="#1f6f68" /> Brooklyn, NY · Studio By Appt.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link 
              href={primaryAction.href}
              className="b b1"
              style={{ fontSize: '12px', padding: '12px 24px' }}
            >
              {primaryAction.label}
            </Link>
            <Link 
              href="/resources"
              className="b"
              style={{ fontSize: '12px', padding: '12px 24px' }}
            >
              Memorial Planning Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
