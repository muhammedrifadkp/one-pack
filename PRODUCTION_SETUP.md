# Production Deployment Guide for One-Pack

Your Next.js project is fully built, type-checked, and ready for production deployment!

Follow these quick steps to launch on **Vercel** (or any hosting provider like Netlify / Railway) with 100% free cloud persistence.

---

## 1. Environment Variables Checklist

Add these environment variables to your deployment settings (e.g., in Vercel > Project Settings > Environment Variables):

### Required:
```env
ADMIN_SECRET_KEY=YourStrongSecretAdminPasscode2026!
```

### Recommended (Free Cloud Database & Image Persistence via Supabase):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_STORAGE_BUCKET=products
```

---

## 2. Supabase Free Setup (takes 2 minutes)

If you want products created in the admin panel to automatically sync to all users globally across all devices:

1. Create a free account at [Supabase.com](https://supabase.com) and create a new project.
2. Go to **SQL Editor** in Supabase and run this script to create the `products` table:

```sql
CREATE TABLE public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    sizes JSONB DEFAULT '[]'::jsonb,
    moq TEXT DEFAULT '100 Pcs',
    material TEXT,
    usage TEXT,
    packaging_details TEXT,
    food_grade BOOLEAN DEFAULT true,
    eco_friendly BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable public access for reads
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow admin full access" ON public.products FOR ALL USING (true);
```

3. Go to **Storage** in Supabase:
   * Create a new bucket named `products`.
   * Turn ON **"Public Bucket"** so uploaded images can be viewed publicly.

---

## 3. Deploying to Vercel

1. Push your code to GitHub / GitLab / Bitbucket.
2. Go to [Vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Add the `ADMIN_SECRET_KEY` (and optional Supabase variables) under **Environment Variables**.
5. Click **Deploy**!

Your site will be live on production with serverless API functions and complete product admin controls!
