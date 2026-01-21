/* Replace with your SQL commands */

CREATE TABLE blogs (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    _created_at DATE NOT NULL,
    category VARCHAR(300) NOT NULL,
    title VARCHAR(700) NOT NULL,
    subtitle VARCHAR(700) NOT NULL,
    _message TEXT NOT NULL,
    _image IMAGE,
    link URL,
    likes INT,
    views INT,
)