angular.module('wpReports')
    .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ["Auth", "$log", "$state"];

function AuthCtrl(Auth, $log, $state) {
    var self = this;

    self.login = login;
    self.register = register;

    self.user = {
        emailId: '',
        password: ''
    };

    function login(isValid) {
        if (!isValid) {
            return;
        }
        self.loginLoading = true;
        Auth.login(self.user).then(function(data) {
            $log.info("Auth Successful");
            self.loginLoading = false;
            $state.go('home');
        }).catch(function(error) {
            $log.error(error);
            self.loginLoading = false;
        });
    }

    function register(isValid) {
        if (!isValid) {
            return;
        }
        self.registerLoading = true;
        Auth.signup(self.user).then(function(data) {
            $log.info("registeration Successful");
            self.registerLoading = false;
            $state.go('home');
        }).catch(function(error) {
            self.registerLoading = false;
            $log.error(error);
        });
    }

}
