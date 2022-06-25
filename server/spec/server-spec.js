/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect(() => {
      console.log('connected')
    });

       const tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    //dbConnection.query('SET FOREIGN_KEY_CHECKS = 0;')
    //dbConnection.query(`truncate rooms`, done);
    //dbConnection.query(`truncate users`, done);
    //dbConnection.query(`truncate ${tablename}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
   const username = 'Valjean';
   const message = 'In mercy\'s name, three days is all I need.';
   const roomname = 'Hello';
   // Create a user on the chat server database.
   console.log('Test start');
   axios.post(`${API_URL}/users`, { username })
     .then(() => {
       // Post a message to the node chat server:
       console.log('Axios Start');
       return axios.post(`${API_URL}/messages`, { username, message, roomname });
     })
     .then(() => {
       // Now if we look in the database, we should find the posted message there.

       /* TODO: You might have to change this test to get all the data from
        * your message table, since this is schema-dependent. */
       const queryString = 'SELECT * FROM messages';
       const queryArgs = [];

       dbConnection.query(queryString, queryArgs, (err, results) => {
         if (err) {
           throw err;
         }
         // Should have one result:
         expect(results.length).toEqual(1);
         console.log(`Return of first test: ${JSON.stringify(results)}`)

         // TODO: If you don't have a column named text, change this test.
         console.log(results[0].message_text)
         expect(results[0].message_text).toEqual(message);
         done();
       });
     })
     .catch((err) => {
       throw err;
     });
  });

  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db
       const queryString = 'INSERT INTO messages VALUES(NULL);';
       const queryArgs = [];
    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }
console.log('line 80')
      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          console.log(`Return of second test: ${messageLog}`)
          expect(messageLog[0].text).toEqual(message);
          expect(messageLog[0].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
