/**
 * Created by sridharrajs on 1/13/16.
 */



const mongoose = require('mongoose');

const db = mongoose;

db.Promise = global.Promise;

class ConnectionFactory {

  static connect(mongodbUrl) {
    db.connect(mongodbUrl, {
      useMongoClient: true
    });
    return new Promise((resolve, reject) => {
      db.connection.on('open', () => {
        resolve('CONNECTION SUCCESS');
      }).on('error', err => {
        reject(err);
      });
    });
  }

  static disconnect(){
    db.connection.close();
    return new Promise((resolve, reject) => {
      db.connection.on('disconnected', () => {
        resolve('DISCONNECT SUCCESS');
      }).on('error', err => {
        reject(err);
      });
    });
  }

}

module.exports = ConnectionFactory;
