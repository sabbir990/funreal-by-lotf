'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Check, ShieldCheck, ArrowRight, Sparkles, HelpCircle } from 'lucide-react'
import { GalleryDesign, DEFAULT_FORMATS, DEFAULT_SIZES, DEFAULT_QUANTITIES, DEFAULT_ADDONS } from '@/data/galleryData'

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
  const router = useRouter()
  const [format, setFormat] = useState('4-Page')
  const [size, setSize] = useState('Standard')
  const [quantity, setQuantity] = useState('100')
  const [customQuantity, setCustomQuantity] = useState('')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [specialRequests, setSpecialRequests] = useState('')

  useEffect(() => {
    if (design) {
      setFormat(design.availableFormats?.[0] || '4-Page')
      setSize('Standard')
      setQuantity('100')
      setCustomQuantity('')
      setSelectedAddOns([])
      setSpecialRequests('')
    }
  }, [design])

  if (!isOpen || !design) return null

  const handleAddOnToggle = (addOn: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOn) ? prev.filter(item => item !== addOn) : [...prev, addOn]
    )
  }

  const handleContinueToOrder = (e: React.FormEvent) => {
    e.preventDefault()

    const finalQuantity = quantity === '250+' ? (customQuantity.trim() || '250+') : quantity

    const orderDraft = {
      designNumber: design.designNumber,
      designTitle: design.title,
      collectionName: design.collectionName,
      coverImage: design.coverImage,
      format,
      size,
      quantity: finalQuantity,
      addOns: selectedAddOns,
      specialRequests: specialRequests.trim()
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('lotf_order_draft', JSON.stringify(orderDraft))
      } catch {
        // localStorage fallback
      }
    }

    const params = new URLSearchParams()
    params.set('design', design.designNumber)
    params.set('title', design.title)
    params.set('collection', design.collectionName)
    params.set('format', format)
    params.set('size', size)
    params.set('quantity', finalQuantity)
    if (selectedAddOns.length > 0) {
      params.set('addons', selectedAddOns.join(';'))
    }
    if (specialRequests.trim()) {
      params.set('requests', specialRequests.trim())
    }

    onClose()
    router.push(`/order?${params.toString()}`)
  }

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(20, 25, 24, 0.72)',
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
          maxWidth: '640px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 24px 48px rgba(0,0,0,0.25)',
          border: '1px solid #e0d5c2',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '22px 26px 18px',
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
              marginBottom: '5px'
            }}>
              <ShieldCheck size={14} /> Program Specifications
            </div>
            <h2 className="s" style={{ fontSize: '23px', color: '#262626', margin: 0, lineHeight: 1.25 }}>
              Design #{design.designNumber} — {design.title}
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
        <div style={{ padding: '22px 26px' }}>
          <form onSubmit={handleContinueToOrder} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            {/* Context Note */}
            <div style={{
              background: '#fdfbf7',
              border: '1px solid #ebd8b5',
              borderRadius: '6px',
              padding: '11px 14px',
              fontSize: '12.5px',
              color: '#704f12',
              display: 'flex',
              gap: '9px',
              alignItems: 'center'
            }}>
              <Sparkles size={16} style={{ flexShrink: 0, color: '#c9963b' }} />
              <span>
                Select your program specifications below. These details will automatically transfer into the main order form.
              </span>
            </div>

            {/* 1. Program Format */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                1. Program Format
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                {DEFAULT_FORMATS.map((fmt) => {
                  const isSelected = format === fmt
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFormat(fmt)}
                      style={{
                        padding: '10px 12px',
                        border: isSelected ? '2px solid #1f6f68' : '1px solid #ddd',
                        background: isSelected ? '#f0f6f5' : '#ffffff',
                        color: isSelected ? '#1f6f68' : '#444',
                        fontWeight: isSelected ? 700 : 500,
                        borderRadius: '4px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {fmt}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. Program Size */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                2. Program Size
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {DEFAULT_SIZES.map((sz) => {
                  const isSelected = size === sz
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSize(sz)}
                      style={{
                        padding: '11px 14px',
                        border: isSelected ? '2px solid #1f6f68' : '1px solid #ddd',
                        background: isSelected ? '#f0f6f5' : '#ffffff',
                        color: isSelected ? '#1f6f68' : '#444',
                        fontWeight: isSelected ? 700 : 500,
                        borderRadius: '4px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>{sz}</div>
                      <div style={{ fontSize: '11px', color: '#777', fontWeight: 400, marginTop: '2px' }}>
                        {sz === 'Standard' ? '8.5" x 11" (Folded to 5.5" x 8.5")' : '8.5" x 14" or 11" x 17" Tabloid'}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Quantity Needed */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                3. Quantity Needed
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '8px', marginBottom: quantity === '250+' ? '10px' : '0' }}>
                {DEFAULT_QUANTITIES.map((qty) => {
                  const isSelected = quantity === qty
                  return (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setQuantity(qty)}
                      style={{
                        padding: '9px 10px',
                        border: isSelected ? '2px solid #1f6f68' : '1px solid #ddd',
                        background: isSelected ? '#f0f6f5' : '#ffffff',
                        color: isSelected ? '#1f6f68' : '#444',
                        fontWeight: isSelected ? 700 : 500,
                        borderRadius: '4px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {qty}
                    </button>
                  )
                })}
              </div>

              {quantity === '250+' && (
                <div style={{ marginTop: '10px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '4px' }}>
                    Specify Exact Quantity Needed (250+) *
                  </label>
                  <input
                    type="text"
                    required={quantity === '250+'}
                    placeholder="e.g. 300, 400, 500"
                    value={customQuantity}
                    onChange={(e) => setCustomQuantity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      border: '1px solid #cfcfcf',
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                  />
                </div>
              )}
            </div>

            {/* 4. Optional Add-ons */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                4. Optional Add-ons
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                        userSelect: 'none',
                        transition: 'all 0.15s ease'
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

            {/* 5. Special Requests / Custom Layout */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '4px' }}>
                5. Special Requests / Custom Layout
              </label>
              <p style={{ fontSize: '11.5px', color: '#666', margin: '0 0 6px', lineHeight: 1.4 }}>
                For design modifications, unique layouts, personalized elements, or other customization needs. Additional charges may apply depending on the nature of your request.
              </p>
              <textarea
                rows={3}
                placeholder="Share any special design changes, extra photo collages, custom verses, or layout requests..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #cfcfcf',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Modal Actions */}
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
                Cancel &amp; Return to Design
              </button>

              <button
                type="submit"
                className="b b1"
                style={{
                  padding: '13px 28px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  boxShadow: '0 4px 14px rgba(31, 111, 104, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Continue to Order <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
