/* Replace with your SQL commands */

CREATE TABLE Projects (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(700) NOT NULL,
    _description VARCHAR(1000) NOT NULL,
    benefit1 VARCHAR(700),
    benefit2 VARCHAR(700),
    benefit3 VARCHAR(700),
    link TEXT ,
    _image TEXT NOT NULL
)