var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userId: Number,
  fullname: String,
  username: String,
  password: String, //Hashed
  house: { type: Number, default: -1 }, // the id for the users house

  /**
   * pendingPayment refers to the total amount
   * that the user needs to pay. This amount 
   * doesnt take deadlines or other factors
   * into account.
   */
  pendingPayment: { type: Number, default: 0 },

  /**
   * This refers to the tasks that 
   * the user needs to participate in.
   */
  tasks: [{task: Number}], // array of task id's
});

// Authentication methods go here
// userSchema.methods.?

module.exports = mongoose.model('User', schema);
