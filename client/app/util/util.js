/**
 * Home Harmony Util
 * contains utility function(s) for database operations
 */
angular.module('homeHarmony.util', ['firebase'])

.factory('DButil', function() {
  // database reference
  var db = new Firebase("https://dazzling-inferno-3592.firebaseio.com");

  return {
    // returns the unique id for the user with the given email
    // returns 'DEFAULT_USER_ID' if invalid user
    getUserIdFromEmail: function(userEmail, cb) {
      db.once("value", function(snapshot) {

        var usersDb = snapshot.val().users;
        var resultId = 'DEFAULT_USER_ID';
        for (var uid in usersDb){
          if (usersDb[uid].email === userEmail){
            resultId = uid;
          }
        }
        cb(resultId); // callback function
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    },

    populateEmailDb: function(){
      var emailDbObj = {};  // build up data in this to send to db all at once
      var today = Date.parse(new Date());
      var ONE_DAY = 86400000;
      db.once("value", function(snapshot) {

        var totalDb = snapshot.val();
        var houseDb = totalDb.houses;

        // iterate through all the houses
        for (var thisHouse in houseDb) {  // It'd be lovely to break this out into a separate function

          // iterate though all expenses in this house
          for (var expenseId in houseDb[thisHouse].expenses) {
            var thisExpense = houseDb[thisHouse].expenses[expenseId];

            // queue reminder email if there's an unpaid bill within a week of its due date that's not more than 2 weeks overdue
            if (today - Date.parse(thisExpense.dueDate) < ONE_DAY * 7
              && today - Date.parse(thisExpense.dueDate) > ONE_DAY * -14
              && !thisExpense.paid){
              thisTask.type = "expense";
              emailDbObj[thisExpense.member].todos = emailDbObj[thisExpense.member].todos || [];
              emailDbObj[thisExpense.member].todos.push(thisExpense);
            }
          }

          // iterate though all tasks in this house
          for (var taskId in houseDb[thisHouse].tasks) {
            var thisTask = houseDb[thisHouse].tasks[taskId];

            // queue reminder email if there's an undone task within a day of its due date that's not more than a week overdue
            if (today - Date.parse(thisTask.dueDate) < ONE_DAY
              && today - Date.parse(thisTask.dueDate) > ONE_DAY * -7
              && !thisTask.paid){
              thisTask.type = "task";
              emailDbObj[thisTask.member].todos = emailDbObj[thisTask.member].todos || [];
              emailDbObj[thisTask.member].todos.push(thisTask);
            }
          }
        }

        // push emails to be written into db
        for (var thisMember in emailDbObj) {
          var taskList = String(emailDbObj[thisMember].todos[0]);
          for (var i = 1; i < emailDbObj[thisMember].todos; i++) {
            taskList += "\n" + String(emailDbObj[thisMember].todos[0])
          }
          var user = totalDb.users[emailDbObj[thisMember]]
          db.child('emails').push({
            address: user.email,
            name: user.firstname,
            text: "Hello, " + user.firstname + ",\n" +
                  "These are your bills and tasks due soon:\n" +
                  taskList + "\n" +
                  "Have a lovely day,\n" +
                  "The Home Harmony Team"

          })
        }
      })
    },

  };
});
