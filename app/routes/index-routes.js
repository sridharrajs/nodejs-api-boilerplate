/**
 * Created by sridharrajs.
 */

const router = require('express').Router();
const userController = require('../controllers/user-controller');

const { APP_NAME } = process.env;

function index(req, res) {
  let title = APP_NAME;
  let msg = 'Hello world!';

  if (APP_NAME === '<Your app name>') {
    title = 'Hello world!';
    msg = 'Please set \'APP_NAME\' in env';
  }

  return res.render('index', {
    msg,
    $APP_NAME$: title,
  });
}

function verify(req, res) {
  const { token: verificationHash } = req.query;
  if (!verificationHash) {
    return res.render('incorrect', {
      $APP_NAME$: APP_NAME,
    });
  }

  userController.getByVerificationHash(verificationHash).then((user) => {
    if (!user) {
      return res.render('incorrect', {
        $APP_NAME$: APP_NAME,
      });
    }

    if (user.verification_hash === verificationHash) {
      return userController.verifyCustomEmailUser(user._id).then(() => {
        return res.render('verified', {
          $APP_NAME$: APP_NAME,
        });
      });
    }

    return res.render('incorrect', {
      $APP_NAME$: APP_NAME,
    });
  }).catch((err) => {
    console.log('err', err);
    return res.render('error');
  });
}

router.get('/', index);
router.get('/verify', verify);

module.exports = router;
