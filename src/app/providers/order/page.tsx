'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Building2, 
  Calendar, 
  Clock, 
  MapPin, 
  Truck, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertCircle,
  FileText,
  Layers,
  Sparkles,
  Info
} from 'lucide-react'

// 10 Products checklist matching Katrice Clermont's specification
const PRODUCT_CHECKLIST = [
  { id: 'memorial_program', name: 'Memorial Program', tag: 'Print Keepsake' },
  { id: 'digital_program', name: 'Digital Program', tag: 'Digital & Mobile' },
  { id: 'prayer_card', name: 'Prayer Card', tag: 'Keepsake Card' },
  { id: 'poster', name: 'Poster', tag: 'Display Tribute' },
  { id: 'casket_panel', name: 'Casket Panel', tag: 'Sanctuary Piece' },
  { id: 'announcement', name: 'Announcement', tag: 'Service Invite' },
  { id: 'bookmark', name: 'Bookmark', tag: 'Memorial Favor' },
  { id: 'button', name: 'Button', tag: 'Family Keepsake' },
  { id: 'thank_you_card', name: 'Thank You Card', tag: 'Family Gratitude' },
  { id: 'other_products', name: 'Other Products', tag: 'Custom Tribute' },
]

export default function FuneralHomeOrderFormPage() {
  // A. Funeral Home Information (pre-filled from provider account)
  const [fhName, setFhName] = useState('Grace Memorial Chapel')
  const [fhContact, setFhContact] = useState('Director Marcus Jenkins')
  const [fhPhone, setFhPhone] = useState('(718) 555-0192')
  const [fhEmail, setFhEmail] = useState('director@gracememorial.com')

  // B. Loved One & Service Details
  const [lovedOneName, setLovedOneName] = useState('')
  const [sunriseDate, setSunriseDate] = useState('')
  const [sunsetDate, setSunsetDate] = useState('')
  const [viewingDate, setViewingDate] = useState('')
  const [viewingTime, setViewingTime] = useState('')
  const [serviceDate, setServiceDate] = useState('')
  const [serviceTime, setServiceTime] = useState('')
  const [serviceLocation, setServiceLocation] = useState('')
  const [cemetery, setCemetery] = useState('')
  const [deliveryPreference, setDeliveryPreference] = useState('chapel_delivery')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryInstructions, setDeliveryInstructions] = useState('')

  // C. Order Information & Tiers
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['memorial_program'])
  const [programQuantity, setProgramQuantity] = useState('100')
  const [selectedTier, setSelectedTier] = useState<'Essential' | 'Signature' | 'Premier'>('Essential')
  const [payingParty, setPayingParty] = useState<'funeral_home' | 'family'>('funeral_home')
  const [rushOption, setRushOption] = useState<'none' | '2_day' | '1_day'>('none')
  const [studioNotes, setStudioNotes] = useState('')

  // D. Family & Primary Contact
  const [familyName, setFamilyName] = useState('')
  const [familyRelationship, setFamilyRelationship] = useState('')
  const [familyPhone, setFamilyPhone] = useState('')
  const [familyEmail, setFamilyEmail] = useState('')
  const [familyAltContact, setFamilyAltContact] = useState('')

  // Hand-off Link State
  const [handoffUrl, setHandoffUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [showHandoffModal, setShowHandoffModal] = useState(false)
  const [validationError, setValidationError] = useState('')

  const toggleProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  const handleGenerateHandoff = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!lovedOneName.trim()) {
      setValidationError("Please enter the loved one's full name.")
      window.scrollTo({ top: 300, behavior: 'smooth' })
      return
    }

    if (!familyName.trim() || (!familyEmail.trim() && !familyPhone.trim())) {
      setValidationError('Please provide the family contact name and either phone or email for the hand-off.')
      window.scrollTo({ top: 1200, behavior: 'smooth' })
      return
    }

    // Build URL parameter object for Form 2 (The Main Family Order Form)
    const params = new URLSearchParams()
    params.set('handoff', '1')
    params.set('fhName', fhName)
    params.set('fhContact', fhContact)
    params.set('fhPhone', fhPhone)
    params.set('fhEmail', fhEmail)

    params.set('lovedOneName', lovedOneName)
    if (sunriseDate) params.set('sunrise', sunriseDate)
    if (sunsetDate) params.set('sunset', sunsetDate)
    if (viewingDate) params.set('viewingDate', viewingDate)
    if (viewingTime) params.set('viewingTime', viewingTime)
    if (serviceDate) params.set('serviceDate', serviceDate)
    if (serviceTime) params.set('serviceTime', serviceTime)
    if (serviceLocation) params.set('serviceLocation', serviceLocation)
    if (cemetery) params.set('cemetery', cemetery)
    params.set('delivery', deliveryPreference)
    if (deliveryAddress) params.set('deliveryAddress', deliveryAddress)
    if (deliveryInstructions) params.set('deliveryInstructions', deliveryInstructions)

    params.set('products', selectedProducts.join(','))
    params.set('quantity', programQuantity)
    params.set('tier', selectedTier.toLowerCase())
    params.set('payingParty', payingParty)
    params.set('rush', rushOption)
    if (studioNotes) params.set('notes', studioNotes)

    params.set('contactName', familyName)
    if (familyRelationship) params.set('relationship', familyRelationship)
    if (familyPhone) params.set('phone', familyPhone)
    if (familyEmail) params.set('email', familyEmail)
    if (familyAltContact) params.set('altPhone', familyAltContact)

    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const generatedUrl = `${origin}/order?${params.toString()}`

    setHandoffUrl(generatedUrl)
    setShowHandoffModal(true)
  }

  const copyToClipboard = () => {
    if (!handoffUrl) return
    navigator.clipboard.writeText(handoffUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const emailSubject = encodeURIComponent(`Memorial Keepsakes Order Hand-Off for the ${lovedOneName || 'Family'} Service`)
  const emailBody = encodeURIComponent(
    `Dear ${familyName || 'Family'},\n\n` +
    `Grace Memorial Chapel has initiated your memorial keepsakes order with Lilies of the Field.\n\n` +
    `We have pre-filled your service schedule and logistics. Please use your private family link below to review the dates, select your memorial program design, and upload your family photographs:\n\n` +
    `${handoffUrl}\n\n` +
    `If you have any questions, please contact our chapel office or Lilies of the Field at (917) 300-1104.\n\n` +
    `Warm regards,\n` +
    `${fhContact}\n${fhName}`
  )

  return (
    <div style={{ background: '#fcfaf6', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Top Header / Context */}
      <section style={{
        background: 'linear-gradient(180deg, #f5efe6 0%, #fcfaf6 100%)',
        padding: 'clamp(36px, 5vw, 56px) 20px 32px',
        borderBottom: '1px solid #ebd8b5',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(31, 111, 104, 0.08)',
            border: '1px solid rgba(31, 111, 104, 0.25)',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '11.5px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#1f6f68',
            marginBottom: '14px'
          }}>
            <ShieldCheck size={14} /> Licensed Provider Portal · Form 1
          </div>

          <h1 className="s" style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            color: '#1f6f68',
            margin: '0 0 12px',
            letterSpacing: '-0.02em',
            lineHeight: 1.15
          }}>
            Funeral Home Order Form
          </h1>

          <p style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#4a4a4a',
            maxWidth: '680px',
            margin: '0 auto 16px'
          }}>
            <strong>A streamlined starter form for licensed funeral homes &amp; directors.</strong> You provide the service logistics, dates, cemetery, and family contact—our studio will seamlessly hand off the order link to the family to select their program design, upload photographs, and confirm tributes.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#666', background: '#fff', padding: '6px 14px', borderRadius: '4px', border: '1px solid #e0d5c2' }}>
            <Info size={14} color="#1f6f68" />
            <span>Are you a family ordering directly? <Link href="/order" style={{ color: '#1f6f68', fontWeight: 600, textDecoration: 'underline' }}>Click here for the Family Main Order Form</Link></span>
          </div>
        </div>
      </section>

      {/* Main Intake Form Container */}
      <main className="site-container" style={{ maxWidth: '880px', marginTop: '28px', padding: '0 16px' }}>
        <form onSubmit={handleGenerateHandoff} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {validationError && (
            <div style={{
              background: '#fdf2f2',
              border: '1px solid #e0a3a3',
              borderRadius: '6px',
              padding: '14px 18px',
              color: '#9e2a2b',
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{validationError}</span>
            </div>
          )}

          {/* SECTION A: FUNERAL HOME INFORMATION (Pre-filled) */}
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e0d5c2',
            padding: 'clamp(20px, 3.5vw, 30px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #efe8dc', paddingBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1f6f68' }}>
                  Section A
                </span>
                <h2 className="s" style={{ fontSize: '20px', color: '#262626', margin: '2px 0 0' }}>
                  Funeral Home Information
                </h2>
              </div>
              <span style={{ fontSize: '11.5px', color: '#1f6f68', background: 'rgba(31,111,104,0.08)', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>
                Pre-filled from Provider Account
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Funeral Home Name *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cfcfcf', borderRadius: '4px', background: '#fafafa', padding: '0 10px' }}>
                  <Building2 size={16} color="#888" style={{ marginRight: '8px' }} />
                  <input
                    type="text"
                    required
                    value={fhName}
                    onChange={(e) => setFhName(e.target.value)}
                    style={{ width: '100%', padding: '10px 0', border: 'none', background: 'transparent', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Director / Coordinator Name *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cfcfcf', borderRadius: '4px', background: '#fafafa', padding: '0 10px' }}>
                  <User size={16} color="#888" style={{ marginRight: '8px' }} />
                  <input
                    type="text"
                    required
                    value={fhContact}
                    onChange={(e) => setFhContact(e.target.value)}
                    style={{ width: '100%', padding: '10px 0', border: 'none', background: 'transparent', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Direct Phone *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cfcfcf', borderRadius: '4px', background: '#fafafa', padding: '0 10px' }}>
                  <Phone size={16} color="#888" style={{ marginRight: '8px' }} />
                  <input
                    type="tel"
                    required
                    value={fhPhone}
                    onChange={(e) => setFhPhone(e.target.value)}
                    style={{ width: '100%', padding: '10px 0', border: 'none', background: 'transparent', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Direct Email *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cfcfcf', borderRadius: '4px', background: '#fafafa', padding: '0 10px' }}>
                  <Mail size={16} color="#888" style={{ marginRight: '8px' }} />
                  <input
                    type="email"
                    required
                    value={fhEmail}
                    onChange={(e) => setFhEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 0', border: 'none', background: 'transparent', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: LOVED ONE & SERVICE DETAILS */}
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e0d5c2',
            padding: 'clamp(20px, 3.5vw, 30px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <div style={{ marginBottom: '16px', borderBottom: '1px solid #efe8dc', paddingBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1f6f68' }}>
                Section B
              </span>
              <h2 className="s" style={{ fontSize: '20px', color: '#262626', margin: '2px 0 4px' }}>
                Loved One &amp; Service Details
              </h2>
              <p style={{ fontSize: '12.5px', color: '#666', margin: 0 }}>
                These dates and locations will pre-populate the family’s keepsakes order and cover layout.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Loved One&apos;s Full Legal / Memorial Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Grace Dawson"
                  value={lovedOneName}
                  onChange={(e) => setLovedOneName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Sunrise (Date of Birth)
                </label>
                <input
                  type="date"
                  value={sunriseDate}
                  onChange={(e) => setSunriseDate(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Sunset (Date of Passing)
                </label>
                <input
                  type="date"
                  value={sunsetDate}
                  onChange={(e) => setSunsetDate(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Viewing Date
                </label>
                <input
                  type="date"
                  value={viewingDate}
                  onChange={(e) => setViewingDate(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Viewing Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4:00 PM – 8:00 PM"
                  value={viewingTime}
                  onChange={(e) => setViewingTime(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Service Date *
                </label>
                <input
                  type="date"
                  required
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Service Time *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10:00 AM EST"
                  value={serviceTime}
                  onChange={(e) => setServiceTime(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Service Location (Facility / Sanctuary &amp; Address) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Memorial Chapel, 123 Atlantic Avenue, Brooklyn, NY"
                  value={serviceLocation}
                  onChange={(e) => setServiceLocation(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Cemetery / Final Resting Place (Name &amp; City)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pinelawn Memorial Park, Farmingdale, NY"
                  value={cemetery}
                  onChange={(e) => setCemetery(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                />
              </div>
            </div>

            {/* Delivery / Pickup Preferences */}
            <div style={{ background: '#faf8f4', border: '1px solid #e0d5c2', borderRadius: '6px', padding: '16px 18px', marginTop: '10px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                Keepsake Delivery or Pickup Preference
              </label>
              
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <input
                    type="radio"
                    name="deliveryPref"
                    value="chapel_delivery"
                    checked={deliveryPreference === 'chapel_delivery'}
                    onChange={() => setDeliveryPreference('chapel_delivery')}
                    style={{ accentColor: '#1f6f68' }}
                  />
                  <span>Direct Chapel Courier Delivery (NYC Metropolitan Area)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <input
                    type="radio"
                    name="deliveryPref"
                    value="studio_pickup_queens"
                    checked={deliveryPreference === 'studio_pickup_queens'}
                    onChange={() => setDeliveryPreference('studio_pickup_queens')}
                    style={{ accentColor: '#1f6f68' }}
                  />
                  <span>Studio Pickup (21229 Jamaica Ave, Queens Village, NY · By Appt)</span>
                </label>
              </div>

              {deliveryPreference === 'chapel_delivery' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#555', marginBottom: '4px' }}>
                      Delivery Street Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 123 Atlantic Avenue, Brooklyn, NY 11201"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '12.5px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#555', marginBottom: '4px' }}>
                      Delivery Instructions &amp; Contact Person
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Deliver boxed programs directly to Director Marcus by 8:30 AM"
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION C: ORDER INFORMATION */}
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e0d5c2',
            padding: 'clamp(20px, 3.5vw, 30px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <div style={{ marginBottom: '16px', borderBottom: '1px solid #efe8dc', paddingBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1f6f68' }}>
                Section C
              </span>
              <h2 className="s" style={{ fontSize: '20px', color: '#262626', margin: '2px 0 4px' }}>
                Order Information &amp; Products
              </h2>
              <p style={{ fontSize: '12.5px', color: '#666', margin: 0 }}>
                Select the products requested for this service. The family will choose designs and upload photos on their form.
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '8px' }}>
                Products Being Ordered (Checklist) *
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {PRODUCT_CHECKLIST.map((prod) => {
                  const isChecked = selectedProducts.includes(prod.id)
                  return (
                    <label
                      key={prod.id}
                      onClick={() => toggleProduct(prod.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        border: isChecked ? '1px solid #1f6f68' : '1px solid #e0d5c2',
                        background: isChecked ? '#f1f8f7' : '#ffffff',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ accentColor: '#1f6f68', width: '16px', height: '16px' }}
                      />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: isChecked ? 700 : 500, color: '#262626' }}>
                          {prod.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#888' }}>
                          {prod.tag}
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* TIER & BILLING SELECTION */}
            <div style={{ marginBottom: '22px', background: '#faf8f4', border: '1px solid #ebd8b5', borderRadius: '6px', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#1f6f68', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Keepsake Tier &amp; Billing Responsibility *
                </label>
                <span style={{ fontSize: '11px', color: '#666' }}>Whoever pays for the order chooses the starting tier</span>
              </div>

              {/* Paying Party Selector */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  background: payingParty === 'funeral_home' ? '#f0f6f5' : '#ffffff',
                  border: payingParty === 'funeral_home' ? '2px solid #1f6f68' : '1px solid #cfcfcf',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: payingParty === 'funeral_home' ? 700 : 500,
                  color: '#262626'
                }}>
                  <input
                    type="radio"
                    name="payingParty"
                    value="funeral_home"
                    checked={payingParty === 'funeral_home'}
                    onChange={() => setPayingParty('funeral_home')}
                    style={{ accentColor: '#1f6f68' }}
                  />
                  <span>🏛️ Funeral Home Paying (Included in Chapel Package / Invoiced to Establishment)</span>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  background: payingParty === 'family' ? '#f0f6f5' : '#ffffff',
                  border: payingParty === 'family' ? '2px solid #1f6f68' : '1px solid #cfcfcf',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: payingParty === 'family' ? 700 : 500,
                  color: '#262626'
                }}>
                  <input
                    type="radio"
                    name="payingParty"
                    value="family"
                    checked={payingParty === 'family'}
                    onChange={() => setPayingParty('family')}
                    style={{ accentColor: '#1f6f68' }}
                  />
                  <span>👨‍👩‍👦 Family Paying Directly (Family billed upon digital proof review)</span>
                </label>
              </div>

              {/* 3 Tier Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '8px' }}>
                {[
                  {
                    id: 'Essential',
                    tag: 'Core Tribute',
                    desc: 'Thoughtful core memorial keepsakes with classic layout, essential photo slots, and dignified finish.'
                  },
                  {
                    id: 'Signature',
                    tag: 'Enhanced Keepsakes',
                    desc: 'Elevated tribute featuring enriched typography, expanded photo spreads, and premium cardstock.'
                  },
                  {
                    id: 'Premier',
                    tag: 'Bespoke Luxury',
                    desc: 'Bespoke luxury keepsake suite with opulent styling, comprehensive collage spreads, and priority artistry.'
                  }
                ].map(t => {
                  const isSel = selectedTier === t.id
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTier(t.id as any)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: isSel ? '2px solid #1f6f68' : '1px solid #dcd5ca',
                        background: isSel ? '#ffffff' : '#fafafa',
                        cursor: 'pointer',
                        boxShadow: isSel ? '0 2px 8px rgba(31, 111, 104, 0.12)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: isSel ? '#1f6f68' : '#262626' }}>
                          {t.id} Tier
                        </span>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1f6f68', fontWeight: 700 }}>
                          {t.tag}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '11.5px', color: '#555', lineHeight: 1.45 }}>
                        {t.desc}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div style={{ fontSize: '11.5px', color: '#666', marginTop: '6px' }}>
                {payingParty === 'funeral_home' 
                  ? `✦ Selected tier (${selectedTier}) will carry over to the family form. If the family desires a higher tier, they can upgrade on their form and pay the difference themselves.`
                  : '✦ Family will see this starting tier selected and can confirm or adjust when completing their content.'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              {selectedProducts.includes('memorial_program') && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                    Program Quantity (Estimated or Set by Chapel)
                  </label>
                  <select
                    value={programQuantity}
                    onChange={(e) => setProgramQuantity(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px', background: '#fff' }}
                  >
                    <option value="50">50 Programs</option>
                    <option value="100">100 Programs</option>
                    <option value="150">150 Programs</option>
                    <option value="200">200 Programs</option>
                    <option value="250+">250+ Programs</option>
                    <option value="family_decides">To be finalized by family</option>
                  </select>
                </div>
              )}

              {/* Selectable Rush Options with exact fees */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>
                  Production Turnaround &amp; Rush Fees *
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    border: rushOption === 'none' ? '2px solid #1f6f68' : '1px solid #cfcfcf',
                    background: rushOption === 'none' ? '#f0f6f5' : '#ffffff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12.5px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="rushOption"
                        value="none"
                        checked={rushOption === 'none'}
                        onChange={() => setRushOption('none')}
                        style={{ accentColor: '#1f6f68' }}
                      />
                      <span style={{ fontWeight: 600, color: '#262626' }}>Standard Turnaround</span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#666' }}>4 Business Days (No fee)</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    border: rushOption === '2_day' ? '2px solid #b45309' : '1px solid #cfcfcf',
                    background: rushOption === '2_day' ? '#fffbeb' : '#ffffff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12.5px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="rushOption"
                        value="2_day"
                        checked={rushOption === '2_day'}
                        onChange={() => setRushOption('2_day')}
                        style={{ accentColor: '#b45309' }}
                      />
                      <span style={{ fontWeight: 700, color: '#92400e' }}>⚡ 2-Day Rush</span>
                    </div>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#92400e' }}>+$75 Rush Fee</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    border: rushOption === '1_day' ? '2px solid #991b1b' : '1px solid #cfcfcf',
                    background: rushOption === '1_day' ? '#fef2f2' : '#ffffff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12.5px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        name="rushOption"
                        value="1_day"
                        checked={rushOption === '1_day'}
                        onChange={() => setRushOption('1_day')}
                        style={{ accentColor: '#991b1b' }}
                      />
                      <span style={{ fontWeight: 700, color: '#991b1b' }}>⚡ 1-Day Urgent Rush</span>
                    </div>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#991b1b' }}>+$125 Rush Fee</span>
                  </label>
                </div>

                <div style={{ fontSize: '11.5px', color: '#b45309', marginTop: '6px', fontWeight: 600 }}>
                  ⚠️ Delivery is charged on top of the rush fee, separately.
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                Notes for the Lilies of the Field Design Studio
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please expedite proof review directly with family contact; programs needed at chapel by Friday morning."
                value={studioNotes}
                onChange={(e) => setStudioNotes(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '12.5px', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          {/* SECTION D: FAMILY & PRIMARY CONTACT */}
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e0d5c2',
            padding: 'clamp(20px, 3.5vw, 30px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <div style={{ marginBottom: '16px', borderBottom: '1px solid #efe8dc', paddingBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1f6f68' }}>
                Section D
              </span>
              <h2 className="s" style={{ fontSize: '20px', color: '#262626', margin: '2px 0 4px' }}>
                Family &amp; Primary Contact
              </h2>
              <p style={{ fontSize: '12.5px', color: '#666', margin: 0 }}>
                The funeral home provides this so the hand-off reaches the right representative.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Family Contact Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kendra Washington"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Relationship to Loved One
                </label>
                <input
                  type="text"
                  placeholder="e.g. Daughter / Spouse / Sister"
                  value={familyRelationship}
                  onChange={(e) => setFamilyRelationship(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Family Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. (917) 555-0182"
                  value={familyPhone}
                  onChange={(e) => setFamilyPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Family Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. kendra@example.com"
                  value={familyEmail}
                  onChange={(e) => setFamilyEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Alternate Family Contact (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marcus Dawson (Brother) · (718) 555-0144"
                  value={familyAltContact}
                  onChange={(e) => setFamilyAltContact(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                />
              </div>
            </div>
          </div>

          {/* SUBMISSION / HAND OFF ACTION */}
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e0d5c2',
            padding: '24px 28px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#1f6f68', marginBottom: '2px' }}>
                Ready to Hand Off Order to Family?
              </div>
              <div style={{ fontSize: '12.5px', color: '#666' }}>
                Generates a secure, pre-filled link to Form 2 ("Memorial Keepsakes Order Request") for the family.
              </div>
            </div>

            <button
              type="submit"
              className="b bg"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                fontSize: '13.5px',
                cursor: 'pointer'
              }}
            >
              <span>Generate Family Hand-off Link</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </main>

      {/* HAND-OFF SUCCESS MODAL */}
      {showHandoffModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '10px',
            maxWidth: '640px',
            width: '100%',
            padding: '28px 32px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            border: '1px solid #ebd8b5'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                background: '#e8f4f2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                color: '#1f6f68'
              }}>
                <Check size={28} />
              </div>
              <h3 className="s" style={{ fontSize: '24px', color: '#1f6f68', margin: '0 0 6px' }}>
                Family Hand-Off Link Generated
              </h3>
              <p style={{ fontSize: '13.5px', color: '#555', margin: 0 }}>
                Order starter details for <strong>{lovedOneName}</strong> have been packaged. Send this link to <strong>{familyName}</strong> to finalize their keepsake choices.
              </p>
            </div>

            {/* Quick Order Hand-off Summary */}
            <div style={{
              background: '#f8faf9',
              border: '1px solid #d0e5e3',
              borderRadius: '6px',
              padding: '12px 16px',
              marginBottom: '16px',
              fontSize: '12.5px',
              color: '#333'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                <div>
                  <strong>Selected Tier:</strong> {selectedTier} ({payingParty === 'funeral_home' ? 'Paid by Funeral Home' : 'Family Direct'})
                </div>
                <div>
                  <strong>Turnaround:</strong> {rushOption === '1_day' ? '1-Day Urgent Rush ($125 fee)' : rushOption === '2_day' ? '2-Day Rush ($75 fee)' : 'Standard 4 Business Days'}
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#b45309', marginTop: '6px' }}>
                * Delivery is charged on top of the rush fee, separately.
              </div>
            </div>

            {/* Generated Link Display */}
            <div style={{
              background: '#faf8f4',
              border: '1px solid #e0d5c2',
              borderRadius: '6px',
              padding: '12px 14px',
              marginBottom: '20px'
            }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1f6f68', marginBottom: '6px' }}>
                Family Order Form URL
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  readOnly
                  value={handoffUrl}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '12px',
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    color: '#444'
                  }}
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  style={{
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: copied ? '#1f6f68' : '#262626',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Actions for Funeral Director */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <a
                href={`mailto:${familyEmail}?subject=${emailSubject}&body=${emailBody}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  background: '#1f6f68',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <Mail size={16} />
                <span>Send Pre-Filled Email to {familyName}</span>
              </a>

              <a
                href={handoffUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px 18px',
                  background: '#ffffff',
                  border: '1px solid #1f6f68',
                  color: '#1f6f68',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <ExternalLink size={16} />
                <span>Preview Family Main Order Form</span>
              </a>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setShowHandoffModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Close and return to form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

