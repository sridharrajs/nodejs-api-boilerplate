'use strict';

angular
	.module('wpReports')
	.controller('HomeCtrl', HomeCtrl);

function HomeCtrl(Auth, $state, profile, sites) {
	var self = this;
	self.logout = logout;
	self.profile = profile;
	self.sites = sites;

	function logout() {
		Auth.logout();
	}
}
