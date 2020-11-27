/**
 * Created by sridharrajs.
 */

const http = require('http');

const app = require('../app');

class Server {
  static start(config) {
    return new Promise((resolve, reject) => {
      const server = http.createServer(app);
      server.listen(config.port, () => {
        resolve('success');
      }).on('error', (err) => {
        reject(err);
      });
    });
  }
}

module.exports = Server;
