var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var communicationSchema = new Schema({
  communicationId: Number,
  sender: Number, // userId
  text: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Communication', schema);
