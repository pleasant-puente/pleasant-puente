/**
 * Home Harmony Login
 * Controller for login page
 */
angular.module('homeHarmony.login',['firebase', 'ui.router'])

.controller('LoginCtrl', function ($scope, $location, UserAuth, $firebaseObject, $state, DButil) {
  // database reference
  var db = new Firebase("https://dazzling-inferno-3592.firebaseio.com");
  var houseMembers = {};
  var hasHouse = false;

  // TODO: add clear localsession cache function and add it to loginUser

  $scope.logInUser = function() {
    // clear input fields
    $('#loginEmailField').val('');
    $('#loginPasswordField').val('');

    UserAuth.login($scope.email, $scope.password, function (userEmail){  // send login info to Auth with this callback

      //try to factor this out as a separate named function "at some later date"

      // Query database for user info
      db.once("value", function(snapshot) {
        var totalDb = snapshot.val();
        var userDb = totalDb.users;
        console.log('uemail', userEmail)
        for (var userId in userDb){
          if (userDb[userId].email === userEmail) {
            // Save id from database into local storage
            currentUserId = userId;
            localStorage.setItem("currentUserEmail", userEmail);
            localStorage.setItem("currentUserName", userDb[userId].firstname);
            localStorage.setItem("currentUserId", currentUserId);

            if (userDb[userId].house) {
              // Save house info and redirect to dashboard if user has a house
              hasHouse = true;
              currentHouseId = userDb[userId].house;
              localStorage.setItem("currentHouseId", currentHouseId);
              $state.go('dash.default');
            } else {
              // redirect to newHouse if user doesnt have a house yet
              $state.go('newHouse');
            }
            console.log('CHID ', currentHouseId);

            // Don't search through the rest of the db once you've found the right user
            break;
          }
        }
        console.log(currentUserId, 'CUID')

        if (hasHouse){
          for (var userId2 in userDb){
            if (userDb[userId2].house === currentHouseId){  // add house index to the db "later"
              houseMembers[userId2] = userDb[userId2].firstname + " " + userDb[userId2].lastname[0] + ".";
            }
          }
          localStorage.setItem("currentMembersObj", JSON.stringify(houseMembers));
        }

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    });
  };
});
