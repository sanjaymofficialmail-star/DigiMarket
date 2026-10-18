-- ==============================================================================
-- Plant Green Inertia Pvt. Ltd. - Digital Marketing Course Enrollment Schema
-- Official Training Partner of TN Skills, TNSDC
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hswxckkvpmjndmwexioa/sql
-- ==============================================================================

-- 1. Create the enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    application_id TEXT UNIQUE,
    
    -- Personal Information
    name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    email TEXT,
    address TEXT NOT NULL,
    
    -- Academic Information
    college_name TEXT NOT NULL,
    highest_study TEXT NOT NULL, -- UG, PG, PhD, Other
    highest_study_other TEXT,
    degree TEXT NOT NULL,
    branch TEXT NOT NULL,
    passing_status TEXT NOT NULL, -- Pursuing, Completed
    pursuing_year TEXT,           -- Year 1, Year 2, Year 3, Year 4 (if pursuing)
    passing_year TEXT,
    
    -- Program Details
    start_date DATE NOT NULL,
    mode TEXT NOT NULL,           -- Online, Offline
    fee_amount NUMERIC NOT NULL,  -- 4999 or 14999
    
    -- Languages Known
    languages_known TEXT[] DEFAULT '{}',
    languages_other TEXT,
    
    -- Payment Verification
    gpay_number TEXT DEFAULT '8220699083',
    upi_id TEXT DEFAULT 'lokeshlaven-2@okicici',
    recipient_name TEXT DEFAULT 'Mr. Laven Lokesh Barani',
    utr_number TEXT,
    payment_screenshot_url TEXT,
    
    -- Policies & Status
    agreed_no_refund BOOLEAN DEFAULT TRUE,
    verification_status TEXT DEFAULT 'pending' -- pending, verified, rejected
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anyone (anon / authenticated) to submit enrollment applications
DROP POLICY IF EXISTS "Allow public anonymous submissions" ON public.enrollments;
CREATE POLICY "Allow public anonymous submissions"
ON public.enrollments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy: Allow select of application by ID for confirmation viewing
DROP POLICY IF EXISTS "Allow users to read their own application" ON public.enrollments;
CREATE POLICY "Allow users to read their own application"
ON public.enrollments
FOR SELECT
TO anon, authenticated
USING (true);

-- ==============================================================================
-- Storage Bucket Setup for Payment Screenshots
-- ==============================================================================
-- Create payment-proofs storage bucket if it does not exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment_proofs', 'payment_proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anonymous uploads to payment_proofs storage
DROP POLICY IF EXISTS "Allow public uploads to payment_proofs" ON storage.objects;
CREATE POLICY "Allow public uploads to payment_proofs"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'payment_proofs');

DROP POLICY IF EXISTS "Allow public read access to payment_proofs" ON storage.objects;
CREATE POLICY "Allow public read access to payment_proofs"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'payment_proofs');
