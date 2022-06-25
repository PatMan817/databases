var models = require('../models');

module.exports = {
  get: async function (req, res) {
    //var messageData = invoke getAll whch returns array of message objects
    var messageData = await models.messages.getAll();
    //res.writeHead(200, headers)
    res.end(JSON.stringify(messageData))
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    var message = req.body.message;
    //invoke create on message
    models.messages.create(message);
    //return success
    res.end('Yay', (err) => {
      if (err) {
        console.error(err)
      }
    })
  } // a function which handles posting a message to the database
};
