'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronRight,
  Eye,
  FileText,
  Printer,
  ShieldCheck,
  X
} from 'lucide-react'
import { 
  GALLERY_COLLECTIONS, 
  GALLERY_DESIGNS, 
  GalleryCollection, 
  GalleryDesign 
} from '@/data/galleryData'
import { CoverFlatView } from '@/components/DesignPreviewFrame'
import OrderInquiryModal from '@/components/OrderInquiryModal'

export default function GalleryPage() {
  const [selectedCollection, setSelectedCollection] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [flipbookOpen, setFlipbookOpen] = useState(false)
  const [orderModalDesign, setOrderModalDesign] = useState<GalleryDesign | null>(null)
  const [showAllCollections, setShowAllCollections] = useState(false)

  // 6 Primary Signature Collections vs 18 Additional Collections
  const signatureCollections = useMemo(() => {
    return GALLERY_COLLECTIONS.filter((c) => c.isPrimary)
  }, [])

  const otherCollections = useMemo(() => {
    return GALLERY_COLLECTIONS.filter((c) => !c.isPrimary)
  }, [])

  // Filtered designs
  const filteredDesigns = useMemo(() => {
    return GALLERY_DESIGNS.filter((design) => {
      const matchesCollection = 
        selectedCollection === 'all' || design.collectionId === selectedCollection
      
      const query = searchQuery.toLowerCase().trim()
      const matchesQuery = 
        !query ||
        design.title.toLowerCase().includes(query) ||
        design.designNumber.toLowerCase().includes(query) ||
        design.collectionName.toLowerCase().includes(query) ||
        design.description.toLowerCase().includes(query) ||
        (design.tags && design.tags.some(t => t.toLowerCase().includes(query)))

      return matchesCollection && matchesQuery
    })
  }, [selectedCollection, searchQuery])

  const handleSelectCollection = (collectionId: string) => {
    setSelectedCollection(collectionId)
    // Smooth scroll down to the designs grid
    const el = document.getElementById('designs-grid-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSelectTier = (tierName: string) => {
    // Smooth scroll down to the designs grid
    const el = document.getElementById('designs-grid-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ width: '100%', background: '#ffffff', minHeight: '100vh' }}>
      {/* 1. Gallery Header Hero */}
      <section style={{
        background: '#faf8f4',
        borderBottom: '1px solid #e8dfd2',
        paddingTop: 'clamp(40px, 5vw, 64px)',
        paddingBottom: 'clamp(40px, 5vw, 64px)',
        textAlign: 'center'
      }}>
        <div className="site-container" style={{ maxWidth: '920px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#1f6f68',
            marginBottom: '10px'
          }}>
            <Sparkles size={15} /> Lilies of the Field Memorial Keepsakes
          </div>

          <h1 className="s" style={{
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            color: '#262626',
            lineHeight: 1.18,
            marginBottom: '16px'
          }}>
            Design Gallery &amp; Collections
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            color: '#555',
            lineHeight: 1.65,
            maxWidth: '760px',
            margin: '0 auto 24px'
          }}>
            A dedicated visual gallery for families and funeral homes to explore our design collections, examine programs flat inside and out, and request tailored print orders. This is a gallery, not a store: pricing is quoted per order to accommodate your family’s exact format, quantity, and turnaround.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px 24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '12.5px',
            color: '#666',
            padding: '10px 20px',
            background: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #e5dccb',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={14} color="#1f6f68" /> Shown Flat (Front Cover, Inside Spread &amp; Back Cover)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={14} color="#1f6f68" /> Sample Layouts (Fully Customizable)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={14} color="#1f6f68" /> Direct Studio Support: (917) 300-1104
            </span>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR DESIGN EXPERIENCE — THREE SERVICE TIERS */}
      <section 
        id="design-experience"
        className="section-padding" 
        style={{ 
          width: '100%', 
          background: 'linear-gradient(180deg, #faf8f4 0%, #f4eee3 50%, #faf8f4 100%)',
          borderBottom: '1px solid #e8dfd2',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="site-container" style={{ maxWidth: '1160px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 44px', position: 'relative' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#c9963b',
              marginBottom: '10px'
            }}>
              <Sparkles size={14} color="#c9963b" /> Choose Your Design Experience
            </div>

            <h2 className="s" style={{
              fontSize: 'clamp(32px, 4.2vw, 46px)',
              color: '#262626',
              fontStyle: 'italic',
              lineHeight: 1.18,
              margin: '0 0 16px'
            }}>
              A Collection for Every Story
            </h2>

            <p style={{
              fontSize: 'clamp(14.5px, 1.8vw, 16px)',
              color: '#555555',
              lineHeight: 1.68,
              margin: 0
            }}>
              Every life is unique, and every tribute should be just as meaningful. Our three thoughtfully curated collections offer varying levels of personalization and creative design, allowing you to choose the experience that best honors your loved one’s life and legacy.
            </p>
          </div>

          {/* Three Tiers Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '28px',
            alignItems: 'stretch'
          }}>
            {/* TIER 1: ESSENTIAL COLLECTION */}
            <div 
              style={{
                background: '#ffffff',
                border: '1px solid #e5dccb',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.09)'
                e.currentTarget.style.borderColor = '#1f6f68'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)'
                e.currentTarget.style.borderColor = '#e5dccb'
              }}
            >
              {/* Card Header */}
              <div style={{ padding: '28px 24px 16px', textAlign: 'center' }}>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#262626',
                  marginBottom: '4px'
                }}>
                  ESSENTIAL
                </div>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#c9963b',
                  fontWeight: 700,
                  marginBottom: '8px'
                }}>
                  — COLLECTION —
                </div>
                <div className="s" style={{
                  fontSize: '15px',
                  fontStyle: 'italic',
                  color: '#666666'
                }}>
                  Simple. Beautiful. Timeless.
                </div>
              </div>

              {/* Mockup Preview Visual */}
              <div style={{
                padding: '0 20px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  height: '190px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#f7f4ed',
                  border: '1px solid #ebd8b5',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/tiers/essential_preview.jpg" 
                    alt="Essential Collection Memorial Program Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Lower Curved Container & Description */}
              <div style={{
                background: '#faf8f4',
                borderTop: '1px solid #ede4d5',
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px'
              }}>
                <p style={{
                  fontSize: '13.5px',
                  color: '#555555',
                  lineHeight: 1.6,
                  margin: '0 0 20px',
                  textAlign: 'center'
                }}>
                  Professionally designed memorial templates, personalized with your loved one’s photographs and service details for an elegant, heartfelt tribute.
                </p>

                <button
                  type="button"
                  onClick={() => handleSelectTier('essential')}
                  style={{
                    background: '#3d1a38',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px 24px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(61, 26, 56, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#271024')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#3d1a38')}
                >
                  Explore Designs &gt;
                </button>
              </div>
            </div>

            {/* TIER 2: SIGNATURE COLLECTION */}
            <div 
              style={{
                background: '#ffffff',
                border: '1px solid #e5dccb',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.09)'
                e.currentTarget.style.borderColor = '#1f6f68'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)'
                e.currentTarget.style.borderColor = '#e5dccb'
              }}
            >
              {/* Card Header */}
              <div style={{ padding: '28px 24px 16px', textAlign: 'center' }}>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#262626',
                  marginBottom: '4px'
                }}>
                  SIGNATURE
                </div>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#c9963b',
                  fontWeight: 700,
                  marginBottom: '8px'
                }}>
                  — COLLECTION —
                </div>
                <div className="s" style={{
                  fontSize: '15px',
                  fontStyle: 'italic',
                  color: '#666666'
                }}>
                  Personalized. Thoughtful. Distinctive.
                </div>
              </div>

              {/* Mockup Preview Visual */}
              <div style={{
                padding: '0 20px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  height: '190px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#f7f4ed',
                  border: '1px solid #ebd8b5',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/tiers/signature_preview.jpg" 
                    alt="Signature Collection Memorial Program Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Lower Curved Container & Description */}
              <div style={{
                background: '#faf8f4',
                borderTop: '1px solid #ede4d5',
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px'
              }}>
                <p style={{
                  fontSize: '13.5px',
                  color: '#555555',
                  lineHeight: 1.6,
                  margin: '0 0 20px',
                  textAlign: 'center'
                }}>
                  A more customized design experience featuring personalized layouts, creative enhancements, and thoughtful details that beautifully reflect your loved one’s story.
                </p>

                <button
                  type="button"
                  onClick={() => handleSelectTier('signature')}
                  style={{
                    background: '#3d1a38',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px 24px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 12px rgba(61, 26, 56, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#271024')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#3d1a38')}
                >
                  Explore Designs &gt;
                </button>
              </div>
            </div>

            {/* TIER 3: PREMIER COLLECTION (AI-ASSISTED HIGHLIGHTED CARD) */}
            <div 
              style={{
                background: 'linear-gradient(155deg, #2b1127 0%, #461b40 100%)',
                border: '1.5px solid #c9963b',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 14px 36px rgba(43, 17, 39, 0.28)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 20px 48px rgba(43, 17, 39, 0.4)'
                e.currentTarget.style.borderColor = '#e9c98a'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 14px 36px rgba(43, 17, 39, 0.28)'
                e.currentTarget.style.borderColor = '#c9963b'
              }}
            >
              {/* Top-Right AI-Assisted Design Golden Ribbon */}
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: 'linear-gradient(135deg, #e9c98a 0%, #c9963b 100%)',
                color: '#261a06',
                fontSize: '9.5px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderBottomLeftRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                zIndex: 2
              }}>
                <Sparkles size={11} color="#261a06" /> With AI-Assisted Design
              </div>

              {/* Card Header */}
              <div style={{ padding: '28px 24px 16px', textAlign: 'center' }}>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  marginBottom: '4px'
                }}>
                  PREMIER
                </div>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#e9c98a',
                  fontWeight: 700,
                  marginBottom: '8px'
                }}>
                  — COLLECTION —
                </div>
                <div className="s" style={{
                  fontSize: '15px',
                  fontStyle: 'italic',
                  color: '#e8d7ea'
                }}>
                  Elevated. Artistic. One of a Kind.
                </div>
              </div>

              {/* Mockup Preview Visual */}
              <div style={{
                padding: '0 20px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  height: '190px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(233, 201, 138, 0.35)',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.3)'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/tiers/premier_preview.jpg" 
                    alt="Premier Collection Memorial Program Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Lower Curved Container & Description */}
              <div style={{
                background: '#faf6fa',
                borderTop: '1px solid rgba(201, 150, 59, 0.3)',
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px'
              }}>
                <p style={{
                  fontSize: '13.5px',
                  color: '#443342',
                  lineHeight: 1.6,
                  margin: '0 0 20px',
                  textAlign: 'center'
                }}>
                  Our most exclusive design experience, combining advanced customization, AI-assisted artistic backgrounds, enhanced photo editing, and distinctive design elements to create a truly personalized tribute.
                </p>

                <button
                  type="button"
                  onClick={() => handleSelectTier('premier')}
                  style={{
                    background: 'linear-gradient(135deg, #e9c98a 0%, #c9963b 100%)',
                    color: '#261a06',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px 24px',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(201, 150, 59, 0.4)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                >
                  Explore Designs &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore our 6 Signature Collections Grid */}
      <section className="section-padding" style={{ width: '100%', background: '#ffffff' }}>
        <div className="site-container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div>
              <div className="eb">Browse By Theme</div>
              <h2 className="s" style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', color: '#262626', margin: '0 0 6px' }}>
                Six Signature Collections
              </h2>
              <p style={{ fontSize: '14px', color: '#666', margin: 0, maxWidth: '640px' }}>
                Browse our six signature memorial collections below. Select any collection tile to examine sample layouts and filter matching designs, or explore additional themes below.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ color: '#1f6f68', fontWeight: 700 }}>6 Signature Collections</span>
              <span style={{ color: '#aaa' }}>·</span>
              <span style={{ color: '#666' }}>24 Total Available</span>
            </div>
          </div>

          {/* 3-Column Tile Grid - 6 Signature Collections */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '24px'
          }}>
            {signatureCollections.map((col) => {
              const matchingDesign = GALLERY_DESIGNS.find(d => d.designNumber === col.coverDesignNumber) || GALLERY_DESIGNS.find(d => d.collectionId === col.id)
              const count = GALLERY_DESIGNS.filter(d => d.collectionId === col.id).length

              return (
                <div
                  key={col.id}
                  onClick={() => handleSelectCollection(col.id)}
                  style={{
                    background: '#fdfbf7',
                    border: '1px solid #e8dfd2',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.1)'
                    e.currentTarget.style.borderColor = '#1f6f68'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'
                    e.currentTarget.style.borderColor = '#e8dfd2'
                  }}
                >
                  {/* Clean Artwork Focus Container (repeated label removed) */}
                  <div style={{
                    background: '#f2ece1',
                    padding: '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #e8dfd2',
                    position: 'relative',
                    minHeight: '260px'
                  }}>
                    {matchingDesign ? (
                      <div style={{ width: '180px' }}>
                        <CoverFlatView design={matchingDesign} showLabel={false} />
                      </div>
                    ) : (
                      <div style={{
                        width: '180px',
                        aspectRatio: '1 / 1.414',
                        background: '#ffffff',
                        border: '1px solid #dcd3c4',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#888',
                        fontSize: '12px',
                        padding: '16px',
                        textAlign: 'center'
                      }}>
                        {col.name}
                      </div>
                    )}
                  </div>

                  {/* Tile Information */}
                  <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Bold Category Name */}
                      <h3 className="s" style={{
                        fontSize: '21px',
                        fontWeight: 700,
                        color: '#262626',
                        margin: '0 0 8px'
                      }}>
                        {col.name}
                      </h3>

                      {/* Description */}
                      <p style={{
                        fontSize: '13.5px',
                        color: '#555',
                        margin: '0 0 12px',
                        lineHeight: 1.5
                      }}>
                        {col.description}
                      </p>

                      {/* Themes & Design Possibilities */}
                      <div style={{
                        background: 'rgba(31, 111, 104, 0.05)',
                        border: '1px solid rgba(31, 111, 104, 0.12)',
                        borderRadius: '4px',
                        padding: '10px 12px',
                        marginBottom: '16px'
                      }}>
                        <div style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#1f6f68',
                          marginBottom: '3px'
                        }}>
                          Themes &amp; Design Possibilities
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#444',
                          lineHeight: 1.45
                        }}>
                          {col.themes}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #ebd8b5',
                      paddingTop: '12px'
                    }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#1f6f68',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        VIEW DESIGNS &gt;
                      </span>
                      {count > 0 && (
                        <span style={{ fontSize: '11.5px', color: '#777' }}>
                          {count} {count === 1 ? 'Design' : 'Designs'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Bar: Explore More Categories + Explore More Designs Button */}
          <div style={{
            marginTop: '36px',
            padding: '24px 28px',
            background: '#faf8f4',
            borderRadius: '8px',
            border: '1px solid #e8dfd2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h3 className="s" style={{ fontSize: '18px', color: '#262626', margin: '0 0 4px' }}>
                Looking for more specialized themes?
              </h3>
              <p style={{ fontSize: '13.5px', color: '#666', margin: 0, maxWidth: '580px' }}>
                Explore 18 additional collections below including Sports, Military, First Responders, NYC Landmarks, Cultural Heritage, Hobbies &amp; more.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowAllCollections(!showAllCollections)}
                className="b"
                style={{
                  background: showAllCollections ? '#e9e3d8' : '#ffffff',
                  borderColor: '#1f6f68',
                  color: '#1f6f68',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {showAllCollections ? 'Hide Additional Collections ▲' : 'Explore More Categories (18 Themes) ▼'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('designs-grid-section')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="b b1"
                style={{
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Explore More Designs ↓
              </button>
            </div>
          </div>

          {/* Expandable Section for the 18 Additional Collections */}
          {showAllCollections && (
            <div style={{
              marginTop: '36px',
              paddingTop: '32px',
              borderTop: '1px dashed #dcd3c4'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '26px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <div className="eb" style={{ color: '#a87a22' }}>Specialty &amp; Tribute Themes</div>
                  <h3 className="s" style={{ fontSize: '24px', color: '#262626', margin: '0 0 4px' }}>
                    18 Additional Design Collections
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#666', margin: 0 }}>
                    Select any theme below to examine flat artwork and filter matching memorial program templates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCollections(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1f6f68',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Show Only 6 Signature Collections ▲
                </button>
              </div>

              {/* 3-Column Tile Grid for the 18 Additional Collections */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: '24px'
              }}>
                {otherCollections.map((col) => {
                  const matchingDesign = GALLERY_DESIGNS.find(d => d.designNumber === col.coverDesignNumber) || GALLERY_DESIGNS.find(d => d.collectionId === col.id)
                  const count = GALLERY_DESIGNS.filter(d => d.collectionId === col.id).length

                  return (
                    <div
                      key={col.id}
                      onClick={() => handleSelectCollection(col.id)}
                      style={{
                        background: '#fdfbf7',
                        border: '1px solid #e8dfd2',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.1)'
                        e.currentTarget.style.borderColor = '#1f6f68'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'
                        e.currentTarget.style.borderColor = '#e8dfd2'
                      }}
                    >
                      <div style={{
                        background: '#f2ece1',
                        padding: '24px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid #e8dfd2',
                        position: 'relative',
                        minHeight: '240px'
                      }}>
                        {matchingDesign ? (
                          <div style={{ width: '170px' }}>
                            <CoverFlatView design={matchingDesign} showLabel={false} />
                          </div>
                        ) : (
                          <div style={{
                            width: '170px',
                            aspectRatio: '1 / 1.414',
                            background: '#ffffff',
                            border: '1px solid #dcd3c4',
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#888',
                            fontSize: '12px',
                            padding: '16px',
                            textAlign: 'center'
                          }}>
                            {col.name}
                          </div>
                        )}
                      </div>

                      <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h4 className="s" style={{
                            fontSize: '19px',
                            fontWeight: 700,
                            color: '#262626',
                            margin: '0 0 6px'
                          }}>
                            {col.name}
                          </h4>

                          <p style={{
                            fontSize: '13px',
                            color: '#555',
                            margin: '0 0 10px',
                            lineHeight: 1.45
                          }}>
                            {col.description}
                          </p>

                          <div style={{
                            background: 'rgba(31, 111, 104, 0.04)',
                            border: '1px solid rgba(31, 111, 104, 0.1)',
                            borderRadius: '4px',
                            padding: '8px 10px',
                            marginBottom: '14px'
                          }}>
                            <div style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: '#1f6f68',
                              marginBottom: '2px'
                            }}>
                              Themes
                            </div>
                            <div style={{
                              fontSize: '11.5px',
                              color: '#444',
                              lineHeight: 1.4
                            }}>
                              {col.themes}
                            </div>
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid #ebd8b5',
                          paddingTop: '10px'
                        }}>
                          <span style={{
                            fontSize: '11.5px',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#1f6f68'
                          }}>
                            VIEW DESIGNS &gt;
                          </span>
                          {count > 0 && (
                            <span style={{ fontSize: '11px', color: '#777' }}>
                              {count} {count === 1 ? 'Design' : 'Designs'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. The Interactive Editable Designs Grid Section */}
      <section 
        id="designs-grid-section" 
        className="section-padding" 
        style={{
          width: '100%',
          background: 'var(--bg-cream)',
          borderTop: '1px solid #e8dfd2',
          borderBottom: '1px solid #e8dfd2'
        }}
      >
        <div className="site-container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <div className="eb">Inside Every Design</div>
            <h2 className="s" style={{ fontSize: 'clamp(28px, 3.2vw, 38px)', color: '#262626', margin: '0 0 12px' }}>
              Explore Available Program Designs
            </h2>
            <p style={{ fontSize: '14.5px', color: '#555', margin: 0, lineHeight: 1.6 }}>
              Click any design to view its <strong>front cover, open inside spread, and back cover</strong>, examine available formats, and carry its specifications straight into your order form.
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            padding: '16px 20px',
            border: '1px solid #e0d5c2',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%' }}>
              <Search 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#888'
                }} 
              />
              <input
                type="text"
                placeholder="Search by design number, theme (e.g. basketball, FDNY, lilies, gold, subway), or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 16px 11px 42px',
                  borderRadius: '4px',
                  border: '1px solid #cfcfcf',
                  fontSize: '13.5px',
                  background: '#faf8f4'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#888'
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Collection Filter Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginRight: '4px' }}>
                Collection Filter:
              </span>

              <button
                onClick={() => setSelectedCollection('all')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12.5px',
                  fontWeight: selectedCollection === 'all' ? 700 : 500,
                  border: selectedCollection === 'all' ? '1px solid #1f6f68' : '1px solid #ddd',
                  background: selectedCollection === 'all' ? '#1f6f68' : '#ffffff',
                  color: selectedCollection === 'all' ? '#ffffff' : '#444',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                All Collections ({GALLERY_DESIGNS.length})
              </button>

              {GALLERY_COLLECTIONS.map((c) => {
                const isSelected = selectedCollection === c.id
                const count = GALLERY_DESIGNS.filter(d => d.collectionId === c.id).length
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCollection(c.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12.5px',
                      fontWeight: isSelected ? 700 : 500,
                      border: isSelected ? '1px solid #1f6f68' : '1px solid #ddd',
                      background: isSelected ? '#1f6f68' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#444',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {c.name} {count > 0 ? `(${count})` : ''}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results Summary */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            fontSize: '13px',
            color: '#666'
          }}>
            <span>Showing <strong>{filteredDesigns.length}</strong> {filteredDesigns.length === 1 ? 'design' : 'designs'}</span>
            {selectedCollection !== 'all' && (
              <button
                onClick={() => setSelectedCollection('all')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1f6f68',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '12.5px'
                }}
              >
                Clear collection filter
              </button>
            )}
          </div>

          {/* Grid of Designs */}
          {filteredDesigns.length === 0 ? (
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid #e0d5c2'
            }}>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '12px' }}>
                No designs matched your search criteria.
              </p>
              <button
                onClick={() => { setSelectedCollection('all'); setSearchQuery('') }}
                className="b b1"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '28px'
            }}>
              {filteredDesigns.map((design) => (
                <div
                  key={design.id}
                  className="cd"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #dcd3c4',
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Clean Flat Cover Preview (repeated label removed) */}
                  <div style={{
                    background: '#faf8f4',
                    padding: '24px 20px 16px',
                    borderBottom: '1px solid #ebd8b5',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <Link href={`/gallery/${design.id}`} style={{ width: '100%', maxWidth: '240px', textDecoration: 'none' }}>
                      <CoverFlatView design={design} showLabel={false} />
                    </Link>
                  </div>

                  {/* Design Info */}
                  <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '6px'
                      }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#1f6f68',
                          background: '#dfe9e5',
                          padding: '2px 8px',
                          borderRadius: '3px'
                        }}>
                          Design No. {design.designNumber}
                        </span>
                        <span style={{ fontSize: '11.5px', color: '#777' }}>
                          {design.collectionName}
                        </span>
                      </div>

                      <h3 className="s" style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#262626',
                        margin: '6px 0 8px'
                      }}>
                        <Link href={`/gallery/${design.id}`} style={{ color: '#262626', textDecoration: 'none' }}>
                          {design.title}
                        </Link>
                      </h3>

                      <p style={{
                        fontSize: '13px',
                        color: '#666',
                        margin: '0 0 14px',
                        lineHeight: 1.5
                      }}>
                        {design.description}
                      </p>

                      {/* Formats preview */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexWrap: 'wrap',
                        marginBottom: '16px'
                      }}>
                        {design.availableFormats.map((fmt) => (
                          <span
                            key={fmt}
                            style={{
                              fontSize: '11px',
                              background: '#f5efe6',
                              color: '#555',
                              padding: '2px 7px',
                              borderRadius: '3px',
                              border: '1px solid #e0d5c2'
                            }}
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      borderTop: '1px solid #eee',
                      paddingTop: '14px',
                      flexWrap: 'wrap'
                    }}>
                      <Link
                        href={`/gallery/${design.id}`}
                        className="b"
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          fontSize: '12px',
                          letterSpacing: '0.06em',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Eye size={14} /> View Previews
                      </Link>

                      <button
                        onClick={() => setOrderModalDesign(design)}
                        className="b b1"
                        style={{
                          padding: '10px 16px',
                          fontSize: '12px',
                          letterSpacing: '0.06em',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Order #{design.designNumber}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Flipbook "View Full Catalog" Section */}
      <section style={{
        width: '100%',
        background: '#ffffff',
        padding: '64px 0',
        borderBottom: '1px solid #e8dfd2'
      }}>
        <div className="site-container">
          <div style={{
            background: 'linear-gradient(135deg, #1f6f68 0%, #14504b 100%)',
            borderRadius: '8px',
            padding: 'clamp(32px, 4.5vw, 48px)',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(31, 111, 104, 0.25)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <BookOpen size={28} color="#ffffff" />
            </div>

            <div style={{
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#e9c98a',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              For Funeral Professionals &amp; Directors
            </div>

            <h2 className="s" style={{
              fontSize: 'clamp(24px, 3.2vw, 36px)',
              lineHeight: 1.25,
              color: '#ffffff',
              margin: '0 0 12px'
            }}>
              Sample Box &amp; Complete Catalog
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '640px',
              margin: '0 0 24px'
            }}>
              For funeral homes, mortuaries, and chapels: request a complimentary physical presentation box with printed paper swatches, lamination samples, and keepsake specimens. You can also review our digital flipbook anytime. Questions? Call our studio directly at (917) 300-1104.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => setFlipbookOpen(true)}
                className="b bg"
                style={{
                  padding: '13px 26px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                }}
              >
                Open Digital Flipbook Catalog
              </button>

              <Link
                href="/funeral-service-providers#sample-box"
                className="b"
                style={{
                  padding: '13px 26px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  background: 'transparent',
                  borderColor: '#ffffff',
                  color: '#ffffff'
                }}
              >
                Request Sample Box (Funeral Professionals) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Flipbook Modal Overlay */}
      {flipbookOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(10, 16, 13, 0.85)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setFlipbookOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              maxWidth: '900px',
              width: '100%',
              padding: '28px',
              position: 'relative',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFlipbookOpen(false)}
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
              <X size={24} />
            </button>

            <div style={{
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1f6f68',
              fontWeight: 700,
              marginBottom: '6px'
            }}>
              Digital Catalog Viewer
            </div>
            <h3 className="s" style={{ fontSize: '26px', color: '#262626', marginBottom: '8px' }}>
              Lilies of the Field Memorial Catalog (Edition 2026)
            </h3>
            <p style={{ fontSize: '14px', color: '#666', maxWidth: '620px', margin: '0 auto 24px' }}>
              Full digital flipbook with all collections, paper weights, lamination specs, and order instructions.
            </p>

            <div style={{
              aspectRatio: '16 / 9',
              background: '#f5efe6',
              borderRadius: '6px',
              border: '2px dashed #dcd3c4',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px'
            }}>
              <BookOpen size={48} color="#1f6f68" style={{ marginBottom: '16px' }} />
              <div className="s" style={{ fontSize: '20px', color: '#262626', marginBottom: '6px' }}>
                Interactive Flipbook Active
              </div>
              <p style={{ fontSize: '13px', color: '#666', maxWidth: '440px', margin: '0 0 16px' }}>
                To embed your preferred flipbook platform (e.g. Issuu, Heyzine, or PDF.js viewer), connect your publication link directly in the catalog configuration.
              </p>
              <button
                onClick={() => setFlipbookOpen(false)}
                className="b b1"
                style={{ fontSize: '12px' }}
              >
                Close Catalog Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Inquiry Modal (Specifications & Transfer to Order Form) */}
      <OrderInquiryModal
        isOpen={!!orderModalDesign}
        onClose={() => setOrderModalDesign(null)}
        design={orderModalDesign}
      />
    </div>
  )
}
