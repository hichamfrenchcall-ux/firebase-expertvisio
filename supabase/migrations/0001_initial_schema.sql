-- 0001_initial_schema.sql

-- 1. Table for Cabinets (Tenants)
CREATE TABLE public.cabinets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.cabinets ENABLE ROW LEVEL SECURITY;

-- 2. Profiles table to store user-specific data, linked to a cabinet
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  cabinet_id UUID REFERENCES public.cabinets(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT cabinet_id_not_null CHECK (cabinet_id IS NOT NULL)
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Appointments table, linked to a cabinet
CREATE TABLE public.appointments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT now(),
    start_time TIMESTAMPTZ NOT NULL,
    cabinet_id UUID REFERENCES public.cabinets(id) ON DELETE CASCADE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    attendee_name TEXT, -- Name of the person being expertised
    status TEXT DEFAULT 'scheduled', -- e.g., scheduled, completed, cancelled
    recording_url TEXT
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;


-- RLS POLICIES

-- Function to get the cabinet_id from the current user's profile
CREATE OR REPLACE FUNCTION get_my_cabinet_id() 
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT cabinet_id FROM public.profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cabinets Policies
CREATE POLICY "Users can only see their own cabinet" 
  ON public.cabinets FOR SELECT 
  USING (id = get_my_cabinet_id());

-- Profiles Policies
CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view profiles in their own cabinet" 
  ON public.profiles FOR SELECT
  USING (cabinet_id = get_my_cabinet_id());

-- Appointments Policies
CREATE POLICY "Users can view appointments in their own cabinet" 
  ON public.appointments FOR SELECT
  USING (cabinet_id = get_my_cabinet_id());

CREATE POLICY "Users can create appointments for their own cabinet" 
  ON public.appointments FOR INSERT
  WITH CHECK (cabinet_id = get_my_cabinet_id() AND auth.uid() = created_by);

CREATE POLICY "Users can update appointments in their own cabinet" 
  ON public.appointments FOR UPDATE
  USING (cabinet_id = get_my_cabinet_id());

CREATE POLICY "Users can delete appointments in their own cabinet" 
  ON public.appointments FOR DELETE
  USING (cabinet_id = get_my_cabinet_id());
