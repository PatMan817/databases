var models = require('../models');

module.exports = {
  get: async function (req, res) {
    //var messageData = invoke getAll whch returns array of message objects
    var messageData = await models.messages.getAll();
    //res.writeHead(200, headers)
    res.end(JSON.stringify(messageData))
  }, // a function which handles a get request for all messages
  post: async function (req, res) {
    var message = req.body;
    //invoke create on message
    console.log('in messages controllers this is message obj: ', message)
    var returnMessage = await models.messages.create(message);
    //return success
    res.end(returnMessage, (err) => {
      if (err) {
        console.error(err)
      }
    })
  } // a function which handles posting a message to the database
};
