/**
 * Created by sridharrajs.
 */

function setHeaders(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type');
  next();
}

module.exports = setHeaders;
