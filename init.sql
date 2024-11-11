USE test_db;

--TODO Crie a tabela de user;
CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    firstname varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

--TODO Crie a tabela de posts;
CREATE TABLE post (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    'description' varchar(100) NOT NULL,
    userId varchar(100) NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY(userId) REFERENCES user(id)
);