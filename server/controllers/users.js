var models = require('../models');

module.exports = {
  get: async function (req, res) {
    //var userData = invoke getAll whch returns array of message objects
    console.log('Users Get')
    var userData = await models.users.getAll();
    //res.writeHead(200, headers)
    res.end(JSON.stringify(userData))
  },
  post: async function (req, res) {
    var username = req.body.username;
    var newID = await models.users.create(username)
    console.log(newID)
    res.end(newID)
  }
};
