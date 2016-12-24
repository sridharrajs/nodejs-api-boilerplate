'use strict';

angular
  .module('myApp')
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl(Auth, profile, sites) {
  let self = this;
  self.logout = logout;
  self.profile = profile;
  self.sites = sites;

  function logout() {
    Auth.logout();
  }
}
