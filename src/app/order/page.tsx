'use client'

import { useState, useEffect, useMemo, Suspense, useRef } from 'react'
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
  Heart,
  Upload,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  BookOpen,
  HelpCircle,
  MapPin,
  Bookmark as BookmarkIcon,
  Tag,
  MessageSquare,
  FileUp,
  ScrollText
} from 'lucide-react'
import { 
  GALLERY_DESIGNS, 
  DEFAULT_FORMATS, 
  DEFAULT_SIZES, 
  DEFAULT_QUANTITIES, 
  DEFAULT_ADDONS,
  GalleryDesign 
} from '@/data/galleryData'
import { createClient } from '@/lib/supabase/client'
import {
  POEMS_AND_PRAYERS_LIST,
  ACKNOWLEDGEMENTS_LIST,
  ORDER_OF_SERVICE_TEMPLATES
} from '@/data/memorialContentData'

// Helper function to format bytes to human-readable string
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

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

// 10 Products List as defined by Katrice Clermont
const PRODUCT_CHECKLIST = [
  { id: 'memorial_program', name: 'Memorial Program', tag: 'Print Keepsake', desc: 'Bespoke 4-page, 6-page, or 8-page booklet' },
  { id: 'digital_program', name: 'Digital Program', tag: 'Digital & Mobile', desc: 'Interactive digital edition with QR code' },
  { id: 'prayer_card', name: 'Prayer Card', tag: 'Keepsake Card', desc: 'Laminated or heavy cardstock prayer cards' },
  { id: 'poster', name: 'Poster', tag: 'Display Tribute', desc: 'Mounted on foam board or satin paper' },
  { id: 'casket_panel', name: 'Casket Panel', tag: 'Sanctuary Piece', desc: 'Custom casket head panel insert' },
  { id: 'announcement', name: 'Announcement', tag: 'Service Invite', desc: 'Printed cards or digital graphics' },
  { id: 'bookmark', name: 'Bookmark', tag: 'Memorial Favor', desc: 'Laminated bookmarks with optional tassel' },
  { id: 'button', name: 'Button', tag: 'Family Keepsake', desc: 'Round pinback photo tribute buttons' },
  { id: 'thank_you_card', name: 'Thank You Card', tag: 'Family Gratitude', desc: 'Personalized folded note cards with envelopes' },
  { id: 'other_products', name: 'Other Products', tag: 'Custom Tribute', desc: 'Special request items, banners, or keepsakes' },
]

// Sample title / caption choices
const TITLE_CAPTION_OPTIONS = [
  'In Loving Memory of',
  'A Celebration of the Life and Legacy of',
  'Homegoing Celebration for',
  'Honoring the Life & Memory of',
  'Forever in Our Hearts',
  'Cherished Memories of',
  'A Triumphant Celebration of Life',
  'Sunrise & Sunset Memorial Tribute',
  'Custom Title / Caption...'
]

// Official Katrice Clermont Numbered Lists: Poems #01–#11
const POEM_PRAYER_OPTIONS = [
  ...POEMS_AND_PRAYERS_LIST.map(p => `${p.numberLabel}: ${p.title}`),
  'Custom Poem, Prayer, or Scripture...'
]

// Official Katrice Clermont Numbered Lists: Acknowledgements A1–A6
const ACKNOWLEDGEMENT_OPTIONS = [
  ...ACKNOWLEDGEMENTS_LIST.map(a => `${a.numberLabel}: ${a.title}`),
  'Custom Family Acknowledgement...',
  'N/A (No Acknowledgement Needed)'
]

// Order of service template options (4 starting options as specified by Katrice Clermont)
const ORDER_OF_SERVICE_TYPES = [
  'Standard Order of Service',
  'Memorial Celebration (Service without Casket)',
  'Order of Christian Funeral Mass',
  'Custom Order of Service'
]

// Disposition titles
const FINAL_DISPOSITION_OPTIONS = [
  'Interment',
  'Entombment',
  'Private Cremation',
  'Committal Service',
  'Repose',
  'Custom...'
]

// Simple File Dropzone Component
function FileUploadBox({
  label,
  accept,
  helperText,
  file,
  onFileSelect,
  onFileRemove
}: {
  label: string
  accept: string
  helperText?: string
  file: File | null
  onFileSelect: (f: File) => void
  onFileRemove: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div style={{ marginTop: '6px', marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
        {label}
      </label>

      {file ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: '#f0f6f5',
          border: '1px solid #1f6f68',
          borderRadius: '4px',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <FileText size={18} color="#1f6f68" style={{ flexShrink: 0 }} />
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#262626' }}>{file.name}</span>
              <span style={{ fontSize: '11px', color: '#666', marginLeft: '8px' }}>({formatFileSize(file.size)})</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onFileRemove}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#991b1b',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            border: '2px dashed #cfc7ba',
            borderRadius: '6px',
            padding: '16px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            background: '#faf8f4',
            transition: 'border-color 0.2s',
          }}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#1f6f68' }}
          onDragLeave={(e) => { e.currentTarget.style.borderColor = '#cfc7ba' }}
          onDrop={(e) => {
            e.preventDefault()
            e.currentTarget.style.borderColor = '#cfc7ba'
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              onFileSelect(e.dataTransfer.files[0])
            }
          }}
        >
          <Upload size={20} color="#1f6f68" style={{ margin: '0 auto 6px', display: 'block' }} />
          <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#262626' }}>
            Click to upload or drag &amp; drop file
          </div>
          {helperText && (
            <div style={{ fontSize: '11.5px', color: '#777', marginTop: '2px' }}>
              {helperText}
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onFileSelect(e.target.files[0])
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

// Multi-File Dropzone for Inside Photos / Memory Collages
function MultiFileUploadBox({
  label,
  accept,
  helperText,
  files,
  onFilesAdd,
  onFileRemove
}: {
  label: string
  accept: string
  helperText?: string
  files: File[]
  onFilesAdd: (newFiles: File[]) => void
  onFileRemove: (index: number) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div style={{ marginTop: '6px', marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
        {label}
      </label>

      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: '#f0f6f5',
                border: '1px solid #1f6f68',
                borderRadius: '4px',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                <ImageIcon size={16} color="#1f6f68" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#262626' }}>{file.name}</span>
                <span style={{ fontSize: '11px', color: '#666' }}>({formatFileSize(file.size)})</span>
              </div>
              <button
                type="button"
                onClick={() => onFileRemove(idx)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#991b1b', padding: '2px' }}
                title="Remove photo"
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        style={{
          border: '2px dashed #cfc7ba',
          borderRadius: '6px',
          padding: '14px 18px',
          textAlign: 'center',
          cursor: 'pointer',
          background: '#faf8f4'
        }}
      >
        <Upload size={18} color="#1f6f68" style={{ margin: '0 auto 4px', display: 'block' }} />
        <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#262626' }}>
          Click to add inside collage &amp; family photos (Multiple files supported)
        </div>
        {helperText && (
          <div style={{ fontSize: '11px', color: '#777', marginTop: '2px' }}>
            {helperText}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files) {
              onFilesAdd(Array.from(e.target.files))
            }
          }}
        />
      </div>
    </div>
  )
}

function OrderFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Hand-off parameters from Form 1 (Funeral Home Order Starter)
  const isHandoff = searchParams.get('handoff') === '1'
  const urlFhName = searchParams.get('fhName') || ''
  const urlFhContact = searchParams.get('fhContact') || ''
  const urlFhPhone = searchParams.get('fhPhone') || ''
  const urlFhEmail = searchParams.get('fhEmail') || ''

  const urlLovedOneName = searchParams.get('lovedOneName') || ''
  const urlSunrise = searchParams.get('sunrise') || ''
  const urlSunset = searchParams.get('sunset') || ''
  const urlViewingDate = searchParams.get('viewingDate') || ''
  const urlViewingTime = searchParams.get('viewingTime') || ''
  const urlServiceDate = searchParams.get('serviceDate') || ''
  const urlServiceTime = searchParams.get('serviceTime') || ''
  const urlServiceLocation = searchParams.get('serviceLocation') || ''
  const urlCemetery = searchParams.get('cemetery') || ''
  const urlDelivery = searchParams.get('delivery') || ''
  const urlDeliveryAddress = searchParams.get('deliveryAddress') || ''
  const urlDeliveryInstructions = searchParams.get('deliveryInstructions') || ''

  const urlProducts = searchParams.get('products') || ''
  const urlTier = searchParams.get('tier') || 'essential'
  const urlPayingParty = searchParams.get('payingParty') || ''
  const urlRushParam = searchParams.get('rush') || ''
  const urlNotes = searchParams.get('notes') || ''

  const urlContactName = searchParams.get('contactName') || ''
  const urlRelationship = searchParams.get('relationship') || ''
  const urlPhone = searchParams.get('phone') || ''
  const urlEmail = searchParams.get('email') || ''
  const urlAltPhone = searchParams.get('altPhone') || ''

  // Pre-fill parameters from gallery
  const urlDesignNum = searchParams.get('design') || ''
  const urlTitle = searchParams.get('title') || ''
  const urlFormat = searchParams.get('format') || ''
  const urlSize = searchParams.get('size') || ''
  const urlQty = searchParams.get('quantity') || ''
  const urlAddons = searchParams.get('addons') || ''
  const urlRequests = searchParams.get('requests') || ''

  // Guidance Accordion State (Step 1)
  const [guidanceOpen, setGuidanceOpen] = useState(true)
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const [handoffConfirmed, setHandoffConfirmed] = useState(false)

  // 1. Products Checklist State (Multiple products, each with its own options)
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    urlProducts ? urlProducts.split(',').filter(Boolean) : ['memorial_program']
  )

  // --- Product 1: Memorial Program Options ---
  const [selectedDesignNum, setSelectedDesignNum] = useState<string>(urlDesignNum || '101')
  const [selectedFormat, setSelectedFormat] = useState<string>(urlFormat || '4-Page')
  const [selectedSize, setSelectedSize] = useState<string>(urlSize || 'Standard')
  const [selectedQuantity, setSelectedQuantity] = useState<string>(urlQty || '100')
  const [customQuantity, setCustomQuantity] = useState<string>('')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(
    urlAddons ? urlAddons.split(';').filter(Boolean) : []
  )
  const [specialRequests, setSpecialRequests] = useState<string>(urlRequests || urlNotes || '')

  // --- Product 2: Digital Program Options ---
  const [digitalDelivery, setDigitalDelivery] = useState('pdf_and_link')
  const [digitalNotes, setDigitalNotes] = useState('')

  // --- Product 3: Prayer Card Options ---
  const [prayerCardQty, setPrayerCardQty] = useState('100')
  const [prayerCardFinish, setPrayerCardFinish] = useState('Laminated')
  const [prayerCardVerse, setPrayerCardVerse] = useState(POEM_PRAYER_OPTIONS[0])
  const [prayerCardCustomVerse, setPrayerCardCustomVerse] = useState('')
  const [prayerCardPhoto, setPrayerCardPhoto] = useState<File | null>(null)
  const [prayerCardNotes, setPrayerCardNotes] = useState('')

  // --- Product 4: Poster Options ---
  const [posterStyleSize, setPosterStyleSize] = useState('24" × 36" Large Memorial Display')
  const [posterMounting, setPosterMounting] = useState('Mounted on Rigid Foam Board (Easel-Ready)')
  const [posterQuantity, setPosterQuantity] = useState('1')
  const [posterTitle, setPosterTitle] = useState('')
  const [posterPhoto, setPosterPhoto] = useState<File | null>(null)
  const [posterNotes, setPosterNotes] = useState('')

  // --- Product 5: Casket Panel Options ---
  const [casketPanelSize, setCasketPanelSize] = useState('Standard Half Couch (28" × 14")')
  const [casketPanelCustomSize, setCasketPanelCustomSize] = useState('')
  const [casketPanelTitle, setCasketPanelTitle] = useState('Resting in the Arms of the Lord')
  const [casketPanelPhoto, setCasketPanelPhoto] = useState<File | null>(null)
  const [casketPanelNotes, setCasketPanelNotes] = useState('')

  // --- Product 6: Announcement Options ---
  const [announcementFormat, setAnnouncementFormat] = useState('Printed Cards (5" × 7") with Envelopes')
  const [announcementQuantity, setAnnouncementQuantity] = useState('100')
  const [announcementPhoto, setAnnouncementPhoto] = useState<File | null>(null)
  const [announcementNotes, setAnnouncementNotes] = useState('')

  // --- Product 7: Bookmark Options ---
  const [bookmarkQuantity, setBookmarkQuantity] = useState('100')
  const [bookmarkTassel, setBookmarkTassel] = useState<'yes' | 'no'>('yes')
  const [bookmarkTasselColor, setBookmarkTasselColor] = useState('Gold')
  const [bookmarkPhoto, setBookmarkPhoto] = useState<File | null>(null)
  const [bookmarkNotes, setBookmarkNotes] = useState('')

  // --- Product 8: Button Options ---
  const [buttonQuantity, setButtonQuantity] = useState('50')
  const [buttonSize, setButtonSize] = useState('3-Inch Round Pinback')
  const [buttonText, setButtonText] = useState('')
  const [buttonPhoto, setButtonPhoto] = useState<File | null>(null)
  const [buttonNotes, setButtonNotes] = useState('')

  // --- Product 9: Thank You Card Options ---
  const [thankYouStyle, setThankYouStyle] = useState('Folded Note Cards with Envelopes')
  const [thankYouQuantity, setThankYouQuantity] = useState('50')
  const [thankYouMessage, setThankYouMessage] = useState('')
  const [thankYouPhoto, setThankYouPhoto] = useState<File | null>(null)
  const [thankYouNotes, setThankYouNotes] = useState('')

  // --- Product 10: Other Products Options ---
  const [otherProductName, setOtherProductName] = useState('')
  const [otherProductQuantity, setOtherProductQuantity] = useState('')
  const [otherProductDetails, setOtherProductDetails] = useState('')
  const [otherProductFile, setOtherProductFile] = useState<File | null>(null)

  // Family / Primary Contact Details
  const [contactName, setContactName] = useState(urlContactName || '')
  const [relationship, setRelationship] = useState(urlRelationship || '')
  const [phone, setPhone] = useState(urlPhone || '')
  const [email, setEmail] = useState(urlEmail || '')
  const [altPhone, setAltPhone] = useState(urlAltPhone || '')

  // Loved One Memorial Details & Program Content (Section 3)
  const [lovedOneName, setLovedOneName] = useState(urlLovedOneName || '')
  const [sunriseDate, setSunriseDate] = useState(urlSunrise || '')
  const [sunsetDate, setSunsetDate] = useState(urlSunset || '')
  const [programTitleCaption, setProgramTitleCaption] = useState('In Loving Memory of')
  const [customTitleCaption, setCustomTitleCaption] = useState('')
  const [selectedPoem, setSelectedPoem] = useState(POEM_PRAYER_OPTIONS[0])
  const [customPoem, setCustomPoem] = useState('')
  const [selectedAcknowledgement, setSelectedAcknowledgement] = useState(ACKNOWLEDGEMENT_OPTIONS[0])
  const [customAcknowledgement, setCustomAcknowledgement] = useState(ACKNOWLEDGEMENTS_LIST[0]?.fullText || '')
  const [finalDispositionTitle, setFinalDispositionTitle] = useState('Interment')
  const [dispositionLocation, setDispositionLocation] = useState(urlCemetery || '')
  const [orderOfServiceType, setOrderOfServiceType] = useState('Standard Order of Service')
  const [orderOfServiceText, setOrderOfServiceText] = useState(ORDER_OF_SERVICE_TEMPLATES.standard)
  const [orderOfServiceDoc, setOrderOfServiceDoc] = useState<File | null>(null)
  const [obituaryText, setObituaryText] = useState('')
  const [obituaryDoc, setObituaryDoc] = useState<File | null>(null)
  const [repastInfo, setRepastInfo] = useState('')
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null)
  const [insidePhotos, setInsidePhotos] = useState<File[]>([])
  const [backCoverPhoto, setBackCoverPhoto] = useState<File | null>(null)
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([])
  const [cloudFolderLink, setCloudFolderLink] = useState('')

  // Service Details (Section 4)
  const [viewingDate, setViewingDate] = useState(urlViewingDate || '')
  const [viewingTime, setViewingTime] = useState(urlViewingTime || '')
  const [serviceDate, setServiceDate] = useState(urlServiceDate || '')
  const [serviceTime, setServiceTime] = useState(urlServiceTime || '')
  const [serviceLocation, setServiceLocation] = useState(urlServiceLocation || '')
  const [officiant, setOfficiant] = useState('')
  const [eulogist, setEulogist] = useState('')
  const [requestedCompletionDate, setRequestedCompletionDate] = useState('')
  const [fulfillmentMethod, setFulfillmentMethod] = useState(
    urlDelivery === 'chapel_delivery' ? 'chapel_direct_delivery' : 'studio_pickup_queens'
  )
  const [funeralHome, setFuneralHome] = useState(urlFhName || '')
  const [venueDeliveryInstructions, setVenueDeliveryInstructions] = useState(
    urlDeliveryInstructions || (urlDeliveryAddress ? `Delivery Address: ${urlDeliveryAddress}` : '')
  )

  // Tier & Paying Party State (Essential / Signature / Premier)
  const [selectedTier, setSelectedTier] = useState<'Essential' | 'Signature' | 'Premier'>(
    urlTier.toLowerCase() === 'signature' ? 'Signature' : urlTier.toLowerCase() === 'premier' ? 'Premier' : 'Essential'
  )
  const [payingParty, setPayingParty] = useState<'funeral_home' | 'family'>(
    urlPayingParty === 'funeral_home' ? 'funeral_home' : 'family'
  )

  // Rush Handling State (2-Day Rush $75 / 1-Day Rush $125)
  const [rushOption, setRushOption] = useState<'none' | '2_day' | '1_day'>(
    urlRushParam === '1_day' ? '1_day' : (urlRushParam === '2_day' || urlRushParam === '1') ? '2_day' : 'none'
  )
  const [rushAcknowledged, setRushAcknowledged] = useState(
    urlRushParam === '1_day' || urlRushParam === '2_day' || urlRushParam === '1'
  )

  // Terms & Conditions acceptance
  const [termsAccepted, setTermsAccepted] = useState(false)
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
  }, [])

  // Matched design from gallery
  const matchedDesign = useMemo(() => {
    return GALLERY_DESIGNS.find(d => d.designNumber === selectedDesignNum) || GALLERY_DESIGNS[0]
  }, [selectedDesignNum])

  // Determine whether rush processing is required (calendar based OR user checked manual rush)
  const isCalendarRush = useMemo(() => {
    if (!requestedCompletionDate || !readyDateInfo.readyDate) return false
    const [y, m, d] = requestedCompletionDate.split('-').map(Number)
    if (!y || !m || !d) return false
    const requested = new Date(y, m - 1, d, 23, 59, 59)
    const standard = new Date(
      readyDateInfo.readyDate.getFullYear(),
      readyDateInfo.readyDate.getMonth(),
      readyDateInfo.readyDate.getDate(),
      0, 0, 0
    )
    return requested < standard
  }, [requestedCompletionDate, readyDateInfo])

  const isRushEffective = isCalendarRush || rushOption !== 'none'

  // Toggle products in checklist
  const handleProductToggle = (productId: string) => {
    setSelectedProductIds(prev => {
      if (prev.includes(productId)) {
        if (prev.length === 1) return prev // keep at least one
        return prev.filter(id => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const handleAddOnToggle = (addOn: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOn) ? prev.filter(item => item !== addOn) : [...prev, addOn]
    )
  }

  const handleAdditionalFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setAdditionalFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeAdditionalFile = (index: number) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleInsidePhotosAdd = (newFiles: File[]) => {
    setInsidePhotos(prev => [...prev, ...newFiles])
  }

  const removeInsidePhoto = (index: number) => {
    setInsidePhotos(prev => prev.filter((_, i) => i !== index))
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (selectedProductIds.length === 0) {
      setValidationError('Please select at least one product from the product checklist.')
      return
    }

    if (isCalendarRush && rushOption === 'none') {
      setValidationError('Your requested completion date requires expedited processing. Please select either 2-Day Rush ($75) or 1-Day Urgent Rush ($125) below.')
      const el = document.getElementById('rush-selection-box')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    if (rushOption !== 'none' && !rushAcknowledged) {
      setValidationError('Please review and check the Rush / Expedited Handling Acknowledgment box below before submitting.')
      const el = document.getElementById('rush-notice-box')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    if (!termsAccepted) {
      setValidationError('Please review and check the Terms & Conditions agreement box before submitting.')
      const el = document.getElementById('terms-agreement-box')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitting(true)

    const finalProgramQuantity = selectedQuantity === '250+' ? (customQuantity || '250+') : selectedQuantity
    const orderCode = `LOTF-ORD-${Math.floor(1000 + Math.random() * 9000)}`

    // Build comprehensive submission payload
    const orderData = {
      orderReference: orderCode,
      status: isRushEffective ? 'Pending Rush Review & Press Confirmation' : 'Order Received — In Production Queue',
      isRush: isRushEffective,
      selectedTier,
      payingParty: isHandoff && urlPayingParty ? urlPayingParty : 'family',
      rushOption,
      rushFee: rushOption === '1_day' ? '$125' : rushOption === '2_day' ? '$75' : '$0',
      deliveryFeeNotice: 'Delivery is charged on top of the rush fee, separately.',
      selectedProductNames: selectedProductIds.map(id => PRODUCT_CHECKLIST.find(p => p.id === id)?.name || id),
      
      // Program details
      programDesignNumber: selectedProductIds.includes('memorial_program') ? matchedDesign.designNumber : 'N/A',
      programTitle: selectedProductIds.includes('memorial_program') ? matchedDesign.title : 'N/A',
      programFormat: selectedFormat,
      programSize: selectedSize,
      programQuantity: finalProgramQuantity,
      addOns: selectedAddOns,
      specialRequests: specialRequests || 'None',

      // Additional Products
      additionalProductsDetails: {
        digitalProgram: selectedProductIds.includes('digital_program') ? { delivery: digitalDelivery, notes: digitalNotes } : null,
        prayerCard: selectedProductIds.includes('prayer_card') ? { qty: prayerCardQty, finish: prayerCardFinish, verse: prayerCardVerse === 'Custom' ? prayerCardCustomVerse : prayerCardVerse, hasPhoto: !!prayerCardPhoto, notes: prayerCardNotes } : null,
        poster: selectedProductIds.includes('poster') ? { size: posterStyleSize, mounting: posterMounting, qty: posterQuantity, title: posterTitle, hasPhoto: !!posterPhoto, notes: posterNotes } : null,
        casketPanel: selectedProductIds.includes('casket_panel') ? { size: casketPanelSize === 'Custom Size' ? casketPanelCustomSize : casketPanelSize, title: casketPanelTitle, hasPhoto: !!casketPanelPhoto, notes: casketPanelNotes } : null,
        announcement: selectedProductIds.includes('announcement') ? { format: announcementFormat, qty: announcementQuantity, hasPhoto: !!announcementPhoto, notes: announcementNotes } : null,
        bookmark: selectedProductIds.includes('bookmark') ? { qty: bookmarkQuantity, tassel: bookmarkTassel, tasselColor: bookmarkTasselColor, hasPhoto: !!bookmarkPhoto, notes: bookmarkNotes } : null,
        button: selectedProductIds.includes('button') ? { qty: buttonQuantity, size: buttonSize, text: buttonText, hasPhoto: !!buttonPhoto, notes: buttonNotes } : null,
        thankYouCard: selectedProductIds.includes('thank_you_card') ? { style: thankYouStyle, qty: thankYouQuantity, message: thankYouMessage, hasPhoto: !!thankYouPhoto, notes: thankYouNotes } : null,
        otherProducts: selectedProductIds.includes('other_products') ? { name: otherProductName, qty: otherProductQuantity, details: otherProductDetails, hasFile: !!otherProductFile } : null,
      },

      // Contact
      contactName,
      relationship,
      phone,
      email,
      altPhone,

      // Loved One & Program Content
      lovedOneName,
      sunriseDate,
      sunsetDate,
      programTitleCaption: programTitleCaption === 'Custom Title / Caption...' ? customTitleCaption : programTitleCaption,
      selectedPoem: selectedPoem.includes('Custom') ? customPoem : selectedPoem,
      selectedAcknowledgement: selectedAcknowledgement.includes('Custom') ? customAcknowledgement : selectedAcknowledgement,
      finalDisposition: `${finalDispositionTitle} ${dispositionLocation ? `(${dispositionLocation})` : ''}`,
      orderOfServiceType,
      hasOrderOfServiceText: !!orderOfServiceText,
      hasOrderOfServiceDoc: !!orderOfServiceDoc,
      hasObituaryText: !!obituaryText,
      hasObituaryDoc: !!obituaryDoc,
      repastInfo: repastInfo || 'None specified',

      // Funeral Home Hand-off Provider Details
      isFuneralHomeHandoff: isHandoff,
      funeralHomeName: urlFhName || funeralHome || 'Direct Family Order',
      funeralHomeContact: urlFhContact || 'N/A',
      funeralHomePhone: urlFhPhone || 'N/A',
      funeralHomeEmail: urlFhEmail || 'N/A',

      // Uploads count
      uploadedFilesSummary: {
        coverPhoto: coverPhoto ? coverPhoto.name : 'Not provided',
        orderOfServiceDoc: orderOfServiceDoc ? orderOfServiceDoc.name : 'None',
        obituaryDoc: obituaryDoc ? obituaryDoc.name : 'None',
        insidePhotosCount: insidePhotos.length,
        backCoverPhoto: backCoverPhoto ? backCoverPhoto.name : 'None',
        additionalFilesCount: additionalFiles.length,
        cloudFolderLink: cloudFolderLink || 'None'
      },

      // Service Details
      viewingDate: viewingDate || 'Not specified',
      viewingTime: viewingTime || 'Not specified',
      serviceDate,
      serviceTime: serviceTime || 'Not specified',
      serviceLocation,
      officiant: officiant || 'Not specified',
      eulogist: eulogist || 'Not specified',
      requestedCompletionDate,
      estimatedReadyDate: readyDateInfo.readyDateString,
      fulfillmentMethod: fulfillmentMethod === 'studio_pickup_queens' ? 'Studio Pickup (21229 Jamaica Avenue, Queens Village — By Appointment)' : fulfillmentMethod,
      funeralHome: funeralHome || 'N/A',
      venueDeliveryInstructions: venueDeliveryInstructions || 'N/A',
      createdAt: new Date().toISOString()
    }

    try {
      const supabase = createClient()
      await supabase.from('service_inquiries').insert({
        contact_name: contactName,
        email: email,
        phone: phone,
        service_package: `Memorial Keepsakes Order: ${orderData.selectedProductNames.join(', ')}`,
        preferred_date: requestedCompletionDate || serviceDate || null,
        special_notes: `Ref: ${orderCode} | Loved One: ${lovedOneName} | Products: ${orderData.selectedProductNames.join(', ')} | Turnaround: ${readyDateInfo.readyDateString} | Rush: ${isRushEffective ? 'YES' : 'NO'} | Officiant: ${officiant} | Eulogist: ${eulogist} | Venue: ${serviceLocation} | Pickup/Delivery: ${orderData.fulfillmentMethod} | Files: Cover=${!!coverPhoto}, Extra=${additionalFiles.length}`
      })
    } catch {
      // Graceful offline fallback
    }

    setSubmitting(false)
    setSubmittedOrder(orderData)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ width: '100%', background: '#fdfbf7', minHeight: '100vh', paddingBottom: '90px' }}>
      
      {/* 1. TOP HEADER SECTION */}
      <section style={{
        background: '#faf8f4',
        borderBottom: '1px solid #e8dfd2',
        paddingTop: 'clamp(32px, 4.5vw, 48px)',
        paddingBottom: 'clamp(26px, 3.8vw, 40px)',
        textAlign: 'center'
      }}>
        <div className="site-container" style={{ maxWidth: '880px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#1f6f68',
            marginBottom: '10px'
          }}>
            <ShieldCheck size={14} /> Lilies of the Field Memorial Keepsakes
          </div>

          <h1 className="s" style={{
            fontSize: 'clamp(28px, 4.2vw, 42px)',
            color: '#262626',
            lineHeight: 1.2,
            marginBottom: '12px'
          }}>
            Memorial Keepsakes Order Request
          </h1>

          <p style={{
            fontSize: '14.5px',
            color: '#555',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 16px'
          }}>
            Complete your order details below. Our design team customizes each program and memorial keepsake with your loved one’s photographs, obituary, order of service, and cherished tributes.
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
            <span>·</span>
            <span>Hours: <strong>Mon–Fri, 10:00am – 6:00pm</strong></span>
          </div>
        </div>
      </section>

      {/* 2. MAIN ORDER CONTAINER */}
      <div className="site-container" style={{ maxWidth: '920px', paddingTop: '32px' }}>

        {submittedOrder ? (
          /* CONFIRMATION SCREEN */
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
              padding: '4px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: submittedOrder.isRush ? '#fef3c7' : '#dfe9e5',
              color: submittedOrder.isRush ? '#92400e' : '#1f6f68',
              marginBottom: '14px'
            }}>
              Status: {submittedOrder.status}
            </div>

            <h2 className="s" style={{ fontSize: '28px', color: '#262626', margin: '0 0 10px' }}>
              Order Request Submitted Successfully
            </h2>

            <p style={{ color: '#555', fontSize: '15px', maxWidth: '620px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              Thank you, <strong>{submittedOrder.contactName}</strong>. We have received your memorial order request honoring <strong>{submittedOrder.lovedOneName || 'your beloved loved one'}</strong>.
            </p>

            {/* Reference Number Box */}
            <div style={{
              background: '#faf8f4',
              border: '1px solid #e0d5c2',
              borderRadius: '6px',
              padding: '16px 28px',
              display: 'inline-block',
              marginBottom: '28px'
            }}>
              <div style={{ fontSize: '11px', color: '#777', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                Order Confirmation Reference
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#1f6f68', letterSpacing: '0.05em', marginTop: '3px' }}>
                {submittedOrder.orderReference}
              </div>
            </div>

            {/* Detailed Order Summary Grid */}
            <div style={{
              textAlign: 'left',
              background: '#fdfbf7',
              border: '1px solid #ebd8b5',
              borderRadius: '6px',
              padding: '24px',
              marginBottom: '28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              fontSize: '13px',
              color: '#444'
            }}>
              <div style={{ gridColumn: '1 / -1', borderBottom: '1px solid #e8dfd2', paddingBottom: '10px' }}>
                <strong style={{ color: '#262626', display: 'block', fontSize: '14px', marginBottom: '4px' }}>
                  Selected Keepsakes &amp; Products:
                </strong>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {submittedOrder.selectedProductNames.map((name: string) => (
                    <span key={name} style={{
                      background: '#1f6f68',
                      color: '#ffffff',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      ✓ {name}
                    </span>
                  ))}
                </div>
              </div>

              {submittedOrder.selectedProductNames.includes('Memorial Program') && (
                <div>
                  <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Program Design &amp; Format:</strong>
                  #{submittedOrder.programDesignNumber} {submittedOrder.programTitle} · {submittedOrder.programFormat} ({submittedOrder.programSize}) · {submittedOrder.programQuantity} copies
                  {submittedOrder.addOns && submittedOrder.addOns.length > 0 && (
                    <div style={{ marginTop: '4px', fontSize: '12px', color: '#1f6f68' }}>
                      <strong>Program Add-ons:</strong> {submittedOrder.addOns.join(', ')}
                    </div>
                  )}
                </div>
              )}

              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Service Date &amp; Time:</strong>
                {submittedOrder.serviceDate} {submittedOrder.serviceTime ? `at ${submittedOrder.serviceTime}` : ''}
              </div>

              {submittedOrder.viewingDate !== 'Not specified' && (
                <div>
                  <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Viewing Date &amp; Time:</strong>
                  {submittedOrder.viewingDate} {submittedOrder.viewingTime ? `at ${submittedOrder.viewingTime}` : ''}
                </div>
              )}

              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Service Location / Venue:</strong>
                {submittedOrder.serviceLocation || 'To be confirmed'}
              </div>

              {(submittedOrder.officiant !== 'Not specified' || submittedOrder.eulogist !== 'Not specified') && (
                <div>
                  <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Clergy / Speakers:</strong>
                  Officiant: {submittedOrder.officiant} · Eulogist: {submittedOrder.eulogist}
                </div>
              )}

              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Keepsake Collection Tier:</strong>
                <span style={{ color: '#1f6f68', fontWeight: 700 }}>{submittedOrder.selectedTier} Tier</span>
                {submittedOrder.payingParty === 'funeral_home' && (
                  <span style={{ fontSize: '11px', color: '#666', marginLeft: '6px' }}>(Included in Funeral Home Package)</span>
                )}
              </div>

              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Production Turnaround &amp; Rush:</strong>
                {submittedOrder.rushOption === '1_day' ? (
                  <span style={{ color: '#991b1b', fontWeight: 700 }}>⚡ 1-Day Urgent Rush ($125 Rush Fee)</span>
                ) : submittedOrder.rushOption === '2_day' ? (
                  <span style={{ color: '#92400e', fontWeight: 700 }}>⚡ 2-Day Rush ($75 Rush Fee)</span>
                ) : (
                  <span>Standard 4-Day Turnaround (No rush fee)</span>
                )}
                {submittedOrder.rushOption !== 'none' && (
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                    * Delivery is charged on top of the rush fee, separately.
                  </div>
                )}
              </div>

              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Fulfillment Method:</strong>
                {submittedOrder.fulfillmentMethod}
              </div>

              <div>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>Estimated Ready Date:</strong>
                <span style={{ color: '#1f6f68', fontWeight: 700 }}>{submittedOrder.estimatedReadyDate}</span>
              </div>

              <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e8dfd2', paddingTop: '10px' }}>
                <strong style={{ color: '#262626', display: 'block', marginBottom: '3px' }}>File Attachments Received:</strong>
                Cover Photo: {submittedOrder.uploadedFilesSummary.coverPhoto} · Inside Photos: {submittedOrder.uploadedFilesSummary.insidePhotosCount} uploaded · Back Cover Photo: {submittedOrder.uploadedFilesSummary.backCoverPhoto} · Additional Files: {submittedOrder.uploadedFilesSummary.additionalFilesCount} uploaded
              </div>
            </div>

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
                <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Rush Processing Requested:</strong> Your order has been marked as <strong>Pending Rush Confirmation</strong>. Our studio will review active press availability and contact you shortly to confirm the rush turnaround schedule and fee before proceeding.
                </div>
              </div>
            )}

            <div style={{
              borderTop: '1px solid #eee',
              paddingTop: '20px',
              fontSize: '13.5px',
              color: '#666',
              lineHeight: 1.6,
              marginBottom: '28px'
            }}>
              <p style={{ margin: '0 0 10px' }}>
                <strong>What happens next?</strong> Our studio design team will review your specifications, prepare an initial digital PDF layout proof, and email it to <strong>{submittedOrder.email}</strong> for family review and approval before anything goes to press.
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
          /* MAIN INTAKE FORM */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

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

            {/* HAND-OFF ARRIVAL BANNER (When started by a funeral home director) */}
            {isHandoff && (
              <div style={{
                background: '#f0fdf4',
                border: '2px solid #86efac',
                borderRadius: '8px',
                padding: '20px 24px',
                boxShadow: '0 4px 14px rgba(22, 101, 52, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    color: '#15803d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Building size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#15803d', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>
                        Provider Hand-Off Received
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#14532d' }}>
                        Order Initiated by {urlFhName || 'Licensed Funeral Home Provider'}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 10px', fontSize: '13.5px', color: '#166534', lineHeight: 1.55 }}>
                      Your funeral director has started this memorial keepsakes order and pre-filled your loved one’s service schedule and your family contact information below. Please review the entries, confirm that spellings and dates are correct, and complete your memorial program content (front cover, inside spread, and back cover tributes).
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '12px', color: '#14532d' }}>
                      {urlFhContact && <span>Director: <strong>{urlFhContact}</strong></span>}
                      {urlFhPhone && <span>Phone: <strong>{urlFhPhone}</strong></span>}
                      {urlFhEmail && <span>Email: <strong>{urlFhEmail}</strong></span>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: ORDER INFORMATION & PHOTO GUIDELINES GUIDANCE BOX */}
            <div style={{
              background: '#faf8f4',
              borderRadius: '8px',
              border: '1px solid #e0d5c2',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div 
                onClick={() => setGuidanceOpen(!guidanceOpen)}
                style={{
                  padding: '16px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: '#f5efe6',
                  borderBottom: guidanceOpen ? '1px solid #e0d5c2' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={18} color="#1f6f68" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#262626' }}>
                    Step 1: Order Information &amp; Photo Submission Guidelines
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#1f6f68', fontWeight: 600 }}>
                  {guidanceOpen ? 'Hide Guidelines' : 'View Guidelines'}
                  {guidanceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {guidanceOpen && (
                <div style={{ padding: '22px', fontSize: '13px', color: '#444', lineHeight: 1.6 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '18px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 6px', fontSize: '14px', color: '#1f6f68', fontWeight: 700 }}>
                        Welcome to Lilies of the Field
                      </h4>
                      <p style={{ margin: '0 0 10px' }}>
                        We are here to support you in creating meaningful memorial keepsakes with care, respect, and exquisite attention to detail.
                      </p>
                      <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '4px', border: '1px solid #e8dfd2' }}>
                        <strong>Business Hours:</strong> Monday to Friday, 10:00 AM – 6:00 PM<br />
                        <span style={{ fontSize: '12px', color: '#666' }}>Studio consultations &amp; order pickups by appointment: 1:00 PM – 6:00 PM at 21229 Jamaica Avenue, Queens Village.</span>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ margin: '0 0 6px', fontSize: '14px', color: '#1f6f68', fontWeight: 700 }}>
                        Order Turnaround &amp; Deadlines
                      </h4>
                      <p style={{ margin: 0 }}>
                        To ensure the highest quality, all orders must be received a <strong>minimum of 4 business days</strong> prior to the date of service or date needed. Orders received after this window are subject to <strong>Expedited Handling Fees</strong> based on press capacity.
                      </p>
                      <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                        Please complete all fields marked with an asterisk (*). Direct file uploads are available on this form, or documents can be emailed to <a href="mailto:orders@liliesofthefield.design" style={{ color: '#1f6f68', fontWeight: 600 }}>orders@liliesofthefield.design</a>.
                      </div>
                    </div>
                  </div>

                  {/* 6 Photo Guidelines */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e8dfd2',
                    borderRadius: '6px',
                    padding: '16px 20px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ImageIcon size={16} color="#1f6f68" /> Photo Quality &amp; Submission Rules
                    </div>
                    <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <li><strong>Send original photos in high resolution:</strong> Our team will professionally extract and remove backgrounds as necessary.</li>
                      <li><strong>Crop any phone screenshots:</strong> Remove black bars or interface buttons from phone screenshots before uploading.</li>
                      <li><strong>Label photos clearly:</strong> Indicate clearly which image is intended for the front cover versus inside collages.</li>
                      <li><strong>Direct upload or cloud link:</strong> Upload files below, or paste a shared Google Drive / Dropbox link with access granted.</li>
                      <li><strong>Group images together:</strong> When sending by email, attach images in one email or as a zip file to avoid misplacement.</li>
                      <li><strong>Email Subject Line format:</strong> If emailing photos separately, use subject: <code>[Name of Loved One] Photos</code>.</li>
                    </ol>
                  </div>

                  {/* Quick Links to Reference Resources */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                    paddingTop: '6px',
                    fontSize: '12.5px'
                  }}>
                    <span style={{ fontWeight: 600, color: '#262626' }}>Helpful Reference Guides:</span>
                    <a href="/resources#poems-prayers-scriptures" target="_blank" rel="noopener noreferrer" style={{ color: '#1f6f68', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      Prayers, Poems &amp; Scriptures <ExternalLink size={12} />
                    </a>
                    <span>·</span>
                    <a href="/resources#acknowledgements-wording" target="_blank" rel="noopener noreferrer" style={{ color: '#1f6f68', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      Acknowledgements Wording <ExternalLink size={12} />
                    </a>
                    <span>·</span>
                    <a href="/resources#order-of-service-outlines" target="_blank" rel="noopener noreferrer" style={{ color: '#1f6f68', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      Order of Service Outlines <ExternalLink size={12} />
                    </a>
                    <span>·</span>
                    <a href="/gallery" target="_blank" rel="noopener noreferrer" style={{ color: '#1f6f68', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      Design Gallery Collections <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 1: LOVED ONE MEMORIAL DETAILS, SERVICE SCHEDULE & FAMILY CONTACT */}
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
                  Section 1
                </div>
                <h2 className="s" style={{ fontSize: '22px', color: '#262626', margin: '0 0 4px' }}>
                  Loved One Memorial Details &amp; Service Logistics
                </h2>
                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                  {isHandoff 
                    ? 'Review and confirm your loved one’s details, service schedule, and your family contact information pre-filled by your funeral director.'
                    : 'Enter your loved one’s details, service schedule, and family contact information below.'
                  }
                </p>
              </div>

              {/* PART 1A: LOVED ONE'S INFORMATION */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f6f68', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                  ✦ Loved One&apos;s Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                      Full Name of Beloved (As to appear on all keepsakes) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Grace Dawson (née Mills)"
                      value={lovedOneName}
                      onChange={(e) => setLovedOneName(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '14px' }}
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
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
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
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>
                </div>
              </div>

              {/* PART 1B: SERVICE SCHEDULE & LOGISTICS */}
              <div style={{ marginBottom: '24px', borderTop: '1px solid #f0e8dc', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f6f68', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                  ✦ Service Schedule &amp; Production Timeline
                </h3>

                {/* Viewing Date & Time */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '5px' }}>
                      Viewing Date (Wake / Repose — If applicable)
                    </label>
                    <input
                      type="date"
                      value={viewingDate}
                      onChange={(e) => setViewingDate(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '5px' }}>
                      Viewing Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4:00 PM – 8:00 PM"
                      value={viewingTime}
                      onChange={(e) => setViewingTime(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>
                </div>

                {/* Service Date & Time */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '5px' }}>
                      Service Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={serviceDate}
                      onChange={(e) => setServiceDate(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '5px' }}>
                      Service Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10:00 AM Service"
                      value={serviceTime}
                      onChange={(e) => setServiceTime(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>
                </div>

                {/* Service Location */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '5px' }}>
                    Location of Service (Name and Full Address) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grace Episcopal Chapel, 215-10 Jamaica Avenue, Queens Village, NY 11428"
                    value={serviceLocation}
                    onChange={(e) => setServiceLocation(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                  />
                </div>

                {/* Cemetery / Final Resting Place */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '5px' }}>
                    Cemetery / Final Resting Place (Name and City/State)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pinelawn Memorial Park, Farmingdale, NY"
                    value={dispositionLocation}
                    onChange={(e) => setDispositionLocation(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                  />
                </div>

                {/* Requested Completion Date & 4-Day Ready Date */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '5px' }}>
                      Requested In-Hand / Delivery Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={requestedCompletionDate}
                      onChange={(e) => setRequestedCompletionDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: isRushEffective ? '2px solid #d97706' : '1px solid #cfcfcf',
                        borderRadius: '4px',
                        fontSize: '13.5px',
                        background: isRushEffective ? '#fffbeb' : '#ffffff'
                      }}
                    />
                    <span style={{ fontSize: '11.5px', color: '#777', display: 'block', marginTop: '3px' }}>
                      Date keepsakes must be in hand
                    </span>
                  </div>

                  <div style={{
                    background: '#faf8f4',
                    border: '1px solid #e0d5c2',
                    borderRadius: '6px',
                    padding: '14px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#1f6f68',
                      marginBottom: '2px'
                    }}>
                      Standard 4-Day Estimated Ready Date
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#262626' }}>
                      {readyDateInfo.readyDateString}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#666', marginTop: '4px' }}>
                      Standard 4 business days turnaround (Mon–Fri, daily cutoff 6:00 PM ET).
                    </div>
                  </div>
                </div>

                {/* Selectable Production Turnaround & Rush Options */}
                <div id="rush-selection-box" style={{
                  background: rushOption !== 'none' || isCalendarRush ? '#fffbeb' : '#faf8f4',
                  border: rushOption !== 'none' || isCalendarRush ? '1px solid #f59e0b' : '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '16px 18px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: rushOption !== 'none' || isCalendarRush ? '#92400e' : '#262626' }}>
                      Production Turnaround &amp; Rush Selection *
                    </label>
                    <span style={{ fontSize: '11.5px', color: '#777' }}>
                      Cutoff 6:00 PM ET daily
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      border: rushOption === 'none' ? '2px solid #1f6f68' : '1px solid #cfcfcf',
                      background: rushOption === 'none' ? '#f0f6f5' : '#ffffff',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name="formRushOption"
                          value="none"
                          checked={rushOption === 'none'}
                          onChange={() => {
                            setRushOption('none')
                            setRushAcknowledged(false)
                          }}
                          style={{ accentColor: '#1f6f68' }}
                        />
                        <span style={{ fontWeight: 600, color: '#262626' }}>Standard Turnaround</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#666' }}>4 Business Days (No fee)</span>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      border: rushOption === '2_day' ? '2px solid #b45309' : '1px solid #cfcfcf',
                      background: rushOption === '2_day' ? '#fffdf5' : '#ffffff',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name="formRushOption"
                          value="2_day"
                          checked={rushOption === '2_day'}
                          onChange={() => setRushOption('2_day')}
                          style={{ accentColor: '#b45309' }}
                        />
                        <span style={{ fontWeight: 700, color: '#92400e' }}>⚡ 2-Day Rush</span>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>+$75 Rush Fee</span>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      border: rushOption === '1_day' ? '2px solid #991b1b' : '1px solid #cfcfcf',
                      background: rushOption === '1_day' ? '#fef2f2' : '#ffffff',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name="formRushOption"
                          value="1_day"
                          checked={rushOption === '1_day'}
                          onChange={() => setRushOption('1_day')}
                          style={{ accentColor: '#991b1b' }}
                        />
                        <span style={{ fontWeight: 700, color: '#991b1b' }}>⚡ 1-Day Urgent Rush</span>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#991b1b' }}>+$125 Rush Fee</span>
                    </label>
                  </div>

                  {/* Delivery on top notice as specified by Katrice */}
                  <div style={{
                    background: '#fef3c7',
                    border: '1px solid #fde68a',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    color: '#92400e',
                    fontWeight: 600
                  }}>
                    ⚠️ <strong>Important Note on Delivery:</strong> Delivery is charged on top of the rush fee, separately.
                  </div>
                </div>

                {/* DYNAMIC RUSH ORDER NOTICE & MANDATORY ACKNOWLEDGMENT */}
                {(isRushEffective || rushOption !== 'none') && (
                  <div 
                    id="rush-notice-box"
                    style={{
                      background: '#fffbeb',
                      border: '2px solid #f59e0b',
                      borderRadius: '6px',
                      padding: '18px 20px',
                      marginBottom: '18px',
                      boxShadow: '0 4px 14px rgba(245, 158, 11, 0.15)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <AlertTriangle size={22} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 6px', fontSize: '15px', color: '#92400e', fontWeight: 700 }}>
                          Rush Order Acknowledgment
                        </h4>
                        <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#92400e', lineHeight: 1.55 }}>
                          {isCalendarRush && rushOption === 'none' 
                            ? 'Your requested completion date requires an expedited press run. Please select either 2-Day Rush ($75) or 1-Day Urgent Rush ($125) above.'
                            : `You have selected expedited processing (${rushOption === '1_day' ? '1-Day Urgent Rush: $125 fee' : '2-Day Rush: $75 fee'}). Delivery is charged separately on top of this rush fee.`
                          }
                        </p>
                        
                        <div style={{
                          background: '#ffffff',
                          border: '1px solid #fde68a',
                          borderRadius: '4px',
                          padding: '10px 14px',
                          marginBottom: '12px',
                          fontSize: '12.5px',
                          color: '#78350f'
                        }}>
                          <div>Requested Date: <strong>{requestedCompletionDate || 'Expedited Timeline'}</strong></div>
                          <div>Standard 4-Day Ready Date: <strong>{readyDateInfo.readyDateString}</strong></div>
                          <div>Selected Rush Fee: <strong>{rushOption === '1_day' ? '$125 (1-Day Rush)' : rushOption === '2_day' ? '$75 (2-Day Rush)' : 'Select Rush Option'}</strong> (Delivery charged separately)</div>
                        </div>

                        <label style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          cursor: 'pointer',
                          fontSize: '13px',
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
                            I understand that rush orders are subject to press availability and rush fees ({rushOption === '1_day' ? '$125' : '$75'}), with delivery charged separately.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fulfillment Preference & Instructions */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                      Delivery or Pickup Preference *
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
                      <option value="studio_pickup_queens">Studio Pickup (21229 Jamaica Avenue, Queens Village — By Appointment)</option>
                      <option value="courier_nyc">Direct Courier Delivery to Funeral Home / Church (NYC Metro &amp; Long Island)</option>
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
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                      Delivery Address &amp; Delivery Instructions (If requesting courier delivery)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Deliver directly to Director Jenkins at Chapel · (917) 000-0000"
                      value={venueDeliveryInstructions}
                      onChange={(e) => setVenueDeliveryInstructions(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>
                </div>
              </div>

              {/* PART 1C: FAMILY & PRIMARY CONTACT INFORMATION */}
              <div style={{ borderTop: '1px solid #f0e8dc', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f6f68', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                  ✦ Family &amp; Primary Contact Information
                </h3>
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
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
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
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
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
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
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
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
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
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* SECTION 2: PRODUCTS & KEEPSAKE TIERS */}
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
                <h2 className="s" style={{ fontSize: '22px', color: '#262626', margin: '0 0 4px' }}>
                  Keepsake Tier &amp; Products Being Ordered *
                </h2>
                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                  Select your keepsake collection tier and choose the products you need. Checking a product opens its options and specifications below.
                </p>
              </div>

              {/* TIER SELECTOR (Essential / Signature / Premier) */}
              <div style={{
                background: '#faf8f4',
                border: '1px solid #ebd8b5',
                borderRadius: '6px',
                padding: '18px 20px',
                marginBottom: '24px'
              }}>
                {isHandoff && urlPayingParty === 'funeral_home' ? (
                  <div style={{
                    background: '#f0fdf4',
                    border: '1px solid #86efac',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <Building size={18} color="#15803d" style={{ flexShrink: 0 }} />
                    <div style={{ fontSize: '12.5px', color: '#14532d', lineHeight: 1.5 }}>
                      <strong>Funeral Home Package Tier:</strong> Your funeral director has selected the <strong>{urlTier.toUpperCase()}</strong> tier for your service. You may keep this tier at no additional cost to your family, or select a higher tier below to upgrade your keepsakes and pay only the difference directly.
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1f6f68', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Select Your Keepsake Collection Tier *
                    </div>
                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#666' }}>
                      Choose the collection level for your memorial keepsakes. (Pricing is finalized upon digital proof review).
                    </p>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
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
                    const isProviderPreselected = isHandoff && urlPayingParty === 'funeral_home' && urlTier.toLowerCase() === t.id.toLowerCase()
                    const isUpgrade = isHandoff && urlPayingParty === 'funeral_home' && !isProviderPreselected && (
                      (urlTier.toLowerCase() === 'essential' && (t.id === 'Signature' || t.id === 'Premier')) ||
                      (urlTier.toLowerCase() === 'signature' && t.id === 'Premier')
                    )

                    return (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTier(t.id as any)}
                        style={{
                          padding: '14px 16px',
                          borderRadius: '6px',
                          border: isSel ? '2px solid #1f6f68' : '1px solid #dcd5ca',
                          background: isSel ? '#ffffff' : '#fafafa',
                          cursor: 'pointer',
                          boxShadow: isSel ? '0 4px 12px rgba(31, 111, 104, 0.12)' : 'none',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: isSel ? '#1f6f68' : '#262626' }}>
                            {t.id} Tier
                          </span>
                          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1f6f68', fontWeight: 700 }}>
                            {t.tag}
                          </span>
                        </div>
                        <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#555', lineHeight: 1.45 }}>
                          {t.desc}
                        </p>
                        {isProviderPreselected && (
                          <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 700 }}>
                            ✓ Included in Funeral Home Package
                          </div>
                        )}
                        {isUpgrade && (
                          <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600 }}>
                            ✦ Upgrade available (Pay difference directly)
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 10 Products Checklist Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '10px',
                marginBottom: '20px'
              }}>
                {PRODUCT_CHECKLIST.map((prod) => {
                  const isChecked = selectedProductIds.includes(prod.id)
                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleProductToggle(prod.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '6px',
                        border: isChecked ? '2px solid #1f6f68' : '1px solid #e2dbce',
                        background: isChecked ? '#f5f9f8' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        transition: 'all 0.15s ease',
                        userSelect: 'none'
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '3px',
                        border: isChecked ? '1px solid #1f6f68' : '1px solid #bbb',
                        background: isChecked ? '#1f6f68' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {isChecked && <Check size={13} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: isChecked ? 700 : 600, color: '#262626' }}>
                            {prod.name}
                          </span>
                          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1f6f68', fontWeight: 600 }}>
                            {prod.tag}
                          </span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#666', marginTop: '2px' }}>
                          {prod.desc}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Program Quantity Selector (When Memorial Program is selected) */}
              {selectedProductIds.includes('memorial_program') && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '16px 20px',
                  marginTop: '12px'
                }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                    Memorial Program Quantity Needed *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '8px' }}>
                    {DEFAULT_QUANTITIES.map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setSelectedQuantity(qty)}
                        style={{
                          padding: '8px 10px',
                          border: selectedQuantity === qty ? '2px solid #1f6f68' : '1px solid #ddd',
                          background: selectedQuantity === qty ? '#f0f6f5' : '#ffffff',
                          color: selectedQuantity === qty ? '#1f6f68' : '#444',
                          fontWeight: selectedQuantity === qty ? 700 : 500,
                          borderRadius: '4px',
                          fontSize: '12.5px',
                          cursor: 'pointer'
                        }}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>

                  {selectedQuantity === '250+' && (
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        required={selectedQuantity === '250+'}
                        placeholder="Specify exact quantity (e.g. 300, 400, 500 copies)"
                        value={customQuantity}
                        onChange={(e) => setCustomQuantity(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          border: '1px solid #cfcfcf',
                          borderRadius: '4px',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SECTION 3: MEMORIAL PROGRAM CONTENT — ARRANGED THE WAY A PROGRAM IS BUILT */}
            {selectedProductIds.includes('memorial_program') && (
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
                  marginBottom: '24px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1f6f68' }}>
                    Section 3
                  </div>
                  <h2 className="s" style={{ fontSize: '22px', color: '#262626', margin: '0 0 4px' }}>
                    Memorial Program Content (Arranged as Built)
                  </h2>
                  <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                    Our program content is structured exactly the way a memorial keepsake is physically designed: <strong>Front Cover</strong>, <strong>Inside Pages</strong>, and <strong>Back Cover</strong>.
                  </p>
                </div>

                {/* 3A. FRONT COVER */}
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '22px',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1f6f68', background: '#e6f0ee', padding: '2px 8px', borderRadius: '4px' }}>
                        Program Section A
                      </span>
                      <h3 className="s" style={{ fontSize: '18px', color: '#262626', margin: '4px 0 0' }}>
                        Front Cover Design &amp; Layout
                      </h3>
                    </div>
                    <Link href="/gallery" target="_blank" style={{ fontSize: '12px', color: '#1f6f68', fontWeight: 600, textDecoration: 'underline' }}>
                      Browse Design Gallery ↗
                    </Link>
                  </div>

                  {/* Active Design Banner */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e0d5c2',
                    borderRadius: '6px',
                    padding: '14px',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      width: '54px',
                      height: '72px',
                      backgroundImage: `url(${matchedDesign.coverImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '3px',
                      border: '1px solid #dcd3c4',
                      flexShrink: 0
                    }} />

                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ fontSize: '11px', color: '#1f6f68', fontWeight: 700, textTransform: 'uppercase' }}>
                        Design #{matchedDesign.designNumber} · {matchedDesign.collectionName}
                      </div>
                      <div className="s" style={{ fontSize: '17px', color: '#262626', margin: '2px 0 2px', fontWeight: 600 }}>
                        {matchedDesign.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '18px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '6px' }}>
                        Program Style / Format *
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                        {DEFAULT_FORMATS.map((fmt) => (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => setSelectedFormat(fmt)}
                            style={{
                              padding: '8px 10px',
                              border: selectedFormat === fmt ? '2px solid #1f6f68' : '1px solid #ddd',
                              background: selectedFormat === fmt ? '#f0f6f5' : '#ffffff',
                              color: selectedFormat === fmt ? '#1f6f68' : '#444',
                              fontWeight: selectedFormat === fmt ? 700 : 500,
                              borderRadius: '4px',
                              fontSize: '12.5px',
                              cursor: 'pointer'
                            }}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '6px' }}>
                        Program Size *
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        {DEFAULT_SIZES.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSelectedSize(sz)}
                            style={{
                              padding: '8px 10px',
                              border: selectedSize === sz ? '2px solid #1f6f68' : '1px solid #ddd',
                              background: selectedSize === sz ? '#f0f6f5' : '#ffffff',
                              color: selectedSize === sz ? '#1f6f68' : '#444',
                              fontWeight: selectedSize === sz ? 700 : 500,
                              borderRadius: '4px',
                              fontSize: '12.5px',
                              cursor: 'pointer'
                            }}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Memorial Program Add-ons */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#262626' }}>
                        Memorial Program Add-ons
                      </label>
                      <span style={{ fontSize: '11px', color: '#1f6f68', fontWeight: 600 }}>Optional keepsakes &amp; digital editions</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '8px' }}>
                      {DEFAULT_ADDONS.map((addOn) => {
                        const isSel = selectedAddOns.includes(addOn)
                        const isOnline = addOn.includes('Digital Program') || addOn.includes('Legacy Tribute')
                        return (
                          <div
                            key={addOn}
                            onClick={() => handleAddOnToggle(addOn)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '8px',
                              padding: '10px 12px',
                              border: isSel ? '2px solid #1f6f68' : '1px solid #dcd5ca',
                              background: isSel ? '#f0f6f5' : '#ffffff',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              fontSize: '12.5px',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '3px',
                                border: isSel ? '1px solid #1f6f68' : '1px solid #bbb',
                                background: isSel ? '#1f6f68' : '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                flexShrink: 0
                              }}>
                                {isSel && <Check size={12} />}
                              </div>
                              <span style={{ color: '#262626', fontWeight: isSel ? 700 : 500 }}>{addOn}</span>
                            </div>
                            {isOnline && (
                              <span style={{
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                background: isSel ? '#1f6f68' : '#f0ece4',
                                color: isSel ? '#ffffff' : '#1f6f68',
                                padding: '2px 6px',
                                borderRadius: '3px',
                                fontWeight: 700
                              }}>
                                Online
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Title / Caption Dropdown */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#333' }}>
                        Title / Caption Choice (Front Cover Banner) *
                      </label>
                      <span style={{ fontSize: '11.5px', color: '#1f6f68' }}>Appears on front cover heading</span>
                    </div>
                    <select
                      value={programTitleCaption}
                      onChange={(e) => setProgramTitleCaption(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px', background: '#fff' }}
                    >
                      {TITLE_CAPTION_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    {programTitleCaption === 'Custom Title / Caption...' && (
                      <div style={{ marginTop: '8px' }}>
                        <input
                          type="text"
                          placeholder="Type custom title / caption here (e.g. In Loving Remembrance of our Beloved Matriarch)"
                          value={customTitleCaption}
                          onChange={(e) => setCustomTitleCaption(e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Main Cover Photo Upload */}
                  <div style={{ marginBottom: '18px' }}>
                    <FileUploadBox
                      label="Main Front Cover Photo * (Featured portrait)"
                      accept="image/*"
                      helperText="Upload high-res portrait photo for program cover (JPEG, PNG). Our team professionally clips the background."
                      file={coverPhoto}
                      onFileSelect={(f) => setCoverPhoto(f)}
                      onFileRemove={() => setCoverPhoto(null)}
                    />
                  </div>

                  {/* Clergy & Speakers (Officiant & Eulogist on Front Cover as requested) */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                        Officiant (Presiding Clergy / Celebrant — Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rev. Dr. Anthony H. Vance"
                        value={officiant}
                        onChange={(e) => setOfficiant(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                        Eulogist (Key Speaker / Family Tribute — Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bishop Marcus T. Jenkins"
                        value={eulogist}
                        onChange={(e) => setEulogist(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 3B. INSIDE (Inside Pages / Spread) */}
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '22px',
                  marginBottom: '24px'
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1f6f68', background: '#e6f0ee', padding: '2px 8px', borderRadius: '4px' }}>
                      Program Section B
                    </span>
                    <h3 className="s" style={{ fontSize: '18px', color: '#262626', margin: '4px 0 0' }}>
                      Inside Spread (Order of Service, Obituary &amp; Inside Photos)
                    </h3>
                  </div>

                  {/* Order of Service */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e0d5c2',
                    borderRadius: '6px',
                    padding: '16px 18px',
                    marginBottom: '18px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#262626' }}>
                        Order of Service *
                      </div>
                      <a href="/resources#order-of-service-outlines" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#1f6f68', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        View Order of Service Outlines Page ↗
                      </a>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#444', marginBottom: '4px' }}>
                        Select Service Outline Template
                      </label>
                      <select
                        value={orderOfServiceType}
                        onChange={(e) => {
                          const val = e.target.value
                          setOrderOfServiceType(val)
                          if (val === 'Standard Order of Service') {
                            setOrderOfServiceText(ORDER_OF_SERVICE_TEMPLATES.standard)
                          } else if (val === 'Memorial Celebration (Service without Casket)') {
                            setOrderOfServiceText(ORDER_OF_SERVICE_TEMPLATES.memorial_celebration)
                          } else if (val === 'Order of Christian Funeral Mass') {
                            setOrderOfServiceText(ORDER_OF_SERVICE_TEMPLATES.funeral_mass)
                          } else {
                            setOrderOfServiceText(ORDER_OF_SERVICE_TEMPLATES.custom)
                          }
                        }}
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px', background: '#fff', marginBottom: '8px' }}
                      >
                        {ORDER_OF_SERVICE_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>

                      {/* 4 Starting Quick-Load Outline Buttons */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderOfServiceType('Standard Order of Service')
                            setOrderOfServiceText(ORDER_OF_SERVICE_TEMPLATES.standard)
                          }}
                          style={{
                            padding: '5px 9px',
                            fontSize: '11px',
                            fontWeight: 600,
                            borderRadius: '4px',
                            border: orderOfServiceType === 'Standard Order of Service' ? '1px solid #1f6f68' : '1px solid #d4c8b8',
                            background: orderOfServiceType === 'Standard Order of Service' ? '#1f6f68' : '#ffffff',
                            color: orderOfServiceType === 'Standard Order of Service' ? '#ffffff' : '#333',
                            cursor: 'pointer'
                          }}
                        >
                          Load Standard (15 Items)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderOfServiceType('Memorial Celebration (Service without Casket)')
                            setOrderOfServiceText(ORDER_OF_SERVICE_TEMPLATES.memorial_celebration)
                          }}
                          style={{
                            padding: '5px 9px',
                            fontSize: '11px',
                            fontWeight: 600,
                            borderRadius: '4px',
                            border: orderOfServiceType === 'Memorial Celebration (Service without Casket)' ? '1px solid #1f6f68' : '1px solid #d4c8b8',
                            background: orderOfServiceType === 'Memorial Celebration (Service without Casket)' ? '#1f6f68' : '#ffffff',
                            color: orderOfServiceType === 'Memorial Celebration (Service without Casket)' ? '#ffffff' : '#333',
                            cursor: 'pointer'
                          }}
                        >
                          Load Memorial Celebration (No Casket)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderOfServiceType('Order of Christian Funeral Mass')
                            setOrderOfServiceText(ORDER_OF_SERVICE_TEMPLATES.funeral_mass)
                          }}
                          style={{
                            padding: '5px 9px',
                            fontSize: '11px',
                            fontWeight: 600,
                            borderRadius: '4px',
                            border: orderOfServiceType === 'Order of Christian Funeral Mass' ? '1px solid #1f6f68' : '1px solid #d4c8b8',
                            background: orderOfServiceType === 'Order of Christian Funeral Mass' ? '#1f6f68' : '#ffffff',
                            color: orderOfServiceType === 'Order of Christian Funeral Mass' ? '#ffffff' : '#333',
                            cursor: 'pointer'
                          }}
                        >
                          Load Funeral Mass
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderOfServiceType('Custom Order of Service')
                            setOrderOfServiceText(ORDER_OF_SERVICE_TEMPLATES.custom)
                          }}
                          style={{
                            padding: '5px 9px',
                            fontSize: '11px',
                            fontWeight: 600,
                            borderRadius: '4px',
                            border: orderOfServiceType === 'Custom Order of Service' ? '1px solid #1f6f68' : '1px solid #d4c8b8',
                            background: orderOfServiceType === 'Custom Order of Service' ? '#1f6f68' : '#ffffff',
                            color: orderOfServiceType === 'Custom Order of Service' ? '#ffffff' : '#333',
                            cursor: 'pointer'
                          }}
                        >
                          Custom Outline
                        </button>
                      </div>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#333' }}>
                          Service Outline (Edit &amp; Add Participant Names)
                        </label>
                        <span style={{ fontSize: '11px', color: '#777' }}>
                          Add participant names next to each dotted line where you have them
                        </span>
                      </div>
                      <textarea
                        rows={7}
                        value={orderOfServiceText}
                        onChange={(e) => setOrderOfServiceText(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace', lineHeight: 1.5 }}
                      />
                    </div>

                    <FileUploadBox
                      label="Or Upload Completed Order of Service Document (Word doc, PDF, or text file)"
                      accept=".doc,.docx,.pdf,.txt"
                      helperText="Attach your printed order of service document if you already have it prepared"
                      file={orderOfServiceDoc}
                      onFileSelect={(f) => setOrderOfServiceDoc(f)}
                      onFileRemove={() => setOrderOfServiceDoc(null)}
                    />
                  </div>

                  {/* Obituary Section */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e0d5c2',
                    borderRadius: '6px',
                    padding: '16px 18px',
                    marginBottom: '18px'
                  }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#262626', marginBottom: '8px' }}>
                      Obituary / Life Story Reflections
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <textarea
                        rows={5}
                        placeholder="Type or paste life story, biography, surviving family members, and beloved memories here..."
                        value={obituaryText}
                        onChange={(e) => setObituaryText(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '12.5px', fontFamily: 'inherit', lineHeight: 1.5 }}
                      />
                    </div>

                    <FileUploadBox
                      label="Obituary Document Upload (Word doc, PDF, or text file)"
                      accept=".doc,.docx,.pdf,.txt"
                      helperText="Attach written obituary file if available"
                      file={obituaryDoc}
                      onFileSelect={(f) => setObituaryDoc(f)}
                      onFileRemove={() => setObituaryDoc(null)}
                    />
                  </div>

                  {/* Inside Photos Upload (Multiple files supported) */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e0d5c2',
                    borderRadius: '6px',
                    padding: '16px 18px'
                  }}>
                    <MultiFileUploadBox
                      label="Inside Photos (Collage, Remembrance &amp; Family Moments)"
                      accept="image/*"
                      helperText="Upload photos for inside spreads, tribute collages, and memory galleries (JPEG, PNG). You can select multiple images."
                      files={insidePhotos}
                      onFilesAdd={handleInsidePhotosAdd}
                      onFileRemove={removeInsidePhoto}
                    />
                  </div>
                </div>

                {/* 3C. BACK COVER */}
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '22px'
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1f6f68', background: '#e6f0ee', padding: '2px 8px', borderRadius: '4px' }}>
                      Program Section C
                    </span>
                    <h3 className="s" style={{ fontSize: '18px', color: '#262626', margin: '4px 0 0' }}>
                      Back Cover (Poems, Acknowledgements, Disposition &amp; Repast)
                    </h3>
                  </div>

                  {/* Poem / Prayer Selection (#01–#11) */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', flexWrap: 'wrap', gap: '6px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#333' }}>
                        Poem / Prayer / Scripture Selection (#01–#11)
                      </label>
                      <a href="/resources#poems-prayers-scriptures" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#1f6f68', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        View Prayers &amp; Poems Catalog (#01–#11) ↗
                      </a>
                    </div>
                    <select
                      value={selectedPoem}
                      onChange={(e) => setSelectedPoem(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px', background: '#fff' }}
                    >
                      {POEM_PRAYER_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    {selectedPoem.includes('Custom') ? (
                      <div style={{ marginTop: '8px' }}>
                        <textarea
                          rows={3}
                          placeholder="Paste your custom poem, scripture reading, or prayer here..."
                          value={customPoem}
                          onChange={(e) => setCustomPoem(e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '12.5px', fontFamily: 'inherit' }}
                        />
                      </div>
                    ) : (
                      <div style={{ marginTop: '6px', fontSize: '11.5px', color: '#666', fontStyle: 'italic' }}>
                        ✦ Selection is by number/title ({selectedPoem.split(':')[0]}). Our design team prints the exact approved wording from our catalog.
                      </div>
                    )}
                  </div>

                  {/* Acknowledgement Selection (A1–A6) */}
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', flexWrap: 'wrap', gap: '6px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#333' }}>
                        Acknowledgement Selection (A1–A6)
                      </label>
                      <a href="/resources#acknowledgements-wording" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#1f6f68', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        View Acknowledgements Wording (A1–A6) ↗
                      </a>
                    </div>
                    <select
                      value={selectedAcknowledgement}
                      onChange={(e) => {
                        const newAck = e.target.value
                        setSelectedAcknowledgement(newAck)
                        const found = ACKNOWLEDGEMENTS_LIST.find(a => `${a.numberLabel}: ${a.title}` === newAck)
                        if (found) {
                          setCustomAcknowledgement(found.fullText)
                        } else if (newAck.includes('N/A')) {
                          setCustomAcknowledgement('')
                        }
                      }}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px', background: '#fff', marginBottom: '8px' }}
                    >
                      {ACKNOWLEDGEMENT_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11.5px', color: '#666' }}>
                        Family Acknowledgement Wording (Preview &amp; Replace [Loved One&apos;s Name]):
                      </span>
                      {ACKNOWLEDGEMENTS_LIST.some(a => `${a.numberLabel}: ${a.title}` === selectedAcknowledgement) && (
                        <button
                          type="button"
                          onClick={() => {
                            const found = ACKNOWLEDGEMENTS_LIST.find(a => `${a.numberLabel}: ${a.title}` === selectedAcknowledgement)
                            if (found) setCustomAcknowledgement(found.fullText)
                          }}
                          style={{ background: 'none', border: 'none', color: '#1f6f68', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                        >
                          Reset to Catalog Text
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Family Acknowledgement Text: The family wishes to express our deepest appreciation for your prayers, calls, and support during our time of bereavement..."
                      value={customAcknowledgement}
                      onChange={(e) => setCustomAcknowledgement(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '12.5px', fontFamily: 'inherit', lineHeight: 1.5 }}
                    />
                  </div>

                  {/* Final Disposition Title */}
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                      Final Disposition Title
                    </label>
                    <select
                      value={finalDispositionTitle}
                      onChange={(e) => setFinalDispositionTitle(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13.5px', background: '#fff' }}
                    >
                      {FINAL_DISPOSITION_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div style={{ fontSize: '11.5px', color: '#666', marginTop: '4px' }}>
                      Paired with cemetery information entered in Section 1: <strong>{dispositionLocation || 'Location specified in Section 1'}</strong>
                    </div>
                  </div>

                  {/* Repast Information */}
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '5px' }}>
                      Repast Information / Reception Directions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Following the committal service, the family invites friends and loved ones to join them for a repast reception at Grace Fellowship Hall, 123 Main St, from 2:00 PM – 5:00 PM."
                      value={repastInfo}
                      onChange={(e) => setRepastInfo(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '13px', fontFamily: 'inherit' }}
                    />
                  </div>

                  {/* Additional Back-Cover Photo */}
                  <FileUploadBox
                    label="Additional Back-Cover Photo (Optional — e.g. angel photo, sunset, or cherished portrait)"
                    accept="image/*"
                    helperText="Upload optional back-cover photo (JPEG, PNG)"
                    file={backCoverPhoto}
                    onFileSelect={(f) => setBackCoverPhoto(f)}
                    onFileRemove={() => setBackCoverPhoto(null)}
                  />
                </div>

              </div>
            )}

            {/* SECTION 4: OTHER KEEPSAKE PRODUCTS & ADDITIONAL FILES */}
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
                  Other Keepsake Products &amp; Additional Files
                </h2>
                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                  Options and photo uploads for each additional product selected in your order, plus general project uploads.
                </p>
              </div>

              {/* PRODUCT 2: DIGITAL PROGRAM & LEGACY TRIBUTE OPTIONS */}
              {(selectedProductIds.includes('digital_program') || selectedAddOns.some(a => a.includes('Digital Program') || a.includes('Legacy Tribute'))) && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <h3 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: '0 0 12px' }}>
                    ✦ Digital Memorial Program &amp; Legacy Tribute Options
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Digital Delivery Preference
                      </label>
                      <select
                        value={digitalDelivery}
                        onChange={(e) => setDigitalDelivery(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="pdf_and_link">Both Downloadable PDF &amp; Shareable Mobile Link / QR Code</option>
                        <option value="link_qr_only">Shareable Mobile Link &amp; Scannable QR Code Only</option>
                        <option value="pdf_only">High-Resolution E-Book PDF Only</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Digital Program &amp; Tribute Page Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Include online livestream link, custom tribute page title, or obituary link"
                        value={digitalNotes}
                        onChange={(e) => setDigitalNotes(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PRODUCT 3: PRAYER CARD OPTIONS */}
              {selectedProductIds.includes('prayer_card') && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <h3 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: '0 0 12px' }}>
                    ✦ Prayer Cards &amp; Keepsakes Options
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Prayer Card Quantity *
                      </label>
                      <select
                        value={prayerCardQty}
                        onChange={(e) => setPrayerCardQty(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="50">50 Prayer Cards</option>
                        <option value="100">100 Prayer Cards</option>
                        <option value="150">150 Prayer Cards</option>
                        <option value="200">200 Prayer Cards</option>
                        <option value="250">250 Prayer Cards</option>
                        <option value="300+">300+ Prayer Cards (Specify in notes)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Card Finish / Lamination
                      </label>
                      <select
                        value={prayerCardFinish}
                        onChange={(e) => setPrayerCardFinish(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="Laminated">Heavy Sealed Gloss Lamination (Most Popular)</option>
                        <option value="Heavy Matte Cardstock">Heavy Premium Matte Cardstock (130 lb)</option>
                        <option value="Soft Touch Velvet">Velvet Soft-Touch Finish</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Poem / Scripture Selection
                      </label>
                      <select
                        value={prayerCardVerse}
                        onChange={(e) => setPrayerCardVerse(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        {POEM_PRAYER_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {prayerCardVerse.includes('Custom') && (
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Custom Prayer Card Verse or Message
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Paste custom prayer, poem, or message to print on the back of the card..."
                        value={prayerCardCustomVerse}
                        onChange={(e) => setPrayerCardCustomVerse(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px', fontFamily: 'inherit' }}
                      />
                    </div>
                  )}

                  <FileUploadBox
                    label="Prayer Card Photo (If different from cover photo)"
                    accept="image/*"
                    helperText="Upload portrait for prayer card (JPEG, PNG)"
                    file={prayerCardPhoto}
                    onFileSelect={(f) => setPrayerCardPhoto(f)}
                    onFileRemove={() => setPrayerCardPhoto(null)}
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Prayer Card Design Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Match Memorial Program design theme #101"
                      value={prayerCardNotes}
                      onChange={(e) => setPrayerCardNotes(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              )}

              {/* PRODUCT 4: POSTER OPTIONS */}
              {selectedProductIds.includes('poster') && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <h3 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: '0 0 12px' }}>
                    ✦ Tribute Poster &amp; Large Format Options
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Poster Size *
                      </label>
                      <select
                        value={posterStyleSize}
                        onChange={(e) => setPosterStyleSize(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value='18" × 24" Standard Memorial Poster'>18" × 24" Standard Memorial Display</option>
                        <option value='24" × 36" Large Memorial Display'>24" × 36" Large Memorial Display (Most Popular)</option>
                        <option value='30" × 40" Grand Tribute Display'>30" × 40" Grand Tribute Display</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Mounting Option
                      </label>
                      <select
                        value={posterMounting}
                        onChange={(e) => setPosterMounting(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="Mounted on Rigid Foam Board (Easel-Ready)">Mounted on Rigid White Foam Board (Easel-Ready)</option>
                        <option value="Satin Heavy Photo Paper (Unmounted)">Satin Heavyweight Photo Paper (For Framing / Unmounted)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Poster Quantity
                      </label>
                      <select
                        value={posterQuantity}
                        onChange={(e) => setPosterQuantity(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="1">1 Poster</option>
                        <option value="2">2 Posters</option>
                        <option value="3">3 Posters</option>
                        <option value="4+">4+ Posters</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Poster Heading / Inscription
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. In Loving Memory of Eleanor Grace Dawson · 1942 – 2026"
                      value={posterTitle}
                      onChange={(e) => setPosterTitle(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px' }}
                    />
                  </div>

                  <FileUploadBox
                    label="Poster High-Resolution Photograph"
                    accept="image/*"
                    helperText="Upload original high-res photo for poster enlargement"
                    file={posterPhoto}
                    onFileSelect={(f) => setPosterPhoto(f)}
                    onFileRemove={() => setPosterPhoto(null)}
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Poster Design Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Include gold halo accent, add floral corners to match program"
                      value={posterNotes}
                      onChange={(e) => setPosterNotes(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              )}

              {/* PRODUCT 5: CASKET PANEL OPTIONS */}
              {selectedProductIds.includes('casket_panel') && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <h3 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: '0 0 12px' }}>
                    ✦ Casket Panel Insert Options
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Casket Panel Size *
                      </label>
                      <select
                        value={casketPanelSize}
                        onChange={(e) => setCasketPanelSize(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value='Standard Half Couch (28" × 14")'>Standard Half Couch (28" × 14")</option>
                        <option value='Full Couch (48" × 14")'>Full Couch (48" × 14")</option>
                        <option value="Custom Size">Custom Size (Specify width × height below)</option>
                      </select>
                    </div>

                    {casketPanelSize === 'Custom Size' && (
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                          Specify Exact Custom Dimensions *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder='e.g. 31" Wide × 15.5" High'
                          value={casketPanelCustomSize}
                          onChange={(e) => setCasketPanelCustomSize(e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px' }}
                        />
                      </div>
                    )}

                    <div style={{ gridColumn: casketPanelSize === 'Custom Size' ? '1 / -1' : 'auto' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Casket Panel Inscription / Scripture
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Resting in the Arms of Jesus / Forever in Our Hearts"
                        value={casketPanelTitle}
                        onChange={(e) => setCasketPanelTitle(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <FileUploadBox
                    label="Casket Panel Featured Photo"
                    accept="image/*"
                    helperText="Upload original portrait for casket panel insert"
                    file={casketPanelPhoto}
                    onFileSelect={(f) => setCasketPanelPhoto(f)}
                    onFileRemove={() => setCasketPanelPhoto(null)}
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Casket Panel Notes &amp; Casket Details
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Casket make/model or special velvet lining requests"
                      value={casketPanelNotes}
                      onChange={(e) => setCasketPanelNotes(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              )}

              {/* PRODUCT 6: ANNOUNCEMENT OPTIONS */}
              {selectedProductIds.includes('announcement') && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <h3 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: '0 0 12px' }}>
                    ✦ Funeral Announcement Options
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Announcement Format
                      </label>
                      <select
                        value={announcementFormat}
                        onChange={(e) => setAnnouncementFormat(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value='Printed Cards (5" × 7") with Envelopes'>Printed Cards (5" × 7") with Envelopes</option>
                        <option value="Digital Image / Social Graphic">Digital Graphic for Social Media / Text Invitation</option>
                        <option value="Both Printed Cards &amp; Digital Graphic">Both Printed Cards &amp; Digital Graphic</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Quantity Needed
                      </label>
                      <select
                        value={announcementQuantity}
                        onChange={(e) => setAnnouncementQuantity(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="50">50 Announcements</option>
                        <option value="100">100 Announcements</option>
                        <option value="150">150 Announcements</option>
                        <option value="200+">200+ Announcements</option>
                      </select>
                    </div>
                  </div>

                  <FileUploadBox
                    label="Announcement Photo"
                    accept="image/*"
                    helperText="Upload image for announcement cards"
                    file={announcementPhoto}
                    onFileSelect={(f) => setAnnouncementPhoto(f)}
                    onFileRemove={() => setAnnouncementPhoto(null)}
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Announcement Text &amp; Special Instructions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter date, time, venue address, or special dress code/colors requested by family..."
                      value={announcementNotes}
                      onChange={(e) => setAnnouncementNotes(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              )}

              {/* PRODUCT 7: BOOKMARK OPTIONS */}
              {selectedProductIds.includes('bookmark') && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <h3 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: '0 0 12px' }}>
                    ✦ Memorial Bookmark Options
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Quantity Needed *
                      </label>
                      <select
                        value={bookmarkQuantity}
                        onChange={(e) => setBookmarkQuantity(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="50">50 Bookmarks</option>
                        <option value="100">100 Bookmarks</option>
                        <option value="150">150 Bookmarks</option>
                        <option value="200+">200+ Bookmarks</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Bookmark Tassel Included? *
                      </label>
                      <select
                        value={bookmarkTassel}
                        onChange={(e) => setBookmarkTassel(e.target.value as 'yes' | 'no')}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="yes">Yes — Include Silky Tassel</option>
                        <option value="no">No Tassel (Flat Laminated Bookmark)</option>
                      </select>
                    </div>

                    {bookmarkTassel === 'yes' && (
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                          Tassel Color
                        </label>
                        <select
                          value={bookmarkTasselColor}
                          onChange={(e) => setBookmarkTasselColor(e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                        >
                          <option value="Gold">Metallic Gold</option>
                          <option value="Silver">Metallic Silver</option>
                          <option value="White">Pure White</option>
                          <option value="Black">Classic Black</option>
                          <option value="Navy">Navy Blue</option>
                          <option value="Burgundy">Deep Burgundy</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <FileUploadBox
                    label="Bookmark Photo"
                    accept="image/*"
                    helperText="Upload photo for bookmark layout"
                    file={bookmarkPhoto}
                    onFileSelect={(f) => setBookmarkPhoto(f)}
                    onFileRemove={() => setBookmarkPhoto(null)}
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Bookmark Scripture / Quote / Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Include 2 Timothy 4:7 on back, match program design #101"
                      value={bookmarkNotes}
                      onChange={(e) => setBookmarkNotes(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              )}

              {/* PRODUCT 8: BUTTON OPTIONS */}
              {selectedProductIds.includes('button') && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <h3 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: '0 0 12px' }}>
                    ✦ Keepsake Buttons Options
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Button Quantity *
                      </label>
                      <select
                        value={buttonQuantity}
                        onChange={(e) => setButtonQuantity(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="25">25 Buttons</option>
                        <option value="50">50 Buttons</option>
                        <option value="75">75 Buttons</option>
                        <option value="100">100 Buttons</option>
                        <option value="150+">150+ Buttons</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Button Size
                      </label>
                      <select
                        value={buttonSize}
                        onChange={(e) => setButtonSize(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="3-Inch Round Pinback">3-Inch Round Pinback Button (Standard)</option>
                        <option value="2.25-Inch Round Pinback">2.25-Inch Round Pinback Button (Compact)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Button Inscription / Dates
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Eleanor Grace Dawson · 1942 – 2026"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <FileUploadBox
                    label="Button Photo"
                    accept="image/*"
                    helperText="Upload clear face portrait for button"
                    file={buttonPhoto}
                    onFileSelect={(f) => setButtonPhoto(f)}
                    onFileRemove={() => setButtonPhoto(null)}
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Button Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Include gold rim border, crop to face"
                      value={buttonNotes}
                      onChange={(e) => setButtonNotes(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              )}

              {/* PRODUCT 9: THANK YOU CARD OPTIONS */}
              {selectedProductIds.includes('thank_you_card') && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <h3 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: '0 0 12px' }}>
                    ✦ Thank You Cards Options
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Card Style
                      </label>
                      <select
                        value={thankYouStyle}
                        onChange={(e) => setThankYouStyle(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="Folded Note Cards with Envelopes">Folded Note Cards with Matching Envelopes</option>
                        <option value="Flat Postcards with Envelopes">Flat Postcards with Matching Envelopes</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Quantity Needed *
                      </label>
                      <select
                        value={thankYouQuantity}
                        onChange={(e) => setThankYouQuantity(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px', background: '#fff' }}
                      >
                        <option value="50">50 Cards &amp; Envelopes</option>
                        <option value="100">100 Cards &amp; Envelopes</option>
                        <option value="150">150 Cards &amp; Envelopes</option>
                        <option value="200+">200+ Cards &amp; Envelopes</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Pre-Printed Thank You Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. The family of Eleanor Grace Dawson acknowledges with grateful appreciation your kind expression of sympathy..."
                      value={thankYouMessage}
                      onChange={(e) => setThankYouMessage(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px', fontFamily: 'inherit' }}
                    />
                  </div>

                  <FileUploadBox
                    label="Thank You Card Photo (Optional)"
                    accept="image/*"
                    helperText="Upload photo if desired for front of thank you card"
                    file={thankYouPhoto}
                    onFileSelect={(f) => setThankYouPhoto(f)}
                    onFileRemove={() => setThankYouPhoto(null)}
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Thank You Card Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Leave blank inside for handwritten personal messages"
                      value={thankYouNotes}
                      onChange={(e) => setThankYouNotes(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px' }}
                    />
                  </div>
                </div>
              )}

              {/* PRODUCT 10: OTHER PRODUCTS OPTIONS */}
              {selectedProductIds.includes('other_products') && (
                <div style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}>
                  <h3 className="s" style={{ fontSize: '18px', color: '#1f6f68', margin: '0 0 12px' }}>
                    ✦ Other Products &amp; Custom Keepsakes
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Product Name / Item Description *
                      </label>
                      <input
                        type="text"
                        required={selectedProductIds.includes('other_products')}
                        placeholder="e.g. Memorial Vinyl Banner, T-Shirts, Candle Wraps, Fans"
                        value={otherProductName}
                        onChange={(e) => setOtherProductName(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                        Quantity Needed *
                      </label>
                      <input
                        type="text"
                        required={selectedProductIds.includes('other_products')}
                        placeholder="e.g. 2 Banners, 50 Fans, 100 Keepsakes"
                        value={otherProductQuantity}
                        onChange={(e) => setOtherProductQuantity(e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                      Detailed Specifications &amp; Instructions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe sizes, colors, material preferences, placement instructions, or any special tribute details..."
                      value={otherProductDetails}
                      onChange={(e) => setOtherProductDetails(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #cfcfcf', fontSize: '12.5px', fontFamily: 'inherit' }}
                    />
                  </div>

                  <FileUploadBox
                    label="Reference File / Artwork Upload"
                    accept="*/*"
                    helperText="Upload reference image, PDF, or artwork file"
                    file={otherProductFile}
                    onFileSelect={(f) => setOtherProductFile(f)}
                    onFileRemove={() => setOtherProductFile(null)}
                  />
                </div>
              )}

              {/* DIRECT REAL FILE UPLOADS (Additional Program Files & Cloud Link) */}
              <div style={{
                background: '#faf8f4',
                border: '1px solid #ebd8b5',
                borderRadius: '6px',
                padding: '18px 20px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1f6f68', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Upload size={18} /> Additional Photos &amp; Documents
                </div>

                {/* Additional Program Files */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                    Upload Additional Photos, Tributes &amp; Artwork (Multiple files supported)
                  </label>
                  <div style={{
                    border: '2px dashed #cfc7ba',
                    borderRadius: '6px',
                    padding: '14px 18px',
                    textAlign: 'center',
                    background: '#ffffff',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleAdditionalFilesChange}
                      id="multi-files-input"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="multi-files-input" style={{ cursor: 'pointer', display: 'block' }}>
                      <FileUp size={20} color="#1f6f68" style={{ margin: '0 auto 4px', display: 'block' }} />
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#1f6f68' }}>Click here to select multiple photos or documents</span>
                      <span style={{ display: 'block', fontSize: '11px', color: '#777', marginTop: '2px' }}>
                        Attach family photos, certificates, tributes, and extra keepsake documents all at once
                      </span>
                    </label>
                  </div>

                  {additionalFiles.length > 0 && (
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {additionalFiles.map((file, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '6px 12px',
                            background: '#f0f6f5',
                            borderRadius: '4px',
                            fontSize: '12px',
                            border: '1px solid #d0e0dc'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                            <FileText size={14} color="#1f6f68" style={{ flexShrink: 0 }} />
                            <span style={{ fontWeight: 600, color: '#262626', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {file.name}
                            </span>
                            <span style={{ color: '#777', fontSize: '11px' }}>({formatFileSize(file.size)})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAdditionalFile(idx)}
                            style={{ background: 'none', border: 'none', color: '#991b1b', cursor: 'pointer', padding: '2px' }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Optional Google Drive / Cloud Link */}
                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                    Or Cloud Transfer Folder Link (Optional — Google Drive, Dropbox, iCloud)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/drive/folders/... (Make sure access is set to 'Anyone with link')"
                    value={cloudFolderLink}
                    onChange={(e) => setCloudFolderLink(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #cfcfcf', borderRadius: '4px', fontSize: '12.5px' }}
                  />
                </div>
              </div>

              {/* Special Requests & Notes for Studio */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#262626', marginBottom: '4px' }}>
                  Special Requests / Layout Notes for Studio Design Team
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Include gold foil accent border, add 6 photo collage slots, special scripture on back cover..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    border: '1px solid #cfcfcf',
                    borderRadius: '4px',
                    fontSize: '12.5px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            {/* SECTION 5: TERMS & CONDITIONS AND SUBMISSION */}
            <div style={{
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e0d5c2',
              padding: '24px 28px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              {/* Terms & Conditions Box */}
              <div 
                id="terms-agreement-box"
                style={{
                  background: '#faf8f4',
                  border: '1px solid #e0d5c2',
                  borderRadius: '6px',
                  padding: '16px 20px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#262626' }}>
                    Terms &amp; Conditions Agreement
                  </span>
                  <button
                    type="button"
                    onClick={() => setTermsModalOpen(!termsModalOpen)}
                    style={{ background: 'none', border: 'none', color: '#1f6f68', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {termsModalOpen ? 'Hide Full Policy' : 'Read Full Policy Terms'}
                  </button>
                </div>

                {termsModalOpen && (
                  <div style={{
                    fontSize: '12px',
                    color: '#555',
                    lineHeight: 1.6,
                    maxHeight: '180px',
                    overflowY: 'auto',
                    borderTop: '1px solid #ebd8b5',
                    paddingTop: '10px',
                    marginBottom: '12px'
                  }}>
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>1. Digital Proof Approval:</strong> All memorial stationery and keepsakes require digital PDF proof approval by the family or authorized representative before printing begins. Once approved in writing or via email, Lilies of the Field cannot be held responsible for typographical errors present in the approved proof.
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>2. Production &amp; Turnaround:</strong> Standard turnaround is 4 business days. Orders placed within fewer business days are subject to press schedule availability and Expedited Handling Fees.
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>3. Revision Policy:</strong> Standard keepsake orders include up to two (2) complimentary rounds of revisions to ensure typography, layout, and photos meet your satisfaction. Rush orders include one (1) revision round due to accelerated press schedule constraints.
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>4. Photographs &amp; Rights:</strong> By submitting photographs, the family certifies they have the legal right to reproduce all submitted photographs and literary tributes.
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>5. Payment Terms:</strong> No payment is processed at the time of order intake today. An itemized invoice reflecting selected options and any rush fees will be emailed upon proof review.
                    </p>
                    <p style={{ margin: '0 0 8px' }}>
                      <strong>6. Studio Pickups &amp; Visits:</strong> Studio visits and orders ready for pickup are by appointment only at 21229 Jamaica Avenue, Queens Village, NY. Phone: (917) 300-1104. Email: orders@liliesofthefield.design.
                    </p>
                  </div>
                )}

                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#262626',
                  userSelect: 'none'
                }}>
                  <input
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked)
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
                    I have read and agree to the Order Instructions, Photo Guidelines, and Terms &amp; Conditions. I understand that proofs will be emailed for family review prior to production. *
                  </span>
                </label>
              </div>

              {/* Submission Action Bar */}
              <div style={{
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
                      padding: '14px 34px',
                      fontSize: '14px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      boxShadow: '0 4px 16px rgba(31, 111, 104, 0.3)',
                      cursor: submitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {submitting ? 'Submitting Order Request...' : 'Submit Order Request'}
                  </button>
                </div>
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
        Loading memorial order request form...
      </div>
    }>
      <OrderFormContent />
    </Suspense>
  )
}
