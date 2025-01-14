INSERT INTO
    companies (name, company_type_id)
VALUES (
        'Unilever',
        (
            SELECT id
            FROM company_types
            WHERE
                name = 'Retail'
        )
    );