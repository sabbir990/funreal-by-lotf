'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Check, 
  MessageSquare, 
  ArrowRight, 
  QrCode, 
  Smartphone, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Image as ImageIcon,
  ChevronDown
} from 'lucide-react'

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState('Classic Memorial Programs (4-Page Bifold)')
  const [isRush, setIsRush] = useState(false)
  const [readyDate, setReadyDate] = useState('Thursday, October 29')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const productOptions = [
    'Classic Memorial Programs (4-Page Bifold)',
    'Tri-Fold Memorial Programs (6-Page)',
    'Memorial Booklets (8–12 Pages)',
    'Laminated Prayer Cards & Keepsakes',
    'Easel Welcome Signs & Tribute Displays',
    'Digital Memorial & QR Keepsake Program'
  ]

  // Calculate dynamic business-day ready date
  useEffect(() => {
    function computeReadyDate(rush: boolean) {
      const now = new Date()
      const daysToAdd = rush ? 1 : 3
      let count = 0
      const current = new Date(now)

      if (now.getHours() >= 18) {
        current.setDate(current.getDate() + 1)
      }

      while (count < daysToAdd) {
        current.setDate(current.getDate() + 1)
        const day = current.getDay()
        // Skip weekend (0 = Sunday, 6 = Saturday)
        if (day !== 0 && day !== 6) {
          count++
        }
      }

      return current.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })
    }

    setReadyDate(computeReadyDate(isRush))
  }, [isRush])

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* 1. HERO SECTION (Full-Width Gradient Edge-to-Edge) */}
      <section style={{
        background: 'linear-gradient(120deg, #dfe9e5 0%, #f1e8da 100%)',
        width: '100%',
        position: 'relative',
        paddingTop: '28px',
        paddingBottom: '48px',
        borderBottom: '1px solid var(--border-hero)'
      }}>
        <div className="site-container" style={{ position: 'relative' }}>
          {/* Slideshow note */}
          <div style={{
            fontSize: '11px',
            color: '#4f6560',
            letterSpacing: '0.04em',
            marginBottom: '16px'
          }}>
            [ Full-width photo / video slideshow behind hero ]
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'start'
          }}>
            {/* Left column */}
            <div style={{ paddingTop: '8px' }}>
              <p className="eb">
                Bespoke Memorial Design &amp; Fine Printing · Brooklyn, NY
              </p>

              <h1 className="s" style={{
                fontSize: 'clamp(36px, 4.4vw, 56px)',
                lineHeight: 1.12,
                color: '#262626',
                marginBottom: '20px'
              }}>
                Every Life Deserves to Be Celebrated
              </h1>

              <p style={{
                fontSize: 'clamp(16px, 1.3vw, 18px)',
                lineHeight: 1.6,
                margin: '0 0 28px',
                color: '#333',
                maxWidth: '620px'
              }}>
                Premium memorial programs, prayer cards, photo keepsakes and tribute pieces thoughtfully created to honor every life and every story.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="#collection" className="b b1">
                  Explore Our Collection →
                </Link>
                <Link href="#calculator" className="b">
                  Place an Order
                </Link>
                <Link href="/services#providers" className="b bg">
                  Funeral Service Providers
                </Link>
              </div>

              <div style={{
                display: 'flex',
                gap: '24px',
                marginTop: '28px',
                paddingTop: '18px',
                borderTop: '1px solid #cfd9d4',
                fontSize: '13px',
                color: '#444',
                flexWrap: 'wrap'
              }}>
                <span>✓ Coordinated Matching Suites</span>
                <span>✓ Direct Chapel &amp; Home Delivery Options</span>
              </div>

              {/* Testimonial Box */}
              <div style={{
                marginTop: '28px',
                background: '#ffffff',
                borderRadius: '4px',
                padding: '18px 22px',
                maxWidth: '500px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.06)'
              }}>
                <p className="s" style={{
                  fontSize: '17px',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: '#262626'
                }}>
                  &ldquo;[ Client testimonial quote goes here ]&rdquo;
                </p>
                <p style={{ fontSize: '12px', color: '#555', margin: '8px 0 0' }}>
                  — [ Name, Funeral Home ]
                </p>
              </div>
            </div>

            {/* Right column: Estimated Order Ready Date Calculator */}
            <div id="calculator" style={{
              background: '#ffffff',
              border: '1px solid #e0d5c2',
              borderRadius: '6px',
              padding: 'clamp(20px, 3vw, 32px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
              position: 'relative'
            }}>
              <h2 className="s" style={{ fontSize: '24px', color: '#262626' }}>
                Estimated Order Ready Date
              </h2>

              <p style={{
                fontSize: '12px',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: '#444',
                margin: '18px 0 8px',
                fontWeight: 700
              }}>
                What are you ordering?
              </p>

              {/* Dropdown */}
              <div style={{ position: 'relative' }}>
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    border: '1px solid #cfcfcf',
                    borderRadius: '4px',
                    padding: '12px 14px',
                    fontSize: '14px',
                    color: '#262626',
                    background: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {selectedProduct}
                  </span>
                  <ChevronDown size={16} color="#888" style={{ flexShrink: 0, marginLeft: '8px' }} />
                </div>

                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    border: '1px solid #cfcfcf',
                    borderRadius: '4px',
                    marginTop: '4px',
                    zIndex: 50,
                    boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
                  }}>
                    {productOptions.map((opt) => (
                      <div 
                        key={opt}
                        onClick={() => {
                          setSelectedProduct(opt)
                          setIsDropdownOpen(false)
                        }}
                        style={{
                          padding: '10px 14px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #f2f2f2',
                          background: selectedProduct === opt ? '#f5efe6' : 'transparent',
                          color: selectedProduct === opt ? '#1f6f68' : '#333'
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ready Date Notice Box */}
              <div style={{
                border: `1px solid ${isRush ? '#c9963b' : '#e0e0e0'}`,
                background: isRush ? '#fefcf8' : '#faf8f4',
                borderRadius: '4px',
                padding: '16px',
                marginTop: '14px',
                transition: 'all 0.2s ease'
              }}>
                <div style={{
                  fontSize: '11px',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: isRush ? '#c9963b' : '#1f6f68',
                  fontWeight: 700
                }}>
                  {isRush ? '⚡ Expedited Rush Production' : 'Standard production'}
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  marginTop: '4px',
                  color: '#262626'
                }}>
                  If you order today, your order will be ready by <span style={{ color: isRush ? '#c9963b' : '#1f6f68' }}>{readyDate}</span>.
                </div>
              </div>

              {/* Rush checkbox */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13.5px',
                margin: '16px 0',
                cursor: 'pointer',
                color: '#333'
              }}>
                <input 
                  type="checkbox" 
                  checked={isRush}
                  onChange={(e) => setIsRush(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#1f6f68', cursor: 'pointer' }}
                />
                <span>Need it sooner? Select expedited rush turnaround</span>
              </label>

              <p className="tx" style={{ fontSize: '12.5px', lineHeight: 1.55 }}>
                <b>Daily cutoff: 6:00 PM ET (Mon–Fri).</b> All orders received after this time will be processed next business day. Estimated date; production begins after payment and all required materials are received. Delivery time is separate. Rush is subject to approval.
              </p>
            </div>
          </div>


        </div>
      </section>

      {/* 2. PROFESSIONAL PARTNERSHIP (Edge-to-Edge Forest Teal Ribbon) */}
      <section style={{
        background: '#1f6f68',
        color: '#ffffff',
        width: '100%',
        paddingTop: '48px',
        paddingBottom: '48px'
      }}>
        <div className="site-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          <div style={{ maxWidth: '760px' }}>
            <p className="eb" style={{ color: '#e9c98a' }}>
              Professional Partnership
            </p>
            <h2 className="s" style={{ fontSize: 'clamp(24px, 2.5vw, 34px)', lineHeight: 1.25, color: '#ffffff' }}>
              Reliable Memorial Design and Production Support for Funeral Professionals
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              margin: '12px 0 0',
              color: '#e8f1ef'
            }}>
              We partner with funeral homes, mortuary directors, and celebrants across the New York metropolitan area to deliver flawless keepsakes, strict deadline execution, and direct chapel delivery.
            </p>
          </div>
          <Link href="/services#providers" className="b bg" style={{ whiteSpace: 'nowrap' }}>
            Funeral Service Providers Program
          </Link>
        </div>
      </section>

      {/* 3. HANDCRAFTED TRIBUTES (OUR COLLECTION 4-GRID) */}
      <section id="collection" className="section-padding" style={{ width: '100%', background: '#ffffff', textAlign: 'center' }}>
        <div className="site-container">
          <p className="eb">Handcrafted Tributes</p>
          <h2 className="s" style={{ fontSize: 'clamp(28px, 3.2vw, 38px)', color: '#262626' }}>
            Thoughtfully Coordinated Memorial Keepsakes
          </h2>
          <p style={{
            maxWidth: '680px',
            margin: '14px auto 40px',
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#555'
          }}>
            Each keepsake is thoughtfully designed to reflect your loved one’s unique life and legacy. Through personalized details, meaningful photographs, and beautifully coordinated designs, we create lasting tributes that honor cherished memories.
          </p>

          <div className="g4" style={{ textAlign: 'left' }}>
            {/* Card 1: Memorial Programs */}
            <div className="cd">
              <div className="im">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80" 
                  alt="Memorial Programs"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="cb">
                <h3 className="ct">Memorial Programs</h3>
                <p className="tx">
                  Classic Standard and Premium programs, inserts, photo collages, booklets, and tri-folds — thoughtfully designed and beautifully printed to honor every life and every story.
                </p>
                <Link href="/services#programs">
                  <p className="eb" style={{ margin: '14px 0 0', cursor: 'pointer' }}>
                    Explore Programs →
                  </p>
                </Link>
              </div>
            </div>

            {/* Card 2: Digital Memorials */}
            <div className="cd">
              <div className="im">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" 
                  alt="Digital Memorials"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="cb">
                <h3 className="ct">Digital Memorials</h3>
                <p className="tx">
                  Mobile-friendly digital programs accessible through a custom QR code. Seamless viewing from any device, anywhere.
                </p>
                <Link href="/services#digital">
                  <p className="eb" style={{ margin: '14px 0 0', cursor: 'pointer' }}>
                    Explore Digital →
                  </p>
                </Link>
              </div>
            </div>

            {/* Card 3: Prayer Cards */}
            <div className="cd">
              <div className="im">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" 
                  alt="Prayer Cards &amp; Keepsakes"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="cb">
                <h3 className="ct">Prayer Cards &amp; Keepsakes</h3>
                <p className="tx">
                  Laminated prayer cards · Bookmarks · Tribute cards · Register &amp; guest books that guests hold close for years.
                </p>
                <Link href="/services#prayer-cards">
                  <p className="eb" style={{ margin: '14px 0 0', cursor: 'pointer' }}>
                    Explore Keepsakes →
                  </p>
                </Link>
              </div>
            </div>

            {/* Card 4: Photo & Tribute Products */}
            <div className="cd">
              <div className="im">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80" 
                  alt="Photo &amp; Tribute Products"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="cb">
                <h3 className="ct">Photo &amp; Tribute Products</h3>
                <p className="tx">
                  Posters · Easel Welcome Signs · Large Format displays · Casket Panels celebrating their journey with dignity.
                </p>
                <Link href="/services#displays">
                  <p className="eb" style={{ margin: '14px 0 0', cursor: 'pointer' }}>
                    Explore Displays →
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '36px' }}>
            <Link href="/services" className="b b1">
              View Our Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 4. OUR PHILOSOPHY SECTION (Full-Width Cream Section) */}
      <section className="section-padding" style={{ width: '100%', background: 'var(--bg-cream)', borderTop: '1px solid #e8dfd2', borderBottom: '1px solid #e8dfd2' }}>
        <div className="site-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'center'
          }}>
            <div>
              <p className="eb">Our Philosophy</p>
              <h2 className="s" style={{ fontSize: 'clamp(28px, 3vw, 36px)', color: '#262626' }}>
                Creating a Meaningful Tribute
              </h2>
              <p style={{
                fontSize: '16px',
                lineHeight: 1.7,
                margin: '18px 0',
                color: '#444'
              }}>
                At Lilies of the Field, we believe that honoring a loved one is not merely about printing paper—it is about capturing the essence of a soul, their triumphs, their humor, their faith, and their lasting legacy in a form that families cherish forever.
              </p>
              <p className="s" style={{
                fontSize: '22px',
                fontStyle: 'italic',
                color: '#1f6f68',
                marginBottom: '22px'
              }}>
                “Their life. Their story. Beautifully remembered.”
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/services#resources" className="b b1">
                  Explore Memorial Guides
                </Link>
                <Link href="/services#about" className="b">
                  About Our Studio
                </Link>
              </div>
            </div>

            {/* Right Studio Mockup */}
            <div className="im" style={{ height: '320px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80" 
                alt="Lilies of the Field Studio"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                insetInline: 0,
                padding: '12px 18px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em'
              }}>
                Lilies of the Field Design Studio · Brooklyn, NY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (5 STEPS) */}
      <section className="section-padding" style={{ width: '100%', background: '#ffffff', textAlign: 'center' }}>
        <div className="site-container">
          <p className="eb">Seamless Experience</p>
          <h2 className="s" style={{ fontSize: 'clamp(28px, 3.2vw, 36px)', color: '#262626' }}>
            How It Works
          </h2>
          <p style={{ color: '#555', margin: '12px 0 36px', fontSize: '16px' }}>
            Five clear, supported steps from initial concept to printed perfection.
          </p>

          <div className="g5" style={{ textAlign: 'center' }}>
            <div className="cd cb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90px' }}>
              <h3 className="ct" style={{ fontSize: '16px', margin: 0, lineHeight: 1.3 }}>
                1 · Select Your Memorial Products
              </h3>
            </div>
            <div className="cd cb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90px' }}>
              <h3 className="ct" style={{ fontSize: '16px', margin: 0, lineHeight: 1.3 }}>
                2 · Submit Your Content
              </h3>
            </div>
            <div className="cd cb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90px' }}>
              <h3 className="ct" style={{ fontSize: '16px', margin: 0, lineHeight: 1.3 }}>
                3 · We Create Your Design
              </h3>
            </div>
            <div className="cd cb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90px' }}>
              <h3 className="ct" style={{ fontSize: '16px', margin: 0, lineHeight: 1.3 }}>
                4 · Review &amp; Approve
              </h3>
            </div>
            <div className="cd cb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90px' }}>
              <h3 className="ct" style={{ fontSize: '16px', margin: 0, lineHeight: 1.3 }}>
                5 · Printing &amp; Delivery
              </h3>
            </div>
          </div>

          <div style={{ marginTop: '36px' }}>
            <Link href="/services#order" className="b bg">
              Begin Your Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE KEEPSAKES / DIGITAL PROGRAMS */}
      <section className="section-padding" style={{ width: '100%', background: 'var(--bg-cream)', borderTop: '1px solid #e8dfd2', borderBottom: '1px solid #e8dfd2' }}>
        <div className="site-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(24px, 4vw, 64px)',
            alignItems: 'center'
          }}>
            <div>
              <p className="eb">Interactive Keepsakes</p>
              <h2 className="s" style={{ fontSize: 'clamp(28px, 3.2vw, 38px)', lineHeight: 1.2, color: '#262626' }}>
                Their Story. Their Memories.<br />Always Within Reach.
              </h2>
              <p style={{
                fontSize: '16px',
                lineHeight: 1.7,
                margin: '18px 0',
                color: '#444'
              }}>
                Connect friends and family across the globe with an interactive digital memorial. Easily accessible from printed programs and cards via personalized QR code, guests can open the full tribute program on any mobile phone or computer.
              </p>
              <p className="tx" style={{ marginBottom: '22px', lineHeight: 1.6 }}>
                Choose between a convenient Digital Memorial Program or a comprehensive Legacy Tribute Webpage, which includes a full life story, video embed, multi-photo gallery, and condolence guestbook.
              </p>
              <Link href="/services#digital" className="b b1">
                Explore Digital Memorials
              </Link>
            </div>

            {/* Mockup visual with QR badge */}
            <div className="im" style={{ height: '320px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80" 
                alt="Interactive Mobile Memorial"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(92%)' }}
              />
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px'
              }}>
                <QrCode size={52} color="#1f6f68" />
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#1f6f68', letterSpacing: '0.06em' }}>SCAN DEMO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ONLINE TRIBUTES (FOREVER REMEMBERED 3-GRID) */}
      <section className="section-padding" style={{ width: '100%', background: '#ffffff' }}>
        <div className="site-container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <p className="eb">Online Tributes</p>
              <h2 className="s" style={{ fontSize: 'clamp(28px, 3.2vw, 36px)', color: '#262626' }}>
                Remembering Lives. Preserving Legacies.
              </h2>
              <p style={{ color: '#555', margin: '10px 0 0', fontSize: '16px' }}>
                Browse recent commemorative programs and legacy tributes celebrated through Lilies of the Field.
              </p>
            </div>
            <Link href="/memorials" className="b">
              Forever Remembered Tributes
            </Link>
          </div>

          <div className="g3">
            {/* Tribute 1 */}
            <div className="cd">
              <div className="im" style={{ height: '280px', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=800&h=650&q=80" 
                  alt="Eleanor Grace Dawson"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%'
                  }}
                />
              </div>
              <div className="cb">
                <h3 className="ct">Eleanor Grace Dawson</h3>
                <p className="tx" style={{ color: '#a87a22', fontWeight: 600 }}>
                  1948 — 2024
                </p>
                <Link href="/memorials/eleanor-grace-dawson">
                  <p className="eb" style={{ margin: '14px 0 0', cursor: 'pointer' }}>
                    Visit Legacy Tribute →
                  </p>
                </Link>
              </div>
            </div>

            {/* Tribute 2 */}
            <div className="cd">
              <div className="im" style={{ height: '280px', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&w=800&h=650&q=80" 
                  alt="Robert James Miller"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%'
                  }}
                />
              </div>
              <div className="cb">
                <h3 className="ct">Robert James Miller</h3>
                <p className="tx" style={{ color: '#a87a22', fontWeight: 600 }}>
                  1935 — 2023
                </p>
                <Link href="/memorials/robert-james-miller">
                  <p className="eb" style={{ margin: '14px 0 0', cursor: 'pointer' }}>
                    View Memorial Program →
                  </p>
                </Link>
              </div>
            </div>

            {/* Tribute 3 */}
            <div className="cd">
              <div className="im" style={{ height: '280px', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&crop=faces&w=800&h=650&q=80" 
                  alt="Elizabeth Mae Reed"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center'
                  }}
                />
              </div>
              <div className="cb">
                <h3 className="ct">Elizabeth Mae Reed</h3>
                <p className="tx" style={{ color: '#a87a22', fontWeight: 600 }}>
                  1951 — 2023
                </p>
                <Link href="/memorials/elizabeth-mae-reed">
                  <p className="eb" style={{ margin: '14px 0 0', cursor: 'pointer' }}>
                    Visit Legacy Tribute →
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <p className="tx" style={{
            textAlign: 'center',
            fontSize: '12px',
            marginTop: '22px',
            color: '#777'
          }}>
            Note: Only families who grant public consent are featured in Forever Remembered. Private memorials remain strictly unlisted and accessible only by private link.
          </p>
        </div>
      </section>

      {/* 8. CONSULTATION / WE'RE HERE TO HELP */}
      <section className="section-padding" style={{
        background: '#faf8f4',
        width: '100%',
        textAlign: 'center',
        borderTop: '1px solid #eee'
      }}>
        <div className="site-container">
          <h2 className="s" style={{ fontSize: 'clamp(26px, 3vw, 34px)', color: '#262626' }}>
            Not Sure Where to Begin? We’re Here to Help.
          </h2>
          <p style={{
            maxWidth: '640px',
            margin: '14px auto 28px',
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#444'
          }}>
            Planning a service can feel overwhelming. Our experienced memorial team is ready to answer questions, guide your content selection, or walk you through sample arrangements during a one-on-one virtual consultation.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services#resources" className="b b1">
              Visit Our Resources &amp; Guides
            </Link>
            <Link href="/services#consultation" className="b">
              Schedule a Virtual Consultation
            </Link>
            <a href="mailto:orders@liliesofthefield.design" className="b bg">
              Chat With Us
            </a>
          </div>
        </div>
      </section>

      {/* Pinned Bottom-Right "Message Our Team" Floating Action Button */}
      <a 
        href="mailto:orders@liliesofthefield.design" 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: '#1f6f68',
          color: '#ffffff',
          padding: '14px 24px',
          borderRadius: '50px',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '.08em',
          textDecoration: 'none',
          textTransform: 'uppercase',
          boxShadow: '0 8px 24px rgba(31, 111, 104, 0.45)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '9px',
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
