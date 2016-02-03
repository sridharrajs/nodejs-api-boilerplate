angular.module('wpReports')
	.service('User', User);

function User($http, SERVERURL) {
	return {
		getProfile: function () {
			return $http.get(SERVERURL + 'users/me');
		},
		getSites: function () {
			return $http.get(SERVERURL + 'sites');
		}
	};
}

