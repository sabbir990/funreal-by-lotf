export interface GalleryCollection {
  id: string
  slug: string
  name: string
  description: string
  coverDesignNumber: string
  coverImage?: string
  accentColor?: string
}

export interface GalleryDesign {
  id: string
  designNumber: string
  title: string
  collectionId: string
  collectionName: string
  description: string
  theme: string
  coverImage: string
  insideSpreadImage?: string
  availableFormats: string[]
  popularAddOns: string[]
  tags?: string[]
  isFeatured?: boolean
}

export const GALLERY_COLLECTIONS: GalleryCollection[] = [
  {
    id: 'signature',
    slug: 'signature',
    name: 'Signature Collection',
    description: 'Our classic, most-loved program designs.',
    coverDesignNumber: '101',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    accentColor: '#1f6f68'
  },
  {
    id: 'prestige',
    slug: 'prestige',
    name: 'Prestige Collection',
    description: 'Elegant, premium-look designs.',
    coverDesignNumber: '201',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    accentColor: '#c9963b'
  },
  {
    id: 'religious',
    slug: 'religious',
    name: 'Religious',
    description: 'Faith-based designs and scripture themes.',
    coverDesignNumber: '301',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    accentColor: '#2b5876'
  },
  {
    id: 'hobbies-interests',
    slug: 'hobbies-interests',
    name: 'Hobbies & Interests',
    description: 'Designs that reflect a life and its passions.',
    coverDesignNumber: '401',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    accentColor: '#5c4d3c'
  },
  {
    id: 'youth',
    slug: 'youth',
    name: 'Youth',
    description: 'Designs for children and young lives.',
    coverDesignNumber: '501',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    accentColor: '#6b8299'
  },
  {
    id: 'floral',
    slug: 'floral',
    name: 'Floral',
    description: 'Garden and floral designs.',
    coverDesignNumber: '601',
    coverImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
    accentColor: '#7b5876'
  }
]

export const DEFAULT_FORMATS = [
  '4-page Bi-Fold',
  '6-page Tri-Fold',
  '8-page Booklet',
  'Trifold'
]

export const DEFAULT_ADDONS = [
  'Photo collage insert',
  'Digital program + QR code',
  'Prayer cards',
  'Bookmarks'
]

export const GALLERY_DESIGNS: GalleryDesign[] = [
  // Signature Collection
  {
    id: 'golden-sunrise',
    designNumber: '101',
    title: 'Golden Sunrise',
    collectionId: 'signature',
    collectionName: 'Signature Collection',
    description: 'A radiant morning dawn with soft golden accents and warm horizon hues symbolizing hope, remembrance, and the dawn of everlasting peace.',
    theme: 'Warm Sunrise & Golden Rays',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Sunrise', 'Golden', 'Hope', 'Classic'],
    isFeatured: true
  },
  {
    id: 'timeless-grace',
    designNumber: '102',
    title: 'Timeless Grace',
    collectionId: 'signature',
    collectionName: 'Signature Collection',
    description: 'Understated elegance featuring subtle parchment textures, delicate serif typesetting, and dignified charcoal border detailing.',
    theme: 'Subtle Parchment & Fine Line Art',
    coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Minimalist', 'Timeless', 'Dignified', 'Clean'],
    isFeatured: true
  },
  {
    id: 'serenity-blue',
    designNumber: '103',
    title: 'Serenity Blue',
    collectionId: 'signature',
    collectionName: 'Signature Collection',
    description: 'Peaceful sky tones layered with gentle cloud gradients and silver foil-effect accents for a deeply calming service tone.',
    theme: 'Azure Clouds & Silver Harmony',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Blue', 'Sky', 'Clouds', 'Peaceful']
  },

  // Prestige Collection
  {
    id: 'regal-onyx-gold',
    designNumber: '201',
    title: 'Regal Onyx & Gold',
    collectionId: 'prestige',
    collectionName: 'Prestige Collection',
    description: 'A striking luxury presentation with rich midnight black backdrop, gilded geometric flourishes, and regal gold leaf typography styling.',
    theme: 'Luxury Onyx & Burnished Gold',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Luxury', 'Onyx', 'Gold', 'Prestige'],
    isFeatured: true
  },
  {
    id: 'pearl-velvet',
    designNumber: '202',
    title: 'Embossed Pearl & Velvet',
    collectionId: 'prestige',
    collectionName: 'Prestige Collection',
    description: 'Creamy ivory pearlescent finish accented by warm champagne borders, debossed texture effect, and refined traditional hierarchy.',
    theme: 'Pearl Ivory & Champagne Gold',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Pearl', 'Ivory', 'Champagne', 'Aristocratic']
  },
  {
    id: 'imperial-burgundy',
    designNumber: '203',
    title: 'Imperial Burgundy',
    collectionId: 'prestige',
    collectionName: 'Prestige Collection',
    description: 'Deep royal crimson damask patterning framed with ornate gilded scrollwork, conveying lasting honor and dignified grandeur.',
    theme: 'Damask Scrollwork & Wine Velvet',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Burgundy', 'Crimson', 'Gold', 'Formal']
  },

  // Religious Collection
  {
    id: 'heavenly-ascent',
    designNumber: '301',
    title: 'Heavenly Ascent & Cross',
    collectionId: 'religious',
    collectionName: 'Religious',
    description: 'A sacred golden cross illuminated by radiant beams penetrating celestial clouds, created for Christian, Catholic, and faith services.',
    theme: 'Illuminated Cross & Celestial Sunbeams',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Faith', 'Cross', 'Scripture', 'Christian'],
    isFeatured: true
  },
  {
    id: 'psalm-23-shepherd',
    designNumber: '302',
    title: 'Psalm 23 Green Pastures',
    collectionId: 'religious',
    collectionName: 'Religious',
    description: 'Inspiring pastoral meadows and tranquil still waters inspired by the 23rd Psalm: “He leads me beside the still waters; He restores my soul.”',
    theme: 'Still Waters & Pastoral Valley',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Psalm 23', 'Nature', 'Still Waters', 'Faith']
  },
  {
    id: 'everlasting-light',
    designNumber: '303',
    title: 'Everlasting Light',
    collectionId: 'religious',
    collectionName: 'Religious',
    description: 'Warm altar candle glow surrounded by subtle olive branch flourishes, honoring the soul’s journey into God’s eternal presence.',
    theme: 'Altar Candle Glow & Olive Branch',
    coverImage: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Candle', 'Altar', 'Light', 'Spiritual']
  },

  // Hobbies & Interests Collection
  {
    id: 'master-musician',
    designNumber: '401',
    title: 'Master Musician & Melody',
    collectionId: 'hobbies-interests',
    collectionName: 'Hobbies & Interests',
    description: 'A harmonious tribute featuring vintage musical score notation, piano keys motif, and warm sepia tones for lovers of song and symphony.',
    theme: 'Musical Staff & Vintage Acoustic Soul',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Music', 'Piano', 'Melody', 'Artist'],
    isFeatured: true
  },
  {
    id: 'autumn-sportsman',
    designNumber: '402',
    title: 'Autumn Woods & Sportsman',
    collectionId: 'hobbies-interests',
    collectionName: 'Hobbies & Interests',
    description: 'Crisp mountain wilderness, evergreen pines, and warm cedar wood grain celebrating outdoorsmen, anglers, campers, and nature enthusiasts.',
    theme: 'Mountain Wilderness & Cedar Woodgrain',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Outdoors', 'Nature', 'Woodland', 'Fishing']
  },
  {
    id: 'ocean-mariner',
    designNumber: '403',
    title: 'Ocean Mariner & Lighthouse',
    collectionId: 'hobbies-interests',
    collectionName: 'Hobbies & Interests',
    description: 'A peaceful coastal seascape and guiding nautical beacon celebrating sailors, coastal souls, and veterans of the sea.',
    theme: 'Ocean Tide & Coastal Lighthouse',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Ocean', 'Nautical', 'Sea', 'Lighthouse']
  },

  // Youth Collection
  {
    id: 'sweet-butterfly-dreams',
    designNumber: '501',
    title: 'Sweet Butterfly Dreams',
    collectionId: 'youth',
    collectionName: 'Youth',
    description: 'Delicate pastel watercolor butterflies rising toward tender skies, capturing innocence, eternal gentleness, and everlasting young love.',
    theme: 'Pastel Watercolor & Flying Butterflies',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Youth', 'Butterflies', 'Pastel', 'Gentle'],
    isFeatured: true
  },
  {
    id: 'starlight-reverie',
    designNumber: '502',
    title: 'Starlight Reverie & Teddy',
    collectionId: 'youth',
    collectionName: 'Youth',
    description: 'Soft celestial nursery clouds, shimmering silver stars, and gentle moonlit glow created to wrap young departures in warmth and grace.',
    theme: 'Silver Constellations & Fluffy Clouds',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Youth', 'Stars', 'Clouds', 'Angel']
  },

  // Floral Collection
  {
    id: 'white-lilies-sanctuary',
    designNumber: '601',
    title: 'White Lilies & Botanical Greens',
    collectionId: 'floral',
    collectionName: 'Floral',
    description: 'The signature namesake of Lilies of the Field: fresh white oriental lilies, eucalyptus leaves, and crisp botanical line art.',
    theme: 'Pure White Lilies & Silver Eucalyptus',
    coverImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Lilies', 'White', 'Botanical', 'Floral'],
    isFeatured: true
  },
  {
    id: 'blush-garden-roses',
    designNumber: '602',
    title: 'Soft Blush Garden Roses',
    collectionId: 'floral',
    collectionName: 'Floral',
    description: 'Romantic vintage dusty roses interwoven with soft olive sprigs and creamy antique lace texture, honoring a life filled with loving warmth.',
    theme: 'Blush Roses & Antique Cream Border',
    coverImage: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Roses', 'Blush', 'Garden', 'Feminine']
  },
  {
    id: 'magnolia-serenade',
    designNumber: '603',
    title: 'Magnolia Blossom Serenade',
    collectionId: 'floral',
    collectionName: 'Floral',
    description: 'Stately Southern magnolias and glossy emerald foliage framing classic serif typography with dignified natural poise.',
    theme: 'Southern Magnolia & Emerald Foliage',
    coverImage: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    availableFormats: ['4-page', '6-page', '8-page booklet', 'Trifold'],
    popularAddOns: ['Photo collage insert', 'Digital program + QR code', 'Prayer cards', 'Bookmarks'],
    tags: ['Magnolia', 'Botanical', 'Southern', 'Graceful']
  }
]

export function getCollections(): GalleryCollection[] {
  return GALLERY_COLLECTIONS
}

export function getCollectionBySlug(slug: string): GalleryCollection | undefined {
  return GALLERY_COLLECTIONS.find(c => c.slug === slug || c.id === slug)
}

export function getAllDesigns(): GalleryDesign[] {
  return GALLERY_DESIGNS
}

export function getDesignsByCollection(collectionId: string): GalleryDesign[] {
  if (collectionId === 'all') return GALLERY_DESIGNS
  return GALLERY_DESIGNS.filter(d => d.collectionId === collectionId)
}

export function getDesignById(id: string): GalleryDesign | undefined {
  return GALLERY_DESIGNS.find(d => d.id === id || d.designNumber === id)
}

