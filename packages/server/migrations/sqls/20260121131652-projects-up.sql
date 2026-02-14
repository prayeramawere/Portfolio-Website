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

INSERT INTO Projects (title,_description,benefit1,benefit2,benefit3,link,_image) VALUES ('Everrsow','a e-commerce platform designed to help user shop smarter and faster','fast loading','10% converting rate','negotiable price','https://everrsow.com/logo.png','https://everrsow.com/logo.png')