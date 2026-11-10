'use client'

import ComingSoon from '@/components/ComingSoon'

export default function LoginPage() {
  return (
    <ComingSoon 
      badge="Funeral Service Providers &amp; Families"
      title="Provider Portal &amp; Proof Vault"
      subtitle="Dedicated Partner Platform Launching Soon"
      description="Our specialized portal for licensed funeral directors, church administrators, and family proof review vaults is currently in development. For expedited rush orders, file uploads, or proof status, please reach out to our team directly."
      backHref="/"
      backLabel="Return to Home"
      primaryAction={{
        href: '/resources#consultation',
        label: 'Book Virtual Consultation'
      }}
    />
  )
}
