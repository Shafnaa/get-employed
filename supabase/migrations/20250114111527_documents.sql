CREATE TABLE IF NOT EXISTS documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE DEFAULT auth.uid() NOT NULL,
    document_type_id SMALLINT REFERENCES document_types NOT NULL,
    title TEXT NOT NULL CHECK (char_length(title) > 3),
    document_url TEXT NOT NULL CHECK (char_length(document_url) > 3),
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Individuals can create new Documents." ON documents FOR
INSERT
    TO authenticated
WITH
    CHECK (
        (
            SELECT auth.uid ()
        ) = user_id
    );

CREATE POLICY "Individuals can read their Documents." ON documents FOR
SELECT TO authenticated USING (
        (
            SELECT auth.uid ()
        ) = user_id
    );

CREATE POLICY "Individuals can update their Documents." ON documents FOR
UPDATE TO authenticated USING (
    (
        SELECT auth.uid ()
    ) = user_id
)
WITH
    CHECK (
        (
            SELECT auth.uid ()
        ) = user_id
    );

CREATE POLICY "Individuals can delete their Documents." ON documents FOR DELETE TO authenticated USING (
    (
        SELECT auth.uid ()
    ) = user_id
);