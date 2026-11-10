'use client'

import ComingSoon from '@/components/ComingSoon'

export default function ServicesPage() {
  return (
    <ComingSoon 
      badge="Our Full Collection &amp; Ordering"
      title="Bespoke Keepsakes &amp; Services"
      subtitle="Online Ordering &amp; Interactive Catalog Launching Soon"
      description="We are currently completing our full online ordering suite and interactive product catalog. In the meantime, our Brooklyn design studio is actively designing and printing custom memorial programs, prayer cards, and tribute keepsakes every day."
      backHref="/"
      backLabel="Return to Home"
      primaryAction={{
        href: '/resources',
        label: 'View Planning Guides'
      }}
    />
  )
}
