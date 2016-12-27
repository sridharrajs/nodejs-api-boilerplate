/**
 * Created by sridharrajs on 1/13/16.
 */

'use strict';

let mongoose = require('mongoose');

let db = mongoose;

class ConnectionFactory {
  
  static connect(config) {
    db.connect(config.mongdbUrl);
    return new Promise((resolve, reject) => {
      db.connection.on('open', function() {
        resolve('Success');
      }).on('error', function(err) {
        reject(err);
      });
    });
  }
  
}

module.exports = ConnectionFactory;
