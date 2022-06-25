var db = require('../db');

module.exports = {
  getAll: function () {
    //use connection.connect
    db.connection.connect((error) => {
     if(error){
       console.log('Error connecting to the MySQL Database');
       return;
     }
     console.log('Connection established sucessfully');
    });
    //on success query database for all messages
    var messages
    db.connection.query('SELECT * FROM MESSAGES', [], (err, results) => {
      messages = results;
    })
    //close connection
    //db.connection.end((err) => {
    //  console.error(err);
    //})
    //return array of all message objects
    return messages;
  }, // a function which produces all the messages

  create: function (messageObj) {
    //connect to db
    db.connection.connect((error) => {
     if(error){
       console.log('Error connecting to the MySQL Database');
       return;
     }
     console.log('Connection established sucessfully');
    });
    //insert necessary key/values into messages table
    db.connection.query(`INSERT INTO MESSAGES VALUES (NULL, '${messageObj.username}');`, [], () => {
      console.log('Message Inserted')
    })
    //close connection
    // db.connection.end((err) => {
    //   console.error(err);
    // })
    //return success message
    return
  } // a function which can be used to insert a message into the database
};
