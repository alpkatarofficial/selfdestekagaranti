CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  features TEXT[], -- Array of text for features
  specs JSONB,      -- JSONB for specifications
  image TEXT        -- URL for the product image
);

-- Optional: Add an index for faster lookups by category
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);

-- Optional: Add an index for faster lookups by name
CREATE INDEX IF NOT EXISTS idx_products_name ON products (name);
