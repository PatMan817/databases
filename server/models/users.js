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
    // db.connection.end((err) => {
    //   console.error(err);
    //})
    //return array of all message objects
    return users;
  },

  create: async function (username) {
    //connect to db
    db.connection.connect((error) => {
      if(error){
        console.log('Error connecting to the MySQL Database');
        return;
      }
      console.log('Connection established sucessfully');
    });
    //check to see if user exists
    var currentUserObj = await new Promise((resolve, reject) => {db.connection.query(`SELECT user_id from USERS where username = '${username}';`, [], function(err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res[0])
      }
    }
    )})

    if (currentUserObj === undefined) {
      currentUserObj = await new Promise((resolve, reject) => {db.connection.query(`INSERT INTO USERS VALUES (NULL, '${username}');`, [], function(err, res) {
        if (err) {
          reject(err)
        } else {
          resolve (res.insertId)
        }
      }
    )})
    } else {
      currentUserObj = currentUserObj.user_id;
    }

    //insert necessary key/values into messages table
    //close connection
    // db.connection.end((err) => {
    //   console.error(err);
    // })
    //return success message
    console.log('Log in users models of user_id: ', currentUserObj)
    return currentUserObj;
  }
};
