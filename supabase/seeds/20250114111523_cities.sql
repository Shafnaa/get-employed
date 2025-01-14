INSERT INTO
    cities (name, country_id)
VALUES (
        'Jakarta',
        (
            SELECT id
            FROM countries
            WHERE
                name = 'Indonesia'
        )
    ),
    (
        'Mariana Bay',
        (
            SELECT id
            FROM countries
            WHERE
                name = 'Singapore'
        )
    );