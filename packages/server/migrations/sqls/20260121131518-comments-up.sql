/* Replace with your SQL commands */

CREATE TABLE Comments (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    BlogID INT NOT NULL,
    _created_at DATE NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    author VARCHAR(700) NOT NULL,
    likes INT,
    FOREIGN KEY (BlogID) REFERENCES Blogs(id)
)