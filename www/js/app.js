
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
}).controller('HomeController', function ($scope, $timeout) {
  if (window.bluetoothle) {
    $scope.bluetoothAvailable = true;

    window.bluetoothle.isEnabled(function (enabled) {
      $scope.bluetoothEnabled = enabled && enabled.isEnabled;
    });
  } else {
    $scope.bluetoothAvailable = false;
  }
  $scope.bluetoothClassicAvailable = window.bluetooth ? true : false;
  if (window.screen && window.screen.orientation) {
    $scope.orientationAvailable = true;
    $scope.currentOrientation = window.screen.orientation.type;
    window.addEventListener("orientationchange", function () {
      $timeout(function () {
        $scope.currentOrientation = window.screen.orientation.type;
      }, 60);
    });
  } else {
    $scope.orientationAvailable = false;
  }
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.diagnostic) {
    $scope.diagnosticAvailable = true;
    $scope.restartAvailable = window.cordova.plugins.diagnostic.restart ? true : false;
  } else {
    $scope.diagnosticAvailable = false;
    $scope.restartAvailable = false;
  }
  var thisDevice = ionic.Platform.device();
  if (thisDevice && thisDevice.model && thisDevice.model.length) {
    $scope.deviceAvailable = true;
  } else {
    $scope.deviceAvailable = false;
  }

  try {
    Capacitor.Plugins.CapacitorKeepScreenOn.enable().then(function () {
      $scope.screenOn = true;
    }, function () {
      $scope.screenOn = false;
    });
  } catch (e) {
    $scope.screenOn = false;
  }
  try {
    Capacitor.Plugins.Device.getInfo().then(function () {
      $scope.capacitorDevice = true;
    }, function () {
      $scope.capacitorDevice = false;
    });
  } catch (e) {
    $scope.capacitorDevice = false;
  }
  try {
    if (Capacitor.Plugins.Share) {
      $scope.shareAvailable = true;
    } else {
      $scope.shareAvailable = false;
    }
  } catch (e) {
    $scope.shareAvailable = false;
  }
});
