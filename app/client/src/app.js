(function () {
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

	function configuration($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
		let SRC_FDLR = 'src/';
		let AUTH_FDLR = 'auth/';
		let HOME_FDLR = 'home/';
		let REPORT_FDLR = 'report/';
		let PREF_FDLR = 'pref/';
		let VIEW_FLDR = 'view/';

		$stateProvider
			.state('login', {
				url: '/',
				controller: 'AuthCtrl as authCtrl',
				templateUrl: SRC_FDLR + AUTH_FDLR + VIEW_FLDR + '/login.html',
			})
			.state('register', {
				url: '/register',
				controller: 'AuthCtrl as authCtrl',
				templateUrl: SRC_FDLR + AUTH_FDLR + VIEW_FLDR + '/register.html',
			})
			.state('home', {
				url: '/home',
				controller: 'HomeCtrl as homeCtrl',
				redirectTo: 'home.dashboard',
				templateUrl: SRC_FDLR + HOME_FDLR + VIEW_FLDR + '/home.html',
				resolve: {
					profile: getProfile,
					sites: getSites
				}
			})
			.state('home.dashboard', {
				url: '/dashboard',
				controller: 'DashboardCtrl as dashboardCtrl',
				templateUrl: SRC_FDLR + HOME_FDLR + VIEW_FLDR + '/dashboard.html'
			})
			.state('home.preferences', {
				url: '/preferences',
				templateUrl: SRC_FDLR + PREF_FDLR + VIEW_FLDR + '/preferences.html'
			})
			.state('home.preferences.customizeReport', {
				url: '/report',
				templateUrl: SRC_FDLR + PREF_FDLR + VIEW_FLDR + '/customizeReport.html'
			})
			.state('report', {
				url: '/create/report',
				controller: 'ReportsCtrl as reportsCtrl',
				templateUrl: SRC_FDLR + REPORT_FDLR + VIEW_FLDR + '/reportHome.html'
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


	function getProfile(User, Auth) {
		return User
			.getProfile()
			.then((data) => {
				return data;
			});
	}

	function getSites(User, Auth) {
		return User
			.getSites()
			.then((data) => {
				return data;
			});
	}


}());
