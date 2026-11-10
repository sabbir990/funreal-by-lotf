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
            A dedicated visual gallery for families and funeral homes to browse by collection, examine designs flat inside and out, and request tailored print orders. This is a gallery, not a store: pricing is quoted per order to accommodate your family’s exact format, quantity, and turnaround.
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
              <CheckCircle2 size={14} color="#1f6f68" /> Shown Flat (Front Cover &amp; Inside Spread)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={14} color="#1f6f68" /> Sample Layouts (Fully Customizable)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={14} color="#1f6f68" /> Quoted Per Order — Direct Studio Support
            </span>
          </div>
        </div>
      </section>

      {/* 2. Page 1 — Six Collection Tiles Grid */}
      <section className="section-padding" style={{ width: '100%', background: '#ffffff' }}>
        <div className="site-container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div className="eb">Browse By Theme</div>
              <h2 className="s" style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#262626', margin: 0 }}>
                Six Signature Collections
              </h2>
            </div>
            <p style={{ fontSize: '13.5px', color: '#666', margin: 0, maxWidth: '420px' }}>
              Select any collection tile to filter designs or view each program’s flat cover and open inside spread.
            </p>
          </div>

          {/* 3-Column Tile Grid matching mockup */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '24px'
          }}>
            {GALLERY_COLLECTIONS.map((col) => {
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
                  {/* Cover Design - Flat View Container */}
                  <div style={{
                    background: '#f2ece1',
                    padding: '24px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #e8dfd2',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#777',
                      background: 'rgba(255,255,255,0.85)',
                      padding: '3px 8px',
                      borderRadius: '2px'
                    }}>
                      COVER DESIGN — FLAT VIEW
                    </div>

                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      fontSize: '11px',
                      color: '#1f6f68',
                      fontWeight: 700,
                      background: '#dfe9e5',
                      padding: '3px 8px',
                      borderRadius: '12px'
                    }}>
                      {count} {count === 1 ? 'Design' : 'Designs'}
                    </div>

                    {matchingDesign && (
                      <div style={{ width: '180px', marginTop: '16px' }}>
                        <CoverFlatView design={matchingDesign} showLabel={false} />
                      </div>
                    )}
                  </div>

                  {/* Tile Information */}
                  <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 className="s" style={{
                        fontSize: '21px',
                        fontWeight: 600,
                        color: '#262626',
                        margin: '0 0 6px'
                      }}>
                        {col.name}
                      </h3>
                      <p style={{
                        fontSize: '13.5px',
                        color: '#555',
                        margin: '0 0 16px',
                        lineHeight: 1.5
                      }}>
                        {col.description}
                      </p>
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#1f6f68',
                      borderTop: '1px solid #ebd8b5',
                      paddingTop: '12px'
                    }}>
                      VIEW DESIGNS &gt;
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
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
              Click any design to view its <strong>front cover beside its open inside spread (Sample Layout)</strong>, examine available formats, and carry its design number directly into your order request.
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
                placeholder="Search by design number (e.g. 101), title, or collection..."
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
                Collection:
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
                    {c.name} ({count})
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
                  {/* Flat Cover Preview */}
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
                        <Eye size={14} /> View Inside Spread
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

      {/* 4. Flipbook "View Full Catalog" Section (as specified in client prompt) */}
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
              Interactive Catalog
            </div>

            <h2 className="s" style={{
              fontSize: 'clamp(24px, 3.2vw, 36px)',
              lineHeight: 1.25,
              color: '#ffffff',
              margin: '0 0 12px'
            }}>
              Prefer to View the Full Catalog?
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '640px',
              margin: '0 0 24px'
            }}>
              You can explore our complete print catalog as a digital flipbook or request printed catalog swatches delivered directly to your funeral home or chapel.
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
                href="/funeral-service-providers"
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
                Request Physical Catalog &amp; Sample Box
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
              Full digital flipbook with all 6 collections, paper weights, lamination specs, and order instructions.
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

      {/* Order Inquiry Modal */}
      <OrderInquiryModal
        isOpen={!!orderModalDesign}
        onClose={() => setOrderModalDesign(null)}
        design={orderModalDesign}
      />
    </div>
  )
}

