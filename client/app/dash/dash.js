angular.module('homeHarmony.dash',[])

.controller('dashCtrl', function ($scope) {
  $('.button-collapse').sideNav();
  console.log('button-collapse enabled');
});
