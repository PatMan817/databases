var db = require('../db');

module.exports = {
  getAll: function () {
    //use connection.connect
    console.log('Users getAll')
    db.connection.connect((error) => {
      if(error){
        console.log('Error connecting to the MySQL Database');
        return;
      }
      console.log('Connection established sucessfully');
    });
    //on success query database for all messages
    var users;
    db.connection.query('SELECT * FROM USERS', [], (err, results) => {
      users = results;
    })
    //close connection
    db.connection.end((err) => {
      console.error(err);
    })
    //return array of all message objects
    return users;
  },

  create: function (username) {
    //connect to db
    db.connection.connect((error) => {
      if(error){
        console.log('Error connecting to the MySQL Database');
        return;
      }
      console.log('Connection established sucessfully');
    });
    var newUserID;
    //insert necessary key/values into messages table
    db.connection.query(`INSERT INTO USERS VALUES (NULL, '${username}');`, [], function(err, res) {
      newUserID = res.insertID;
    })
    //close connection
    db.connection.end((err) => {
      console.error(err);
    })
    //return success message
    return newUserID;
  }
};
