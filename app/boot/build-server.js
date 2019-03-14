/**
 * Created by sridharrajs.
 */

'use strict';

const http = require('http');

const app = require('../app');

class Server {

  static start(config) {
    let server = http.createServer(app);
    return new Promise((resolve, reject) => {
      server.listen(config.port, () => {
        resolve('success');
      }).on('error', err => {
        reject(err);
      });
    });
  }

}

module.exports = Server;
