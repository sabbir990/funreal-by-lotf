'use client'

import { useState, use, Suspense } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  QrCode, 
  X, 
  Copy, 
  Check, 
  Heart,
  MessageSquare,
  Sparkles
} from 'lucide-react'
import { MEMORIAL_DATABASE, MemorialDetail } from '@/data/memorialsData'
import DigitalProgramFlipViewer from '@/components/DigitalProgramFlipViewer'

function DigitalProgramContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const memorialId = resolvedParams.id

  const memorial: MemorialDetail = 
    MEMORIAL_DATABASE[memorialId] || MEMORIAL_DATABASE['robert-james-miller']

  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{ width: '100%', background: '#faf8f4', minHeight: '100vh', paddingBottom: '70px' }}>
      
      {/* 1. TOP SIMPLIFIED HEADER (As requested: Photo, Name, Dates, Quote, and Scan & Share QR) */}
      <section style={{
        background: '#ffffff',
        borderBottom: '1px solid #ebd8b5',
        paddingTop: 'clamp(28px, 4vw, 42px)',
        paddingBottom: 'clamp(24px, 3.5vw, 36px)',
        textAlign: 'center'
      }}>
        <div className="site-container" style={{ maxWidth: '820px' }}>
          
          {/* Back Navigation Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            fontSize: '12px'
          }}>
            <Link 
              href="/memorials" 
              style={{
                color: '#1f6f68',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '.08em'
              }}
            >
              <ArrowLeft size={14} /> Back to Forever Remembered
            </Link>

            <Link
              href={`/memorials/${memorial.id}`}
              style={{
                color: '#8c6b2d',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Visit Full Legacy Tribute →
            </Link>
          </div>

          {/* Loved One Profile Portrait */}
          <div style={{
            width: 'clamp(96px, 12vw, 120px)',
            height: 'clamp(96px, 12vw, 120px)',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto 14px',
            border: '3px solid #c9963b',
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={memorial.cover_image_url} 
              alt={memorial.full_name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%'
              }}
            />
          </div>

          <p className="eb" style={{ fontSize: '11px', letterSpacing: '.14em', color: '#1f6f68', marginBottom: '6px' }}>
            In Loving Memory &amp; Celebration
          </p>

          <h1 className="s" style={{
            fontSize: 'clamp(30px, 3.8vw, 42px)',
            color: '#262626',
            marginBottom: '6px',
            fontWeight: 700
          }}>
            {memorial.full_name}
          </h1>

          <p style={{
            color: '#a87a22',
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(15px, 1.8vw, 17px)',
            margin: '4px 0 16px',
            fontWeight: 600
          }}>
            {memorial.lifespan}
          </p>

          {/* Quote Ribbon */}
          <div className="cr" style={{
            display: 'inline-block',
            padding: '12px 26px',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '14.5px',
            color: '#555',
            borderRadius: '4px',
            maxWidth: '640px',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            {memorial.quote}
          </div>

          {/* Scan & Share QR Action */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setQrModalOpen(true)}
              className="b"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12.5px',
                padding: '10px 22px',
                background: '#ffffff',
                border: '1px solid #1f6f68',
                color: '#1f6f68',
                fontWeight: 700
              }}
            >
              <QrCode size={16} /> Scan &amp; Share QR Code
            </button>
          </div>

        </div>
      </section>

      {/* 2. THE ACTUAL DIGITAL PROGRAM RIGHT ON THE PAGE (Interactive Flip / Page-Through Viewer) */}
      <section style={{
        paddingTop: '32px',
        paddingBottom: '48px',
        width: '100%'
      }}>
        <div className="site-container" style={{ maxWidth: '860px' }}>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <span style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#1f6f68',
              fontWeight: 700
            }}>
              Digital Keepsake Edition
            </span>
            <h2 className="s" style={{ fontSize: '24px', color: '#262626', margin: '4px 0 6px' }}>
              Commemorative Memorial Program
            </h2>
            <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
              Flip or tap the arrows below to browse each page of the sacred memorial program.
            </p>
          </div>

          {/* In-Page Flip Viewer */}
          <DigitalProgramFlipViewer 
            memorial={memorial} 
            inline={true} 
          />

          {/* Bottom Footnotes (Remove Brooklyn, NY as requested) */}
          <div style={{ textAlign: 'center', marginTop: '48px', borderTop: '1px solid #e8dfd2', paddingTop: '24px' }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: '#1f6f68',
              fontSize: '14px',
              marginBottom: '6px'
            }}>
              Preserved with care by Lilies of the Field Memorial Keepsakes
            </p>
            <p className="tx" style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              To order printed copies or create a commemorative digital program, contact our studio at (917) 300-1104 or orders@liliesofthefield.design
            </p>
          </div>

        </div>
      </section>

      {/* 3. Scan & Share QR Modal */}
      {qrModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 10000
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            maxWidth: '440px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
            textAlign: 'center'
          }}>
            <button 
              onClick={() => setQrModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <X size={20} />
            </button>

            <h3 className="s" style={{ fontSize: '22px', marginBottom: '6px', color: '#262626' }}>
              Digital Program QR Code
            </h3>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
              Scan with any mobile camera to immediately open and flip through {memorial.full_name}&apos;s digital memorial program.
            </p>

            <div style={{
              padding: '20px',
              border: '2px solid #e0d5c2',
              borderRadius: '8px',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              background: '#faf8f4',
              marginBottom: '20px'
            }}>
              <QrCode size={160} color="#1f6f68" />
              <span style={{ fontSize: '11px', letterSpacing: '.1em', color: '#1f6f68', fontWeight: 700, textTransform: 'uppercase' }}>
                LILIES OF THE FIELD DIGITAL PROGRAM
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={copyShareLink}
                className="b b1"
                style={{ fontSize: '12.5px', padding: '10px 18px', gap: '6px' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Link Copied!' : 'Copy Direct Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
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
          cursor: 'pointer'
        }}
      >
        <MessageSquare size={15} /> Message Our Team
      </a>

    </div>
  )
}

export default function DigitalProgramPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div style={{ padding: '80px 20px', textAlign: 'center', color: '#666' }}>
        Loading digital memorial program...
      </div>
    }>
      <DigitalProgramContent params={params} />
    </Suspense>
  )
}

