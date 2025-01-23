CREATE TABLE IF NOT EXISTS todos (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    application_id UUID REFERENCES applications ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Individuals can create new Todos." ON todos FOR
INSERT
    TO authenticated
WITH
    CHECK (
        (
            SELECT auth.uid ()
        ) = (
            SELECT user_id
            FROM applications
            WHERE
                id = application_id
        )
    );

CREATE POLICY "Individuals can read their Todos." ON todos FOR
SELECT TO authenticated USING (
        (
            SELECT auth.uid ()
        ) = (
            SELECT user_id
            FROM applications
            WHERE
                id = application_id
        )
    );

CREATE POLICY "Individuals can update their Todos." ON todos FOR
UPDATE TO authenticated USING (
    (
        SELECT auth.uid ()
    ) = (
        SELECT user_id
        FROM applications
        WHERE
            id = application_id
    )
)
WITH
    CHECK (
        (
            SELECT auth.uid ()
        ) = (
            SELECT user_id
            FROM applications
            WHERE
                id = application_id
        )
    );

CREATE POLICY "Individuals can delete their Todos." ON todos FOR DELETE TO authenticated USING (
    (
        SELECT auth.uid ()
    ) = (
        SELECT user_id
        FROM applications
        WHERE
            id = application_id
    )
);