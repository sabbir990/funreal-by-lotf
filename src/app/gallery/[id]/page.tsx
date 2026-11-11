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
  Info,
  Eye,
  BookOpen
} from 'lucide-react'
import { 
  getDesignById, 
  getDesignsByCollection, 
  GALLERY_DESIGNS, 
  GalleryDesign 
} from '@/data/galleryData'
import { CoverFlatView, InsideSpreadView, BackCoverView } from '@/components/DesignPreviewFrame'
import OrderInquiryModal from '@/components/OrderInquiryModal'

function DesignDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const design = getDesignById(resolvedParams.id)

  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<string>(
    design?.availableFormats?.[0] || '4-Page'
  )
  const [previewTab, setPreviewTab] = useState<'all' | 'front' | 'inside' | 'back'>('all')

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

      {/* 2. Visual Presentation Controls (Front Cover, Inside Spread, Back Cover) */}
      <div className="site-container" style={{ paddingTop: '32px' }}>
        
        {/* Preview Selector Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '22px',
          flexWrap: 'wrap',
          gap: '12px',
          background: '#faf8f4',
          padding: '12px 18px',
          borderRadius: '6px',
          border: '1px solid #e8dfd2'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1f6f68' }}>
              Preview Options:
            </span>
            <span style={{ fontSize: '12px', color: '#666' }}>
              View the complete memorial program design
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPreviewTab('all')}
              style={{
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: previewTab === 'all' ? 700 : 500,
                border: previewTab === 'all' ? '1px solid #1f6f68' : '1px solid #cfcfcf',
                background: previewTab === 'all' ? '#1f6f68' : '#ffffff',
                color: previewTab === 'all' ? '#ffffff' : '#333',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              All Previews
            </button>
            <button
              onClick={() => setPreviewTab('front')}
              style={{
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: previewTab === 'front' ? 700 : 500,
                border: previewTab === 'front' ? '1px solid #1f6f68' : '1px solid #cfcfcf',
                background: previewTab === 'front' ? '#1f6f68' : '#ffffff',
                color: previewTab === 'front' ? '#ffffff' : '#333',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Front Cover
            </button>
            <button
              onClick={() => setPreviewTab('inside')}
              style={{
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: previewTab === 'inside' ? 700 : 500,
                border: previewTab === 'inside' ? '1px solid #1f6f68' : '1px solid #cfcfcf',
                background: previewTab === 'inside' ? '#1f6f68' : '#ffffff',
                color: previewTab === 'inside' ? '#ffffff' : '#333',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Inside Spread
            </button>
            <button
              onClick={() => setPreviewTab('back')}
              style={{
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: previewTab === 'back' ? 700 : 500,
                border: previewTab === 'back' ? '1px solid #1f6f68' : '1px solid #cfcfcf',
                background: previewTab === 'back' ? '#1f6f68' : '#ffffff',
                color: previewTab === 'back' ? '#ffffff' : '#333',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Back Cover
            </button>
          </div>
        </div>

        {/* Visual Presentation Views */}
        {previewTab === 'all' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 310px) 1.25fr minmax(260px, 310px)',
            gap: '20px',
            alignItems: 'start',
            marginBottom: '40px'
          }}>
            {/* 1. Front Cover */}
            <div style={{
              background: '#faf8f4',
              padding: '20px 16px',
              borderRadius: '6px',
              border: '1px solid #e8dfd2',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <CoverFlatView design={design} showLabel={true} />
            </div>

            {/* 2. Inside Spread */}
            <div style={{
              background: '#faf8f4',
              padding: '20px 20px 16px',
              borderRadius: '6px',
              border: '1px solid #e8dfd2',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <InsideSpreadView design={design} showLabel={true} />
            </div>

            {/* 3. Back Cover */}
            <div style={{
              background: '#faf8f4',
              padding: '20px 16px',
              borderRadius: '6px',
              border: '1px solid #e8dfd2',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <BackCoverView design={design} showLabel={true} />
            </div>
          </div>
        )}

        {previewTab === 'front' && (
          <div style={{
            background: '#faf8f4',
            padding: '32px 24px',
            borderRadius: '6px',
            border: '1px solid #e8dfd2',
            maxWidth: '480px',
            margin: '0 auto 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <CoverFlatView design={design} showLabel={true} />
          </div>
        )}

        {previewTab === 'inside' && (
          <div style={{
            background: '#faf8f4',
            padding: '32px 28px',
            borderRadius: '6px',
            border: '1px solid #e8dfd2',
            maxWidth: '920px',
            margin: '0 auto 40px'
          }}>
            <InsideSpreadView design={design} showLabel={true} />
          </div>
        )}

        {previewTab === 'back' && (
          <div style={{
            background: '#faf8f4',
            padding: '32px 24px',
            borderRadius: '6px',
            border: '1px solid #e8dfd2',
            maxWidth: '480px',
            margin: '0 auto 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <BackCoverView design={design} showLabel={true} />
          </div>
        )}

        {/* 3. Design Information & Ordering Controls */}
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
                Ready to create this program for your loved one? Clicking the order button locks <strong>Design No. {design.designNumber}</strong> into your inquiry and carries it directly into our order form.
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
                  <span>Standard Turnaround:</span>
                  <span style={{ color: '#1f6f68', fontWeight: 600 }}>4 Business Days</span>
                </div>
              </div>
            </div>

            <div>
              {/* Primary Action */}
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

              <p style={{
                fontSize: '11.5px',
                color: '#777',
                textAlign: 'center',
                margin: '8px 0 0',
                fontStyle: 'italic'
              }}>
                Carries Design No. {design.designNumber} and program specifications straight into the order form.
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
                <a href="tel:9173001104" style={{ color: '#1f6f68', fontWeight: 700 }}>
                  (917) 300-1104
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
                  <div style={{
                    width: '64px',
                    height: '80px',
                    backgroundImage: `url(${rel.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '3px',
                    border: '1px solid #dcd3c4',
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{ fontSize: '11px', color: '#1f6f68', fontWeight: 700, textTransform: 'uppercase' }}>
                      Design #{rel.designNumber}
                    </div>
                    <div className="s" style={{ fontSize: '16px', color: '#262626', margin: '2px 0 4px', fontWeight: 600 }}>
                      {rel.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {rel.theme}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Program Specifications / Order Modal */}
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
      <div style={{ padding: '80px 20px', textAlign: 'center', color: '#666' }}>
        Loading program design preview...
      </div>
    }>
      <DesignDetailContent params={params} />
    </Suspense>
  )
}
