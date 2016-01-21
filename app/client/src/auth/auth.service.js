angular.module('wpReports')
    .factory('Auth', Auth);

Auth.$inject = ['SERVERURL', '$http', '$window', '$state'];

function Auth(SERVERURL, $http, $window, $state) {
    var auth = {
        login: function(data) {
            return $http.post(SERVERURL + 'login', data);
        },
        signup: function(data) {
            return $http.post(SERVERURL + 'users', data);
        },
        saveToken: function(token) {
            return $window.localStorage['authToken'] = token;

        },
        getToken: function() {
            return $window.localStorage['authToken'];
        },
        removeToken: function() {
            return $window.localStorage.removeItem('authToken');
        },
        parseJwt: function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        },
        logout: function() {
            this.removeToken();
            $state.go('login');
        },
        isAuthed: function() {
            var token = this.getToken();
            if (token) {
                var params = this.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        }
    };
    return auth;
}
