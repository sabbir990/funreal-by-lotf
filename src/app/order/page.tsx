'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Phone, 
  Mail, 
  FileText, 
  Check, 
  Info,
  Truck,
  Building,
  User,
  Heart
} from 'lucide-react'
import { 
  GALLERY_DESIGNS, 
  GALLERY_COLLECTIONS, 
  DEFAULT_FORMATS, 
  DEFAULT_SIZES, 
  DEFAULT_QUANTITIES, 
  DEFAULT_ADDONS,
  GalleryDesign 
} from '@/data/galleryData'
import { createClient } from '@/lib/supabase/client'

// Helper function to calculate 4-business-day Estimated Order Ready Date
function calculateStandardReadyDate(): { readyDate: Date; readyDateString: string } {
  const d = new Date()
  // Cutoff at 6:00 PM (18:00) ET
  if (d.getHours() >= 18) {
    d.setDate(d.getDate() + 1)
  }

  let businessDaysAdded = 0
  while (businessDaysAdded < 4) {
    d.setDate(d.getDate() + 1)
    const day = d.getDay()
    // Skip Saturday (6) and Sunday (0)
    if (day !== 0 && day !== 6) {
      businessDaysAdded++
    }
  }

  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric' 
  }

  return {
    readyDate: d,
    readyDateString: d.toLocaleDateString('en-US', options)
  }
}

function OrderFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Pre-fill parameters from URL or localStorage
  const urlDesignNum = searchParams.get('design') || ''
  const urlTitle = searchParams.get('title') || ''
  const urlCollection = searchParams.get('collection') || ''
  const urlFormat = searchParams.get('format') || ''
  const urlSize = searchParams.get('size') || ''
  const urlQty = searchParams.get('quantity') || ''
  const urlAddons = searchParams.get('addons') || ''
  const urlRequests = searchParams.get('requests') || ''

  // Specifications State
  const [selectedDesignNum, setSelectedDesignNum] = useState<string>(urlDesignNum || '101')
  const [selectedFormat, setSelectedFormat] = useState<string>(urlFormat || '4-Page')
  const [selectedSize, setSelectedSize] = useState<string>(urlSize || 'Standard')
  const [selectedQuantity, setSelectedQuantity] = useState<string>(urlQty || '100')
  const [customQuantity, setCustomQuantity] = useState<string>('')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(
    urlAddons ? urlAddons.split(';').filter(Boolean) : []
  )
  const [specialRequests, setSpecialRequests] = useState<string>(urlRequests || '')

  // Family / Contact Details State
  const [contactName, setContactName] = useState('')
  const [relationship, setRelationship] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [altPhone, setAltPhone] = useState('')

  // Loved One Information
  const [lovedOneName, setLovedOneName] = useState('')
  const [sunriseDate, setSunriseDate] = useState('')
  const [sunsetDate, setSunsetDate] = useState('')
  const [photoStatus, setPhotoStatus] = useState('ready_to_email')

  // Service & Production Details (Required strictly by client specifications)
  const [serviceDate, setServiceDate] = useState('')
  const [requestedCompletionDate, setRequestedCompletionDate] = useState('')
  const [fulfillmentMethod, setFulfillmentMethod] = useState('studio_pickup')
  const [funeralHome, setFuneralHome] = useState('')
  const [venueLocation, setVenueLocation] = useState('')
  const [directorName, setDirectorName] = useState('')

  // Rush Order Acknowledgment State
  const [rushAcknowledged, setRushAcknowledged] = useState(false)
  const [validationError, setValidationError] = useState('')

  // Submission State
  const [submitting, setSubmitting] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null)

  // Calculate standard 4-business-day Estimated Order Ready Date
  const [readyDateInfo, setReadyDateInfo] = useState<{ readyDate: Date; readyDateString: string }>({
    readyDate: new Date(),
    readyDateString: 'Loading estimated date...'
  })

  useEffect(() => {
    setReadyDateInfo(calculateStandardReadyDate())

    // If localStorage has draft and no URL params, restore it
    if (!urlDesignNum && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('lotf_order_draft')
        if (stored) {
          const draft = JSON.parse(stored)
          if (draft.designNumber) setSelectedDesignNum(draft.designNumber)
          if (draft.format) setSelectedFormat(draft.format)
          if (draft.size) setSelectedSize(draft.size)
          if (draft.quantity) {
            if (['50','75','100','150','200','250'].includes(draft.quantity)) {
              setSelectedQuantity(draft.quantity)
            } else {
              setSelectedQuantity('250+')
              setCustomQuantity(draft.quantity)
            }
          }
          if (draft.addOns && Array.isArray(draft.addOns)) setSelectedAddOns(draft.addOns)
          if (draft.specialRequests) setSpecialRequests(draft.specialRequests)
        }
      } catch {
        // ignore
      }
    }
  }, [urlDesignNum])

  // Current matched design
  const matchedDesign = useMemo(() => {
    return GALLERY_DESIGNS.find(d => d.designNumber === selectedDesignNum) || GALLERY_DESIGNS[0]
  }, [selectedDesignNum])

  // Determine whether rush processing is required
  const isRushRequired = useMemo(() => {
    if (!requestedCompletionDate || !readyDateInfo.readyDate) return false
    const [y, m, d] = requestedCompletionDate.split('-').map(Number)
    if (!y || !m || !d) return false
    
    // Requested date normalized to beginning of day
    const requested = new Date(y, m - 1, d, 23, 59, 59)
    // Standard ready date normalized to beginning of that day
    const standard = new Date(
      readyDateInfo.readyDate.getFullYear(),
      readyDateInfo.readyDate.getMonth(),
      readyDateInfo.readyDate.getDate(),
      0, 0, 0
    )
    return requested < standard
  }, [requestedCompletionDate, readyDateInfo])

  const handleAddOnToggle = (addOn: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOn) ? prev.filter(item => item !== addOn) : [...prev, addOn]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    // Validate rush acknowledgment if rush is needed
    if (isRushRequired && !rushAcknowledged) {
      setValidationError('Please review and check the Rush Order Acknowledgment box below before submitting your order.')
      const el = document.getElementById('rush-notice-box')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitting(true)

    const finalQuantity = selectedQuantity === '250+' ? (customQuantity || '250+') : selectedQuantity
    const orderCode = `LOTF-ORD-${matchedDesign.designNumber}-${Math.floor(1000 + Math.random() * 9000)}`

    const orderData = {
      orderReference: orderCode,
      status: isRushRequired ? 'Pending Rush Confirmation' : 'Order Received — In Production Queue',
      isRush: isRushRequired,
      designNumber: matchedDesign.designNumber,
      designTitle: matchedDesign.title,
      collectionName: matchedDesign.collectionName,
      programFormat: selectedFormat,
      programSize: selectedSize,
      quantity: finalQuantity,
      addOns: selectedAddOns,
      specialRequests: specialRequests || 'None',
      contactName,
      relationship,
      phone,
      email,
      altPhone,
      lovedOneName,
      sunriseDate,
      sunsetDate,
      photoStatus,
      serviceDate,
      requestedCompletionDate,
      estimatedReadyDate: readyDateInfo.readyDateString,
      fulfillmentMethod,
      funeralHome,
      venueLocation,
      directorName,
      createdAt: new Date().toISOString()
    }

    try {
      const supabase = createClient()
      await supabase.from('service_inquiries').insert({
        contact_name: contactName,
        email: email,
        phone: phone,
        service_package: `Memorial Program Order: Design #${matchedDesign.designNumber} (${matchedDesign.title}) - ${selectedFormat} (${selectedSize})`,
        preferred_date: requestedCompletionDate || serviceDate || null,
        special_notes: `Order Ref: ${orderCode} | Status: ${orderData.status} | Loved One: ${lovedOneName} | Qty: ${finalQuantity} | Ready By: ${readyDateInfo.readyDateString} | Rush: ${isRushRequired ? 'YES (Acknowledged)' : 'NO'} | Add-ons: ${selectedAddOns.join(', ') || 'None'} | Venue: ${venueLocation || funeralHome || 'N/A'} | Special Requests: ${specialRequests || 'None'}`
      })
    } catch {
      // Offline fallback / graceful handling
    }

    // Clear saved draft
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('lotf_order_draft')
      } catch {
        // ignore
      }
    }

    setSubmitting(false)
    setSubmittedOrder(orderData)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ width: '100%', background: '#fdfbf7', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* 1. Header Bar */}
      <section style={{
        background: '#faf8f4',
        borderBottom: '1px solid #e8dfd2',
        paddingTop: 'clamp(28px, 4vw, 44px)',
        paddingBottom: 'clamp(24px, 3.5vw, 36px)',
        textAlign: 'center'
      }}>
        <div className="site-container" style={{ maxWidth: '840px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#1f6f68',
            marginBottom: '8px'
          }}>
            <ShieldCheck size={14} /> Lilies of the Field Memorial Printing
          </div>

          <h1 className="s" style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            color: '#262626',
            lineHeight: 1.2,
            marginBottom: '12px'
          }}>
            Memorial Program Order Request
          </h1>

          <p style={{
            fontSize: '14.5px',
            color: '#555',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 16px'
          }}>
            Complete your order details below. Our Brooklyn design team customizes each program with your loved one’s photographs, obituary, order of service, and cherished tributes.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            color: '#666',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <span>Turnaround: <strong>4 Business Days Standard</strong></span>
            <span>·</span>
            <span>Studio Phone: <a href="tel:9173001104" style={{ color: '#1f6f68', fontWeight: 700 }}>(917) 300-1104</a></span>
            <span>·</span>
            <span>Email: <strong>orders@liliesofthefield.design</strong></span>
          </div>
        </div>
      </section>

      {/* 2. Main Order Form Container */}
      <div className="site-container" style={{ maxWidth: '880px', paddingTop: '36px' }}>

        {submittedOrder ? (
          /* Confirmation Screen */
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e0d5c2',
            padding: 'clamp(32px, 5vw, 48px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#dfe9e5',
              color: '#1f6f68',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: submittedOrder.isRush ? '#fef3c7' : '#dfe9e5',
              color: submittedOrder.isRush ? '#92400e' : '#1f6f68',
              marginBottom: '12px'
            }}>
              Status: {submittedOrder.status}
            </div>

            <h2 className="s" style={{ fontSize: '28px', color: '#262626', margin: '0 0 10px' }}>
              Order Request Submitted Successfully
            </h2>

            <p style={{ color: '#555', fontSize: '15px', maxWidth: '580px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              Thank you, <strong>{submittedOrder.contactName}</strong>. We have received your memorial program specifications for <strong>{submittedOrder.lovedOneName || 'your loved one'}</strong>.
            </p>

            {/* Reference Number Box */}
            <div style={{
              background: '#faf8f4',
              border: '1px solid #e0d5c2',
              borderRadius: '6px',
              padding: '16px 24px',
              display: 'inline-block',
              marginBottom: '28px'
            }}>
              <div style={{ fontSize: '11px', color: '#777', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                Order Confirmation Reference
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#1f6f68', letterSpacing: '0.05em', marginTop: '2px' }}>
                {submittedOrder.orderReference}
              </div>
            </div>

            {/* Order Summary Grid */}
            <div style={{
              textAlign: 'left',
              background: '#fdfbf7',
              border: '1px solid #ebd8b5',
              borderRadius: '6px',
              padding: '24px',
              marginBottom: '28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              fontSize: '13px',
              color: '#444'
            }}>
              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Program Selection:</strong>
                Design #{submittedOrder.designNumber}: {submittedOrder.designTitle} ({submittedOrder.collectionName})
              </div>
              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Format &amp; Size:</strong>
                {submittedOrder.programFormat} · {submittedOrder.programSize}
              </div>
              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Quantity:</strong>
                {submittedOrder.quantity} copies
              </div>
              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Estimated Ready Date:</strong>
                <span style={{ color: '#1f6f68', fontWeight: 600 }}>{submittedOrder.estimatedReadyDate}</span>
              </div>
              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Requested Delivery / Pickup:</strong>
                {submittedOrder.requestedCompletionDate || 'Not specified'}
              </div>
              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Service Date:</strong>
                {submittedOrder.serviceDate || 'Not specified'}
              </div>
              {submittedOrder.addOns && submittedOrder.addOns.length > 0 && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Selected Add-ons:</strong>
                  {submittedOrder.addOns.join(', ')}
                </div>
              )}
            </div>

            {/* Rush Notice Info if applicable */}
            {submittedOrder.isRush && (
              <div style={{
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '6px',
                padding: '16px 20px',
                textAlign: 'left',
                marginBottom: '28px',
                fontSize: '13px',
                color: '#92400e',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Rush Processing Notice:</strong> Your requested date is earlier than our standard 4-business-day schedule. Your order is marked <strong>Pending Rush Confirmation</strong>. Our studio will review press schedule availability and contact you shortly to confirm rush fees and turnaround before starting.
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div style={{
              borderTop: '1px solid #eee',
              paddingTop: '20px',
              fontSize: '13.5px',
              color: '#666',
              lineHeight: 1.6,
              marginBottom: '28px'
            }}>
              <p style={{ margin: '0 0 10px' }}>
                <strong>What happens next?</strong> Our design studio will review your specifications and email you an invoice and a secure photo upload link. You will receive a digital PDF proof for family review before anything goes to press.
              </p>
              <p style={{ margin: 0 }}>
                Need immediate assistance or have urgent deadline questions? Call our studio directly at <a href="tel:9173001104" style={{ color: '#1f6f68', fontWeight: 700 }}>(917) 300-1104</a>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/gallery" className="b b1" style={{ padding: '12px 24px', fontSize: '13px' }}>
                Return to Design Gallery
              </Link>
              <Link href="/" className="b" style={{ padding: '12px 24px', fontSize: '13px' }}>
                Visit Home
              </Link>
            </div>
          </div>
        ) : (
          /* Main Order Intake Form */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {validationError && (
              <div style={{
                background: '#fee2e2',
                border: '1px solid #f87171',
                borderRadius: '6px',
                padding: '14px 18px',
                fontSize: '13.5px',
                color: '#991b1b',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}>
                <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                <span>{validationError}</span>
              </div>
            )}

            {/* SECTION 1: Selected Program & Specifications */}
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e0d5c2',
              padding: 'clamp(22px, 3.5vw, 32px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '1px solid #efe8dc',
                paddingBottom: '12px',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1f6f68' }}>
                    Section 1
                  </div>
                  <h2 className="s" style={{ fontSize: '22px', color: '#262626', margin: 0 }}>
                    Selected Memorial Program &amp; Specifications
                  </h2>
                </div>
                <Link href="/gallery" style={{ fontSize: '12.5px', color: '#1f6f68', fontWeight: 600, textDecoration: 'underline' }}>
                  Browse Different Design
                </Link>
              </div>

              {/* Design Selector & Active Selection Banner */}
              <div style={{
                background: '#faf8f4',
                border: '1px solid #e0d5c2',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  width: '64px',
                  height: '84px',
                  backgroundImage: `url(${matchedDesign.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '3px',
                  border: '1px solid #dcd3c4',
                  flexShrink: 0
                }} />

                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ fontSize: '11px', color: '#1f6f68', fontWeight: 700, textTransform: 'uppercase' }}>
                    Design #{matchedDesign.designNumber} · {matchedDesign.collectionName}
                  </div>
                  <div className="s" style={{ fontSize: '19px', color: '#262626', margin: '2px 0 4px', fontWeight: 600 }}>
                    {matchedDesign.title}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#666' }}>
                    {matchedDesign.theme}
                  </div>
                </div>

                <div style={{ minWidth: '180px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#555', marginBottom: '4px' }}>
                    Change Design Selection:
                  </label>
                  <select
                    value={selectedDesignNum}
                    onChange={(e) => setSelectedDesignNum(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      borderRadius: '4px',
                      border: '1px solid #cfcfcf',
                      background: '#ffffff'
                    }}
                  >
                    {GALLERY_DESIGNS.map(d => (
                      <option key={d.designNumber} value={d.designNumber}>
                        #{d.designNumber} — {d.title} ({d.collectionName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Format & Size Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '20px' }}>
                {/* Program Format */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                    Program Format *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {DEFAULT_FORMATS.map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setSelectedFormat(fmt)}
                        style={{
                          padding: '10px 12px',
                          border: selectedFormat === fmt ? '2px solid #1f6f68' : '1px solid #ddd',
                          background: selectedFormat === fmt ? '#f0f6f5' : '#ffffff',
                          color: selectedFormat === fmt ? '#1f6f68' : '#444',
                          fontWeight: selectedFormat === fmt ? 700 : 500,
                          borderRadius: '4px',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Program Size */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                    Program Size *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {DEFAULT_SIZES.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        style={{
                          padding: '10px 12px',
                          border: selectedSize === sz ? '2px solid #1f6f68' : '1px solid #ddd',
                          background: selectedSize === sz ? '#f0f6f5' : '#ffffff',
                          color: selectedSize === sz ? '#1f6f68' : '#444',
                          fontWeight: selectedSize === sz ? 700 : 500,
                          borderRadius: '4px',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                  Quantity Needed *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '8px' }}>
                  {DEFAULT_QUANTITIES.map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setSelectedQuantity(qty)}
                      style={{
                        padding: '10px 12px',
                        border: selectedQuantity === qty ? '2px solid #1f6f68' : '1px solid #ddd',
                        background: selectedQuantity === qty ? '#f0f6f5' : '#ffffff',
                        color: selectedQuantity === qty ? '#1f6f68' : '#444',
                        fontWeight: selectedQuantity === qty ? 700 : 500,
                        borderRadius: '4px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      {qty}
                    </button>
                  ))}
                </div>

                {selectedQuantity === '250+' && (
                  <div style={{ marginTop: '10px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                      Specify Exact Quantity Needed (250+) *
                    </label>
                    <input
                      type="text"
                      required={selectedQuantity === '250+'}
                      placeholder="e.g. 300, 400, 500 copies"
                      value={customQuantity}
                      onChange={(e) => setCustomQuantity(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #cfcfcf',
                        borderRadius: '4px',
                        fontSize: '13.5px'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Optional Add-ons */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                  Optional Program Add-ons
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {DEFAULT_ADDONS.map((addOn) => {
                    const isSelected = selectedAddOns.includes(addOn)
                    return (
                      <div
                        key={addOn}
                        onClick={() => handleAddOnToggle(addOn)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          border: isSelected ? '1px solid #1f6f68' : '1px solid #e3e3e3',
                          background: isSelected ? '#f5f9f8' : '#ffffff',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          userSelect: 'none'
                        }}
                      >
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '3px',
                          border: isSelected ? '1px solid #1f6f68' : '1px solid #bbb',
                          background: isSelected ? '#1f6f68' : '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '11px',
                          flexShrink: 0
                        }}>
                          {isSelected && <Check size={13} />}
                        </div>
                        <span style={{ fontWeight: isSelected ? 600 : 400, color: '#333' }}>
                          {addOn}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Special Requests / Custom Layout */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#262626', marginBottom: '4px' }}>
                  Special Requests / Custom Layout
                </label>
                <p style={{ fontSize: '11.5px', color: '#666', margin: '0 0 6px', lineHeight: 1.45 }}>
                  For design modifications, unique layouts, personalized elements, or other customization needs. Additional charges may apply depending on the nature of your request.
                </p>
                <textarea
                  rows={2}
                  placeholder="e.g. Include gold foil accent border, add 6 additional photo collage slots, special scripture passage on inside spread..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #cfcfcf',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            {/* SECTION 2: Family & Contact Details */}
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e0d5c2',
              padding: 'clamp(22px, 3.5vw, 32px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                borderBottom: '1px solid #efe8dc',
                paddingBottom: '12px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1f6f68' }}>
                  Section 2
                </div>
                <h2 className="s" style={{ fontSize: '22px', color: '#262626', margin: 0 }}>
                  Family &amp; Primary Contact Information
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Full Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Relationship to Loved One *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daughter, Spouse, Sister, Representative"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Primary Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(917) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Email Address * (For Proofs &amp; Invoice)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Alternate Contact Name &amp; Phone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Marcus Jenkins (Brother) - (917) 555-0199"
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: Loved One Memorial Details */}
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e0d5c2',
              padding: 'clamp(22px, 3.5vw, 32px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                borderBottom: '1px solid #efe8dc',
                paddingBottom: '12px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1f6f68' }}>
                  Section 3
                </div>
                <h2 className="s" style={{ fontSize: '22px', color: '#262626', margin: 0 }}>
                  Loved One Memorial Details
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Full Name of Beloved (As to appear on program cover) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Grace Dawson (née Mills)"
                    value={lovedOneName}
                    onChange={(e) => setLovedOneName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Sunrise Date (Date of Birth)
                  </label>
                  <input
                    type="date"
                    value={sunriseDate}
                    onChange={(e) => setSunriseDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Sunset Date (Date of Passing)
                  </label>
                  <input
                    type="date"
                    value={sunsetDate}
                    onChange={(e) => setSunsetDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Photographs &amp; Content Readiness
                  </label>
                  <select
                    value={photoStatus}
                    onChange={(e) => setPhotoStatus(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px',
                      background: '#ffffff'
                    }}
                  >
                    <option value="ready_to_email">Photographs and obituary ready to email immediately upon submission</option>
                    <option value="upload_via_link">I prefer an upload link emailed to our family</option>
                    <option value="working_on_photos">Still gathering photographs; will email within 24 hours</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 4: Service & Production Details (Strictly per client instructions) */}
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e0d5c2',
              padding: 'clamp(22px, 3.5vw, 32px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                borderBottom: '1px solid #efe8dc',
                paddingBottom: '12px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1f6f68' }}>
                  Section 4
                </div>
                <h2 className="s" style={{ fontSize: '22px', color: '#262626', margin: '0 0 4px' }}>
                  ORDER FORM — SERVICE &amp; PRODUCTION DETAILS
                </h2>
                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                  Enter your service and completion dates to determine production turnaround schedule.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '24px' }}>
                {/* Service Date */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#262626', marginBottom: '5px' }}>
                    Service Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                  <span style={{ fontSize: '11.5px', color: '#777', display: 'block', marginTop: '3px' }}>
                    Select date of memorial service or viewing
                  </span>
                </div>

                {/* Requested Pickup / Delivery Date */}
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#262626', marginBottom: '5px' }}>
                    Requested Pickup / Delivery Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={requestedCompletionDate}
                    onChange={(e) => setRequestedCompletionDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: isRushRequired ? '2px solid #d97706' : '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px',
                      background: isRushRequired ? '#fffbeb' : '#ffffff'
                    }}
                  />
                  <span style={{ fontSize: '11.5px', color: '#777', display: 'block', marginTop: '3px' }}>
                    Select date needed in-hand
                  </span>
                </div>
              </div>

              {/* ESTIMATED ORDER READY DATE DISPLAY (as requested by client) */}
              <div style={{
                background: '#faf8f4',
                border: '1px solid #e0d5c2',
                borderRadius: '6px',
                padding: '18px 20px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#1f6f68',
                      marginBottom: '2px'
                    }}>
                      Estimated Order Ready Date
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#262626' }}>
                      {readyDateInfo.readyDateString}
                    </div>
                  </div>
                  <div style={{
                    background: '#dfe9e5',
                    color: '#1f6f68',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <Clock size={13} /> Standard 4-Business-Day Turnaround
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', lineHeight: 1.5 }}>
                  Calculated from the order submission date, production schedule, and standard four-business-day turnaround (Mon–Fri, daily cutoff 6:00 PM ET).
                </div>
              </div>

              {/* DYNAMIC RUSH ORDER NOTICE & ACKNOWLEDGMENT */}
              {isRushRequired && (
                <div 
                  id="rush-notice-box"
                  style={{
                    background: '#fffbeb',
                    border: '2px solid #f59e0b',
                    borderRadius: '6px',
                    padding: '20px',
                    marginBottom: '24px',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.15)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <AlertTriangle size={22} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#92400e', fontWeight: 700 }}>
                        Rush Order Acknowledgment
                      </h4>
                      <p style={{ margin: '0 0 12px', fontSize: '13.5px', color: '#92400e', lineHeight: 1.55 }}>
                        If your requested completion date is earlier than our standard Estimated Order Ready Date, rush processing may be required and additional fees will apply, subject to availability.
                      </p>
                      
                      <div style={{
                        background: '#ffffff',
                        border: '1px solid #fde68a',
                        borderRadius: '4px',
                        padding: '12px 14px',
                        marginBottom: '14px',
                        fontSize: '12.5px',
                        color: '#78350f'
                      }}>
                        <div>Your Requested Date: <strong>{requestedCompletionDate}</strong></div>
                        <div>Standard 4-Day Ready Date: <strong>{readyDateInfo.readyDateString}</strong></div>
                        <div style={{ marginTop: '4px', fontSize: '12px', color: '#b45309' }}>
                          Expedited press run required. Our team will verify press capacity and confirm the actual rush fee before your order is processed.
                        </div>
                      </div>

                      {/* Mandatory Checkbox */}
                      <label style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        cursor: 'pointer',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        color: '#78350f',
                        userSelect: 'none'
                      }}>
                        <input
                          type="checkbox"
                          checked={rushAcknowledged}
                          onChange={(e) => {
                            setRushAcknowledged(e.target.checked)
                            if (e.target.checked) setValidationError('')
                          }}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#1f6f68',
                            marginTop: '2px',
                            flexShrink: 0,
                            cursor: 'pointer'
                          }}
                        />
                        <span>
                          I understand that rush orders are subject to availability and additional fees, which must be confirmed before processing.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Venue & Logistics fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Delivery or Pickup Preference
                  </label>
                  <select
                    value={fulfillmentMethod}
                    onChange={(e) => setFulfillmentMethod(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px',
                      background: '#ffffff'
                    }}
                  >
                    <option value="studio_pickup">Studio Pickup (Brooklyn, NY — By Appointment)</option>
                    <option value="courier_nyc">Direct Courier Delivery to Funeral Home / Church (NYC Metro)</option>
                    <option value="express_shipping">Express Overnight Shipping (Tri-State &amp; Nationwide)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Funeral Home / Chapel Name (If applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grace Chapel / Lawrence H. Woodward Funeral Home"
                    value={funeralHome}
                    onChange={(e) => setFuneralHome(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                    Service Location Address &amp; Delivery Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Troy Ave, Brooklyn, NY 11213 · Please deliver directly to Director Jenkins"
                    value={venueLocation}
                    onChange={(e) => setVenueLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13.5px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SUBMISSION BAR */}
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e0d5c2',
              padding: '24px 28px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <div style={{ fontSize: '13px', color: '#555' }}>
                  No online payment is processed today.
                </div>
                <div style={{ fontSize: '12px', color: '#777', marginTop: '2px' }}>
                  Pricing and invoice are finalized upon proof review and rush confirmation (if applicable).
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <Link
                  href="/gallery"
                  style={{
                    fontSize: '13px',
                    color: '#666',
                    textDecoration: 'underline'
                  }}
                >
                  Cancel &amp; Return to Gallery
                </Link>

                <button
                  type="submit"
                  disabled={submitting}
                  className="b b1"
                  style={{
                    padding: '14px 32px',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    boxShadow: '0 4px 16px rgba(31, 111, 104, 0.3)'
                  }}
                >
                  {submitting ? 'Submitting Order Request...' : 'Submit Order Request'}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: '80px 20px', textAlign: 'center', color: '#666' }}>
        Loading memorial program order form...
      </div>
    }>
      <OrderFormContent />
    </Suspense>
  )
}

