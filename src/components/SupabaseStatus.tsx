'use client'

import { useState } from 'react'
import { Database, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'

export default function SupabaseStatus() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const isConfigured = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder-project')

  const copySqlPath = () => {
    navigator.clipboard.writeText('supabase/schema.sql')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      width: '100%',
      background: isConfigured 
        ? 'rgba(16, 185, 129, 0.08)' 
        : 'rgba(201, 168, 106, 0.12)',
      borderBottom: `1px solid ${isConfigured ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-gold)'}`,
      padding: '0.65rem 1.5rem',
      fontSize: '0.85rem',
      color: 'var(--text-primary)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Database size={16} color={isConfigured ? 'var(--accent-emerald)' : 'var(--accent-gold)'} />
          {isConfigured ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6ee7b7' }}>
              <CheckCircle2 size={15} /> Supabase Live Connection Active
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-gold)' }}>
              <AlertCircle size={15} /> Supabase Ready for Keys: Using elegant fallback demo records
            </span>
          )}
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-sans)',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            transition: 'var(--transition)'
          }}
        >
          {isOpen ? 'Hide Quickstart' : 'How to connect your Supabase'}
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {isOpen && (
        <div className="container" style={{
          marginTop: '0.85rem',
          paddingTop: '0.85rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
              1. Add Credentials in .env.local
            </strong>
            <p>Paste your Project URL & Anon Key into <code>.env.local</code> in this project folder.</p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
              2. Run the SQL Schema
            </strong>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Copy file: <code>supabase/schema.sql</code></span>
              <button 
                onClick={copySqlPath}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  padding: '0.2rem 0.4rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                {copied ? <Check size={12} color="var(--accent-emerald)" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p style={{ marginTop: '0.25rem' }}>Execute in Supabase SQL Editor to generate tables & RLS security policies.</p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '6px' }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
              3. Client & SSR Ready
            </strong>
            <p>Pre-configured in <code>@/lib/supabase/client.ts</code> and <code>@/lib/supabase/server.ts</code> with Next.js 16 App Router.</p>
          </div>
        </div>
      )}
    </div>
  )
}
