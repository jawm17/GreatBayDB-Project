DROP DATABASE IF EXISTS greatbay_db;

CREATE DATABASE greatbay_db;

USE greatbay_db;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  currentBid INT NOT NULL,
  PRIMARY KEY (id)
);
