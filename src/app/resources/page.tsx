'use client'

import { useState } from 'react'
import { 
  POEMS_AND_PRAYERS_LIST, 
  ACKNOWLEDGEMENTS_LIST, 
  ORDER_OF_SERVICE_TEMPLATES 
} from '@/data/memorialContentData'
import Link from 'next/link'
import { 
  BookOpen, 
  FileText, 
  Heart, 
  HelpCircle, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Copy, 
  Check, 
  PhoneCall, 
  MessageSquare,
  ScrollText,
  Clock,
  Printer
} from 'lucide-react'

interface GuideItem {
  id: string
  tag: string
  title: string
  description: string
  iconName: string
  sections: {
    heading: string
    content: string
    bullets?: string[]
    copyable?: string
  }[]
}

const PLANNING_GUIDES: GuideItem[] = [
  {
    id: 'creating-a-memorial-program',
    tag: 'Step-by-step guide',
    title: 'Creating a Memorial Program',
    description: 'Our comprehensive visual guide to choosing sizes, organizing pages, selecting photos, and planning layout elements.',
    iconName: 'BookOpen',
    sections: [
      {
        heading: '1. Selecting the Right Program Format',
        content: 'Choosing the layout format sets the tone and provides the necessary space for your loved one\'s story and service order.',
        bullets: [
          'Single Sheet / Bi-Fold (4 Panels): The classic funeral program. Features Cover, Order of Service, Obituary, and Acknowledgements.',
          'Tri-Fold (6 Panels): Offers additional room for extended photo collages, pallbearers lists, and scripture verses.',
          'Booklet (8 to 12 Pages): Ideal for comprehensive life celebrations, multi-generational family trees, and extensive photo reflections.',
          'Graduated Step-Fold: Premium staggered page tabs that allow attendees to quickly navigate hymns, eulogies, and tributes.'
        ]
      },
      {
        heading: '2. Standard Page Hierarchy & Structure',
        content: 'A well-structured program guides attendees seamlessly through the ceremony:',
        bullets: [
          'Front Cover: Highest quality portrait, full legal name & beloved nicknames, birth and passing dates ("Sunrise & Sunset"), and service location.',
          'Inside Left: The Order of Service / Order of Celebration.',
          'Inside Right: The Life Story (Obituary), highlighting achievements, family, and passions.',
          'Back Cover: Acknowledgements & floral thank-you message, list of pallbearers, interment and repast reception directions.'
        ]
      },
      {
        heading: '3. Photo Preparation & Scanning Best Practices',
        content: 'High resolution creates stunning print results. Submit original high-resolution camera files or clean scans whenever possible. Our design studio provides complimentary background retouching, contrast brightening, and heirloom restoration on all photos.'
      }
    ]
  },
  {
    id: 'order-of-service-outlines',
    tag: 'Service planning',
    title: 'Order of Service Outlines',
    description: 'Our four official ceremony outlines: Standard Order of Service, Memorial Celebration, Order of Funeral Mass, or Custom. Families copy these templates and type participant names next to each line.',
    iconName: 'ScrollText',
    sections: [
      {
        heading: 'Standard Order of Service',
        content: 'The classic church or chapel funeral order with casket present:',
        copyable: ORDER_OF_SERVICE_TEMPLATES.standard,
        bullets: [
          'Musical Prelude · Processional',
          'Opening Prayer & Invocation',
          'Scripture Readings (Old & New Testament)',
          'Musical Selection · Obituary Reading',
          'Acknowledgements & Resolutions',
          'Reflections / Words of Remembrance',
          'Eulogy by Presiding Officiant',
          'Closing Prayer, Benediction & Recessional'
        ]
      },
      {
        heading: 'Memorial Celebration Order of Service',
        content: 'A memorial service or celebration of life held without the casket present:',
        copyable: ORDER_OF_SERVICE_TEMPLATES.memorial_celebration,
        bullets: [
          'Gathering Music / Prelude · Welcome',
          'Opening Prayer · Scripture Reading',
          'Musical Selection · Reading of the Life Story',
          'Photo / Video Tribute Presentation',
          'Reflections & Remembrances from Family & Friends',
          'Favorite Poem or Reading · Eulogy / Tribute',
          'Closing Prayer, Benediction & Recessional Music'
        ]
      },
      {
        heading: 'Order of Christian Funeral Mass',
        content: 'The Roman Catholic liturgy format including the Liturgy of the Word and Holy Communion:',
        copyable: ORDER_OF_SERVICE_TEMPLATES.funeral_mass,
        bullets: [
          'Sprinkling with Holy Water & Placing of the Pall',
          'Entrance Hymn & Processional · Collect',
          'First Reading (OT), Responsorial Psalm, Second Reading (NT)',
          'Gospel Reading & Homily · Prayers of the Faithful',
          'Liturgy of the Eucharist & Holy Communion',
          'Words of Remembrance · Final Commendation & Song of Farewell'
        ]
      },
      {
        heading: 'Custom Order of Service',
        content: 'Personalized service format tailored to your family’s traditions and spiritual preferences:',
        copyable: ORDER_OF_SERVICE_TEMPLATES.custom
      }
    ]
  },
  {
    id: 'poems-prayers-scriptures',
    tag: 'Numbered list #01–#11',
    title: 'Poems, Prayers & Scriptures (#01–#11)',
    description: 'Our official numbered catalog (#01–#11). Families can select by number on the order form, ensuring the exact approved text is printed.',
    iconName: 'Heart',
    sections: POEMS_AND_PRAYERS_LIST.map((item) => ({
      heading: `${item.numberLabel}: ${item.title}`,
      content: `${item.category ? `Category: ${item.category}` : ''}${item.author ? ` · Written by ${item.author}` : ''}`,
      copyable: item.fullText
    }))
  },
  {
    id: 'acknowledgements-wording',
    tag: 'Numbered list A1–A6',
    title: 'Acknowledgements Wording (A1–A6)',
    description: 'Our official numbered acknowledgement catalog (A1–A6). Select by code on the order form to print our exact approved wording on the program back cover.',
    iconName: 'FileText',
    sections: ACKNOWLEDGEMENTS_LIST.map((item) => ({
      heading: `${item.numberLabel}: ${item.title}`,
      content: 'Approved family gratitude text for back cover or prayer card:',
      copyable: item.fullText
    }))
  },
  {
    id: 'obituary-writing-assistance',
    tag: 'Interactive worksheet',
    title: 'Obituary Writing Assistance',
    description: 'Guided worksheet covering key life areas and distinct storytelling styles to help celebrate your loved one’s unique journey.',
    iconName: 'Sparkles',
    sections: [
      {
        heading: 'Step-by-Step Writing Blueprint',
        content: 'Follow this 5-part guide to craft a heartfelt, dignified life reflection:',
        bullets: [
          'Part 1: The Formal Announcement — State full legal name, common nicknames, age, dates of birth and passing, and final resting residence.',
          'Part 2: Early Years & Roots — Parents, birth city, formative childhood memories, school years, and early accomplishments.',
          'Part 3: Career, Military & Passions — Vocations, military service branch, craft and artistic achievements, hobbies, and civic contributions.',
          'Part 4: Family & Surviving Loved Ones — Spouse, children, grandchildren, siblings, cherished lifelong companions, and preceded ancestors.',
          'Part 5: Service & Legacy — Details of the commemorative gathering, and preferred charitable donations or floral wishes.'
        ]
      },
      {
        heading: 'Opening Sentence Templates',
        content: 'Struggling with the first sentence? Choose one of these graceful starting points:',
        bullets: [
          '"[Full Name], a beacon of steadfast devotion and quiet wisdom, was peacefully called home to eternal rest on [Date] at the age of [Age]."',
          '"Surrounded by the warmth of family and unconditional love, [Full Name] transitioned peacefully into eternity on [Date]."',
          '"With profound gratitude for a life richly lived and abundantly blessed, we celebrate the homegoing of [Full Name], who entered his/her eternal reward on [Date]."'
        ]
      }
    ]
  },
  {
    id: 'frequently-asked-questions',
    tag: 'Studio FAQ',
    title: 'Frequently Asked Questions',
    description: 'Answers to common questions regarding turnarounds, photo submission standards, proofs, rush policies, and deliveries.',
    iconName: 'HelpCircle',
    sections: [
      {
        heading: 'Studio Turnaround & Proofing Timeline',
        content: 'Standard keepsake orders receive a digital design proof within 24 hours of receiving text and photos. Families have the opportunity to review, request adjustments, and approve before printing begins.'
      },
      {
        heading: 'Do You Offer Same-Day or Emergency Rush Services?',
        content: 'Yes. We understand that funeral schedules can arise abruptly. Lilies of the Field offers rush turnaround and printing for families and funeral providers, with appointments and pickups at our Queens Village studio (21229 Jamaica Avenue) and expedited delivery across the New York metropolitan area and nationwide.'
      },
      {
        heading: 'How Should We Send Photos to the Studio?',
        content: 'Photos can be submitted via email to orders@liliesofthefield.design, uploaded directly through our website, or brought in during an in-person appointment. We scan physical heirloom photographs on-site with archival equipment.'
      },
      {
        heading: 'Can We Add a Digital Memorial with a QR Code?',
        content: 'Yes. Every printed memorial program or keepsake card can include a personalized QR code that allows guests to scan and view the interactive digital keepsake program, photo slideshow, and sympathy guestbook directly on their smartphones.'
      }
    ]
  }
]

export default function MemorialPlanningGuidesPage() {
  const [activeGuide, setActiveGuide] = useState<GuideItem | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [consultModalOpen, setConsultModalOpen] = useState(false)
  const [consultSuccess, setConsultSuccess] = useState(false)

  // Consultation Form State
  const [consultName, setConsultName] = useState('')
  const [consultEmail, setConsultEmail] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [consultNotes, setConsultNotes] = useState('')

  const handleCopyText = (text: string, key: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2500)
    }
  }

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConsultSuccess(true)
    setTimeout(() => {
      setConsultSuccess(false)
      setConsultModalOpen(false)
      setConsultName('')
      setConsultEmail('')
      setConsultPhone('')
      setConsultNotes('')
    }, 3500)
  }

  return (
    <div style={{ width: '100%', background: '#ffffff', minHeight: 'calc(100vh - 200px)' }}>
      {/* 1. Hero Section */}
      <section style={{
        textAlign: 'center',
        paddingTop: '64px',
        paddingBottom: '40px',
        width: '100%'
      }}>
        <div className="site-container">
          <p className="eb" style={{ fontSize: '12px', letterSpacing: '.14em', color: '#1f6f68', marginBottom: '10px' }}>
            Support &amp; Planning Library
          </p>

          <h1 className="s" style={{
            fontSize: 'clamp(36px, 4.5vw, 54px)',
            lineHeight: 1.14,
            color: '#262626',
            marginBottom: '18px',
            fontWeight: 400
          }}>
            Helpful Guidance<br />When You Need It Most
          </h1>

          <p style={{
            maxWidth: '720px',
            margin: '0 auto',
            fontSize: '16.5px',
            lineHeight: 1.68,
            color: '#555'
          }}>
            Planning a celebration of life requires making numerous meaningful decisions in a short period of time. We provide clear, comforting guidance, practical outlines, and copy-ready templates to ease the process.
          </p>
        </div>
      </section>

      {/* 2. Planning Guides 3-Column Grid */}
      <section style={{
        paddingTop: '16px',
        paddingBottom: '60px',
        width: '100%'
      }}>
        <div className="site-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 24px)',
            width: '100%'
          }}>
            {PLANNING_GUIDES.map((guide) => (
              <div 
                key={guide.id}
                onClick={() => setActiveGuide(guide)}
                className="cd cb"
                style={{
                  background: '#faf8f4',
                  padding: '28px 30px',
                  borderRadius: '4px',
                  border: '1px solid #e3e3e3',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  minHeight: '210px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.06)'
                  e.currentTarget.style.borderColor = '#c9963b'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = '#e3e3e3'
                }}
              >
                <p className="eb" style={{ color: '#a87a22', margin: 0, fontSize: '11px', letterSpacing: '.12em' }}>
                  {guide.tag}
                </p>

                <h3 className="ct" style={{ fontSize: '21px', margin: 0, color: '#262626', fontWeight: 500 }}>
                  {guide.title}
                </h3>

                <p className="tx" style={{ flex: 1, fontSize: '14px', lineHeight: 1.6, color: '#555', margin: 0 }}>
                  {guide.description}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                  <span style={{
                    fontSize: '11.5px',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: '#1f6f68',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    Read Guide →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Complimentary Virtual Consultation Banner */}
      <section id="consultation" style={{
        paddingBottom: '72px',
        width: '100%'
      }}>
        <div className="site-container">
          <div style={{
            width: '100%',
            background: '#f5efe6',
            border: '1px solid #e0d5c2',
            borderRadius: '4px',
            padding: '40px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '36px',
            flexWrap: 'wrap'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <p className="eb" style={{ marginBottom: '8px' }}>
                Complimentary Consultation
              </p>
              <h2 className="s" style={{ fontSize: '28px', color: '#262626', marginBottom: '10px', fontWeight: 500 }}>
                Schedule a Virtual Consultation
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.65, color: '#444', margin: 0 }}>
                For families who would like personal assistance selecting products or planning their memorial materials, our studio offers one-on-one virtual consultations with dedicated memorial designers.
              </p>
            </div>

            <div>
              <button 
                onClick={() => setConsultModalOpen(true)}
                className="b b1"
                style={{
                  padding: '14px 28px',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                Book Virtual Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full Guide Reader Modal / Drawer */}
      {activeGuide && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.68)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 10000
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            maxWidth: '760px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px 40px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => setActiveGuide(null)}
              aria-label="Close guide"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                padding: '4px'
              }}
            >
              <X size={22} />
            </button>

            {/* Guide Header */}
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '18px', marginBottom: '24px' }}>
              <span className="eb" style={{ color: '#a87a22', display: 'block', marginBottom: '4px' }}>
                {activeGuide.tag}
              </span>
              <h2 className="s" style={{ fontSize: '28px', color: '#262626', marginBottom: '8px', fontWeight: 600 }}>
                {activeGuide.title}
              </h2>
              <p style={{ fontSize: '14.5px', color: '#555', margin: 0, lineHeight: 1.6 }}>
                {activeGuide.description}
              </p>
            </div>

            {/* Guide Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {activeGuide.sections.map((sec, idx) => (
                <div key={idx} style={{ background: '#faf8f4', padding: '22px 26px', borderRadius: '6px', border: '1px solid #e8dfd2' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: '#1f6f68', marginBottom: '8px', fontWeight: 600 }}>
                    {sec.heading}
                  </h4>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#333', marginBottom: sec.bullets || sec.copyable ? '12px' : 0 }}>
                    {sec.content}
                  </p>

                  {/* Bullet points */}
                  {sec.bullets && (
                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#444' }}>
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ lineHeight: 1.6 }}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {/* Copyable Box */}
                  {sec.copyable && (
                    <div style={{ marginTop: '16px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#f0ece3',
                        padding: '8px 14px',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        letterSpacing: '.06em',
                        color: '#666',
                        textTransform: 'uppercase'
                      }}>
                        <span>Copy-Ready Template</span>
                        <button 
                          onClick={() => handleCopyText(sec.copyable || '', `${activeGuide.id}-${idx}`)}
                          style={{
                            background: '#1f6f68',
                            color: '#fff',
                            border: 'none',
                            padding: '4px 10px',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {copiedKey === `${activeGuide.id}-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                          {copiedKey === `${activeGuide.id}-${idx}` ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <pre style={{
                        margin: 0,
                        padding: '14px',
                        background: '#ffffff',
                        border: '1px solid #dcd5c9',
                        borderBottomLeftRadius: '4px',
                        borderBottomRightRadius: '4px',
                        fontSize: '13px',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.6,
                        color: '#262626'
                      }}>
                        {sec.copyable}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div style={{ marginTop: '28px', borderTop: '1px solid #eee', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <Link 
                href="/services#order"
                className="b bg"
                style={{ fontSize: '12px', padding: '10px 20px', borderRadius: '3px' }}
              >
                Place an Order
              </Link>
              <button 
                onClick={() => setActiveGuide(null)}
                className="b"
                style={{ fontSize: '12px', padding: '10px 20px' }}
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Virtual Consultation Booking Modal */}
      {consultModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 10000
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '8px',
            maxWidth: '520px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setConsultModalOpen(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <X size={20} />
            </button>

            <span className="eb" style={{ color: '#1f6f68' }}>Complimentary Assistance</span>
            <h3 className="s" style={{ fontSize: '24px', color: '#262626', marginBottom: '8px', fontWeight: 600 }}>
              Book Virtual Consultation
            </h3>
            <p style={{ fontSize: '13.5px', color: '#666', marginBottom: '20px', lineHeight: 1.6 }}>
              Speak directly with a Lilies of the Field memorial designer via video call or phone. We will walk through sizes, formats, and proofing schedules.
            </p>

            {consultSuccess ? (
              <div style={{
                padding: '20px',
                background: '#f0f9f6',
                border: '1px solid #c2e5d9',
                borderRadius: '6px',
                color: '#14504b',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={32} color="#1f6f68" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '16px', marginBottom: '6px' }}>Consultation Request Received</h4>
                <p style={{ fontSize: '13.5px', margin: 0 }}>
                  A studio director will contact you promptly at the provided email and phone number to confirm your appointment time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700, color: '#444', marginBottom: '5px' }}>
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    required 
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #dcd5c9', borderRadius: '4px', fontSize: '13.5px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700, color: '#444', marginBottom: '5px' }}>
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required 
                      value={consultEmail}
                      onChange={(e) => setConsultEmail(e.target.value)}
                      placeholder="name@example.com"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #dcd5c9', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700, color: '#444', marginBottom: '5px' }}>
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required 
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      placeholder="(917) 300-1104"
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #dcd5c9', borderRadius: '4px', fontSize: '13.5px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700, color: '#444', marginBottom: '5px' }}>
                    Service Date or Special Questions
                  </label>
                  <textarea 
                    rows={3}
                    value={consultNotes}
                    onChange={(e) => setConsultNotes(e.target.value)}
                    placeholder="Share anticipated service dates, memorial format interests, or questions..."
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #dcd5c9', borderRadius: '4px', fontSize: '13.5px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginTop: '8px' }}>
                  <button 
                    type="submit" 
                    className="b b1"
                    style={{ width: '100%', padding: '12px', fontSize: '13px' }}
                  >
                    Confirm Consultation Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <a 
        href="mailto:orders@liliesofthefield.design" 
        style={{
          position: 'fixed',
          bottom: 'clamp(14px, 2vw, 24px)',
          right: 'clamp(14px, 2.5vw, 24px)',
          zIndex: 9999,
          background: '#1f6f68',
          color: '#ffffff',
          padding: 'clamp(10px, 1.5vw, 13px) clamp(16px, 2vw, 22px)',
          borderRadius: '50px',
          fontSize: 'clamp(11px, 1.2vw, 12.5px)',
          fontWeight: 700,
          letterSpacing: '.08em',
          textDecoration: 'none',
          textTransform: 'uppercase',
          boxShadow: '0 8px 24px rgba(31, 111, 104, 0.45)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
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
        <MessageSquare size={16} /> Message Our Team
      </a>
    </div>
  )
}
