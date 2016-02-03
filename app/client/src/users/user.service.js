'use strict';

angular
	.module('wpReports')
	.service('User', User);

function User($http, SERVERURL) {
	return {
		getProfile: () => {
			return $http.get(SERVERURL + 'users/me');
		},
		getSites: () => {
			return $http.get(SERVERURL + 'sites');
		}
	};
}

