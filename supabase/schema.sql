-- ====================================================================
-- Funreal by Lotf - Supabase Database Schema & Setup
-- Execute this script in your Supabase project's SQL Editor
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role TEXT CHECK (role IN ('family', 'guest', 'director')) DEFAULT 'family',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Memorials Registry Table
CREATE TABLE IF NOT EXISTS public.memorials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_by UUID REFERENCES auth.users ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  date_of_passing DATE NOT NULL,
  biography TEXT,
  cover_image_url TEXT,
  obituary_text TEXT,
  service_venue TEXT,
  service_date TIMESTAMPTZ,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tributes & Condolences Table
CREATE TABLE IF NOT EXISTS public.tributes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  memorial_id UUID REFERENCES public.memorials(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  relationship TEXT,
  message TEXT NOT NULL,
  candle_lit BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Funeral Arrangements & Pre-Planning Inquiries Table
CREATE TABLE IF NOT EXISTS public.service_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_package TEXT NOT NULL,
  preferred_date DATE,
  special_notes TEXT,
  status TEXT CHECK (status IN ('pending', 'in_review', 'confirmed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_inquiries ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies

-- Memorials: Public can read active public memorials
CREATE POLICY "Public memorials are viewable by everyone" 
ON public.memorials FOR SELECT 
USING (is_public = true);

-- Memorials: Authenticated users can insert
CREATE POLICY "Users can create memorials" 
ON public.memorials FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = created_by);

-- Memorials: Owners can update their memorials
CREATE POLICY "Users can update own memorials" 
ON public.memorials FOR UPDATE 
TO authenticated 
USING (auth.uid() = created_by);

-- Tributes: Viewable by everyone
CREATE POLICY "Tributes are viewable by everyone" 
ON public.tributes FOR SELECT 
USING (true);

-- Tributes: Anyone can leave a tribute or condolence
CREATE POLICY "Anyone can leave a tribute" 
ON public.tributes FOR INSERT 
WITH CHECK (true);

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Service Inquiries: Anyone can submit an inquiry
CREATE POLICY "Anyone can submit inquiry" 
ON public.service_inquiries FOR INSERT 
WITH CHECK (true);

-- ====================================================================
-- Initial Demo Seed Data
-- ====================================================================

INSERT INTO public.memorials (id, full_name, date_of_birth, date_of_passing, biography, cover_image_url, obituary_text, service_venue, service_date, is_public)
VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  'Eleanor Vance Montgomery',
  '1942-05-14',
  '2024-03-12',
  'A devoted educator, master pianist, and beloved matriarch whose warmth and grace touched four generations.',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  'Eleanor passed peacefully surrounded by family. Her legacy of curiosity, kindness, and music will forever echo through our hearts.',
  'The St. Clair Serenity Chapel & Gardens',
  NOW() + INTERVAL '3 days',
  true
),
(
  '22222222-2222-2222-2222-222222222222',
  'Captain Arthur Sterling',
  '1938-11-20',
  '2024-02-28',
  'Distinguished mariner, author, and ocean conservation pioneer whose courage and gentle laughter will never be forgotten.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'Arthur charted his final passage with the quiet fortitude that defined his entire maritime voyage in life.',
  'Harbor View Memorial Pavilion',
  NOW() + INTERVAL '5 days',
  true
),
(
  '33333333-3333-3333-3333-333333333333',
  'Dr. Margaret Chen',
  '1955-08-03',
  '2024-04-01',
  'Renowned pediatrician, humanitarian medical volunteer, and loving mother whose tireless dedication healed thousands.',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  'Margaret lived a life of boundless generosity and deep clinical compassion. A service of gratitude and remembrance will be held.',
  'Evergreen Meadow Memorial Hall',
  NOW() + INTERVAL '7 days',
  true
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.tributes (memorial_id, author_name, relationship, message, candle_lit)
VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Julian Montgomery',
  'Grandson',
  'Thank you for teaching me how to play Beethoven and always believing in me. Rest gracefully in peace, Grandma.',
  true
),
(
  '11111111-1111-1111-1111-111111111111',
  'Sarah & David Hayes',
  'Family Friends',
  'Eleanor was the beacon of kindness in our neighborhood for over thirty years. Deepest condolences to the family.',
  true
),
(
  '22222222-2222-2222-2222-222222222222',
  'First Mate Thomas Vance',
  'Colleague',
  'Fair winds and calm seas, Captain. It was the privilege of a lifetime to sail under your leadership.',
  true
)
ON CONFLICT DO NOTHING;
