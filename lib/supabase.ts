import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oxwtuudtubwpndvosjsi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94d3R1dWR0dWJ3cG5kdm9zanNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1OTI4OTAsImV4cCI6MjA3MjE2ODg5MH0.PiaAc9Wihzl9c9JAAhzG7u9GxN-E_rQ1FtRnizFYFXE'

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Event {
  id: number
  title: string
  description: string
  event_date: string
  created_at: string
}

export interface LocalNews {
  id: number
  title: string
  content: string
  created_at: string
  author?: string
}

export interface Place {
  id: number
  name: string
  description: string
  category: string
  image_url?: string
  created_at: string
}