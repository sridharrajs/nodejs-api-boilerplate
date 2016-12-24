'use strict';

angular
  .module('myApp')
  .factory('Auth', Auth);

Auth.$inject = ['SERVERURL', '$http', '$window', '$state'];

function Auth(SERVERURL, $http, $window, $state) {
  let auth = {
    login: (data) => {
      return $http.post(SERVERURL + 'users/login', data);
    },
    signup: (data) => {
      return $http.post(SERVERURL + 'users/signup', data);
    },
    saveToken: (token) => {
      return $window.localStorage['authToken'] = token;

    },
    getToken: () => {
      return $window.localStorage['authToken'];
    },
    removeToken: () => {
      return $window.localStorage.removeItem('authToken');
    },
    parseJwt: (token) => {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    },
    logout: () => {
      this.removeToken();
      $state.go('login');
    },
    isAuthed: () => {
      let token = this.getToken();
      if (token) {
        let params = this.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    }
  };
  return auth;
}
