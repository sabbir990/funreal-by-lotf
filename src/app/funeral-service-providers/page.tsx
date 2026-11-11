'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Layers, 
  QrCode, 
  Truck, 
  Handshake, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileCheck, 
  Download, 
  Lock, 
  Check, 
  X,
  Calendar,
  AlertCircle
} from 'lucide-react'

export default function FuneralServiceProvidersPage() {
  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    weeklyServices: '',
    inquiries: ''
  })

  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  // Message Team Drawer Modal State
  const [messageOpen, setMessageOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [chatSent, setChatSent] = useState(false)

  // Document Preview Modal State
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone) {
      setFormError('Please complete all required fields marked with an asterisk (*).')
      return
    }

    setFormError('')
    setFormSubmitting(true)

    // Simulate direct provider intake registration
    setTimeout(() => {
      setFormSubmitting(false)
      setFormSubmitted(true)
    }, 1200)
  }

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return
    setChatSent(true)
    setTimeout(() => {
      setChatMessage('')
      setChatSent(false)
      setMessageOpen(false)
    }, 2500)
  }

  return (
    <div style={{ width: '100%', background: '#ffffff', position: 'relative' }}>
      
      {/* 1. Hero Section */}
      <section style={{
        paddingTop: 'clamp(48px, 6vw, 68px)',
        paddingBottom: 'clamp(40px, 5vw, 56px)',
        borderBottom: '1px solid #eeeeee',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #ffffff 0%, #faf8f4 100%)'
      }}>
        <div className="site-container" style={{ maxWidth: '1020px' }}>
          
          {/* Emblem Icon */}
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: '#e3ebe8',
            color: '#1f6f68',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
            boxShadow: '0 2px 8px rgba(31,111,104,0.12)'
          }}>
            <Building2 size={24} />
          </div>

          <p className="eb" style={{ marginBottom: '12px' }}>
            Professional Partnership Program
          </p>

          <h1 className="s" style={{
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            lineHeight: 1.15,
            color: '#262626',
            marginBottom: '20px'
          }}>
            Memorial Printing Support for<br />Funeral Professionals
          </h1>

          <p style={{
            maxWidth: '680px',
            margin: '0 auto 28px',
            fontSize: 'clamp(15px, 1.8vw, 16px)',
            lineHeight: 1.65,
            color: '#555555'
          }}>
            Reliable memorial design and production support for funeral homes, directors, and celebrants across Brooklyn and the greater New York metropolitan area and nationwide.
          </p>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            <a 
              href="#register" 
              className="b bg"
              style={{
                boxShadow: '0 4px 14px rgba(201,150,59,0.35)',
                padding: '15px 30px',
                fontSize: '13px'
              }}
            >
              Submit an Order as Provider
            </a>
            <Link 
              href="/login" 
              className="b"
              style={{
                padding: '15px 28px',
                fontSize: '13px'
              }}
            >
              Provider Portal Sign In
            </Link>
          </div>

          {/* Hero Photography Banner */}
          <div style={{
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
            border: '1px solid #e3e3e3',
            background: '#ffffff'
          }}>
            <div style={{ position: 'relative', width: '100%', height: 'clamp(260px, 36vw, 440px)' }}>
              <Image 
                src="/images/providers/funeral_provider_desk.jpg"
                alt="Funeral Director reviewing bespoke memorial keepsakes at executive desk"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1020px"
                style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)'
              }} />

              {/* Floating Stat Pill on Image */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                color: '#ffffff',
                textShadow: '0 1px 4px rgba(0,0,0,0.6)'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>
                    Direct Director &amp; Mortuary Support
                  </div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>
                    Daily 6:00 PM cutoff · Same-day priority proofing · Hand-delivered across NY
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.95)',
                  color: '#1f6f68',
                  padding: '7px 16px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '.05em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  <ShieldCheck size={15} /> Verified Partner Network
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. The Partner Advantage (6 Feature Grid) */}
      <section style={{
        paddingTop: 'clamp(48px, 6vw, 64px)',
        paddingBottom: 'clamp(36px, 4vw, 48px)',
        textAlign: 'center'
      }}>
        <div className="site-container">
          <p className="eb">The Partner Advantage</p>
          <h2 className="s" style={{ fontSize: 'clamp(28px, 3.6vw, 36px)', marginBottom: '36px' }}>
            Why Partner With Lilies of the Field?
          </h2>

          <div className="g3" style={{ textAlign: 'left' }}>
            
            {/* Card 1 */}
            <div className="cd cb" style={{ background: '#faf8f4', padding: '28px', border: '1px solid #e8e3d8' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: '#e3ebe8',
                color: '#1f6f68',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Sparkles size={20} />
              </div>
              <h3 className="ct" style={{ fontSize: '19px', color: '#262626' }}>
                Consistent Print Quality
              </h3>
              <p className="tx" style={{ fontSize: '13.5px', color: '#555' }}>
                Heavyweight archival cardstock, calibrated color reproduction, and crisp machine-creased folding on every order.
              </p>
            </div>

            {/* Card 2 */}
            <div className="cd cb" style={{ background: '#faf8f4', padding: '28px', border: '1px solid #e8e3d8' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: '#e3ebe8',
                color: '#1f6f68',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Clock size={20} />
              </div>
              <h3 className="ct" style={{ fontSize: '19px', color: '#262626' }}>
                Reliable Production &amp; Scheduling
              </h3>
              <p className="tx" style={{ fontSize: '13.5px', color: '#555' }}>
                Transparent daily 6:00 PM ET cutoff with guaranteed delivery schedules so your staff never worries about service deadlines.
              </p>
            </div>

            {/* Card 3 */}
            <div className="cd cb" style={{ background: '#faf8f4', padding: '28px', border: '1px solid #e8e3d8' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: '#e3ebe8',
                color: '#1f6f68',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Layers size={20} />
              </div>
              <h3 className="ct" style={{ fontSize: '19px', color: '#262626' }}>
                Memorial Product Collections
              </h3>
              <p className="tx" style={{ fontSize: '13.5px', color: '#555' }}>
                One seamless source for matching programs, prayer cards, bookmarks, tribute boards, and guest registration books.
              </p>
            </div>

            {/* Card 4 */}
            <div className="cd cb" style={{ background: '#faf8f4', padding: '28px', border: '1px solid #e8e3d8' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: '#e3ebe8',
                color: '#1f6f68',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <QrCode size={20} />
              </div>
              <h3 className="ct" style={{ fontSize: '19px', color: '#262626' }}>
                Digital Memorial Options
              </h3>
              <p className="tx" style={{ fontSize: '13.5px', color: '#555' }}>
                Offer modern families QR-accessible digital flipbooks and multimedia Legacy Tribute webpages with guestbooks.
              </p>
            </div>

            {/* Card 5 */}
            <div className="cd cb" style={{ background: '#faf8f4', padding: '28px', border: '1px solid #e8e3d8' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: '#e3ebe8',
                color: '#1f6f68',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Truck size={20} />
              </div>
              <h3 className="ct" style={{ fontSize: '19px', color: '#262626' }}>
                Direct Funeral Home Delivery
              </h3>
              <p className="tx" style={{ fontSize: '13.5px', color: '#555' }}>
                Scheduled local delivery directly to your chapel, church, or mortuary reception desk across the New York area.
              </p>
            </div>

            {/* Card 6 */}
            <div className="cd cb" style={{ background: '#faf8f4', padding: '28px', border: '1px solid #e8e3d8' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: '#e3ebe8',
                color: '#1f6f68',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Handshake size={20} />
              </div>
              <h3 className="ct" style={{ fontSize: '19px', color: '#262626' }}>
                One Memorial Production Partner
              </h3>
              <p className="tx" style={{ fontSize: '13.5px', color: '#555' }}>
                Consolidate multiple vendor relationships into a single, responsive team that treats your funeral home as family.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* 3. Visual Craftsmanship & Delivery Showcase (2-Column Images) */}
      <section style={{
        paddingTop: '20px',
        paddingBottom: '48px'
      }}>
        <div className="site-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: '24px'
          }}>
            {/* Image Box 1: Print Excellence */}
            <div className="cd" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                <Image 
                  src="/images/providers/memorial_print_collection.jpg"
                  alt="Archival Memorial Program Suites & Keepsakes"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '22px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '.12em', color: '#1f6f68', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                  Fine Stationery &amp; Gold Embossing
                </div>
                <h4 className="ct" style={{ fontSize: '18px', marginBottom: '8px' }}>
                  Suites Tailored to Every Ceremony
                </h4>
                <p className="tx" style={{ fontSize: '13px' }}>
                  Crisp folding, archival cardstocks, and curated type compositions that reflect honor, tradition, and dignified tribute.
                </p>
              </div>
            </div>

            {/* Image Box 2: Chapel Delivery */}
            <div className="cd" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                <Image 
                  src="/images/providers/chapel_delivery_box.jpg"
                  alt="Direct Delivery of Boxed Orders to Funeral Home Reception"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '22px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '.12em', color: '#1f6f68', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                  Direct Chapel White-Glove Courier
                </div>
                <h4 className="ct" style={{ fontSize: '18px', marginBottom: '8px' }}>
                  Packaged &amp; Delivered on Time
                </h4>
                <p className="tx" style={{ fontSize: '13px' }}>
                  Handled with reverence and delivered in presentation boxes directly to your reception desk before service or viewing hours begin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. Streamlined Operations / How Provider Ordering Works (5-Step Grid) */}
      <section style={{
        paddingTop: '36px',
        paddingBottom: '48px',
        borderTop: '1px solid #eeeeee'
      }}>
        <div className="site-container" style={{ textAlign: 'center' }}>
          <p className="eb">Streamlined Operations</p>
          <h2 className="s" style={{ fontSize: 'clamp(28px, 3.6vw, 36px)', marginBottom: '32px' }}>
            How Provider Ordering Works
          </h2>

          <div className="g5">
            
            {/* Step 1 */}
            <div className="cd cb" style={{ textAlign: 'center', padding: '24px 16px', background: '#ffffff' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1f6f68',
                color: '#ffffff',
                margin: '0 auto 12px',
                lineHeight: '32px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                1
              </div>
              <h3 className="ct" style={{ fontSize: '15px', marginBottom: '8px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Submit Service Details
              </h3>
              <p className="tx" style={{ fontSize: '12.5px', color: '#666' }}>
                Director locks in dates, loved one info, and product packages.
              </p>
            </div>

            {/* Step 2 */}
            <div className="cd cb" style={{ textAlign: 'center', padding: '24px 16px', background: '#ffffff' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1f6f68',
                color: '#ffffff',
                margin: '0 auto 12px',
                lineHeight: '32px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                2
              </div>
              <h3 className="ct" style={{ fontSize: '15px', marginBottom: '8px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Content Submission
              </h3>
              <p className="tx" style={{ fontSize: '12.5px', color: '#666' }}>
                Upload materials directly or send our family link for photos &amp; obituary.
              </p>
            </div>

            {/* Step 3 */}
            <div className="cd cb" style={{ textAlign: 'center', padding: '24px 16px', background: '#ffffff' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1f6f68',
                color: '#ffffff',
                margin: '0 auto 12px',
                lineHeight: '32px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                3
              </div>
              <h3 className="ct" style={{ fontSize: '15px', marginBottom: '8px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Priority Design
              </h3>
              <p className="tx" style={{ fontSize: '12.5px', color: '#666' }}>
                Designers prepare high-res digital proof for funeral home or family sign-off.
              </p>
            </div>

            {/* Step 4 */}
            <div className="cd cb" style={{ textAlign: 'center', padding: '24px 16px', background: '#ffffff' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1f6f68',
                color: '#ffffff',
                margin: '0 auto 12px',
                lineHeight: '32px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                4
              </div>
              <h3 className="ct" style={{ fontSize: '15px', marginBottom: '8px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Direct Sign-Off
              </h3>
              <p className="tx" style={{ fontSize: '12.5px', color: '#666' }}>
                Approve digital proof online to start high-speed press runs immediately.
              </p>
            </div>

            {/* Step 5 */}
            <div className="cd cb" style={{ textAlign: 'center', padding: '24px 16px', background: '#ffffff' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#1f6f68',
                color: '#ffffff',
                margin: '0 auto 12px',
                lineHeight: '32px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                5
              </div>
              <h3 className="ct" style={{ fontSize: '15px', marginBottom: '8px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Chapel Delivery
              </h3>
              <p className="tx" style={{ fontSize: '12.5px', color: '#666' }}>
                Delivered directly to your funeral home reception desk before viewing hours.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* 5. Request Provider Access Form & Resources Section */}
      <section id="register" style={{
        paddingTop: '36px',
        paddingBottom: '76px'
      }}>
        <div className="site-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '32px',
            alignItems: 'start'
          }}>
            
            {/* Left Card: Registration Form */}
            <div className="cd cb" style={{ background: '#faf8f4', padding: 'clamp(24px, 4vw, 36px)', border: '1px solid #e8e3d8' }}>
              <p className="eb" style={{ color: '#a87a22' }}>New Partner Registration</p>
              <h2 className="s" style={{ fontSize: 'clamp(22px, 3vw, 28px)', marginBottom: '8px' }}>
                Request Provider Access
              </h2>
              <p className="tx" style={{ fontSize: '13.5px', marginBottom: '24px' }}>
                Providers are approved by our team. Complete this form to receive your dedicated account credentials and access the Wholesale Product &amp; Price Guide.
              </p>

              {formSubmitted ? (
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #1f6f68',
                  borderRadius: '6px',
                  padding: '28px 24px',
                  textAlign: 'center'
                }}>
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
                    <CheckCircle2 size={26} />
                  </div>
                  <h3 className="s" style={{ fontSize: '20px', marginBottom: '8px', color: '#1f6f68' }}>
                    Application Received
                  </h3>
                  <p className="tx" style={{ fontSize: '13px', marginBottom: '18px' }}>
                    Thank you, <strong>{formData.contactName || 'Director'}</strong>. We have registered <strong>{formData.businessName || 'your funeral establishment'}</strong>. Our director liaison will review your credentials and email access confirmation to <strong>{formData.email}</strong> within 2 business hours.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button 
                      onClick={() => {
                        setFormSubmitted(false)
                        setFormData({
                          businessName: '',
                          contactName: '',
                          email: '',
                          phone: '',
                          location: '',
                          weeklyServices: '',
                          inquiries: ''
                        })
                      }}
                      className="b"
                      style={{ fontSize: '12px', padding: '10px 18px' }}
                    >
                      Submit Another Inquiry
                    </button>
                    <Link 
                      href="/login" 
                      className="b b1"
                      style={{ fontSize: '12px', padding: '10px 18px' }}
                    >
                      Go to Sign In
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {formError && (
                    <div style={{
                      background: '#fff2f0',
                      border: '1px solid #ffccc7',
                      color: '#d4380d',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      fontSize: '12.5px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <AlertCircle size={16} /> {formError}
                    </div>
                  )}

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                    gap: '16px'
                  }}>
                    {/* Funeral Home Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#334444', marginBottom: '6px', fontWeight: 700 }}>
                        Funeral home / business name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Heritage Funeral Services"
                        style={{
                          width: '100%',
                          border: '1px solid #cfcfcf',
                          background: '#ffffff',
                          borderRadius: '4px',
                          padding: '12px 13px',
                          fontSize: '13px',
                          color: '#262626',
                          outline: 'none',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    {/* Contact Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#334444', marginBottom: '6px', fontWeight: 700 }}>
                        Contact name / director *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="e.g. James R. Bennett"
                        style={{
                          width: '100%',
                          border: '1px solid #cfcfcf',
                          background: '#ffffff',
                          borderRadius: '4px',
                          padding: '12px 13px',
                          fontSize: '13px',
                          color: '#262626',
                          outline: 'none',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#334444', marginBottom: '6px', fontWeight: 700 }}>
                        Email address *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="director@funeralhome.com"
                        style={{
                          width: '100%',
                          border: '1px solid #cfcfcf',
                          background: '#ffffff',
                          borderRadius: '4px',
                          padding: '12px 13px',
                          fontSize: '13px',
                          color: '#262626',
                          outline: 'none',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#334444', marginBottom: '6px', fontWeight: 700 }}>
                        Phone number *
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(917) 300-1104"
                        style={{
                          width: '100%',
                          border: '1px solid #cfcfcf',
                          background: '#ffffff',
                          borderRadius: '4px',
                          padding: '12px 13px',
                          fontSize: '13px',
                          color: '#262626',
                          outline: 'none',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    {/* City / Borough */}
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#334444', marginBottom: '6px', fontWeight: 700 }}>
                        City / borough
                      </label>
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Brooklyn, NY / Queens / Manhattan"
                        style={{
                          width: '100%',
                          border: '1px solid #cfcfcf',
                          background: '#ffffff',
                          borderRadius: '4px',
                          padding: '12px 13px',
                          fontSize: '13px',
                          color: '#262626',
                          outline: 'none',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    {/* Inquiries */}
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#334444', marginBottom: '6px', fontWeight: 700 }}>
                        Special inquiries or average weekly services
                      </label>
                      <textarea 
                        rows={3}
                        value={formData.inquiries}
                        onChange={(e) => setFormData({ ...formData, inquiries: e.target.value })}
                        placeholder="Tell us about your chapel facilities, preferred courier timing, or specific requirements..."
                        style={{
                          width: '100%',
                          border: '1px solid #cfcfcf',
                          background: '#ffffff',
                          borderRadius: '4px',
                          padding: '12px 13px',
                          fontSize: '13px',
                          color: '#262626',
                          outline: 'none',
                          fontFamily: 'inherit',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '22px' }}>
                    <button 
                      type="submit" 
                      disabled={formSubmitting}
                      className="b b1"
                      style={{
                        width: '100%',
                        cursor: formSubmitting ? 'not-allowed' : 'pointer',
                        opacity: formSubmitting ? 0.7 : 1
                      }}
                    >
                      {formSubmitting ? 'Submitting Application...' : 'Submit Provider Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Card: Provider Resources & Documents */}
            <div className="cr cb" style={{
              border: '1px solid #e0d5c2',
              borderRadius: '4px',
              padding: 'clamp(24px, 4vw, 32px)',
              background: '#f5efe6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Lock size={18} style={{ color: '#1f6f68' }} />
                <span style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '.12em', color: '#1f6f68', fontWeight: 700 }}>
                  Authorized Funeral Directors Only
                </span>
              </div>

              <h2 className="s" style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', marginBottom: '12px', color: '#262626' }}>
                Provider Resources &amp; Documents
              </h2>
              
              <p className="tx" style={{ fontSize: '13px', marginBottom: '20px', color: '#555' }}>
                Registered providers gain immediate access to our internal documentation, submission specs, and wholesale billing structures:
              </p>

              {/* Resource Document Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                <div 
                  onClick={() => setSelectedDoc('Product & Wholesale Price Guide (Protected)')}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e3e3',
                    borderRadius: '4px',
                    padding: '12px 16px',
                    fontSize: '13px',
                    color: '#262626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1f6f68')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e3e3e3')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#1f6f68', flexShrink: 0 }} />
                    <strong>Product &amp; Wholesale Price Guide</strong>
                  </span>
                  <span style={{ fontSize: '11px', color: '#888', background: '#f5f5f5', padding: '2px 8px', borderRadius: '3px' }}>
                    PDF
                  </span>
                </div>

                <div 
                  onClick={() => setSelectedDoc('Program Options & Stock Finish Specifications')}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e3e3',
                    borderRadius: '4px',
                    padding: '12px 16px',
                    fontSize: '13px',
                    color: '#262626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1f6f68')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e3e3e3')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#1f6f68', flexShrink: 0 }} />
                    <span>Program Options &amp; Stock Finish Specifications</span>
                  </span>
                  <span style={{ fontSize: '11px', color: '#888', background: '#f5f5f5', padding: '2px 8px', borderRadius: '3px' }}>
                    Spec Sheet
                  </span>
                </div>

                <div 
                  onClick={() => setSelectedDoc('Memorial Collections Selection Guide')}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e3e3',
                    borderRadius: '4px',
                    padding: '12px 16px',
                    fontSize: '13px',
                    color: '#262626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1f6f68')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e3e3e3')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#1f6f68', flexShrink: 0 }} />
                    <span>Memorial Collections Selection Guide</span>
                  </span>
                  <span style={{ fontSize: '11px', color: '#888', background: '#f5f5f5', padding: '2px 8px', borderRadius: '3px' }}>
                    Catalog
                  </span>
                </div>

                <div 
                  onClick={() => setSelectedDoc('Order Submission Requirements & Proof Sign-Off')}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e3e3e3',
                    borderRadius: '4px',
                    padding: '12px 16px',
                    fontSize: '13px',
                    color: '#262626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1f6f68')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e3e3e3')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} style={{ color: '#1f6f68', flexShrink: 0 }} />
                    <span>Order Submission Requirements &amp; Proof Sign-Off</span>
                  </span>
                  <span style={{ fontSize: '11px', color: '#888', background: '#f5f5f5', padding: '2px 8px', borderRadius: '3px' }}>
                    Checklist
                  </span>
                </div>

              </div>

              {/* Login Button */}
              <Link 
                href="/login" 
                className="b b1" 
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  marginTop: '22px',
                  width: '100%'
                }}
              >
                Log In to Download Resources
              </Link>

              <div style={{
                marginTop: '16px',
                textAlign: 'center',
                fontSize: '12px',
                color: '#666'
              }}>
                Need urgent assistance for an upcoming service? <br />
                Call our direct line: <a href="tel:9173001104" style={{ color: '#1f6f68', fontWeight: 700 }}>(917) 300-1104</a>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 6. Document Preview Modal */}
      {selectedDoc && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setSelectedDoc(null)}>
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              maxWidth: '520px',
              width: '100%',
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedDoc(null)}
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

            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#f5efe6',
              color: '#1f6f68',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Lock size={20} />
            </div>

            <h3 className="s" style={{ fontSize: '22px', marginBottom: '8px' }}>
              {selectedDoc}
            </h3>

            <p className="tx" style={{ fontSize: '13.5px', marginBottom: '20px', color: '#555' }}>
              This internal documentation contains wholesale pricing formulas, paper weight specifications, and proprietary production cutoff guidelines reserved for approved funeral directors and establishments.
            </p>

            <div style={{
              background: '#faf8f4',
              padding: '14px 18px',
              borderRadius: '4px',
              border: '1px solid #e8e3d8',
              fontSize: '12.5px',
              color: '#444',
              marginBottom: '22px'
            }}>
              Please log in with your provider credentials or apply for provider registration above to unlock instantaneous PDF downloads.
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link 
                href="/login" 
                className="b b1"
                style={{ flex: 1, padding: '12px' }}
              >
                Sign In to Portal
              </Link>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="b"
                style={{ flex: 1, padding: '12px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 7. Floating "Message Team" Button */}
      <button 
        onClick={() => setMessageOpen(true)}
        aria-label="Message Lilies of the Field Director Team"
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


      {/* 8. Quick Message Team Drawer / Modal */}
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
                  Direct Provider Dispatch
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
                <div style={{ fontWeight: 700, fontSize: '15px' }}>Message Dispatched!</div>
                <div style={{ fontSize: '12px', color: '#555', marginTop: '6px' }}>
                  Our production coordinator has received your alert and will connect immediately.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendChat}>
                <p className="tx" style={{ fontSize: '12.5px', marginBottom: '12px' }}>
                  Have an urgent question regarding an active press run, courier timing, or custom format?
                </p>

                <textarea 
                  rows={4}
                  required
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message, funeral home name, and phone number..."
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
