'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Heart, 
  Sparkles, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Bookmark, 
  FileText, 
  BookOpen, 
  Award, 
  ArrowRight, 
  Phone, 
  Mail, 
  MessageSquare, 
  X, 
  Check, 
  ChevronDown,
  Zap,
  Info
} from 'lucide-react'

interface ProductItem {
  id: string
  title: string
  series: string
  turnaroundDays: number
  turnaroundLabel: string
  description: string
  features: string[]
  recommendedQty?: string
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'prayer-cards',
    series: 'Keepsake Series',
    turnaroundDays: 3,
    turnaroundLabel: '3 business days',
    title: 'Laminated Memorial Prayer Cards',
    description: 'Modern 2.5" x 4.25" wallet-sized memorial prayer cards sealed in protective gloss laminate. Features a loving portrait on the front with your chosen prayer, poem, or scripture on the back.',
    features: [
      'Standard 2.5" x 4.25" pocket size',
      'Durable heat-sealed lamination',
      'Rounded corners',
      'Many design options to choose from'
    ],
    recommendedQty: '100 - 250 units'
  },
  {
    id: 'wake-cards',
    series: 'Keepsake Series',
    turnaroundDays: 3,
    turnaroundLabel: '3 business days',
    title: 'Tribute Wake Cards',
    description: 'Concise flat double-sided cards designed specifically for viewing visitations, prayer services, and evening wake gatherings where a full booklet is not needed.',
    features: [
      'Streamlined 2-page flat format',
      'Fast production turnaround',
      'Photo, service schedule, and family note',
      'Coordinating design themes'
    ],
    recommendedQty: '75 - 200 units'
  },
  {
    id: 'bookmarks',
    series: 'Keepsake Series',
    turnaroundDays: 3,
    turnaroundLabel: '3 business days',
    title: 'Memorial Keepsake Bookmarks',
    description: 'Long-format 2.5" x 7" laminated keepsake bookmarks designed for daily remembrance in devotional books, family bibles, and personal reading.',
    features: [
      'Durable laminated finish',
      'Optional silk tassel cord in gold, cream, black, or silver',
      'Front portrait with back life scripture',
      'Cherished gift for attendees'
    ],
    recommendedQty: '50 - 150 units'
  },
  {
    id: 'specialty-tributes',
    series: 'Keepsake Series',
    turnaroundDays: 4,
    turnaroundLabel: '3–4 business days',
    title: 'Specialty Memorial Keepsakes & Tribute Items',
    description: 'Custom-designed commemorative pieces including personalized register & guest books, commemorative buttons, and coordinated tribute tokens for service guests.',
    features: [
      'Custom register & guest books',
      'Coordinated color matching & themes',
      'Bespoke design arrangements',
      'Family & church group packages',
      'Special requests accommodated'
    ],
    recommendedQty: 'Custom packages'
  },
  {
    id: 'photo-tribute-products',
    series: 'Keepsake Series',
    turnaroundDays: 3,
    turnaroundLabel: '3–4 business days',
    title: 'Photo & Tribute Products',
    description: 'Large-format commemorative presentation pieces and coordinating tribute items crafted to celebrate and surround your loved one’s ceremony.',
    features: [
      'Casket Panels',
      'Enlarged Photo Boards',
      'Thank You Cards',
      'Coordinating design themes'
    ],
    recommendedQty: 'Service suite'
  }
]

export default function PrayerCardsPage() {
  // Calculator State
  const [selectedProductId, setSelectedProductId] = useState<string>('prayer-cards')
  const [isRush, setIsRush] = useState<boolean>(false)

  // Order Intake Drawer/Modal State
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState<ProductItem>(PRODUCTS[0])
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    deceasedName: '',
    quantity: '100',
    serviceDate: '',
    notes: ''
  })
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  // Floating Message Team State
  const [messageOpen, setMessageOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [chatSent, setChatSent] = useState(false)

  // Estimated ready date computed in useEffect to satisfy Next.js prerender rules
  const [estimatedReadyDate, setEstimatedReadyDate] = useState<string>('3-4 business days')

  useEffect(() => {
    const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0]
    let daysToAdd = product.turnaroundDays

    if (isRush) {
      daysToAdd = Math.max(1, daysToAdd - 2) // Rush reduces standard lead time
    }

    const date = new Date()
    // If current time is after 6:00 PM (18:00), starts next business day
    if (date.getHours() >= 18) {
      date.setDate(date.getDate() + 1)
    }

    let added = 0
    while (added < daysToAdd) {
      date.setDate(date.getDate() + 1)
      const dayOfWeek = date.getDay()
      // Skip Saturday (6) and Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        added++
      }
    }

    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }
    setEstimatedReadyDate(date.toLocaleDateString('en-US', options))
  }, [selectedProductId, isRush])

  const openOrderModal = (product?: ProductItem) => {
    if (product) {
      setActiveProduct(product)
      setSelectedProductId(product.id)
    }
    setOrderModalOpen(true)
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderSubmitted(true)
    setTimeout(() => {
      setOrderSubmitted(false)
      setOrderModalOpen(false)
      setOrderForm({
        name: '',
        email: '',
        phone: '',
        deceasedName: '',
        quantity: '100',
        serviceDate: '',
        notes: ''
      })
    }, 2800)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return
    setChatSent(true)
    setTimeout(() => {
      setChatSent(false)
      setMessageOpen(false)
      setChatMessage('')
    }, 2200)
  }

  return (
    <div style={{ width: '100%', background: '#ffffff', position: 'relative' }}>

      {/* 1. Hero Section (2-Column Grid: Text & Visual Image) */}
      <section style={{
        paddingTop: 'clamp(44px, 5vw, 60px)',
        paddingBottom: 'clamp(36px, 4.5vw, 48px)',
        borderBottom: '1px solid #eeeeee',
        background: 'linear-gradient(180deg, #ffffff 0%, #faf8f4 100%)'
      }}>
        <div className="site-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(32px, 5vw, 56px)',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div>
              <p className="eb" style={{ marginBottom: '10px' }}>
                Lasting Tokens of Remembrance
              </p>
              
              <h1 className="s" style={{
                fontSize: 'clamp(32px, 4.2vw, 48px)',
                lineHeight: 1.15,
                color: '#262626',
                marginBottom: '18px'
              }}>
                Prayer Cards &amp; Keepsakes
              </h1>

              <p style={{
                fontSize: 'clamp(15px, 1.6vw, 17px)',
                lineHeight: 1.65,
                color: '#333333',
                margin: '0 0 16px'
              }}>
                Long after services conclude, prayer cards and keepsake bookmarks remain tucked into prayer books, placed on bedside nightstands, and kept close in wallets.
              </p>

              <p style={{
                fontSize: 'clamp(14px, 1.4vw, 15px)',
                lineHeight: 1.65,
                color: '#555555',
                margin: '0 0 26px'
              }}>
                We produce every card on premium heavyweight cardstock sealed with crystal-clear archival lamination that resists moisture and wear over decades. Available as individual orders or coordinated in matching suites with your memorial programs.
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => openOrderModal(PRODUCTS[0])}
                  className="b bg"
                  style={{
                    padding: '15px 30px',
                    fontSize: '13px',
                    boxShadow: '0 4px 14px rgba(201,150,59,0.35)'
                  }}
                >
                  Order Keepsakes Now
                </button>
                <a 
                  href="#calculator" 
                  className="b"
                  style={{
                    padding: '15px 24px',
                    fontSize: '13px'
                  }}
                >
                  Check Turnaround Date
                </a>
              </div>
            </div>

            {/* Right Image Display */}
            <div style={{
              position: 'relative',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
              border: '1px solid #e3e3e3',
              background: '#e9eef3',
              height: 'clamp(280px, 35vw, 380px)'
            }}>
              <Image 
                src="/images/keepsakes/prayer_cards_bookmarks.jpg"
                alt="Laminated Memorial Prayer Cards and Keepsake Bookmarks with Silk Tassels"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(4px)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#1f6f68',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                Archival Heat-Sealed Lamination
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. Catalog Selection / Memorial Keepsake Products (3-Column Grid) */}
      <section style={{
        paddingTop: 'clamp(48px, 6vw, 64px)',
        paddingBottom: 'clamp(36px, 4.5vw, 48px)',
        textAlign: 'center'
      }}>
        <div className="site-container">
          <p className="eb">Catalog Selection</p>
          <h2 className="s" style={{
            fontSize: 'clamp(28px, 3.6vw, 36px)',
            marginBottom: '36px',
            color: '#262626'
          }}>
            Memorial Keepsake Products
          </h2>

          <div className="g3" style={{ textAlign: 'left', alignItems: 'stretch' }}>
            {PRODUCTS.map((prod) => (
              <div 
                key={prod.id}
                className="cd cb"
                style={{
                  padding: '26px',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#ffffff',
                  border: '1px solid #e3e3e3',
                  borderRadius: '4px'
                }}
              >
                {/* Meta Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#1f6f68',
                  marginBottom: '12px',
                  fontWeight: 600
                }}>
                  <span style={{ letterSpacing: '.08em', textTransform: 'uppercase' }}>
                    {prod.series}
                  </span>
                  <span style={{ color: '#666666', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} style={{ color: '#1f6f68' }} /> {prod.turnaroundLabel}
                  </span>
                </div>

                <h3 className="ct" style={{ fontSize: '21px', marginBottom: '10px', minHeight: '52px', color: '#262626' }}>
                  {prod.title}
                </h3>

                <p className="tx" style={{ fontSize: '13.5px', marginBottom: '16px', color: '#555555' }}>
                  {prod.description}
                </p>

                {/* Features Checklist */}
                <ul style={{
                  listStyle: 'none',
                  margin: '0 0 20px',
                  padding: '14px 0 0',
                  borderTop: '1px solid #eeeeee',
                  flex: 1
                }}>
                  {prod.features.map((feat, idx) => (
                    <li key={idx} style={{
                      fontSize: '13px',
                      color: '#444444',
                      margin: '8px 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}>
                      <span style={{ color: '#1f6f68', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => openOrderModal(prod)}
                  className="b bg"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '13px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 3. Estimated Order Ready Date Calculator */}
      <section id="calculator" style={{
        paddingTop: '20px',
        paddingBottom: '76px'
      }}>
        <div className="site-container">
          <div className="cr" style={{
            width: '100%',
            border: '1px solid #e0d5c2',
            borderRadius: '6px',
            padding: 'clamp(24px, 4vw, 36px)',
            background: '#f5efe6'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '16px',
              borderBottom: '1px solid #e0d5c2',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h2 className="s" style={{ fontSize: 'clamp(22px, 2.5vw, 26px)', margin: 0, color: '#262626' }}>
                  Estimated Order Ready Date
                </h2>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '3px' }}>
                  Real-time production scheduling based on active press capacity in Brooklyn, NY
                </div>
              </div>
              <div style={{
                background: '#ffffff',
                border: '1px solid #e0d5c2',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                color: '#555',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Clock size={14} style={{ color: '#1f6f68' }} />
                Daily cutoff: <strong style={{ color: '#1f6f68' }}>6:00 PM ET</strong> (Mon–Fri)
              </div>
            </div>

            {/* 2-Column Responsive Body */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(24px, 3.5vw, 36px)',
              alignItems: 'start',
              marginTop: '24px'
            }}>
              
              {/* Left Column: Product Selection & Controls */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11.5px',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: '#334444',
                  marginBottom: '8px',
                  fontWeight: 700
                }}>
                  What are you ordering?
                </label>

                {/* Custom Interactive Select Dropdown */}
                <div style={{ position: 'relative' }}>
                  <select 
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #cfcfcf',
                      background: '#ffffff',
                      borderRadius: '4px',
                      padding: '13px 14px',
                      fontSize: '14px',
                      color: '#262626',
                      fontFamily: 'inherit',
                      appearance: 'none',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.title} ({prod.turnaroundLabel})
                      </option>
                    ))}
                  </select>
                  <div style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#666'
                  }}>
                    <ChevronDown size={18} />
                  </div>
                </div>

                {/* Expedited Rush Checkbox */}
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '13.5px',
                  color: '#333',
                  margin: '18px 0 14px',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  <input 
                    type="checkbox"
                    checked={isRush}
                    onChange={(e) => setIsRush(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#1f6f68',
                      cursor: 'pointer',
                      marginTop: '2px',
                      flexShrink: 0
                    }}
                  />
                  <span>
                    Need it sooner? Select <strong>expedited rush turnaround</strong> (Subject to active press capacity)
                  </span>
                </label>

                <p className="tx" style={{ fontSize: '12px', color: '#666', lineHeight: 1.6 }}>
                  All orders received after the daily cutoff will be processed next business day. Estimated date; production begins after payment and all required materials are received. Delivery or courier time is separate. Rush is subject to approval.
                </p>
              </div>

              {/* Right Column: Dynamic Outcome Box & Action Button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Calculated Output Box */}
                <div style={{
                  border: isRush ? '1px solid #c9963b' : '1px solid #e0e0e0',
                  background: '#ffffff',
                  borderRadius: '4px',
                  padding: '22px 24px',
                  boxShadow: isRush ? '0 6px 18px rgba(201,150,59,0.18)' : '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    fontSize: '11px',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: isRush ? '#a87a22' : '#1f6f68',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {isRush ? <Zap size={15} /> : <Calendar size={15} />}
                    {isRush ? 'Expedited Rush Production' : 'Standard Production'}
                  </div>

                  <div style={{
                    fontSize: 'clamp(18px, 2vw, 21px)',
                    fontWeight: 700,
                    marginTop: '8px',
                    lineHeight: 1.35,
                    color: '#262626'
                  }}>
                    If you order today, your order will be ready by{' '}
                    <span style={{ color: isRush ? '#a87a22' : '#1f6f68', borderBottom: '2px solid currentColor' }}>
                      {estimatedReadyDate}
                    </span>.
                  </div>

                  <div style={{
                    fontSize: '12.5px',
                    color: '#666',
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <CheckCircle2 size={14} style={{ color: '#1f6f68' }} />
                    Includes high-resolution digital proofing &amp; quality check before press run
                  </div>
                </div>

                {/* Primary Action Button */}
                <button 
                  onClick={() => openOrderModal()}
                  className="b b1"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    boxShadow: '0 4px 12px rgba(31,111,104,0.25)'
                  }}
                >
                  Proceed with Selected Product
                </button>

                <div style={{
                  fontSize: '12px',
                  color: '#666',
                  textAlign: 'center',
                  marginTop: '2px'
                }}>
                  Urgent ceremony deadline? Call our studio directly at <a href="tel:9173001104" style={{ color: '#1f6f68', fontWeight: 700 }}>(917) 300-1104</a>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>


      {/* 4. Order / Customization Drawer Modal */}
      {orderModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setOrderModalOpen(false)}>
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              maxWidth: '560px',
              width: '100%',
              padding: 'clamp(24px, 4vw, 32px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setOrderModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#777'
              }}
            >
              <X size={20} />
            </button>

            {orderSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#e3ebe8',
                  color: '#1f6f68',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="s" style={{ fontSize: '22px', color: '#1f6f68', marginBottom: '8px' }}>
                  Keepsake Order Request Received
                </h3>
                <p className="tx" style={{ fontSize: '13px', color: '#555', marginBottom: '16px' }}>
                  Thank you, <strong>{orderForm.name || 'Friend'}</strong>. We have logged your request for <strong>{activeProduct.title}</strong> ({orderForm.quantity} count). Our memorial design specialists will contact you shortly to collect photos, proof the text, and confirm production timing.
                </p>
                <div style={{ fontSize: '12px', color: '#777' }}>
                  Confirmation sent to {orderForm.email || 'your email'}.
                </div>
              </div>
            ) : (
              <div>
                <p className="eb" style={{ marginBottom: '6px' }}>Keepsake Order Intake</p>
                <h3 className="s" style={{ fontSize: '24px', marginBottom: '6px', color: '#262626' }}>
                  {activeProduct.title}
                </h3>
                <p className="tx" style={{ fontSize: '13px', marginBottom: '20px', color: '#666' }}>
                  Standard turnaround: <strong>{activeProduct.turnaroundLabel}</strong>. Ready by <strong>{estimatedReadyDate}</strong>.
                </p>

                <form onSubmit={handleOrderSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px' }}>
                        Your Full Name *
                      </label>
                      <input 
                        type="text"
                        required
                        value={orderForm.name}
                        onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px' }}>
                        Contact Phone *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                        placeholder="(917) 300-1104"
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px' }}>
                      Email Address *
                    </label>
                    <input 
                      type="email"
                      required
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                      placeholder="sarah@example.com"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px' }}>
                        Name of Beloved *
                      </label>
                      <input 
                        type="text"
                        required
                        value={orderForm.deceasedName}
                        onChange={(e) => setOrderForm({ ...orderForm, deceasedName: e.target.value })}
                        placeholder="e.g. Eleanor Grace Mills"
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px' }}>
                        Desired Quantity
                      </label>
                      <select 
                        value={orderForm.quantity}
                        onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="50">50 Keepsakes</option>
                        <option value="100">100 Keepsakes (Popular)</option>
                        <option value="150">150 Keepsakes</option>
                        <option value="200">200 Keepsakes</option>
                        <option value="250">250 Keepsakes</option>
                        <option value="500">500 Keepsakes</option>
                        <option value="custom">Custom Quantity</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px' }}>
                      Scripture / Verse Preference or Special Instructions
                    </label>
                    <textarea 
                      rows={3}
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                      placeholder="e.g. Psalm 23, The Lord's Prayer, custom poem, or matching our memorial booklet theme..."
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="b b1"
                    style={{ width: '100%', padding: '13px', fontSize: '13px' }}
                  >
                    Submit Order &amp; Coordinate Proofing
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}


      {/* 5. Floating "Message Team" Button */}
      <button 
        onClick={() => setMessageOpen(true)}
        aria-label="Message Lilies of the Field Team"
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          background: '#1f6f68',
          color: '#ffffff',
          padding: '13px 22px',
          borderRadius: '30px',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(31,111,104,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 900,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <MessageSquare size={16} /> Message Team
      </button>


      {/* 6. Quick Message Team Drawer */}
      {messageOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: '20px'
        }} onClick={() => setMessageOpen(false)}>
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              maxWidth: '380px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h4 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: 0 }}>
                  Memorial Design Concierge
                </h4>
                <div style={{ fontSize: '11.5px', color: '#777' }}>
                  Live response: Monday–Friday 10am–6pm
                </div>
              </div>
              <button 
                onClick={() => setMessageOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
              >
                <X size={20} />
              </button>
            </div>

            {chatSent ? (
              <div style={{
                padding: '24px 12px',
                textAlign: 'center',
                color: '#1f6f68'
              }}>
                <CheckCircle2 size={36} style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight: 700, fontSize: '15px' }}>Inquiry Sent!</div>
                <div style={{ fontSize: '12px', color: '#555', marginTop: '6px' }}>
                  A memorial coordinator will get back to you immediately.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage}>
                <p className="tx" style={{ fontSize: '12.5px', marginBottom: '12px' }}>
                  Questions about paper thickness, custom prayer texts, or same-week service timing?
                </p>

                <textarea 
                  rows={4}
                  required
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your question, contact name, and phone number..."
                  style={{
                    width: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    marginBottom: '12px'
                  }}
                />

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    type="submit"
                    className="b b1"
                    style={{ flex: 1, padding: '10px', fontSize: '12px' }}
                  >
                    Send Message
                  </button>
                  <a 
                    href="tel:9173001104"
                    className="b bg"
                    style={{ padding: '10px 14px', fontSize: '12px' }}
                    title="Direct Call"
                  >
                    <Phone size={14} />
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
