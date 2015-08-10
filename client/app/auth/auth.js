angular.module('homeHarmony.auth',[])
.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://dazzling-inferno-3592.firebaseio.com");
    return $firebaseAuth(ref);
  }
])
.factory('UserAuth',['Auth',
  function (Auth){
    return {
      newUser: function (userEmail,userPassword){
        console.log(Auth.$createUser);
        Auth.$createUser({
          email    : userEmail,
          password : userPassword
        }).then(function(userData){
          console.log("new user created");
          console.log(userData);

          return Auth.$authWithPassword({
            email    : userEmail,
            password : userPassword
          });
        }).then(function(authData){
          console.log("Logged in as:",authData.uid);
          // $state.go('dash');
        }).catch(function(error){
          console.error("Error:",error);
        });
      },
      login: function (userEmail,attemptedPassword){
        Auth.$authWithPassword({
          email    : userEmail,
          password : attemptedPassword
        }).then(function(authData){
          console.log("Logged in as: ",authData.uid);
          // $state.go('dash');
        }).catch(function(error){
          console.error("Error:",error);
        });
      },
      logout: function (){
        Auth.unauth();
        //redirect
        $state.go('login');
      }
    };
  }
]);



