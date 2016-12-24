/**
 * Created by sridharrajs
 */

'use strict';

let _ = require('lodash');

let modals = [
  'user'
];

function init() {
  _.each(modals, (model)=> {
    require(`./${model}`);
  });
  return Promise.resolve('Success');
}

module.exports = {
  init
};



