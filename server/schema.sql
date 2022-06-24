/*CREATE DATABASE chat;*/

USE chat;

CREATE TABLE messages (
  message_id int AUTO_INCREMENT PRIMARY KEY,
  text varchar(140) NOT NULL,
  username varchar(15) NOT NULL,
  roomname varchar(15) NOT NULL,
);

/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

