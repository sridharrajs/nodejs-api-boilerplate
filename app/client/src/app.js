(function() {
    'use strict';


    var enviornment = {
        'local': {
            serverURL: 'http://localhost:9999/api/'

        }
    };

    var selectedEnv = enviornment[env];
    var selectedServerURL = selectedEnv.serverURL;

    angular
        .module('wpReports', ['ui.router', 'ngMessages', 'ui.bootstrap', 'angular-ladda', 'ui.layout', 'ui.select','daterangepicker','angularSpectrumColorpicker'])

    .config(configuration)
        .constant('SERVERURL', selectedServerURL)
        .run(initApp);


    function configuration($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        var SRC_FDLR = 'src/';
        var AUTH_FDLR = 'auth/';
        var HOME_FDLR = 'home/';
        var REPORT_FDLR = 'report/';
        var PREF_FDLR = 'pref/';
        var VIEW_FLDR = 'view/';

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
                resolve:{
                	profile:getProfile,
                	sites:getSites
                }
            })
            .state('home.dashboard', {
                url: '/dashboard',
                controller: 'DashboardCtrl as dashboardCtrl',
                templateUrl: SRC_FDLR + HOME_FDLR + VIEW_FLDR + '/dashboard.html'
            })
            .state('home.reports', {
                url: '/reports',
                redirectTo: 'home.reports.sent',
                controller: 'ReportsCtrl as reportsCtrl',
                templateUrl: SRC_FDLR + HOME_FDLR + VIEW_FLDR + '/reports.html'
            })
            .state('home.reports.sent', {
                url: '/sent',
                templateUrl: SRC_FDLR + HOME_FDLR + VIEW_FLDR + '/sentReport.html'
            })
            .state('home.reports.scheduled', {
                url: '/scheduled',
                templateUrl: SRC_FDLR + HOME_FDLR + VIEW_FLDR + '/scheduledReport.html'
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
        var authToken = Auth.getToken();
        if (authToken) {
            return true;
        }
        return false;
    }


    function initApp($rootScope, Auth, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name !== 'login' && toState.name !== 'register') {
                if (!isAuthenticated(Auth)) {
                    event.preventDefault();
                    $state.go('login');
                }
            }
            if (toState.name === 'login' || toState.name ==='register') {
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


    function getProfile(User,Auth){
    	return User.getProfile().then(function(data){
    		return data;
    	});
    	// .catch(function(err){
    	// 	Auth.logout();
    	// });
    }

    function getSites(User,Auth){
    	return User.getSites().then(function(data){
    		return data;
    	});
    }


}());
