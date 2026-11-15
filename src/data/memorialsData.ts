export interface RemembrancePhoto {
  url: string
  caption: string
}

export interface ProgramPageContent {
  cover: {
    title: string
    subtitle: string
    quote: string
    themeColor?: string
  }
  orderOfService: {
    sanctuary: string
    officiant: string
    items: { label: string; detail: string }[]
  }
  obituary: {
    heading: string
    paragraphs: string[]
    scriptureQuote: string
  }
  backCover: {
    acknowledgement: string
    poemTitle?: string
    poemLines?: string[]
    pallbearers?: string[]
    interment: string
    repast: string
  }
}

export interface MemorialDetail {
  id: string
  full_name: string
  gender: 'male' | 'female' | 'neutral'
  product_type: 'legacy-tribute' | 'digital-program'
  date_of_birth: string
  date_of_passing: string
  lifespan: string
  quote: string
  story: string
  service_date: string
  service_location: string
  service_time: string
  officiant: string
  cover_image_url: string
  photos: RemembrancePhoto[]
  program: ProgramPageContent
}

export interface Tribute {
  id: string
  author_name: string
  relationship?: string
  message: string
  created_at: string
}

export const MEMORIAL_DATABASE: Record<string, MemorialDetail> = {
  'eleanor-grace-dawson': {
    id: 'eleanor-grace-dawson',
    full_name: 'Eleanor Grace Dawson',
    gender: 'female',
    product_type: 'legacy-tribute',
    date_of_birth: '1948-04-12',
    date_of_passing: '2024-02-18',
    lifespan: 'April 12, 1948 — February 18, 2024',
    quote: '“Her kindness was a quiet river, nourishing every heart she touched throughout her vibrant seventy-five years.”',
    story: 'A devoted educator for over thirty-five years in the public school system, master pianist, and beloved matriarch. Eleanor inspired hundreds of young minds and filled her family home with classical melody, warmth, and boundless Sunday dinners.',
    service_date: 'Saturday, February 24, 2024',
    service_location: 'Grace Episcopal Chapel, Queens Village, NY',
    service_time: '11:00 AM ET',
    officiant: 'Reverend Sarah Jenkins',
    cover_image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=800&h=650&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&h=600&q=80',
        caption: 'Eleanor Grace Dawson remembrance photo 1'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&h=600&q=80',
        caption: 'Eleanor Grace Dawson remembrance photo 2'
      }
    ],
    program: {
      cover: {
        title: 'A Celebration of the Life & Legacy of',
        subtitle: 'In Loving Memory & Celebration',
        quote: '“Her children arise up, and call her blessed; her husband also, and he praiseth her.” — Proverbs 31:28'
      },
      orderOfService: {
        sanctuary: 'Grace Episcopal Chapel · Queens Village, NY',
        officiant: 'Reverend Sarah Jenkins, Presiding',
        items: [
          { label: 'Musical Prelude', detail: 'Ave Maria · Schubert' },
          { label: 'Processional', detail: 'Clergy, Pallbearers & Family' },
          { label: 'Opening Prayer & Invocation', detail: 'Reverend Sarah Jenkins' },
          { label: 'Old Testament Scripture', detail: 'Psalm 23 (The Lord is My Shepherd)' },
          { label: 'New Testament Scripture', detail: 'John 14:1-6 (In My Father’s House)' },
          { label: 'Musical Selection', detail: 'His Eye is on the Sparrow · Soloist Clara Dawson' },
          { label: 'Acknowledgements & Cards', detail: 'Read by Sister Beatrice Mills' },
          { label: 'Reading of the Obituary', detail: 'Read Silently with Instrumental Accompaniment' },
          { label: 'Reflections from Friends & Family', detail: 'Remarks limited to 2 minutes' },
          { label: 'Eulogy & Words of Comfort', detail: 'Pastor David Vance' },
          { label: 'Benediction & Recessional', detail: 'Going Home · Traditional Spiritual' }
        ]
      },
      obituary: {
        heading: 'Her Story & Life Reflections',
        paragraphs: [
          'Eleanor Grace Dawson (née Mills) was born in New York on April 12, 1948, the cherished eldest daughter of Arthur and Beatrice Mills. From her earliest days, Eleanor demonstrated a radiant warmth, a deep love of music, and an enduring curiosity about the world.',
          'She earned her Bachelor’s and Master’s Degrees in Elementary Education, going on to dedicate more than thirty-five years to educating generations of children. Outside the classroom, Eleanor was a master pianist and the soul of family Sunday dinners, always greeting friends and neighbors with an open door and loving heart.',
          'Eleanor is lovingly survived by her devoted husband of forty-eight years, Marcus; her three children, Sarah, Kevin, and Brian; six grandchildren; two sisters; and countless nieces, nephews, students, and cherished friends.'
        ],
        scriptureQuote: '“I have fought a good fight, I have finished my course, I have kept the faith.” — 2 Timothy 4:7'
      },
      backCover: {
        acknowledgement: 'The family of Eleanor Grace Dawson extends our heartfelt appreciation and sincere gratitude for the prayers, comforting telephone calls, floral tributes, and generous acts of kindness shown to us during our time of sorrow. May God bless each of you abundantly.',
        poemTitle: 'A Life Well Lived',
        poemLines: [
          'A life well lived is a precious gift, of hope and strength and grace,',
          'from someone who has made our world a brighter, better place.'
        ],
        pallbearers: ['Marcus Dawson Jr.', 'Brian Dawson', 'Thomas Mills', 'Jerome Carter', 'David Wright', 'Arthur Jenkins'],
        interment: 'Pinelawn Memorial Park · Farmingdale, New York',
        repast: 'Following the committal, the family cordially invites guests to join them for a repast reception at Grace Fellowship Hall, 1:30 PM – 4:30 PM.'
      }
    }
  },
  'robert-james-miller': {
    id: 'robert-james-miller',
    full_name: 'Robert James Miller',
    gender: 'male',
    product_type: 'digital-program',
    date_of_birth: '1935-08-20',
    date_of_passing: '2023-11-04',
    lifespan: 'August 20, 1935 — November 4, 2023',
    quote: '“A man of steadfast honor, quiet strength, and everlasting devotion to his family.”',
    story: 'Robert James Miller served proudly as a veteran, master carpenter, and loving husband for sixty-one years. Robert built not only homes and furniture with his hands, but a legacy of discipline, integrity, and warmth that anchored three generations.',
    service_date: 'Monday, November 27, 2023',
    service_location: 'St. Augustine Sanctuary, Queens Village, NY',
    service_time: '10:00 AM ET',
    officiant: 'Father Thomas Bennett',
    cover_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&crop=faces&w=800&h=650&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&h=600&q=80',
        caption: 'Robert James Miller remembrance photo 1'
      },
      {
        url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&h=600&q=80',
        caption: 'Robert James Miller remembrance photo 2'
      }
    ],
    program: {
      cover: {
        title: 'Triumphant Homegoing Celebration for',
        subtitle: 'Honoring the Life and Service of',
        quote: '“Well done, thou good and faithful servant... enter thou into the joy of thy Lord.” — Matthew 25:21'
      },
      orderOfService: {
        sanctuary: 'St. Augustine Sanctuary · Queens Village, NY',
        officiant: 'Father Thomas Bennett, Presiding',
        items: [
          { label: 'Organ Prelude', detail: 'Great is Thy Faithfulness' },
          { label: 'Processional', detail: 'Military Honor Guard, Clergy & Family' },
          { label: 'Invocation & Opening Prayer', detail: 'Father Thomas Bennett' },
          { label: 'Scripture Reading', detail: 'Psalm 91 (He That Dwelleth in the Secret Place)' },
          { label: 'Musical Tribute', detail: 'Precious Lord, Take My Hand' },
          { label: 'Military Veteran Honors', detail: 'Presentation of the United States Flag' },
          { label: 'Reflections from Friends', detail: 'Bro. Robert Jr. and Deacon Charles Evans' },
          { label: 'Reading of the Life Journey', detail: 'Read by Granddaughter Angela Miller' },
          { label: 'Eulogy & Words of Comfort', detail: 'Father Thomas Bennett' },
          { label: 'Committal Prayer & Recessional', detail: 'When the Saints Go Marching In' }
        ]
      },
      obituary: {
        heading: 'His Story & Legacy of Honor',
        paragraphs: [
          'Robert James Miller was born on August 20, 1935. A man of quiet dignity and unwavering determination, Robert answered his nation’s call to service in the United States Armed Forces, serving with discipline and honor.',
          'Following his service, Robert pursued his passion for craftsmanship as a master carpenter. His precision, work ethic, and integrity left an indelible mark on every structure he built and every apprentice he mentored over four decades.',
          'Above all accomplishments, Robert considered his sixty-one-year marriage to his beloved wife Evelyn and their family to be his greatest blessing. His legacy of steadfast love, wisdom, and warm humor will live on through his children, grandchildren, and great-grandchildren.'
        ],
        scriptureQuote: '“The steps of a good man are ordered by the Lord: and he delighteth in his way.” — Psalm 37:23'
      },
      backCover: {
        acknowledgement: 'The family of Robert James Miller wishes to express our deepest gratitude for the comforting prayers, calls, cards, and support provided during our time of bereavement. Your kindness is a blessing to our hearts.',
        poemTitle: 'The Measure of a Man',
        poemLines: [
          'Not how did he die, but how did he live?',
          'Not what did he gain, but what did he give?',
          'These are the units to measure the worth of a man as a man, regardless of birth.'
        ],
        pallbearers: ['Robert Miller Jr.', 'Marcus Miller', 'Anthony Bennett', 'Deacon Charles Evans', 'Eric Thompson', 'Terrence Hayes'],
        interment: 'Calverton National Cemetery · Calverton, New York',
        repast: 'The family invites you to join them for fellowship and refreshments immediately following services at St. Augustine Parish Hall.'
      }
    }
  },
  'elizabeth-mae-reed': {
    id: 'elizabeth-mae-reed',
    full_name: 'Elizabeth Mae Reed',
    gender: 'female',
    product_type: 'legacy-tribute',
    date_of_birth: '1951-06-15',
    date_of_passing: '2023-09-22',
    lifespan: 'June 15, 1951 — September 22, 2023',
    quote: '“A life lived with gentle grace and deep, unconditional love for all.”',
    story: 'A dedicated pediatric nurse, botanical artist, and avid gardener whose quiet grace and gentle touch brought comfort to countless patients. Elizabeth lived her life with radiant joy, steadfast compassion, and eternal faith.',
    service_date: 'Friday, September 29, 2023',
    service_location: 'Whispering Pines Memorial Chapel, Queens Village, NY',
    service_time: '2:00 PM ET',
    officiant: 'Pastor David Vance',
    cover_image_url: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&crop=faces&w=800&h=650&q=80',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&h=600&q=80',
        caption: 'Elizabeth Mae Reed remembrance photo 1'
      },
      {
        url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&h=600&q=80',
        caption: 'Elizabeth Mae Reed remembrance photo 2'
      }
    ],
    program: {
      cover: {
        title: 'Celebration of Life & Peace for',
        subtitle: 'In Cherished Memory',
        quote: '“Peace I leave with you, my peace I give unto you.” — John 14:27'
      },
      orderOfService: {
        sanctuary: 'Whispering Pines Memorial Chapel · Queens Village, NY',
        officiant: 'Pastor David Vance, Presiding',
        items: [
          { label: 'Musical Prelude', detail: 'It is Well with My Soul' },
          { label: 'Processional', detail: 'Family & Clergy' },
          { label: 'Opening Prayer', detail: 'Pastor David Vance' },
          { label: 'Scripture Reading', detail: '1 Corinthians 13:4-8 (Love Never Fails)' },
          { label: 'Musical Selection', detail: 'Amazing Grace' },
          { label: 'Reflections from Colleagues & Friends', detail: 'Pediatric Care Team Members' },
          { label: 'Reading of the Obituary', detail: 'Daughter Jennifer Reed' },
          { label: 'Words of Comfort & Eulogy', detail: 'Pastor David Vance' },
          { label: 'Closing Blessing & Recessional', detail: 'Let There Be Peace on Earth' }
        ]
      },
      obituary: {
        heading: 'Her Story & Gentle Grace',
        paragraphs: [
          'Elizabeth Mae Reed was born on June 15, 1951. With an innate gift of empathy and gentle patience, Elizabeth dedicated over thirty years as a registered nurse in pediatric care, touching the lives of countless young patients and their grateful parents.',
          'An artist at heart, Elizabeth loved cultivating botanical gardens and watercolor painting. Her home was an oasis of greenery, classical music, and quiet joy.',
          'She will be cherished always by her daughter Jennifer, son-in-law Michael, three beloved granddaughters, extended family members, and medical colleagues.'
        ],
        scriptureQuote: '“Blessed are the pure in heart: for they shall see God.” — Matthew 5:8'
      },
      backCover: {
        acknowledgement: 'Our family wishes to express our deepest appreciation for the heartfelt cards, warm embraces, and continuous prayers during this time of remembrance.',
        poemTitle: 'In the Garden',
        poemLines: [
          'And He walks with me, and He talks with me,',
          'And He tells me I am His own.'
        ],
        pallbearers: ['Michael Davis', 'Christopher Reed', 'David Taylor', 'Jonathan Brooks'],
        interment: 'Green-Wood Cemetery · Brooklyn, New York',
        repast: 'A gathering of family and friends will take place at the Whispering Pines Garden Room immediately following the service.'
      }
    }
  }
}

export const DEFAULT_TRIBUTES: Record<string, Tribute[]> = {
  'robert-james-miller': [
    {
      id: 'trib-1',
      author_name: 'Thomas R. Miller Jr.',
      relationship: 'Brother',
      message: 'Uncle Bob taught me how to measure twice and cut once—not just in woodwork, but in life. He will be deeply missed.',
      created_at: 'November 20, 2024'
    }
  ],
  'eleanor-grace-dawson': [
    {
      id: 'trib-2',
      author_name: 'Clara Dawson Wright',
      relationship: 'Niece',
      message: 'Aunt Eleanor made every holiday magical with her laughter and piano melodies. Rest peacefully in God’s embrace.',
      created_at: 'February 20, 2024'
    }
  ],
  'elizabeth-mae-reed': [
    {
      id: 'trib-3',
      author_name: 'Katherine Vance',
      relationship: 'Dear Friend',
      message: 'Elizabeth had a garden of flowers in her heart. Her calm voice was medicine to so many young mothers.',
      created_at: 'September 24, 2023'
    }
  ]
}

