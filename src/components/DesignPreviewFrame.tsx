'use client'

import React from 'react'
import { GalleryDesign } from '@/data/galleryData'

interface CoverFlatProps {
  design: GalleryDesign
  height?: string | number
  className?: string
  showLabel?: boolean
}

export function CoverFlatView({ design, showLabel = true }: CoverFlatProps) {
  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#777',
          marginBottom: '10px'
        }}>
          FRONT COVER
        </div>
      )}

      {/* Flat Book Cover Frame */}
      <div 
        style={{
          width: '100%',
          maxWidth: '340px',
          margin: '0 auto',
          aspectRatio: '1 / 1.414', // Classic A5/Half-Letter program ratio
          background: '#ffffff',
          boxShadow: '0 12px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #dcd3c4',
          borderRadius: '3px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Artwork Header */}
        <div style={{
          height: '52%',
          width: '100%',
          backgroundImage: `url(${design.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          borderBottom: '2px solid #c9963b'
        }}>
          {/* Subtle gradient vignette */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
          }} />

          {/* Sample Photo Inset */}
          <div style={{
            position: 'absolute',
            bottom: '-28px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '3px solid #ffffff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            background: '#faf8f4 url(https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=200&h=200&q=80) center/cover no-repeat',
            zIndex: 2
          }} />
        </div>

        {/* Text Area */}
        <div style={{
          flex: 1,
          padding: '38px 20px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fdfbf7',
          textAlign: 'center'
        }}>
          <div>
            <div style={{
              fontSize: '9.5px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: '3px'
            }}>
              In Loving Celebration Of
            </div>
            <div className="s" style={{
              fontSize: '17px',
              fontWeight: 600,
              color: '#1a1a1a',
              lineHeight: 1.2,
              marginBottom: '4px'
            }}>
              Eleanor Grace Dawson
            </div>
            <div style={{
              fontSize: '10.5px',
              color: '#666',
              letterSpacing: '0.08em'
            }}>
              April 12, 1948 – February 18, 2024
            </div>
          </div>

          <div style={{
            width: '100%',
            paddingTop: '8px',
            borderTop: '1px solid #ebd8b5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '9px',
            color: '#777',
            letterSpacing: '0.06em'
          }}>
            <span style={{ fontWeight: 600, color: '#1f6f68' }}>{design.title}</span>
            <span>Design No. {design.designNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InsideSpreadProps {
  design: GalleryDesign
  showLabel?: boolean
}

export function InsideSpreadView({ design, showLabel = true }: InsideSpreadProps) {
  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#777'
          }}>
            INSIDE SPREAD
          </div>
          {/* Black Badge Label as shown in Mockup */}
          <div style={{
            background: '#0a100d',
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '2px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)'
          }}>
            SAMPLE LAYOUT
          </div>
        </div>
      )}

      {/* Flat Open Booklet Double-Spread */}
      <div 
        style={{
          width: '100%',
          aspectRatio: '2 / 1.35', // Realistic open booklet aspect ratio
          background: '#ffffff',
          boxShadow: '0 12px 36px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.06)',
          border: '1px solid #dcd3c4',
          borderRadius: '3px',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}
      >
        {/* Center Spine Fold Shadow */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '24px',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(to right, rgba(0,0,0,0.06), rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.06))',
          pointerEvents: 'none',
          zIndex: 10
        }} />

        {/* Left Page: Order of Service */}
        <div style={{
          padding: 'clamp(14px, 2.5vw, 28px)',
          background: '#faf8f4',
          borderRight: '1px solid #efe8dc',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div>
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#1f6f68',
              fontWeight: 700,
              marginBottom: '4px'
            }}>
              Order of Service
            </div>
            <div className="s" style={{
              fontSize: 'clamp(13px, 1.6vw, 18px)',
              fontWeight: 600,
              color: '#262626',
              borderBottom: '1px solid #e0d5c2',
              paddingBottom: '8px',
              marginBottom: '10px'
            }}>
              Celebration of Life
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: 'clamp(9px, 1.1vw, 11px)',
              color: '#444'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Musical Prelude</span>
                <span style={{ color: '#777' }}>Organist</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Processional</span>
                <span style={{ color: '#777' }}>Clergy &amp; Family</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Scripture Reading</span>
                <span style={{ color: '#777' }}>Psalm 23</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Musical Selection</span>
                <span style={{ color: '#777' }}>Choir</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Reflections &amp; Tributes</span>
                <span style={{ color: '#777' }}>Family &amp; Friends</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>The Eulogy</span>
                <span style={{ color: '#777' }}>Rev. Marcus Sterling</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Recessional</span>
                <span style={{ color: '#777' }}>Going Home</span>
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '9px',
            color: '#888',
            fontStyle: 'italic',
            textAlign: 'center',
            borderTop: '1px solid #ebd8b5',
            paddingTop: '6px'
          }}>
            “Peace I leave with you; my peace I give you.” — John 14:27
          </div>
        </div>

        {/* Right Page: Obituary & Loving Life Reflections */}
        <div style={{
          padding: 'clamp(14px, 2.5vw, 28px)',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div>
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#c9963b',
              fontWeight: 700,
              marginBottom: '4px'
            }}>
              Obituary &amp; Legacy
            </div>
            <div className="s" style={{
              fontSize: 'clamp(13px, 1.6vw, 18px)',
              fontWeight: 600,
              color: '#262626',
              borderBottom: '1px solid #e0d5c2',
              paddingBottom: '8px',
              marginBottom: '10px'
            }}>
              Her Story &amp; Cherished Memories
            </div>

            {/* Small Sample Photo Strip */}
            <div style={{
              display: 'flex',
              gap: '6px',
              marginBottom: '10px'
            }}>
              <div style={{
                flex: 1,
                aspectRatio: '4 / 3',
                background: '#eee url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&w=150&h=110&q=80) center/cover no-repeat',
                borderRadius: '2px',
                border: '1px solid #ddd'
              }} />
              <div style={{
                flex: 1,
                aspectRatio: '4 / 3',
                background: '#eee url(https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&crop=faces&w=150&h=110&q=80) center/cover no-repeat',
                borderRadius: '2px',
                border: '1px solid #ddd'
              }} />
            </div>

            <p style={{
              fontSize: 'clamp(8.5px, 1vw, 10.5px)',
              color: '#555',
              lineHeight: 1.5,
              margin: 0
            }}>
              Eleanor touched countless hearts with her quiet wisdom and luminous warmth. Throughout seventy-five glorious years, she dedicated herself to her family, community, and the beauty of song...
            </p>
          </div>

          <div style={{
            fontSize: '9px',
            color: '#777',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #ebd8b5',
            paddingTop: '6px'
          }}>
            <span>The Dawson Family</span>
            <span style={{ fontWeight: 600, color: '#1f6f68' }}>Acknowledgements</span>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer from Client Mockup */}
      <p style={{
        fontSize: '12.5px',
        color: '#666',
        fontStyle: 'italic',
        marginTop: '12px',
        lineHeight: 1.5
      }}>
        Shown as a sample layout. Your program is customized — photo placement and content are arranged around your loved one’s information.
      </p>
    </div>
  )
}

interface BackCoverProps {
  design: GalleryDesign
  showLabel?: boolean
}

export function BackCoverView({ design, showLabel = true }: BackCoverProps) {
  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#777'
          }}>
            BACK COVER
          </div>
          <div style={{
            background: '#0a100d',
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '2px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)'
          }}>
            SAMPLE LAYOUT
          </div>
        </div>
      )}

      {/* Flat Back Cover Frame */}
      <div 
        style={{
          width: '100%',
          maxWidth: '340px',
          margin: '0 auto',
          aspectRatio: '1 / 1.414',
          background: '#ffffff',
          boxShadow: '0 12px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #dcd3c4',
          borderRadius: '3px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Subtle Decorative Header Strip */}
        <div style={{
          height: '24px',
          width: '100%',
          backgroundImage: `url(${design.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid #c9963b',
          opacity: 0.9
        }} />

        {/* Back Cover Body Content */}
        <div style={{
          flex: 1,
          padding: '20px 22px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fdfbf7',
          textAlign: 'center'
        }}>
          {/* Poem / Prayer Section */}
          <div>
            <div style={{
              fontSize: '9.5px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#c9963b',
              fontWeight: 700,
              marginBottom: '6px'
            }}>
              Poem of Remembrance
            </div>
            <div style={{
              fontSize: '10px',
              fontStyle: 'italic',
              color: '#444',
              lineHeight: 1.5,
              maxWidth: '280px',
              margin: '0 auto 14px',
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '3px',
              border: '1px solid #efe8dc'
            }}>
              “Don’t grieve for me, for now I’m free;<br />
              I’m following the path God laid for me.<br />
              I took His hand when I heard Him call,<br />
              I turned my back and left it all.”
            </div>

            {/* Pallbearers & Honorary Section */}
            <div style={{
              borderTop: '1px solid #ebd8b5',
              paddingTop: '10px',
              marginBottom: '10px',
              textAlign: 'left'
            }}>
              <div style={{
                fontSize: '8.5px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1f6f68',
                marginBottom: '4px'
              }}>
                Active Pallbearers
              </div>
              <div style={{
                fontSize: '9px',
                color: '#555',
                lineHeight: 1.45,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2px 8px'
              }}>
                <span>Marcus Dawson</span>
                <span>Anthony Davis</span>
                <span>David Jenkins</span>
                <span>Robert Williams</span>
                <span>Terrence Miller</span>
                <span>Christopher Lee</span>
              </div>
            </div>

            {/* Interment Section */}
            <div style={{
              background: '#f5efe6',
              padding: '6px 10px',
              borderRadius: '3px',
              marginBottom: '10px',
              fontSize: '8.5px',
              color: '#555',
              textAlign: 'center'
            }}>
              <strong style={{ color: '#262626' }}>Final Resting Place (Interment):</strong><br />
              Green-Wood Cemetery · Brooklyn, New York
            </div>

            {/* Acknowledgements Section */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '8.5px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#262626',
                marginBottom: '3px'
              }}>
                Acknowledgements
              </div>
              <p style={{
                fontSize: '8px',
                color: '#666',
                lineHeight: 1.4,
                margin: 0
              }}>
                The family wishes to express their heartfelt gratitude for every act of sympathy, comforting prayer, floral tribute, and kind thought shown during our time of sorrow. May God bless each of you.
              </p>
            </div>
          </div>

          {/* Footer Colophon */}
          <div style={{
            borderTop: '1px solid #ebd8b5',
            paddingTop: '8px',
            fontSize: '8px',
            color: '#888',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 600, color: '#1f6f68' }}>Lilies of the Field</span>
            <span>Design No. {design.designNumber}</span>
          </div>
        </div>
      </div>

      <p style={{
        fontSize: '12px',
        color: '#666',
        fontStyle: 'italic',
        marginTop: '10px',
        textAlign: 'center',
        lineHeight: 1.45
      }}>
        Visual reference only. Families provide their actual poem, pallbearers, interment details, and acknowledgments during ordering.
      </p>
    </div>
  )
}
