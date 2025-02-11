CREATE TABLE IF NOT EXISTS document_applications (
    application_id UUID REFERENCES applications ON DELETE CASCADE NOT NULL,
    document_id UUID REFERENCES documents ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (application_id, document_id)
);

ALTER TABLE document_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Individuals can create new Document Applications." ON document_applications FOR
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

CREATE POLICY "Individuals can read their Document Applications." ON document_applications FOR
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

CREATE POLICY "Individuals can delete their Document Applications." ON document_applications FOR DELETE TO authenticated USING (
    (
        SELECT auth.uid ()
    ) = (
        SELECT user_id
        FROM applications
        WHERE
            id = application_id
    )
);