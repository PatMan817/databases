/*CREATE DATABASE chat;*/

USE chat;

-- CREATE TABLE rooms (
--   room_id int AUTO_INCREMENT PRIMARY KEY,
--   roomname varchar(15)
-- );

CREATE TABLE users (
  user_id int AUTO_INCREMENT PRIMARY KEY,
  username varchar(15)
);

CREATE TABLE messages (
  message_id int AUTO_INCREMENT PRIMARY KEY,
  message_text varchar(140) NOT NULL,
  user_id int,
  CONSTRAINT fk_user_id
  FOREIGN KEY (user_id)
    REFERENCES users(user_id),
  room_name varchar(15) NOT NULL
);

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

