'use client'

import { useState, use, Suspense } from 'react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Sparkles, 
  Share2, 
  Check, 
  Copy, 
  Printer, 
  Clock, 
  Layers, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  Info 
} from 'lucide-react'
import { 
  getDesignById, 
  getDesignsByCollection, 
  GALLERY_DESIGNS,
  GalleryDesign 
} from '@/data/galleryData'
import { CoverFlatView, InsideSpreadView } from '@/components/DesignPreviewFrame'
import OrderInquiryModal from '@/components/OrderInquiryModal'

function DesignDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const design = getDesignById(resolvedParams.id)

  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<string>(
    design?.availableFormats?.[0] || '4-page'
  )

  if (!design) {
    notFound()
  }

  // Related designs in this collection
  const relatedDesigns = getDesignsByCollection(design.collectionId)
    .filter(d => d.id !== design.id)
    .slice(0, 3)

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div style={{ width: '100%', background: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* 1. Breadcrumb & Back Navigation Bar */}
      <div style={{
        background: '#faf8f4',
        borderBottom: '1px solid #e8dfd2',
        padding: '14px 0'
      }}>
        <div className="site-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12.5px',
          color: '#666',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Link 
              href="/gallery" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#1f6f68',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={14} /> Back to Gallery
            </Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/gallery" style={{ color: '#666' }}>Collections</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: '#1f6f68', fontWeight: 600 }}>{design.collectionName}</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: '#262626', fontWeight: 700 }}>{design.title} (#{design.designNumber})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleShare}
              style={{
                background: 'transparent',
                border: '1px solid #dcd3c4',
                borderRadius: '4px',
                padding: '5px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                color: '#444',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {copied ? <Check size={13} color="#1f6f68" /> : <Share2 size={13} />}
              {copied ? 'Link Copied' : 'Share Design'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Page 2 — Inside a Design Main Presentation */}
      <div className="site-container" style={{ paddingTop: '36px' }}>
        {/* Visual Presentation (Cover Flat beside Inside Open Spread) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          gap: 'clamp(24px, 4vw, 44px)',
          alignItems: 'start',
          marginBottom: '40px'
        }}>
          {/* Left Column: Cover - Flat View */}
          <div style={{
            background: '#faf8f4',
            padding: '24px 20px',
            borderRadius: '6px',
            border: '1px solid #e8dfd2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <CoverFlatView design={design} showLabel={true} />
          </div>

          {/* Right Column: Inside - Open Spread */}
          <div style={{
            background: '#faf8f4',
            padding: '24px 24px 20px',
            borderRadius: '6px',
            border: '1px solid #e8dfd2',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <InsideSpreadView design={design} showLabel={true} />
          </div>
        </div>

        {/* 3. Design Information & Ordering Controls (Matching Mockup Specs) */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e0d5c2',
          borderRadius: '8px',
          padding: 'clamp(28px, 4vw, 44px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '36px'
        }}>
          {/* Details & Specs */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#1f6f68',
              marginBottom: '8px'
            }}>
              <ShieldCheck size={14} /> Lilies of the Field Original Design
            </div>

            <h1 className="s" style={{
              fontSize: 'clamp(30px, 3.8vw, 42px)',
              color: '#262626',
              margin: '0 0 6px',
              lineHeight: 1.2
            }}>
              {design.title}
            </h1>

            <div style={{
              fontSize: '14.5px',
              color: '#666',
              fontWeight: 500,
              marginBottom: '18px'
            }}>
              <strong style={{ color: '#1f6f68' }}>Design No. {design.designNumber}</strong> &nbsp;•&nbsp; {design.collectionName}
            </div>

            <p style={{
              fontSize: '14.5px',
              color: '#444',
              lineHeight: 1.65,
              marginBottom: '24px'
            }}>
              {design.description}
            </p>

            {/* Available Formats list */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#262626',
                marginBottom: '8px'
              }}>
                AVAILABLE FORMATS
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px 12px',
                flexWrap: 'wrap',
                fontSize: '13.5px',
                color: '#333'
              }}>
                {design.availableFormats.map((fmt, i) => (
                  <span key={fmt} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span 
                      onClick={() => setSelectedFormat(fmt)}
                      style={{
                        padding: '5px 12px',
                        background: selectedFormat === fmt ? '#dfe9e5' : '#f5efe6',
                        color: selectedFormat === fmt ? '#1f6f68' : '#444',
                        fontWeight: selectedFormat === fmt ? 700 : 500,
                        border: selectedFormat === fmt ? '1px solid #1f6f68' : '1px solid #e0d5c2',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {fmt}
                    </span>
                    {i < design.availableFormats.length - 1 && <span style={{ color: '#bbb' }}>•</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Popular Add-ons list */}
            <div>
              <div style={{
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#262626',
                marginBottom: '8px'
              }}>
                POPULAR ADD-ONS
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px 10px',
                flexWrap: 'wrap',
                fontSize: '13px',
                color: '#555'
              }}>
                {design.popularAddOns.map((addOn, i) => (
                  <span key={addOn} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      background: '#faf8f4',
                      padding: '4px 10px',
                      borderRadius: '3px',
                      border: '1px solid #ebd8b5',
                      color: '#666'
                    }}>
                      {addOn}
                    </span>
                    {i < design.popularAddOns.length - 1 && <span style={{ color: '#ccc' }}>•</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div style={{
            background: '#faf8f4',
            border: '1px solid #ebd8b5',
            borderRadius: '6px',
            padding: 'clamp(24px, 3.5vw, 32px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#c9963b',
                marginBottom: '6px'
              }}>
                Direct Studio Ordering
              </div>
              <h3 className="s" style={{ fontSize: '22px', color: '#262626', margin: '0 0 10px' }}>
                Order With Design #{design.designNumber}
              </h3>
              <p style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.6, margin: '0 0 20px' }}>
                Ready to create this program for your loved one? Clicking the order button locks <strong>Design No. {design.designNumber}</strong> into your inquiry so our design studio knows your exact selection immediately.
              </p>

              <div style={{
                background: '#ffffff',
                border: '1px solid #e0d5c2',
                borderRadius: '4px',
                padding: '14px 16px',
                marginBottom: '24px',
                fontSize: '12.5px',
                color: '#555',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Selected Program:</span>
                  <strong>{design.title}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Design Number:</span>
                  <strong style={{ color: '#1f6f68' }}>No. {design.designNumber}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Collection:</span>
                  <span>{design.collectionName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Turnaround:</span>
                  <span style={{ color: '#1f6f68', fontWeight: 600 }}>Same Day / 24–48 Hours</span>
                </div>
              </div>
            </div>

            <div>
              {/* Primary Action: ORDER THIS DESIGN (as in mockup) */}
              <button
                onClick={() => setOrderModalOpen(true)}
                className="b b1"
                style={{
                  width: '100%',
                  padding: '15px 24px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  background: '#0a100d',
                  borderColor: '#0a100d',
                  color: '#ffffff',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                ORDER THIS DESIGN
              </button>

              {/* Caption from Mockup */}
              <p style={{
                fontSize: '11.5px',
                color: '#777',
                textAlign: 'center',
                margin: '8px 0 0',
                fontStyle: 'italic'
              }}>
                Carries Design No. {design.designNumber} straight into the order form.
              </p>

              <div style={{
                borderTop: '1px solid #ebd8b5',
                marginTop: '18px',
                paddingTop: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                color: '#666'
              }}>
                <span>Need immediate advice?</span>
                <a href="tel:7189242004" style={{ color: '#1f6f68', fontWeight: 700 }}>
                  (718) 924-2004
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Related Designs from this Collection */}
        {relatedDesigns.length > 0 && (
          <div style={{ marginTop: '56px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <div className="eb">Explore More</div>
                <h3 className="s" style={{ fontSize: '22px', color: '#262626', margin: 0 }}>
                  Other Designs in {design.collectionName}
                </h3>
              </div>
              <Link href="/gallery" style={{ fontSize: '13px', fontWeight: 600, color: '#1f6f68' }}>
                View All Collections &gt;
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '20px'
            }}>
              {relatedDesigns.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/gallery/${rel.id}`}
                  style={{
                    background: '#fdfbf7',
                    border: '1px solid #e0d5c2',
                    borderRadius: '6px',
                    padding: '16px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.borderColor = '#1f6f68'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#e0d5c2'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ width: '60px', height: '80px', flexShrink: 0, overflow: 'hidden', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#1f6f68', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Design No. {rel.designNumber}
                    </div>
                    <div className="s" style={{ fontSize: '16px', color: '#262626', fontWeight: 600, margin: '2px 0' }}>
                      {rel.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#777' }}>
                      {rel.theme}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Inquiry Modal with Design Pre-filled */}
      <OrderInquiryModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        design={design}
      />
    </div>
  )
}

export default function DesignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '120px 20px', color: '#666' }}>
        <p className="s" style={{ fontSize: '24px', color: '#262626', marginBottom: '8px' }}>Lilies of the Field</p>
        <p style={{ fontSize: '14px' }}>Loading design layout...</p>
      </div>
    }>
      <DesignDetailContent params={params} />
    </Suspense>
  )
}
