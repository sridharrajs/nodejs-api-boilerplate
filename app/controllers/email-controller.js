const ses = require('node-ses');
const fs = require('fs');

const config = require('../../bin/config');

const client = ses.createClient({
  key: process.env.MAIL_USERNAME,
  secret: process.env.MAIL_PASSWORD
});

const customLoginTemplate = fs.readFileSync('./app/templates/welcome-custom-login.html', {encoding: 'utf8'});
const resetPasswordLetter = fs.readFileSync('./app/templates/reset-password.html', {encoding: 'utf8'});

function buildURL(hash) {
  return `${process.env.BASE_URL_WITH_PROTOCOL}/verify?token=${hash}`;
}

class EmailController {

  static sendWelcomeEmail(email, verificationHash) {
    if (!config.shouldSentEmail()) {
      return console.log(`Sending email to ${email} => stopped due to configuration`);
    }

    const appName = process.env.APP_NAME;

    client.sendEmail({
      to: email,
      from: `admin@${appName}`,
      subject: `Welcome to ${appName}`,
      message: customLoginTemplate.replace('$magic_link$', buildURL(verificationHash))
        .replace('$APP_NAME$', appName)
    }, err => {
      if (err) {
        console.log('err in sendWelcomeEmail()::EmailController', err);
      }
    });
  }

  static sendRestCode(email, tempPassword) {
    if (!config.shouldSentEmail()) {
      return console.log(`Sending email to ${email} => stopped due to configuration`);
    }

    const appName = process.env.APP_NAME;

    client.sendEmail({
      to: email,
      from: `admin@${appName}`,
      subject: `Reset your password for ${appName}`,
      message: resetPasswordLetter.replace('$tempPassword$', tempPassword)
    }, err => {
      if (err) {
        console.log('err in sendRestCode()::EmailController ', err);
      }
    });
  }

}

module.exports = EmailController;
