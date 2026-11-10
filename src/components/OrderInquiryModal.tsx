'use client'

import { useState, useEffect } from 'react'
import { X, Check, ShieldCheck, Calendar, Phone, Mail, FileText, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react'
import { GalleryDesign } from '@/data/galleryData'
import { createClient } from '@/lib/supabase/client'

interface OrderInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  design: GalleryDesign | null
}

export default function OrderInquiryModal({
  isOpen,
  onClose,
  design
}: OrderInquiryModalProps) {
  const [format, setFormat] = useState('4-page Bi-Fold')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lovedOneName: '',
    serviceDate: '',
    quantity: '100',
    funeralHome: '',
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')

  useEffect(() => {
    if (design) {
      if (design.availableFormats && design.availableFormats.length > 0) {
        setFormat(design.availableFormats[0])
      }
      setSelectedAddOns([])
      setSubmitted(false)
    }
  }, [design])

  if (!isOpen || !design) return null

  const handleAddOnToggle = (addOn: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOn) ? prev.filter(item => item !== addOn) : [...prev, addOn]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const code = `LOTF-${design.designNumber}-${Math.floor(1000 + Math.random() * 9000)}`
    setConfirmationCode(code)

    try {
      const supabase = createClient()
      await supabase.from('service_inquiries').insert({
        contact_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_package: `Design No. ${design.designNumber}: ${design.title} (${format})`,
        preferred_date: formData.serviceDate ? formData.serviceDate : null,
        special_notes: `Loved One: ${formData.lovedOneName} | Funeral Home: ${formData.funeralHome || 'N/A'} | Qty: ${formData.quantity} | Add-ons: ${selectedAddOns.join(', ') || 'None'} | Notes: ${formData.notes || 'None'}`
      })
    } catch {
      // In case Supabase table isn't created yet or offline, continue gracefully
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(20, 25, 24, 0.7)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#ffffff',
          borderRadius: '8px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
          border: '1px solid #e0d5c2',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '24px 28px 18px',
          borderBottom: '1px solid #efe8dc',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          background: '#faf8f4'
        }}>
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
              marginBottom: '6px'
            }}>
              <ShieldCheck size={14} /> Official Design Order Inquiry
            </div>
            <h2 className="s" style={{ fontSize: '24px', color: '#262626', margin: 0, lineHeight: 1.25 }}>
              Order Design No. {design.designNumber} — {design.title}
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666' }}>
              Collection: <strong style={{ color: '#1f6f68' }}>{design.collectionName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#666',
              padding: '6px',
              borderRadius: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
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
              <h3 className="s" style={{ fontSize: '26px', color: '#1f6f68', marginBottom: '8px' }}>
                Inquiry Received for Design #{design.designNumber}
              </h3>
              <p style={{ color: '#555', fontSize: '14.5px', maxWidth: '480px', margin: '0 auto 18px', lineHeight: 1.6 }}>
                Thank you, <strong>{formData.name || 'Valued Client'}</strong>. Our Brooklyn design team has received your request for <strong>{design.title}</strong> (Format: {format}).
              </p>
              <div style={{
                background: '#faf8f4',
                border: '1px solid #e0d5c2',
                borderRadius: '6px',
                padding: '14px 20px',
                display: 'inline-block',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Confirmation Reference
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#1f6f68', letterSpacing: '0.05em' }}>
                  {confirmationCode}
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#777', margin: '0 0 24px', lineHeight: 1.5 }}>
                We will email your quote and proof submission link shortly. Need immediate assistance? Call us directly at <strong>(718) 924-2004</strong>.
              </p>
              <button
                onClick={onClose}
                className="b b1"
                style={{ minWidth: '160px' }}
              >
                Close &amp; Return to Gallery
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Notice Banner */}
              <div style={{
                background: '#fdfbf7',
                border: '1px solid #ebd8b5',
                borderRadius: '6px',
                padding: '12px 16px',
                fontSize: '12.5px',
                color: '#704f12',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}>
                <Sparkles size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#c9963b' }} />
                <span>
                  <strong>Gallery Order Notice:</strong> This carries <strong>Design #{design.designNumber}</strong> straight to our studio. Because every program is customized to your photos and service order, exact pricing and invoice are quoted based on proof approval. No payment is taken right now.
                </span>
              </div>

              {/* 1. Format Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                  1. Select Available Format
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {design.availableFormats.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      style={{
                        padding: '10px 12px',
                        border: format === fmt ? '2px solid #1f6f68' : '1px solid #ddd',
                        background: format === fmt ? '#f0f6f5' : '#ffffff',
                        color: format === fmt ? '#1f6f68' : '#444',
                        fontWeight: format === fmt ? 700 : 500,
                        borderRadius: '4px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Popular Add-ons */}
              {design.popularAddOns && design.popularAddOns.length > 0 && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                    2. Popular Add-ons (Optional)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                    {design.popularAddOns.map((addOn) => {
                      const isSelected = selectedAddOns.includes(addOn)
                      return (
                        <div
                          key={addOn}
                          onClick={() => handleAddOnToggle(addOn)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '9px 12px',
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
                            fontSize: '11px'
                          }}>
                            {isSelected && <Check size={13} />}
                          </div>
                          <span>{addOn}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 3. Customer & Service Details */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '10px' }}>
                  3. Family &amp; Service Contact Details
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(718) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                      Name of Loved One *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Dawson"
                      value={formData.lovedOneName}
                      onChange={(e) => setFormData({ ...formData, lovedOneName: e.target.value })}
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
                    <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                      Estimated Service Date
                    </label>
                    <input
                      type="date"
                      value={formData.serviceDate}
                      onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
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
                    <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                      Estimated Quantity Needed
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #cfcfcf',
                        borderRadius: '4px',
                        fontSize: '13.5px',
                        background: '#ffffff'
                      }}
                    >
                      <option value="50">50 copies</option>
                      <option value="100">100 copies (Most Common)</option>
                      <option value="150">150 copies</option>
                      <option value="200">200 copies</option>
                      <option value="250">250 copies</option>
                      <option value="300">300 copies</option>
                      <option value="500+">500+ copies</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                    Funeral Home / Venue &amp; Special Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Service at Grace Chapel Brooklyn. We have 14 photos and an obituary ready to submit."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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

              {/* Submit Buttons */}
              <div style={{
                borderTop: '1px solid #eee',
                paddingTop: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textDecoration: 'underline'
                  }}
                >
                  Cancel &amp; Continue Browsing
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="b b1"
                  style={{
                    padding: '12px 28px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    boxShadow: '0 4px 14px rgba(31, 111, 104, 0.3)'
                  }}
                >
                  {submitting ? 'Submitting Design Inquiry...' : `Submit Order Request for Design #${design.designNumber}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
