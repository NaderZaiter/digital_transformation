CREATE DATABASE IF NOT EXISTS gsgdb;

USE gsgdb;

CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR(100) NOT NULL,
    passwd VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    permission boolean NOT NULL,
    PRIMARY KEY (id)
)