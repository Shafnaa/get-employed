CREATE TABLE IF NOT EXISTS applications (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE DEFAULT auth.uid () NOT NULL,
    city_id BIGINT REFERENCES cities NOT NULL,
    status_id BIGINT REFERENCES status NOT NULL,
    company_id BIGINT REFERENCES companies NOT NULL,
    work_type_id SMALLINT REFERENCES work_types NOT NULL,
    experience_level_id SMALLINT REFERENCES experience_levels NOT NULL,
    title TEXT NOT NULL CHECK (char_length(title) > 3),
    description TEXT NOT NULL CHECK (char_length(description) > 3),
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Individuals can create new Applications." ON applications FOR
INSERT
    TO authenticated
WITH
    CHECK (
        (
            SELECT auth.uid ()
        ) = user_id
    );

CREATE POLICY "Individuals can read their Applications." ON applications FOR
SELECT TO authenticated USING (
        (
            SELECT auth.uid ()
        ) = user_id
    );

CREATE POLICY "Individuals can update their Applications." ON applications FOR
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

CREATE POLICY "Individuals can delete their Applications." ON applications FOR DELETE TO authenticated USING (
    (
        SELECT auth.uid ()
    ) = user_id
);