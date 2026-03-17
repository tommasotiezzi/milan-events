-- Milan Events Database Schema

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  external_link text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  location text,
  category text NOT NULL DEFAULT 'other',
  is_sponsored boolean NOT NULL DEFAULT false,
  rsvp_required boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Enable Row Level Security on events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public: SELECT only on published events
CREATE POLICY "Public can view published events"
  ON events
  FOR SELECT
  TO anon
  USING (is_published = true);

-- Authenticated (admin): Full access to events
CREATE POLICY "Admin has full access"
  ON events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- Storage bucket: event-images
-- Run this AFTER creating the bucket in Storage > New bucket
--   Name: event-images
--   Public bucket: enabled (public read)
-- ============================================================

-- Authenticated users can upload images
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'event-images');

-- Authenticated users can update (overwrite) images
CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'event-images');

-- Authenticated users can delete images
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'event-images');

-- Public read access to images (needed for public URLs)
CREATE POLICY "Public can read images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'event-images');
