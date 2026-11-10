export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'family' | 'guest' | 'director'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'family' | 'guest' | 'director'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'family' | 'guest' | 'director'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      memorials: {
        Row: {
          id: string
          created_by: string | null
          full_name: string
          date_of_birth: string
          date_of_passing: string
          biography: string | null
          cover_image_url: string | null
          obituary_text: string | null
          service_venue: string | null
          service_date: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          created_by?: string | null
          full_name: string
          date_of_birth: string
          date_of_passing: string
          biography?: string | null
          cover_image_url?: string | null
          obituary_text?: string | null
          service_venue?: string | null
          service_date?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          created_by?: string | null
          full_name?: string
          date_of_birth?: string
          date_of_passing?: string
          biography?: string | null
          cover_image_url?: string | null
          obituary_text?: string | null
          service_venue?: string | null
          service_date?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tributes: {
        Row: {
          id: string
          memorial_id: string
          author_name: string
          relationship: string | null
          message: string
          candle_lit: boolean
          created_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          author_name: string
          relationship?: string | null
          message: string
          candle_lit?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          memorial_id?: string
          author_name?: string
          relationship?: string | null
          message?: string
          candle_lit?: boolean
          created_at?: string
        }
        Relationships: []
      }
      service_inquiries: {
        Row: {
          id: string
          contact_name: string
          email: string
          phone: string
          service_package: string
          preferred_date: string | null
          special_notes: string | null
          status: 'pending' | 'in_review' | 'confirmed'
          created_at: string
        }
        Insert: {
          id?: string
          contact_name: string
          email: string
          phone: string
          service_package: string
          preferred_date?: string | null
          special_notes?: string | null
          status?: 'pending' | 'in_review' | 'confirmed'
          created_at?: string
        }
        Update: {
          id?: string
          contact_name?: string
          email?: string
          phone?: string
          service_package?: string
          preferred_date?: string | null
          special_notes?: string | null
          status?: 'pending' | 'in_review' | 'confirmed'
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
