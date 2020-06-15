
angular.module('starter', ['ionic']).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.Keyboard && window.Keyboard.hideKeyboardAccessoryBar) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: "/home",
    views: {
      main: {
        templateUrl: "views/home.html",
        controller: 'HomeController'
      }
    }
  });
  $urlRouterProvider.otherwise('/home');
}).controller('HomeController', function ($scope) {
  if (window.bluetoothle) {
    $scope.bluetoothAvailable = true;

    window.bluetoothle.isEnabled(function (enabled) {
      $scope.bluetoothEnabled = enabled && enabled.isEnabled;
    });
  } else {
    $scope.bluetoothAvailable = false;
  }
});
