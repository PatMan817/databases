var db = require('../db');
var userModels = require('./users.js');

module.exports = {
  getAll: async function () {
    //use connection.connect
    db.connection.connect((error) => {
     if(error){
       console.log('Error connecting to the MySQL Database');
       return;
     }
     console.log('Connection established sucessfully');
    });
    //on success query database for all messages
    var messages = await new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM MESSAGES;', [], (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })

    //close connection
    //db.connection.end((err) => {
    //  console.error(err);
    //})
    //return array of all message objects
    return messages;
  }, // a function which produces all the messages

  create: async function (messageObj) {
    //connect to db
    db.connection.connect((error) => {
     if(error){
       console.log('Error connecting to the MySQL Database');
       return;
     }
     console.log('Connection established sucessfully');
    });

    var userId = await userModels.create(messageObj.username);

    //insert necessary key/values into messages table
    // console.log(`INSERT INTO MESSAGES VALUES (NULL, "${messageObj.message}", ${userId}, "${messageObj.roomname}");`);

    var completeMessage = await new Promise((resolve, reject) => {
      db.connection.query(`INSERT INTO MESSAGES VALUES (NULL, "${messageObj.message}", ${userId}, "${messageObj.roomname}");`, [], (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve('Message inserted!')
        }
    })
    })
    //close connection
    // db.connection.end((err) => {
    //   console.error(err);
    // })
    //return success message
    return completeMessage;
  } // a function which can be used to insert a message into the database
};
