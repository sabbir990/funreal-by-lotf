export interface GalleryCollection {
  id: string
  slug: string
  name: string
  description: string
  themes: string
  coverDesignNumber?: string
  coverImage?: string
  accentColor?: string
  isPrimary?: boolean
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

export const DEFAULT_FORMATS = [
  '4-Page',
  '6-Page',
  '8-Page Booklet',
  'Trifold'
]

export const DEFAULT_SIZES = [
  'Standard',
  'Large / Premium'
]

export const DEFAULT_QUANTITIES = [
  '50',
  '75',
  '100',
  '150',
  '200',
  '250',
  '250+'
]

export const DEFAULT_ADDONS = [
  'Photo Collage Insert',
  'Digital Program + QR Code',
  'Additional Pages'
]

export const GALLERY_COLLECTIONS: GalleryCollection[] = [
  {
    id: 'classic-timeless',
    slug: 'classic-timeless',
    name: 'Classic & Timeless',
    description: 'Traditional layouts, sophisticated borders, elegant typography, and neutral colors honoring a life of enduring grace.',
    themes: 'Traditional layouts, sophisticated borders, elegant typography, neutral colors',
    coverDesignNumber: '101',
    coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    accentColor: '#1f6f68',
    isPrimary: true
  },
  {
    id: 'prestige-luxury',
    slug: 'prestige-luxury',
    name: 'Prestige & Luxury',
    description: 'Gold, silver, marble, pearls, black and gold, royal purple, and regal designs for an elevated presentation.',
    themes: 'Gold, silver, marble, pearls, black and gold, royal purple, regal designs',
    coverDesignNumber: '201',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    accentColor: '#c9963b',
    isPrimary: true
  },
  {
    id: 'inspirational-spiritual',
    slug: 'inspirational-spiritual',
    name: 'Inspirational & Spiritual',
    description: 'Heavenly skies, angel wings, gates of heaven, stairways, doves, light, inspirational quotes, and faith traditions.',
    themes: 'Heavenly skies, angel wings, gates of heaven, stairways, doves, light, inspirational quotes and faith traditions',
    coverDesignNumber: '301',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    accentColor: '#2b5876',
    isPrimary: true
  },
  {
    id: 'floral-botanical',
    slug: 'floral-botanical',
    name: 'Floral & Botanical',
    description: 'Roses, lilies, sunflowers, orchids, cherry blossoms, tropical flowers, and lush garden arrangements.',
    themes: 'Roses, lilies, sunflowers, orchids, cherry blossoms, tropical flowers, garden arrangements',
    coverDesignNumber: '401',
    coverImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
    accentColor: '#7b5876',
    isPrimary: true
  },
  {
    id: 'nature-scenic',
    slug: 'nature-scenic',
    name: 'Nature & Scenic',
    description: 'Mountains, waterfalls, sunsets, forests, meadows, rivers, lakes, and breathtaking autumn landscapes.',
    themes: 'Mountains, waterfalls, sunsets, forests, meadows, rivers, lakes, autumn landscapes',
    coverDesignNumber: '501',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    accentColor: '#2e6f40',
    isPrimary: true
  },
  {
    id: 'butterflies-birds',
    slug: 'butterflies-birds',
    name: 'Butterflies & Birds',
    description: 'Monarch butterflies, hummingbirds, cardinals, white doves, and graceful birds in peaceful flight.',
    themes: 'Monarch butterflies, hummingbirds, cardinals, white doves, birds in flight',
    coverDesignNumber: '601',
    coverImage: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#3d7b80',
    isPrimary: true
  },
  {
    id: 'sports-athletics',
    slug: 'sports-athletics',
    name: 'Sports & Athletics',
    description: 'Basketball, football, baseball, soccer, tennis, golf, boxing, swimming, track, and bowling tributes.',
    themes: 'Basketball, football, baseball, soccer, tennis, golf, boxing, swimming, track, bowling',
    coverDesignNumber: '701',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    accentColor: '#c44536'
  },
  {
    id: 'military-veterans',
    slug: 'military-veterans',
    name: 'Military & Veterans',
    description: 'Army, Navy, Air Force, Marines, Coast Guard, Space Force, and patriotic tributes honoring service to nation.',
    themes: 'Army, Navy, Air Force, Marines, Coast Guard, Space Force, patriotic tributes',
    coverDesignNumber: '801',
    coverImage: 'https://images.unsplash.com/photo-1579975097566-b251bc5d918c?auto=format&fit=crop&w=800&q=80',
    accentColor: '#1d3557'
  },
  {
    id: 'first-responders',
    slug: 'first-responders',
    name: 'First Responders & Public Service',
    description: 'Dedicated memorials for NYPD, FDNY, EMS, corrections, 911 dispatchers, and emergency personnel.',
    themes: 'NYPD, FDNY, EMS, corrections, dispatchers, emergency personnel',
    coverDesignNumber: '802',
    coverImage: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    accentColor: '#9b2226'
  },
  {
    id: 'nyc-places',
    slug: 'nyc-places',
    name: 'NYC Places of Interest',
    description: 'NYC skyline, Brooklyn Bridge, Manhattan, Queens, Bronx, Harlem, Staten Island, and subway-inspired designs.',
    themes: 'NYC skyline, Brooklyn Bridge, Manhattan, Queens, Bronx, Harlem, Staten Island, subway-inspired designs',
    coverDesignNumber: '901',
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    accentColor: '#2b2d42'
  },
  {
    id: 'hobbies-interests',
    slug: 'hobbies-interests',
    name: 'Hobbies & Interests',
    description: 'Fishing, gardening, cooking, sewing, crafting, reading, chess, photography, and dancing.',
    themes: 'Fishing, gardening, cooking, sewing, crafting, reading, chess, photography, dancing',
    coverDesignNumber: '1001',
    coverImage: 'https://images.unsplash.com/photo-1522881177606-43d25624957b?auto=format&fit=crop&w=800&q=80',
    accentColor: '#5c4d3c'
  },
  {
    id: 'music-entertainment',
    slug: 'music-entertainment',
    name: 'Music & Entertainment',
    description: 'Gospel, jazz, R&B, hip-hop, instruments, microphones, vinyl records, theater, and entertainment.',
    themes: 'Gospel, jazz, R&B, hip-hop, instruments, microphones, vinyl records, theater, entertainment',
    coverDesignNumber: '1101',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    accentColor: '#7209b7'
  },
  {
    id: 'children-youth',
    slug: 'children-youth',
    name: 'Children & Youth',
    description: 'Soft clouds, stars, rainbows, teddy bears, butterflies, and age-appropriate personalized themes.',
    themes: 'Soft clouds, stars, rainbows, teddy bears, butterflies, age-appropriate personalized themes',
    coverDesignNumber: '1201',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    accentColor: '#6b8299'
  },
  {
    id: 'cultural-heritage',
    slug: 'cultural-heritage',
    name: 'Cultural & Heritage',
    description: 'African heritage, Caribbean culture, Latin American heritage, cultural patterns, and family traditions.',
    themes: 'African heritage, Caribbean culture, Latin American heritage, cultural patterns, family traditions',
    coverDesignNumber: '1301',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8f4f1d'
  },
  {
    id: 'modern-minimalist',
    slug: 'modern-minimalist',
    name: 'Modern & Minimalist',
    description: 'Clean typography, contemporary layouts, black and white, monochrome, and simple geometric accents.',
    themes: 'Clean typography, contemporary layouts, black and white, monochrome, simple geometric accents',
    coverDesignNumber: '1401',
    coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    accentColor: '#2b2b2b'
  },
  {
    id: 'vintage-retro',
    slug: 'vintage-retro',
    name: 'Vintage & Retro',
    description: 'Antique gold, nostalgic photographs, vintage florals, old-fashioned typography, and sepia backgrounds.',
    themes: 'Antique gold, nostalgic photographs, vintage florals, old-fashioned typography, sepia backgrounds',
    coverDesignNumber: '1501',
    coverImage: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8a6240'
  },
  {
    id: 'royalty-regal',
    slug: 'royalty-regal',
    name: 'Royalty & Regal',
    description: 'Crowns, pearls, gold and diamond accents, fashion, and regal glamour.',
    themes: 'Crowns, pearls, gold and diamond accents, fashion & glamour',
    coverDesignNumber: '1601',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    accentColor: '#581845'
  },
  {
    id: 'automotive-transportation',
    slug: 'automotive-transportation',
    name: 'Automotive & Transportation',
    description: 'Classic cars, motorcycles, trucks, trains, aviation, and automobile enthusiasts.',
    themes: 'Classic cars, motorcycles, trucks, trains, aviation, automobile enthusiasts',
    coverDesignNumber: '1701',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    accentColor: '#344e41'
  },
  {
    id: 'travel-destinations',
    slug: 'travel-destinations',
    name: 'Travel & Destinations',
    description: 'Maps, passports, world landmarks, favorite cities, and vacation destinations.',
    themes: 'Maps, passports, world landmarks, favorite cities, vacation destinations',
    coverDesignNumber: '1801',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    accentColor: '#2a9d8f'
  },
  {
    id: 'careers-professions',
    slug: 'careers-professions',
    name: 'Careers & Professions',
    description: 'Teachers, nurses, doctors, chefs, barbers, entrepreneurs, clergy, and educators.',
    themes: 'Teachers, nurses, doctors, chefs, barbers, entrepreneurs, clergy, educators',
    coverDesignNumber: '1901',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    accentColor: '#1d3557'
  },
  {
    id: 'fraternal-community',
    slug: 'fraternal-community',
    name: 'Fraternal & Community Organizations',
    description: 'Masonic-inspired themes, Eastern Star, Greek-letter organizations, civic groups, and community service.',
    themes: 'Masonic-inspired themes, Eastern Star, Greek-letter organizations, civic groups, community service',
    coverDesignNumber: '2001',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    accentColor: '#1a365d'
  },
  {
    id: 'patriotic',
    slug: 'patriotic',
    name: 'Patriotic',
    description: 'Flags, national themes, and pride in service to country.',
    themes: 'Flags, national themes and pride, service to country',
    coverDesignNumber: '2101',
    coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#b7094c'
  },
  {
    id: 'seasonal-holiday',
    slug: 'seasonal-holiday',
    name: 'Seasonal & Holiday Inspired',
    description: 'Spring blossoms, summer landscapes, autumn foliage, winter snowflakes, and Christmas-inspired elements.',
    themes: 'Spring blossoms, summer landscapes, autumn foliage, winter snowflakes, Christmas-inspired elements',
    coverDesignNumber: '2201',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    accentColor: '#bc6c25'
  },
  {
    id: 'custom-personalized',
    slug: 'custom-personalized',
    name: 'Custom & Personalized',
    description: 'Photo collages, custom backgrounds, meaningful locations, and completely unique themes.',
    themes: 'Photo collages, custom backgrounds, meaningful locations, unique themes',
    coverDesignNumber: '2301',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    accentColor: '#1f6f68'
  }
]

export const GALLERY_DESIGNS: GalleryDesign[] = [
  // Classic & Timeless
  {
    id: 'golden-sunrise',
    designNumber: '101',
    title: 'Golden Sunrise',
    collectionId: 'classic-timeless',
    collectionName: 'Classic & Timeless',
    description: 'A radiant morning dawn with soft golden accents and warm horizon hues symbolizing hope, remembrance, and the dawn of everlasting peace.',
    theme: 'Warm Sunrise & Golden Rays',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Classic & Timeless', 'Traditional', 'Sunrise', 'Golden', 'Neutral colors', 'Borders'],
    isFeatured: true
  },
  {
    id: 'timeless-grace',
    designNumber: '102',
    title: 'Timeless Grace',
    collectionId: 'classic-timeless',
    collectionName: 'Classic & Timeless',
    description: 'Understated elegance featuring subtle parchment textures, delicate serif typesetting, and dignified charcoal border detailing.',
    theme: 'Subtle Parchment & Fine Line Art',
    coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Classic & Timeless', 'Parchment', 'Serif', 'Traditional layouts', 'Neutral colors'],
    isFeatured: true
  },
  {
    id: 'serenity-blue',
    designNumber: '103',
    title: 'Serenity Blue',
    collectionId: 'classic-timeless',
    collectionName: 'Classic & Timeless',
    description: 'Peaceful sky tones layered with gentle cloud gradients and silver foil-effect accents for a deeply calming service tone.',
    theme: 'Azure Clouds & Silver Harmony',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Classic & Timeless', 'Blue', 'Sky', 'Clouds', 'Peaceful']
  },

  // Prestige & Luxury
  {
    id: 'regal-onyx-gold',
    designNumber: '201',
    title: 'Regal Onyx & Gold',
    collectionId: 'prestige-luxury',
    collectionName: 'Prestige & Luxury',
    description: 'A striking luxury presentation with rich midnight black backdrop, gilded geometric flourishes, and regal gold leaf typography styling.',
    theme: 'Luxury Onyx & Burnished Gold',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Prestige & Luxury', 'Gold', 'Black and gold', 'Regal designs', 'Marble', 'Luxury'],
    isFeatured: true
  },
  {
    id: 'pearl-velvet',
    designNumber: '202',
    title: 'Embossed Pearl & Champagne',
    collectionId: 'prestige-luxury',
    collectionName: 'Prestige & Luxury',
    description: 'Creamy ivory pearlescent finish accented by warm champagne borders, debossed texture effect, and refined traditional hierarchy.',
    theme: 'Pearl Ivory & Champagne Gold',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Prestige & Luxury', 'Pearls', 'Silver', 'Champagne', 'Luxury']
  },
  {
    id: 'imperial-burgundy',
    designNumber: '203',
    title: 'Royal Purple & Gold Brocade',
    collectionId: 'prestige-luxury',
    collectionName: 'Prestige & Luxury',
    description: 'Deep royal purple and velvet patterning framed with ornate gilded scrollwork, conveying lasting honor and dignified grandeur.',
    theme: 'Damask Scrollwork & Royal Purple',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Prestige & Luxury', 'Royal purple', 'Gold', 'Regal designs']
  },

  // Inspirational & Spiritual
  {
    id: 'heavenly-ascent',
    designNumber: '301',
    title: 'Heavenly Skies & Angel Wings',
    collectionId: 'inspirational-spiritual',
    collectionName: 'Inspirational & Spiritual',
    description: 'Illuminated beams penetrating celestial skies with ethereal angel wings, created for faith traditions and sacred celebrations.',
    theme: 'Gates of Heaven, Light & Angel Wings',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Inspirational & Spiritual', 'Heavenly skies', 'Angel wings', 'Gates of heaven', 'Light', 'Faith traditions'],
    isFeatured: true
  },
  {
    id: 'white-dove-stairway',
    designNumber: '302',
    title: 'Stairway to Heaven & Doves',
    collectionId: 'inspirational-spiritual',
    collectionName: 'Inspirational & Spiritual',
    description: 'Golden stairway ascending into divine light with soaring white doves in flight and comforting scriptural verses.',
    theme: 'Stairways, Doves & Divine Light',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Inspirational & Spiritual', 'Doves', 'Stairways', 'Heaven', 'Inspirational quotes']
  },

  // Floral & Botanical
  {
    id: 'white-lilies-sanctuary',
    designNumber: '401',
    title: 'White Lilies & Botanical Greens',
    collectionId: 'floral-botanical',
    collectionName: 'Floral & Botanical',
    description: 'The signature namesake of Lilies of the Field: fresh white oriental lilies, eucalyptus leaves, and crisp botanical line art.',
    theme: 'Pure White Lilies & Silver Eucalyptus',
    coverImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Floral & Botanical', 'Lilies', 'Roses', 'Orchids', 'Garden arrangements'],
    isFeatured: true
  },
  {
    id: 'blush-garden-roses',
    designNumber: '402',
    title: 'Soft Blush Roses & Cherry Blossoms',
    collectionId: 'floral-botanical',
    collectionName: 'Floral & Botanical',
    description: 'Romantic garden roses interwoven with cherry blossom branches and creamy antique texture honoring a loving life.',
    theme: 'Blush Roses & Cherry Blossoms',
    coverImage: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Floral & Botanical', 'Roses', 'Cherry blossoms', 'Sunflowers', 'Botanical']
  },

  // Nature & Scenic
  {
    id: 'mountain-sunset-valley',
    designNumber: '501',
    title: 'Majestic Mountains & Sunsets',
    collectionId: 'nature-scenic',
    collectionName: 'Nature & Scenic',
    description: 'Panoramic mountain peaks glowing beneath sunset skies with tranquil rivers and peaceful autumn woodland landscapes.',
    theme: 'Mountains, Rivers & Golden Sunsets',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Nature & Scenic', 'Mountains', 'Waterfalls', 'Sunsets', 'Lakes', 'Forests'],
    isFeatured: true
  },

  // Butterflies & Birds
  {
    id: 'monarch-flight',
    designNumber: '601',
    title: 'Monarch Butterflies & Hummingbirds',
    collectionId: 'butterflies-birds',
    collectionName: 'Butterflies & Birds',
    description: 'Monarch butterflies rising gracefully toward golden beams with hummingbirds in flight and soft floral accents.',
    theme: 'Monarch Butterflies & Cardinals',
    coverImage: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Butterflies & Birds', 'Monarch butterflies', 'Hummingbirds', 'Cardinals', 'White doves', 'Birds in flight']
  },

  // Sports & Athletics
  {
    id: 'champions-court',
    designNumber: '701',
    title: 'Champions Field & Court Tribute',
    collectionId: 'sports-athletics',
    collectionName: 'Sports & Athletics',
    description: 'Celebrates dedicated athletes and sports lovers across basketball, football, baseball, soccer, track, and boxing.',
    theme: 'Athletic Passion & Championship Legacy',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Sports & Athletics', 'Basketball', 'Football', 'Baseball', 'Soccer', 'Boxing', 'Golf', 'Track']
  },

  // Military & Veterans
  {
    id: 'valor-service',
    designNumber: '801',
    title: 'Valor & Patriotic Service',
    collectionId: 'military-veterans',
    collectionName: 'Military & Veterans',
    description: 'Dignified military tribute honoring Army, Navy, Air Force, Marines, Coast Guard, and Space Force veterans.',
    theme: 'National Honor & Military Service',
    coverImage: 'https://images.unsplash.com/photo-1579975097566-b251bc5d918c?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Military & Veterans', 'Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Patriotic tributes'],
    isFeatured: true
  },

  // First Responders & Public Service
  {
    id: 'first-responders-honor',
    designNumber: '802',
    title: 'Guardians of the City',
    collectionId: 'first-responders',
    collectionName: 'First Responders & Public Service',
    description: 'NYPD, FDNY, EMS, emergency dispatchers, and correction officers honored with ceremonial shields and badges of courage.',
    theme: 'NYPD, FDNY & EMS Brotherhood',
    coverImage: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['First Responders & Public Service', 'NYPD', 'FDNY', 'EMS', 'Dispatchers', 'Corrections']
  },

  // NYC Places of Interest
  {
    id: 'nyc-brooklyn-bridge',
    designNumber: '901',
    title: 'Brooklyn Bridge & NYC Skyline',
    collectionId: 'nyc-places',
    collectionName: 'NYC Places of Interest',
    description: 'The iconic Brooklyn Bridge cables overlooking Manhattan skyline, Queens, Harlem, and subway-inspired artistic accents.',
    theme: 'Brooklyn Bridge, Manhattan & Metro Spirit',
    coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['NYC Places of Interest', 'NYC skyline', 'Brooklyn Bridge', 'Manhattan', 'Queens', 'Bronx', 'Harlem', 'Subway'],
    isFeatured: true
  },

  // Hobbies & Interests
  {
    id: 'master-angler-craftsman',
    designNumber: '1001',
    title: 'Angler Waters & Lifelong Crafts',
    collectionId: 'hobbies-interests',
    collectionName: 'Hobbies & Interests',
    description: 'Honoring passions of fishing on tranquil waters, gardening, crafting, chess, reading, and photography.',
    theme: 'Tranquil Waters, Books & Handcrafts',
    coverImage: 'https://images.unsplash.com/photo-1522881177606-43d25624957b?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Hobbies & Interests', 'Fishing', 'Gardening', 'Cooking', 'Sewing', 'Reading', 'Chess', 'Photography']
  },

  // Music & Entertainment
  {
    id: 'symphony-jazz-rhythm',
    designNumber: '1101',
    title: 'Gospel, Jazz & Melody',
    collectionId: 'music-entertainment',
    collectionName: 'Music & Entertainment',
    description: 'A harmonious tribute featuring vintage sheet music, microphones, vinyl records, and instruments for lovers of rhythm and song.',
    theme: 'Gospel Melodies, Jazz & Vinyl Records',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Music & Entertainment', 'Gospel', 'Jazz', 'R&B', 'Microphones', 'Vinyl records', 'Instruments']
  },

  // Children & Youth
  {
    id: 'celestial-starlight',
    designNumber: '1201',
    title: 'Celestial Starlight & Clouds',
    collectionId: 'children-youth',
    collectionName: 'Children & Youth',
    description: 'Soft pastel clouds, shimmering starlight, rainbows, and gentle teddy bears created to wrap young departures in tender grace.',
    theme: 'Soft Clouds, Stars & Rainbows',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Children & Youth', 'Soft clouds', 'Stars', 'Rainbows', 'Teddy bears', 'Youth']
  },

  // Cultural & Heritage
  {
    id: 'kente-heritage',
    designNumber: '1301',
    title: 'Heritage Patterns & Ancestral Roots',
    collectionId: 'cultural-heritage',
    collectionName: 'Cultural & Heritage',
    description: 'Vibrant cultural patterns celebrating African, Caribbean, and Latin American heritage, rich family roots, and traditions.',
    theme: 'Ancestral Tapestry & Cultural Pride',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Cultural & Heritage', 'African heritage', 'Caribbean culture', 'Latin American heritage', 'Patterns', 'Traditions']
  },

  // Modern & Minimalist
  {
    id: 'clean-monochrome',
    designNumber: '1401',
    title: 'Architectural Monochrome',
    collectionId: 'modern-minimalist',
    collectionName: 'Modern & Minimalist',
    description: 'Clean typography, contemporary black and white layout, crisp margins, and subtle geometric accents.',
    theme: 'Black & White Contemporary Typography',
    coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Modern & Minimalist', 'Clean typography', 'Monochrome', 'Geometric', 'Black and white']
  },

  // Custom & Personalized
  {
    id: 'photo-collage-celebration',
    designNumber: '2301',
    title: 'Photo Collage & Storyboard',
    collectionId: 'custom-personalized',
    collectionName: 'Custom & Personalized',
    description: 'Custom photo collage tribute featuring meaningful locations, family memories, and personalized backgrounds.',
    theme: 'Photo Collages & Meaningful Locations',
    coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80',
    insideSpreadImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    availableFormats: DEFAULT_FORMATS,
    popularAddOns: DEFAULT_ADDONS,
    tags: ['Custom & Personalized', 'Photo collages', 'Custom backgrounds', 'Meaningful locations', 'Unique themes']
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
