'use client'

import ComingSoon from '@/components/ComingSoon'

export default function CreateMemorialPage() {
  return (
    <ComingSoon 
      badge="Forever Remembered Registry"
      title="Self-Guided Memorial Creator"
      subtitle="Online Builder In Development"
      description="Self-guided digital memorial creation is coming soon. Currently, commemorative digital memorials with interactive tribute pages, photo galleries, and QR code integration are created by our studio team with every keepsake program order."
      backHref="/memorials"
      backLabel="Back to Forever Remembered"
      primaryAction={{
        href: '/memorials',
        label: 'View Forever Remembered'
      }}
    />
  )
}
