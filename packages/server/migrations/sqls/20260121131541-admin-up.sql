/* Replace with your SQL commands */

CREATE TABLE admin (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(700) NOT NULL,
    _role VARCHAR(700) NOT NULL,
    bio VARCHAR(1000) NOT NULL,
    story VARCHAR(1000) NOT NULL,
    _image TEXT NOT NULL,
    unique_code1 VARCHAR(24),
    unique_code2 VARCHAR(24)
)