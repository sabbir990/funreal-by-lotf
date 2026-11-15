'use client'

import { useState, useEffect, use, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  MessageSquare, 
  QrCode, 
  BookOpen, 
  Share2, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  X,
  Send,
  Heart,
  Sparkles,
  Camera,
  CheckCircle2
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { 
  MEMORIAL_DATABASE, 
  DEFAULT_TRIBUTES, 
  MemorialDetail, 
  Tribute 
} from '@/data/memorialsData'
import DigitalProgramFlipViewer from '@/components/DigitalProgramFlipViewer'

function MemorialContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const memorialId = resolvedParams.id

  const [memorial, setMemorial] = useState<MemorialDetail>(
    MEMORIAL_DATABASE[memorialId] || MEMORIAL_DATABASE['robert-james-miller']
  )
  const [tributes, setTributes] = useState<Tribute[]>(
    DEFAULT_TRIBUTES[memorialId] || DEFAULT_TRIBUTES['robert-james-miller']
  )
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [programModalOpen, setProgramModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Dynamic gender-based pronouns as requested by client (His/Her/Their Story)
  const pronounStory = memorial.gender === 'male' ? 'His Story' : memorial.gender === 'female' ? 'Her Story' : 'Their Story'
  const pronounCelebrating = memorial.gender === 'male' ? 'Celebrating His Life' : memorial.gender === 'female' ? 'Celebrating Her Life' : 'Celebrating Their Life'

  // Tribute Form State
  const [authorName, setAuthorName] = useState('')
  const [relationship, setRelationship] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  // Query Supabase for dynamic memorial details & tributes if connected
  useEffect(() => {
    async function loadMemorialAndTributes() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      const isConfigured = 
        supabaseUrl.startsWith('https://') &&
        !supabaseUrl.includes('placeholder-project') &&
        !supabaseUrl.includes('your-project-id') &&
        Boolean(supabaseAnonKey)

      if (MEMORIAL_DATABASE[memorialId]) {
        setMemorial(MEMORIAL_DATABASE[memorialId])
      }

      if (isConfigured) {
        try {
          const supabase = createClient()
          
          // Check memorial from DB if not predefined
          if (!MEMORIAL_DATABASE[memorialId]) {
            const { data, error } = await supabase
              .from('memorials')
              .select('*')
              .eq('id', memorialId)
              .single()

            if (!error && data) {
              setMemorial({
                id: data.id,
                full_name: data.full_name,
                gender: 'neutral',
                product_type: 'legacy-tribute',
                date_of_birth: data.date_of_birth,
                date_of_passing: data.date_of_passing,
                lifespan: `${new Date(data.date_of_birth).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })} — ${new Date(data.date_of_passing).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}`,
                quote: data.biography || '“A life beautifully lived and forever cherished in our hearts.”',
                story: data.obituary_text || data.biography || 'A life filled with loving grace, family devotion, and enduring cherished memories.',
                service_date: data.service_date ? new Date(data.service_date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Private Family Gathering',
                service_location: data.service_venue || 'Sanctuary Memorial Chapel, Queens Village, NY',
                service_time: data.service_date ? new Date(data.service_date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }) : '11:00 AM ET',
                officiant: 'Family Appointed Clergy',
                cover_image_url: data.cover_image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=800&h=650&q=80',
                photos: [
                  {
                    url: data.cover_image_url || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&h=600&q=80',
                    caption: `${data.full_name} remembrance photo 1`
                  },
                  {
                    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&h=600&q=80',
                    caption: `${data.full_name} remembrance photo 2`
                  }
                ],
                program: MEMORIAL_DATABASE['eleanor-grace-dawson'].program
              })
            }
          }

          // Fetch stored tributes for this memorial
          const { data: dbTributes, error: tributesError } = await supabase
            .from('tributes')
            .select('*')
            .eq('memorial_id', memorialId)
            .order('created_at', { ascending: false })

          if (!tributesError && dbTributes && dbTributes.length > 0) {
            setTributes(dbTributes.map(t => ({
              id: t.id,
              author_name: t.author_name,
              relationship: t.relationship || '',
              message: t.message,
              created_at: new Date(t.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
            })))
          }
        } catch {
          // Keep default fallback
        }
      }
    }

    loadMemorialAndTributes()
  }, [memorialId])

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Handle posting a new tribute
  const handlePostTribute = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorName.trim()) {
      setFormError('Please enter your name.')
      return
    }
    if (!message.trim()) {
      setFormError('Please enter your memory or condolence message.')
      return
    }

    setIsSubmitting(true)
    setFormError('')

    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    const newTribute: Tribute = {
      id: `local-${Date.now()}`,
      author_name: authorName.trim(),
      relationship: relationship.trim() || undefined,
      message: message.trim(),
      created_at: formattedDate
    }

    // Attempt Supabase insert if credentials are valid
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      const isConfigured = 
        supabaseUrl.startsWith('https://') &&
        !supabaseUrl.includes('placeholder-project') &&
        !supabaseUrl.includes('your-project-id') &&
        Boolean(supabaseAnonKey)

      if (isConfigured) {
        const supabase = createClient()
        await supabase.from('tributes').insert({
          memorial_id: memorial.id,
          author_name: authorName.trim(),
          relationship: relationship.trim() || null,
          message: message.trim(),
          candle_lit: true
        })
      }
    } catch (err) {
      console.warn('Note: Storing tribute locally in current session.', err)
    }

    // Immediately update UI with new tribute at the top
    setTributes(prev => [newTribute, ...prev])
    setAuthorName('')
    setRelationship('')
    setMessage('')
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 6000)
  }

  return (
    <div style={{ width: '100%', background: '#ffffff', minHeight: 'calc(100vh - 200px)' }}>
      {/* 1. Header & Memorial Tribute Header */}
      <section style={{ textAlign: 'center', paddingTop: '36px', paddingBottom: '44px', width: '100%' }}>
        <div className="site-container">
          {/* Back link */}
          <div style={{ marginBottom: '18px' }}>
            <Link 
              href="/memorials" 
              style={{
                fontSize: '11px',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: '#1f6f68',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={13} /> Back to Forever Remembered
            </Link>
          </div>

          {/* Circular Portrait with Gold Border */}
          <div style={{
            width: '148px',
            height: '148px',
            borderRadius: '50%',
            border: '4px solid #c9963b',
            background: '#ffffff',
            margin: '18px auto 20px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(201,150,59,0.22)'
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={memorial.cover_image_url} 
              alt={memorial.full_name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center'
              }}
            />
          </div>

          <p className="eb" style={{ fontSize: '11px', letterSpacing: '.14em', color: '#1f6f68', marginBottom: '8px' }}>
            In Loving Memory &amp; Celebration
          </p>

          <h1 className="s" style={{ fontSize: 'clamp(32px, 4vw, 44px)', color: '#262626', marginBottom: '8px', fontWeight: 600 }}>
            {memorial.full_name}
          </h1>

          <p style={{
            color: '#a87a22',
            fontFamily: 'var(--font-serif)',
            fontSize: '16.5px',
            margin: '6px 0 22px'
          }}>
            {memorial.lifespan}
          </p>

          {/* Quote Ribbon */}
          <div className="cr" style={{
            display: 'inline-block',
            padding: '14px 30px',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '15px',
            color: '#555',
            borderRadius: '4px',
            maxWidth: '680px',
            lineHeight: 1.6
          }}>
            {memorial.quote}
          </div>

          {/* Action Buttons */}
          <div style={{
            marginTop: '26px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => setProgramModalOpen(true)}
              className="b b1"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', padding: '11px 22px' }}
            >
              <BookOpen size={15} /> View Memorial Program
            </button>
            <button 
              onClick={() => setQrModalOpen(true)}
              className="b"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', padding: '11px 22px' }}
            >
              <QrCode size={15} /> Scan &amp; Share QR
            </button>
            <Link
              href={`/digital-program/${memorial.id}`}
              className="b"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                padding: '11px 22px',
                background: '#faf8f4',
                color: '#1f6f68',
                fontWeight: 600
              }}
            >
              Digital Program Page ↗
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Detailed Memorial Story, Memories, Service & Words of Remembrance */}
      <section style={{
        background: '#faf8f4',
        paddingTop: '44px',
        paddingBottom: '64px',
        width: '100%',
        borderTop: '1px solid #eee'
      }}>
        <div className="site-container">
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>

            {/* A. His / Her / Their Story Card */}
            <div className="cd cb" style={{ padding: 'clamp(20px, 3.5vw, 36px)', background: '#ffffff', borderRadius: '6px', border: '1px solid #ece6db' }}>
              <h2 className="s" style={{ fontSize: 'clamp(20px, 2.5vw, 23px)', marginBottom: '14px', color: '#262626', fontWeight: 600 }}>
                {pronounStory}
              </h2>
              <p style={{
                fontSize: 'clamp(14px, 1.5vw, 15px)',
                lineHeight: 1.8,
                color: '#3d3d3d',
                margin: 0
              }}>
                {memorial.story}
              </p>
            </div>

            {/* B. Celebrating His / Her / Their Life (Photo Memories) */}
            <div className="cd cb" style={{ padding: 'clamp(20px, 3.5vw, 36px)', background: '#ffffff', borderRadius: '6px', border: '1px solid #ece6db' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 className="s" style={{ fontSize: 'clamp(20px, 2.5vw, 23px)', color: '#262626', fontWeight: 600, margin: 0 }}>
                  {pronounCelebrating}
                </h2>
                <span style={{
                  fontSize: '12px',
                  color: '#777',
                  fontFamily: 'var(--font-sans)',
                  background: '#faf8f4',
                  border: '1px solid #e8dfd2',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>
                  {memorial.photos?.length || 2} Pieces of Memory
                </span>
              </div>

              {/* 2 Remembrance Photos Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(16px, 2.5vw, 24px)'
              }}>
                {memorial.photos && memorial.photos.map((photo, idx) => (
                  <div 
                    key={idx}
                    style={{
                      border: '1px solid #ede7dc',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      background: '#faf8f4',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <div style={{ height: 'clamp(220px, 32vw, 320px)', width: '100%', overflow: 'hidden', background: '#eee' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={photo.url} 
                        alt={photo.caption}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>
                    <div style={{ padding: '12px 14px', textAlign: 'center', borderTop: '1px solid #ede7dc' }}>
                      <p style={{
                        fontSize: '12.5px',
                        color: '#666',
                        fontStyle: 'italic',
                        margin: 0,
                        fontFamily: 'var(--font-serif)'
                      }}>
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* C. Service Details Card */}
            <div className="cd cb" style={{ padding: 'clamp(20px, 3.5vw, 36px)', background: '#ffffff', borderRadius: '6px', border: '1px solid #ece6db' }}>
              <h2 className="s" style={{ fontSize: 'clamp(20px, 2.5vw, 23px)', marginBottom: '20px', color: '#262626', fontWeight: 600 }}>
                Service Details
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '20px 24px',
                fontSize: '13.5px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#262626', marginBottom: '4px' }}>
                    <Calendar size={15} color="#1f6f68" /> Service Date
                  </div>
                  <span style={{ color: '#555' }}>{memorial.service_date}</span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#262626', marginBottom: '4px' }}>
                    <MapPin size={15} color="#1f6f68" /> Location
                  </div>
                  <span style={{ color: '#555' }}>{memorial.service_location}</span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#262626', marginBottom: '4px' }}>
                    <Clock size={15} color="#1f6f68" /> Time
                  </div>
                  <span style={{ color: '#555' }}>{memorial.service_time}</span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#262626', marginBottom: '4px' }}>
                    <User size={15} color="#1f6f68" /> Officiant
                  </div>
                  <span style={{ color: '#555' }}>{memorial.officiant}</span>
                </div>
              </div>
            </div>

            {/* D. Words of Remembrance (Words of Embrace / Guestbook tributes) */}
            <div id="words-of-remembrance" style={{ scrollMarginTop: '80px' }}>
              {/* Section Header */}
              <div style={{ marginBottom: '18px' }}>
                <h2 className="s" style={{ fontSize: '26px', color: '#262626', fontWeight: 600, marginBottom: '6px' }}>
                  Words of Remembrance
                </h2>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  Share a memory, express condolence, or celebrate their life with the family.
                </p>
              </div>

              {/* Tribute Submission Form Card */}
              <div className="cd cb" style={{
                padding: 'clamp(20px, 3.5vw, 34px)',
                background: '#ffffff',
                borderRadius: '6px',
                border: '1px solid #ece6db',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
              }}>
                <h3 className="s" style={{ fontSize: 'clamp(18px, 2vw, 20px)', color: '#262626', marginBottom: '18px', fontWeight: 600 }}>
                  Leave a Tribute Message
                </h3>

                {formError && (
                  <div style={{
                    padding: '10px 14px',
                    background: '#fff2f2',
                    border: '1px solid #ffd1d1',
                    borderRadius: '4px',
                    color: '#c53030',
                    fontSize: '13px',
                    marginBottom: '16px'
                  }}>
                    {formError}
                  </div>
                )}

                {submitSuccess && (
                  <div style={{
                    padding: '12px 16px',
                    background: '#f0f9f6',
                    border: '1px solid #c2e5d9',
                    borderRadius: '4px',
                    color: '#14504b',
                    fontSize: '13.5px',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CheckCircle2 size={17} color="#1f6f68" />
                    <span>Your words of embrace and remembrance have been lovingly shared with the family.</span>
                  </div>
                )}

                <form onSubmit={handlePostTribute}>
                  {/* Two Column Row: Name & Relationship */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '11px',
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: '#444',
                        marginBottom: '6px'
                      }}>
                        Your Name *
                      </label>
                      <input 
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Sandra Washington"
                        required
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          border: '1px solid #dcd5c9',
                          borderRadius: '4px',
                          fontSize: '13.5px',
                          color: '#262626',
                          background: '#faf8f4',
                          outline: 'none',
                          transition: 'border 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1f6f68'}
                        onBlur={(e) => e.target.style.borderColor = '#dcd5c9'}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '11px',
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: '#444',
                        marginBottom: '6px'
                      }}>
                        Relationship to Loved One
                      </label>
                      <input 
                        type="text"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        placeholder="e.g. Head, Colleague, Friend, Neighbor"
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          border: '1px solid #dcd5c9',
                          borderRadius: '4px',
                          fontSize: '13.5px',
                          color: '#262626',
                          background: '#faf8f4',
                          outline: 'none',
                          transition: 'border 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1f6f68'}
                        onBlur={(e) => e.target.style.borderColor = '#dcd5c9'}
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '11px',
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      color: '#444',
                      marginBottom: '6px'
                    }}>
                      Your Memory or Message *
                    </label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share a fond memory, scripture, or comforting reflection..."
                      required
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1px solid #dcd5c9',
                        borderRadius: '4px',
                        fontSize: '13.5px',
                        color: '#262626',
                        background: '#faf8f4',
                        outline: 'none',
                        resize: 'vertical',
                        lineHeight: 1.6,
                        fontFamily: 'inherit',
                        transition: 'border 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1f6f68'}
                      onBlur={(e) => e.target.style.borderColor = '#dcd5c9'}
                    />
                  </div>

                  {/* Post Tribute Button */}
                  <div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="b b1"
                      style={{
                        padding: '11px 24px',
                        fontSize: '12px',
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1
                      }}
                    >
                      <Send size={14} />
                      {isSubmitting ? 'Posting...' : 'Post Tribute'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Tributes Stream / Published Words of Embrace */}
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {tributes.map((tribute) => (
                  <div 
                    key={tribute.id}
                    className="cd cb"
                    style={{
                      padding: '24px 28px',
                      background: '#ffffff',
                      borderRadius: '6px',
                      border: '1px solid #ede7dc'
                    }}
                  >
                    {/* Header Row: Author & Relationship on Left, Date on Right */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '12px',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, color: '#262626', fontSize: '14.5px' }}>
                          {tribute.author_name}
                        </span>
                        {tribute.relationship && (
                          <span style={{ color: '#777', fontSize: '13px' }}>
                            ({tribute.relationship})
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '12.5px', color: '#888' }}>
                        {tribute.created_at}
                      </span>
                    </div>

                    {/* Tribute Text with Italic / Quote styling */}
                    <p style={{
                      margin: 0,
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '14.5px',
                      lineHeight: 1.7,
                      color: '#444'
                    }}>
                      “{tribute.message}”
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Footnotes */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: '#1f6f68',
              fontSize: '14.5px',
              marginBottom: '6px'
            }}>
              Preserved with care by Lilies of the Field Memorial Keepsakes
            </p>
            <p className="tx" style={{ fontSize: '12px', color: '#666', margin: 0 }}>
              To create a lasting Legacy Tribute or order memorial keepsakes, contact us at (917) 300-1104 or orders@liliesofthefield.design
            </p>
          </div>
        </div>
      </section>

      {/* 3. Scan & Share QR Modal */}
      {qrModalOpen && (
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
            maxWidth: '440px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
            textAlign: 'center'
          }}>
            <button 
              onClick={() => setQrModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <X size={20} />
            </button>

            <h3 className="s" style={{ fontSize: '22px', marginBottom: '6px', color: '#262626' }}>
              Digital Tribute QR Code
            </h3>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
              Scan with any mobile camera to view {memorial.full_name}&apos;s commemorative digital program.
            </p>

            <div style={{
              padding: '20px',
              border: '2px solid #e0d5c2',
              borderRadius: '8px',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              background: '#faf8f4',
              marginBottom: '20px'
            }}>
              <QrCode size={160} color="#1f6f68" />
              <span style={{ fontSize: '11px', letterSpacing: '.1em', color: '#1f6f68', fontWeight: 700, textTransform: 'uppercase' }}>
                LILIES OF THE FIELD KEEPSAKE
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={copyShareLink}
                className="b b1"
                style={{ fontSize: '12.5px', padding: '10px 18px', gap: '6px' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Link Copied!' : 'Copy Direct Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Digital Memorial Program Flip Viewer Modal (Overlay on Tribute Page) */}
      {programModalOpen && (
        <DigitalProgramFlipViewer 
          memorial={memorial} 
          isOverlay={true} 
          onClose={() => setProgramModalOpen(false)} 
        />
      )}

      {/* 5. Floating Action Buttons on the Right */}
      {/* Floating purple Message Studio button matching screenshot */}
      <div 
        style={{
          position: 'fixed',
          right: 'clamp(14px, 2.5vw, 24px)',
          bottom: 'clamp(76px, 11vh, 88px)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <a 
          href="#words-of-remembrance"
          title="Words of Remembrance"
          style={{
            background: '#7c3aed',
            color: '#ffffff',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(124, 58, 237, 0.4)',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.55)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(124, 58, 237, 0.4)'
          }}
        >
          <MessageSquare size={18} />
        </a>
      </div>

      {/* Pinned Bottom-Right "Message Our Team" Floating Action Button */}
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
        <MessageSquare size={15} /> Message Our Team
      </a>
    </div>
  )
}

export default function MemorialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '120px 20px', color: '#666' }}>
        <p className="s" style={{ fontSize: '24px', color: '#262626', marginBottom: '8px' }}>Lilies of the Field</p>
        <p style={{ fontSize: '14px' }}>Loading commemorative tribute...</p>
      </div>
    }>
      <MemorialContent params={params} />
    </Suspense>
  )
}
