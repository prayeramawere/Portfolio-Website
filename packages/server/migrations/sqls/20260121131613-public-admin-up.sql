/* Replace with your SQL commands */

CREATE TABLE PublicAdmin (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(700) NOT NULL,
    _role VARCHAR(700) NOT NULL,
    bio VARCHAR(1000) NOT NULL,
    story VARCHAR(1000) NOT NULL,
    _image TEXT NOT NULL,
)