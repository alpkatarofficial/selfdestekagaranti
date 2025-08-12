CREATE TABLE IF NOT EXISTS thomson (
    id TEXT PRIMARY KEY, -- ID'yi UUID yerine TEXT olarak değiştirdik
    model_name TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    tv_type TEXT,
    resolution TEXT,
    image_url TEXT,
    screen_size_inches INTEGER,
    smart_features TEXT[], -- JSONB yerine TEXT[] olarak değiştirdik
    ports TEXT[], -- JSONB yerine TEXT[] olarak değiştirdik
    audio_output_watts INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- updated_at sütununu güncellemek için fonksiyon
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tetikleyiciyi oluşturmadan önce var olup olmadığını kontrol et
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_thomson_updated_at') THEN
        CREATE TRIGGER set_thomson_updated_at
        BEFORE UPDATE ON thomson
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
