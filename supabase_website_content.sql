-- ==============================================================================
-- Plant Green Inertia Pvt. Ltd. - Website Content & Particle Colors Migration
-- Official Training Partner of TN Skills, TNSDC
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hswxckkvpmjndmwexioa/sql
-- ==============================================================================

-- 1. Ensure tables exist
CREATE TABLE IF NOT EXISTS public.pgi_website_content (
    id TEXT PRIMARY KEY,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.pgi_website_content_temp (
    id TEXT PRIMARY KEY,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add all columns to pgi_website_content if they don't already exist (Fixes: column "theme_colors" does not exist)
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS hero JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS why JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS curriculum JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS learning_steps JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS pricing JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS about JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS next_cohort JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS contact JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS theme_colors JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS content_json JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Add all columns to pgi_website_content_temp if they don't already exist
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS hero JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS why JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS curriculum JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS learning_steps JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS pricing JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS about JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS next_cohort JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS contact JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS theme_colors JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS content_json JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.pgi_website_content_temp ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.pgi_website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pgi_website_content_temp ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for pgi_website_content
DROP POLICY IF EXISTS "Allow public read on pgi_website_content" ON public.pgi_website_content;
CREATE POLICY "Allow public read on pgi_website_content"
ON public.pgi_website_content FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow full management on pgi_website_content" ON public.pgi_website_content;
CREATE POLICY "Allow full management on pgi_website_content"
ON public.pgi_website_content FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 5. RLS Policies for pgi_website_content_temp
DROP POLICY IF EXISTS "Allow public read on pgi_website_content_temp" ON public.pgi_website_content_temp;
CREATE POLICY "Allow public read on pgi_website_content_temp"
ON public.pgi_website_content_temp FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Allow full management on pgi_website_content_temp" ON public.pgi_website_content_temp;
CREATE POLICY "Allow full management on pgi_website_content_temp"
ON public.pgi_website_content_temp FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 6. Insert Complete Production Content (id = 'main_content')
INSERT INTO public.pgi_website_content (
    id,
    hero,
    why,
    curriculum,
    learning_steps,
    pricing,
    about,
    next_cohort,
    contact,
    theme_colors,
    updated_at
) VALUES (
    'main_content',
    '{
        "title_main": "Master digital marketing.",
        "title_acc": "Get career-ready.",
        "aside_desc": "Industry-aligned training in AI SEO, paid ads, analytics, lead generation and more, taught through hands-on practice.",
        "price_online": "₹4,999",
        "price_online_was": "₹10,000",
        "price_offline": "₹14,999",
        "price_offline_was": "₹50,000",
        "primary_cta": "Enroll now",
        "secondary_cta": "View course",
        "partner_badge": "Official Training Partner of TN Skills, TNSDC"
    }'::jsonb,
    '{
        "title_main": "Skills employers",
        "title_acc": "actually hire for.",
        "lead": "Bridging college and corporate through immersive, tool-first marketing training.",
        "features": [
            {
                "title": "Live Ad Budgets & Campaigns",
                "desc": "Manage real client budgets across Meta & Google Ads."
            },
            {
                "title": "AI-Assisted Workflow",
                "desc": "Use generative AI for keyword research, copy, and SEO ranking."
            },
            {
                "title": "Verified Portfolio & Placement",
                "desc": "Build job-ready case studies with dedicated interview prep."
            }
        ]
    }'::jsonb,
    '[
        {"title": "AI SEO", "desc": "Keywords & rank optimisation"},
        {"title": "Paid Media", "desc": "Meta & Google Ads ROI"},
        {"title": "Content Strategy", "desc": "Copywriting & creative design"},
        {"title": "Web Analytics", "desc": "GA4 tracking & insights"},
        {"title": "Lead Funnels", "desc": "Landing pages & conversion"},
        {"title": "Automation", "desc": "Email sequences & CRM"}
    ]'::jsonb,
    '[
        {"step": 1, "title": "Core Playbooks", "desc": "Concise lessons on proven growth frameworks."},
        {"step": 2, "title": "Hands-on Labs", "desc": "Live practice inside industry-standard marketing tools."},
        {"step": 3, "title": "Proof of Work", "desc": "Deploy live campaigns to build verified case studies."},
        {"step": 4, "title": "Career Launch", "desc": "Resume review, mock interviews, and placement rounds."}
    ]'::jsonb,
    '{
        "title_main": "Choose how",
        "title_acc": "you learn.",
        "online": {
            "name": "Online Batch",
            "price": "₹4,999",
            "was": "₹10,000",
            "discount": "50% off",
            "price_num": 4999,
            "was_num": 10000,
            "features": [
                "Live interactive sessions",
                "All 6 modules & AI tools",
                "TN Skills accredited certificate"
            ],
            "cta": "Enroll online"
        },
        "offline": {
            "name": "Offline Classroom",
            "price": "₹14,999",
            "was": "₹50,000",
            "discount": "70% off",
            "price_num": 14999,
            "was_num": 50000,
            "features": [
                "In-person labs (Maduravoyal)",
                "1-on-1 mentor guidance",
                "Direct placement assistance"
            ],
            "cta": "Enroll offline"
        }
    }'::jsonb,
    '{
        "title_main": "About",
        "title_acc": "Plant Green Inertia.",
        "lead": "Official Training Partner of TN Skills, Tamil Nadu Skill Development Corporation (TNSDC). Empowering students and graduates with practical, high-demand skills to launch successful careers in digital marketing and tech.",
        "badges": [
            "TN Skills Official Partner",
            "TNSDC Accredited",
            "Chennai HQ"
        ]
    }'::jsonb,
    '{
        "title_main": "Next cohort",
        "title_acc": "now open.",
        "lead": "Tamil Nadu premier government-recognized digital marketing cohort.",
        "metric_1_val": "100+ Live Hours",
        "metric_1_label": "Hands-on AI & Ads Labs",
        "metric_2_val": "From ₹4,999",
        "metric_2_label": "Up to 70% Subsidy"
    }'::jsonb,
    '{
        "email": "plantgreeninertia@gmail.com",
        "phone_1": "9345029705",
        "phone_2": "9345886690",
        "office_address": "No: 4, Alapakkam Main Road, Maduravoyal, Chennai - 600095",
        "brand_pitch": "The World First Experiential Training Company, bridging college and corporate through immersive learning.",
        "instagram": "https://www.instagram.com/pginertia?stkn=MWZ6NHE1NHp1dWVvcQ==",
        "youtube": "https://youtube.com/@plantgreeninertia",
        "linkedin": "https://www.linkedin.com/company/plantgreeninertia/",
        "whatsapp": "+91 93450 29705"
    }'::jsonb,
    '{
        "acc": "#2d663b",
        "acc2": "#1f5e30",
        "bg": "#ffffff",
        "fg": "#201b18",
        "particles": {
            "primary": "#2d663b",
            "secondary": "#1a5c2a",
            "accent": "#34a853",
            "dark": "#201b18",
            "light": "#ffffff",
            "dust_colors": ["#2d663b", "#201b18", "#1a5c2a", "#201b18", "#ffffff"],
            "shader_colors": ["#2d663b", "#201b18", "#ffffff", "#1a5c2a", "#201b18", "#2d663b"]
        }
    }'::jsonb,
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    hero = EXCLUDED.hero,
    why = EXCLUDED.why,
    curriculum = EXCLUDED.curriculum,
    learning_steps = EXCLUDED.learning_steps,
    pricing = EXCLUDED.pricing,
    about = EXCLUDED.about,
    next_cohort = EXCLUDED.next_cohort,
    contact = EXCLUDED.contact,
    theme_colors = EXCLUDED.theme_colors,
    updated_at = NOW();

-- 7. Insert Complete Staging / Demo Content (id = 'temp_content')
INSERT INTO public.pgi_website_content_temp (
    id,
    hero,
    why,
    curriculum,
    learning_steps,
    pricing,
    about,
    next_cohort,
    contact,
    theme_colors,
    updated_at
) VALUES (
    'temp_content',
    '{
        "title_main": "Master digital marketing.",
        "title_acc": "Get career-ready.",
        "aside_desc": "Industry-aligned training in AI SEO, paid ads, analytics, lead generation and more, taught through hands-on practice.",
        "price_online": "₹4,999",
        "price_online_was": "₹10,000",
        "price_offline": "₹14,999",
        "price_offline_was": "₹50,000",
        "primary_cta": "Enroll now",
        "secondary_cta": "View course",
        "partner_badge": "Official Training Partner of TN Skills, TNSDC"
    }'::jsonb,
    '{
        "title_main": "Skills employers",
        "title_acc": "actually hire for.",
        "lead": "Bridging college and corporate through immersive, tool-first marketing training.",
        "features": [
            {
                "title": "Live Ad Budgets & Campaigns",
                "desc": "Manage real client budgets across Meta & Google Ads."
            },
            {
                "title": "AI-Assisted Workflow",
                "desc": "Use generative AI for keyword research, copy, and SEO ranking."
            },
            {
                "title": "Verified Portfolio & Placement",
                "desc": "Build job-ready case studies with dedicated interview prep."
            }
        ]
    }'::jsonb,
    '[
        {"title": "AI SEO", "desc": "Keywords & rank optimisation"},
        {"title": "Paid Media", "desc": "Meta & Google Ads ROI"},
        {"title": "Content Strategy", "desc": "Copywriting & creative design"},
        {"title": "Web Analytics", "desc": "GA4 tracking & insights"},
        {"title": "Lead Funnels", "desc": "Landing pages & conversion"},
        {"title": "Automation", "desc": "Email sequences & CRM"}
    ]'::jsonb,
    '[
        {"step": 1, "title": "Core Playbooks", "desc": "Concise lessons on proven growth frameworks."},
        {"step": 2, "title": "Hands-on Labs", "desc": "Live practice inside industry-standard marketing tools."},
        {"step": 3, "title": "Proof of Work", "desc": "Deploy live campaigns to build verified case studies."},
        {"step": 4, "title": "Career Launch", "desc": "Resume review, mock interviews, and placement rounds."}
    ]'::jsonb,
    '{
        "title_main": "Choose how",
        "title_acc": "you learn.",
        "online": {
            "name": "Online Batch",
            "price": "₹4,999",
            "was": "₹10,000",
            "discount": "50% off",
            "price_num": 4999,
            "was_num": 10000,
            "features": [
                "Live interactive sessions",
                "All 6 modules & AI tools",
                "TN Skills accredited certificate"
            ],
            "cta": "Enroll online"
        },
        "offline": {
            "name": "Offline Classroom",
            "price": "₹14,999",
            "was": "₹50,000",
            "discount": "70% off",
            "price_num": 14999,
            "was_num": 50000,
            "features": [
                "In-person labs (Maduravoyal)",
                "1-on-1 mentor guidance",
                "Direct placement assistance"
            ],
            "cta": "Enroll offline"
        }
    }'::jsonb,
    '{
        "title_main": "About",
        "title_acc": "Plant Green Inertia.",
        "lead": "Official Training Partner of TN Skills, Tamil Nadu Skill Development Corporation (TNSDC). Empowering students and graduates with practical, high-demand skills to launch successful careers in digital marketing and tech.",
        "badges": [
            "TN Skills Official Partner",
            "TNSDC Accredited",
            "Chennai HQ"
        ]
    }'::jsonb,
    '{
        "title_main": "Next cohort",
        "title_acc": "now open.",
        "lead": "Tamil Nadu premier government-recognized digital marketing cohort.",
        "metric_1_val": "100+ Live Hours",
        "metric_1_label": "Hands-on AI & Ads Labs",
        "metric_2_val": "From ₹4,999",
        "metric_2_label": "Up to 70% Subsidy"
    }'::jsonb,
    '{
        "email": "plantgreeninertia@gmail.com",
        "phone_1": "9345029705",
        "phone_2": "9345886690",
        "office_address": "No: 4, Alapakkam Main Road, Maduravoyal, Chennai - 600095",
        "brand_pitch": "The World First Experiential Training Company, bridging college and corporate through immersive learning.",
        "instagram": "https://www.instagram.com/pginertia?stkn=MWZ6NHE1NHp1dWVvcQ==",
        "youtube": "https://youtube.com/@plantgreeninertia",
        "linkedin": "https://www.linkedin.com/company/plantgreeninertia/",
        "whatsapp": "+91 93450 29705"
    }'::jsonb,
    '{
        "acc": "#2d663b",
        "acc2": "#1f5e30",
        "bg": "#ffffff",
        "fg": "#201b18",
        "particles": {
            "primary": "#2d663b",
            "secondary": "#1a5c2a",
            "accent": "#34a853",
            "dark": "#201b18",
            "light": "#ffffff",
            "dust_colors": ["#2d663b", "#201b18", "#1a5c2a", "#201b18", "#ffffff"],
            "shader_colors": ["#2d663b", "#201b18", "#ffffff", "#1a5c2a", "#201b18", "#2d663b"]
        }
    }'::jsonb,
    NOW()
)
ON CONFLICT (id) DO UPDATE SET
    hero = EXCLUDED.hero,
    why = EXCLUDED.why,
    curriculum = EXCLUDED.curriculum,
    learning_steps = EXCLUDED.learning_steps,
    pricing = EXCLUDED.pricing,
    about = EXCLUDED.about,
    next_cohort = EXCLUDED.next_cohort,
    contact = EXCLUDED.contact,
    theme_colors = EXCLUDED.theme_colors,
    updated_at = NOW();

-- 8. Enable Realtime publication so changes broadcast instantly
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.pgi_website_content;
    EXCEPTION WHEN duplicate_object THEN
        NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.pgi_website_content_temp;
    EXCEPTION WHEN duplicate_object THEN
        NULL;
    END;
END $$;
