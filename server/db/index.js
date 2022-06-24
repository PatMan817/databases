var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat'
});

// connection.connect((error) => {
//   if(error){
//     console.log('Error connecting to the MySQL Database');
//     return;
//   }
//   console.log('Connection established sucessfully');
// });

//connection.end((error) => {
//});

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
// On Campus at pairing stations you'll use
// user: 'student', password: 'student'
// On your personal computer supply the correct credentials for your mySQL account -- likely
// user: 'root', password: ''
// OR
// user: 'root', password: 'some_password_you_created_at_install'

exports.connection = connection;