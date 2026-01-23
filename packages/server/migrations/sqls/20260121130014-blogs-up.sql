/* Replace with your SQL commands */

CREATE TABLE Blogs (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    _created_at DATE NOT NULL,
    category VARCHAR(300) NOT NULL,
    title VARCHAR(700) NOT NULL,
    subtitle VARCHAR(700) NOT NULL,
    _message TEXT NOT NULL,
    _image TEXT,
    link TEXT,
    likes INT,
    views INT,
)