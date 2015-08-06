var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var houseSchema = new Schema({
  houseId: Number,
  houseName: String,
  members: [{user: Number}], // array of user id's
  tasks: [{task: Number}], // array of task id's
  messages: [{communication: Number}], // array of communication id's
  expenses: [{expense: Number}], // array of expense id's
});

module.exports = mongoose.model('House', schema);
