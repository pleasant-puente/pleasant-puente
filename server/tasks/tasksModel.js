var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  taskId: Number,
  taskName: String,
  description: String,
  assignees: [{user: Number}], // array of user id's
  cost: { type: Number, default: 0 },
  dueDate: Date,
  repeat: { type: Number, default: -1 },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', schema);
