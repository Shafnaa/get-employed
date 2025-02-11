CREATE TABLE IF NOT EXISTS experience_levels (
    id SMALLINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL CHECK (char_length(name) > 3)
);

ALTER TABLE experience_levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Individuals can create new Experience Levels." ON experience_levels FOR
INSERT
    TO authenticated
WITH
    CHECK (TRUE);

CREATE POLICY "Individuals can read all Experience Levels." ON experience_levels FOR
SELECT TO authenticated USING (TRUE);