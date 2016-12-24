(function() {
  'use strict';

  let enviornment = {
    'local': {
      serverURL: 'http://localhost:9999/api/'
    }
  };

  let selectedEnv = enviornment[env];
  let selectedServerURL = selectedEnv.serverURL;

  angular
    .module('myApp', [
      'ui.router',
      'ngMessages',
      'ui.bootstrap',
      'angular-ladda',
      'ui.layout',
      'ui.select',
      'daterangepicker'
    ])
    .config(configuration)
    .constant('SERVERURL', selectedServerURL)
    .run(initApp);

  function configuration($stateProvider, $urlRouterProvider, $httpProvider) {
    let SRC_FDLR = 'src/';
    let AUTH_FDLR = 'auth/';
    let HOME_FDLR = 'home/';
    let VIEW_FLDR = 'view/';

    $stateProvider
      .state('login', {
        url: '/',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: SRC_FDLR + AUTH_FDLR + VIEW_FLDR + '/login.html',
      });

    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('APIInterceptor');
  }

  function isAuthenticated(Auth) {
    let authToken = Auth.getToken();
    if (authToken) {
      return true;
    }
    return false;
  }


  function initApp($rootScope, Auth, $state) {
    $rootScope.$on('$stateChangeStart', (event, toState) => {
      if (toState.name !== 'login' && toState.name !== 'register') {
        if (!isAuthenticated(Auth)) {
          event.preventDefault();
          $state.go('login');
        }
      }
      if (toState.name === 'login' || toState.name === 'register') {
        if (isAuthenticated(Auth)) {
          event.preventDefault();
          $state.go('home');
        }
      }
      if (toState.redirectTo) {
        event.preventDefault();
        $state.go(toState.redirectTo);
      }
    });
  }

}());
