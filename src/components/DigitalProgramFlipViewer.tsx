'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  BookOpen, 
  Maximize2, 
  Minimize2, 
  Share2, 
  Printer, 
  Check, 
  Copy,
  Sparkles,
  Flower2
} from 'lucide-react'
import { MemorialDetail } from '@/data/memorialsData'

interface FlipViewerProps {
  memorial: MemorialDetail
  inline?: boolean
  isOverlay?: boolean
  onClose?: () => void
}

export default function DigitalProgramFlipViewer({
  memorial,
  inline = false,
  isOverlay = false,
  onClose
}: FlipViewerProps) {
  // Current page index: 0 = Cover, 1 = Order of Service, 2 = Obituary, 3 = Back Cover
  const [currentPage, setCurrentPage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [viewMode, setViewMode] = useState<'single' | 'spread'>('single')
  const viewerContainerRef = useRef<HTMLDivElement>(null)

  const totalPages = 4
  const pageTitles = [
    'Front Cover',
    'Order of Service',
    'Obituary & Reflections',
    'Back Cover & Gratitude'
  ]

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Escape' && isOverlay && onClose) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOverlay, onClose, totalPages])

  const goNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))
  const goPrev = () => setCurrentPage(prev => Math.max(prev - 1, 0))

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const toggleFullscreen = () => {
    if (!viewerContainerRef.current) return
    if (!isFullscreen) {
      if (viewerContainerRef.current.requestFullscreen) {
        viewerContainerRef.current.requestFullscreen().catch(() => {})
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
      setIsFullscreen(false)
    }
  }

  // --- RENDER PAGE CONTENT ---
  const renderPage = (pageIndex: number) => {
    switch (pageIndex) {
      case 0: // PAGE 1: FRONT COVER
        return (
          <div style={{
            background: 'linear-gradient(135deg, #fdfbf7 0%, #faf6ee 100%)',
            border: '8px double #c9963b',
            borderRadius: '4px',
            padding: 'clamp(24px, 4vw, 40px)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
            boxShadow: 'inset 0 0 40px rgba(201, 150, 59, 0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top Ornamental Badge */}
            <div>
              <div style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#1f6f68',
                fontWeight: 700,
                marginBottom: '8px'
              }}>
                ✦ {memorial.program.cover.subtitle || 'In Loving Memory & Celebration'} ✦
              </div>

              <div style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(14px, 1.8vw, 17px)',
                color: '#8c6b2d',
                marginBottom: '6px'
              }}>
                {memorial.program.cover.title || 'A Celebration of the Life & Legacy of'}
              </div>
            </div>

            {/* Portrait Photo with Oval Frame & Gold Border */}
            <div style={{
              margin: '12px 0',
              position: 'relative'
            }}>
              <div style={{
                width: 'clamp(150px, 20vw, 210px)',
                height: 'clamp(190px, 25vw, 270px)',
                borderRadius: '50% / 40%',
                overflow: 'hidden',
                border: '4px solid #c9963b',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                background: '#eee'
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
            </div>

            {/* Beloved Full Name & Lifespan */}
            <div>
              <h2 className="s" style={{
                fontSize: 'clamp(26px, 3.4vw, 36px)',
                color: '#262626',
                margin: '0 0 6px',
                fontWeight: 700,
                lineHeight: 1.15
              }}>
                {memorial.full_name}
              </h2>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                color: '#a87a22',
                fontWeight: 600,
                margin: '0 0 14px'
              }}>
                {memorial.lifespan}
              </p>

              {/* Cover Scripture / Quote */}
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(12px, 1.4vw, 14px)',
                color: '#555',
                lineHeight: 1.6,
                maxWidth: '460px',
                margin: '0 auto'
              }}>
                {memorial.program.cover.quote}
              </p>
            </div>

            {/* Bottom Brand Mark */}
            <div style={{
              borderTop: '1px solid #ebd8b5',
              paddingTop: '10px',
              width: '100%',
              fontSize: '10.5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8c6b2d',
              fontWeight: 700
            }}>
              Lilies of the Field Keepsake Collection
            </div>
          </div>
        )

      case 1: // PAGE 2: INSIDE LEFT (ORDER OF SERVICE)
        return (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e0d5c2',
            borderRadius: '4px',
            padding: 'clamp(24px, 4vw, 38px)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.02)'
          }}>
            <div>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #1f6f68', paddingBottom: '12px', marginBottom: '18px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1f6f68', fontWeight: 700 }}>
                  Sacred Ceremony
                </span>
                <h3 className="s" style={{ fontSize: '24px', color: '#262626', margin: '4px 0 2px' }}>
                  Order of Sacred Service
                </h3>
                <div style={{ fontSize: '12.5px', color: '#666', fontStyle: 'italic' }}>
                  {memorial.program.orderOfService.sanctuary}
                </div>
                <div style={{ fontSize: '11.5px', color: '#8c6b2d', fontWeight: 600, marginTop: '2px' }}>
                  {memorial.program.orderOfService.officiant}
                </div>
              </div>

              {/* Service Items List with Dot Leaders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px' }}>
                {memorial.program.orderOfService.items.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '8px',
                      lineHeight: 1.4
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#262626', whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                    <span style={{
                      flex: 1,
                      borderBottom: '1px dotted #ccc',
                      margin: '0 6px',
                      opacity: 0.7
                    }} />
                    <span style={{ color: '#555', textAlign: 'right', fontStyle: 'italic', fontSize: '12.5px' }}>
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Service Footnote */}
            <div style={{
              borderTop: '1px solid #ebd8b5',
              paddingTop: '12px',
              textAlign: 'center',
              fontSize: '11.5px',
              color: '#777',
              fontStyle: 'italic'
            }}>
              “The Lord bless you and keep you; the Lord make his face shine upon you.” — Numbers 6:24
            </div>
          </div>
        )

      case 2: // PAGE 3: INSIDE RIGHT (OBITUARY & LIFE STORY)
        return (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e0d5c2',
            borderRadius: '4px',
            padding: 'clamp(24px, 4vw, 38px)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.02)'
          }}>
            <div>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #1f6f68', paddingBottom: '12px', marginBottom: '18px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1f6f68', fontWeight: 700 }}>
                  Life Reflections
                </span>
                <h3 className="s" style={{ fontSize: '24px', color: '#262626', margin: '4px 0 2px' }}>
                  {memorial.program.obituary.heading}
                </h3>
                <div style={{ fontSize: '13px', color: '#a87a22', fontStyle: 'italic', fontWeight: 600 }}>
                  A Journey of Faith, Honor &amp; Everlasting Love
                </div>
              </div>

              {/* Obituary Paragraphs */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '13.5px',
                lineHeight: 1.75,
                color: '#383838',
                textAlign: 'justify'
              }}>
                {memorial.program.obituary.paragraphs.map((p, idx) => (
                  <p key={idx} style={{ margin: 0, textIndent: idx > 0 ? '18px' : '0' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Scripture Quote Box */}
            <div style={{
              background: '#faf8f4',
              border: '1px solid #e8dfd2',
              borderRadius: '4px',
              padding: '12px 16px',
              textAlign: 'center',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '13px',
              color: '#1f6f68',
              lineHeight: 1.5,
              marginTop: '16px'
            }}>
              {memorial.program.obituary.scriptureQuote}
            </div>
          </div>
        )

      case 3: // PAGE 4: BACK COVER (ACKNOWLEDGEMENTS, PALLBEARERS & REPAST)
        return (
          <div style={{
            background: 'linear-gradient(135deg, #faf6ee 0%, #fdfbf7 100%)',
            border: '8px double #c9963b',
            borderRadius: '4px',
            padding: 'clamp(24px, 4vw, 38px)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            boxShadow: 'inset 0 0 30px rgba(201, 150, 59, 0.08)'
          }}>
            {/* Top Acknowledgements */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1f6f68', fontWeight: 700, marginBottom: '6px' }}>
                Words of Appreciation
              </div>
              <h3 className="s" style={{ fontSize: '24px', color: '#262626', margin: '0 0 12px' }}>
                Family Acknowledgements
              </h3>
              <p style={{
                fontSize: '13px',
                lineHeight: 1.75,
                color: '#444',
                fontStyle: 'italic',
                maxWidth: '480px',
                margin: '0 auto 16px'
              }}>
                {memorial.program.backCover.acknowledgement}
              </p>

              {/* Poem */}
              {memorial.program.backCover.poemLines && (
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #ebd8b5',
                  borderRadius: '4px',
                  padding: '12px 16px',
                  maxWidth: '460px',
                  margin: '0 auto 18px',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '12.5px',
                  color: '#8c6b2d',
                  lineHeight: 1.6
                }}>
                  {memorial.program.backCover.poemLines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              )}
            </div>

            {/* Pallbearers & Arrangements */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              fontSize: '12px',
              textAlign: 'left',
              borderTop: '1px solid #e8dfd2',
              borderBottom: '1px solid #e8dfd2',
              padding: '14px 0',
              margin: '12px 0'
            }}>
              {memorial.program.backCover.pallbearers && (
                <div>
                  <strong style={{ display: 'block', color: '#262626', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '11px' }}>
                    Honorary Pallbearers:
                  </strong>
                  <div style={{ color: '#555', lineHeight: 1.5 }}>
                    {memorial.program.backCover.pallbearers.join(' · ')}
                  </div>
                </div>
              )}

              <div>
                <strong style={{ display: 'block', color: '#262626', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '11px' }}>
                  Final Committal &amp; Repast:
                </strong>
                <div style={{ color: '#555', lineHeight: 1.5 }}>
                  <strong>Interment:</strong> {memorial.program.backCover.interment}<br />
                  <span style={{ marginTop: '2px', display: 'block' }}>{memorial.program.backCover.repast}</span>
                </div>
              </div>
            </div>

            {/* Bottom Hallmarks */}
            <div>
              <div style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1f6f68',
                fontWeight: 700
              }}>
                Lilies of the Field Memorial Keepsakes
              </div>
              <div style={{ fontSize: '11px', color: '#777', fontStyle: 'italic', marginTop: '2px' }}>
                Every Life Deserves to Be Celebrated
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Content wrapper for the flip viewer
  const viewerContent = (
    <div 
      ref={viewerContainerRef}
      style={{
        width: '100%',
        maxWidth: isFullscreen ? '100vw' : '820px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: isFullscreen ? '#1a1a1a' : 'transparent',
        padding: isFullscreen ? '24px' : '0',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Top Toolbar / Tab Navigation Bar */}
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        background: '#faf8f4',
        border: '1px solid #e0d5c2',
        borderRadius: '6px',
        padding: '10px 16px',
        marginBottom: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        {/* Quick Page Jump Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {pageTitles.map((title, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentPage(idx)}
              style={{
                background: currentPage === idx ? '#1f6f68' : '#ffffff',
                color: currentPage === idx ? '#ffffff' : '#333',
                border: currentPage === idx ? '1px solid #1f6f68' : '1px solid #ddd',
                padding: '5px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: currentPage === idx ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {idx + 1}. {title}
            </button>
          ))}
        </div>

        {/* Action Controls (Fullscreen, Share, Print, Close) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handleShare}
            title="Copy share link"
            style={{
              background: '#ffffff',
              border: '1px solid #ddd',
              padding: '6px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#333',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {copied ? <Check size={14} color="#1f6f68" /> : <Copy size={14} />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            title="Print or save as PDF"
            style={{
              background: '#ffffff',
              border: '1px solid #ddd',
              padding: '6px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#333',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Printer size={14} />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
            style={{
              background: '#ffffff',
              border: '1px solid #ddd',
              padding: '6px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#333',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>

          {isOverlay && onClose && (
            <button
              type="button"
              onClick={onClose}
              title="Close modal"
              style={{
                background: '#991b1b',
                border: 'none',
                color: '#ffffff',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}
            >
              <X size={15} /> Close
            </button>
          )}
        </div>
      </div>

      {/* Main Flip Stage & Paper Canvas */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(520px, 75vh, 680px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 4px'
      }}>
        {/* Left Flip Arrow Button */}
        <button
          type="button"
          onClick={goPrev}
          disabled={currentPage === 0}
          aria-label="Previous Page"
          style={{
            position: 'absolute',
            left: 'clamp(-12px, -2vw, -22px)',
            zIndex: 10,
            background: currentPage === 0 ? 'rgba(255,255,255,0.4)' : '#ffffff',
            color: currentPage === 0 ? '#bbb' : '#1f6f68',
            border: '1px solid #e0d5c2',
            boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* The Active Page Sheet Container */}
        <div style={{
          width: '100%',
          maxWidth: '680px',
          minHeight: 'clamp(520px, 75vh, 680px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
          borderRadius: '4px',
          overflow: 'hidden',
          transition: 'transform 0.25s ease'
        }}>
          {renderPage(currentPage)}
        </div>

        {/* Right Flip Arrow Button */}
        <button
          type="button"
          onClick={goNext}
          disabled={currentPage === totalPages - 1}
          aria-label="Next Page"
          style={{
            position: 'absolute',
            right: 'clamp(-12px, -2vw, -22px)',
            zIndex: 10,
            background: currentPage === totalPages - 1 ? 'rgba(255,255,255,0.4)' : '#ffffff',
            color: currentPage === totalPages - 1 ? '#bbb' : '#1f6f68',
            border: '1px solid #e0d5c2',
            boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Page Navigation Controls */}
      <div style={{
        marginTop: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <button
          type="button"
          onClick={goPrev}
          disabled={currentPage === 0}
          className="b"
          style={{
            padding: '7px 16px',
            fontSize: '12px',
            opacity: currentPage === 0 ? 0.4 : 1,
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ← Previous
        </button>

        {/* Pagination Dots & Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentPage(i)}
              style={{
                width: currentPage === i ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentPage === i ? '#1f6f68' : '#d2c8b8',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={`Page ${i + 1}: ${pageTitles[i]}`}
            />
          ))}
          <span style={{ fontSize: '12.5px', color: '#555', marginLeft: '6px', fontWeight: 600 }}>
            Page {currentPage + 1} of {totalPages}: {pageTitles[currentPage]}
          </span>
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={currentPage === totalPages - 1}
          className="b b1"
          style={{
            padding: '7px 16px',
            fontSize: '12px',
            opacity: currentPage === totalPages - 1 ? 0.4 : 1,
            cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )

  // If overlay modal mode:
  if (isOverlay) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, 2vw, 24px)',
        overflowY: 'auto'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '94vh',
          background: '#fdfbf7',
          borderRadius: '8px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          padding: 'clamp(16px, 2.5vw, 24px)',
          overflowY: 'auto',
          position: 'relative'
        }}>
          {viewerContent}
        </div>
      </div>
    )
  }

  // Inline mode:
  return viewerContent
}

