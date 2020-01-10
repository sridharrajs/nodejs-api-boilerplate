

function validateUserInput(req, res, next) {

  req.checkBody('email').exists().withMessage('Email id is required');
  req.checkBody('email').isEmail().withMessage('A valid email id is required');

  req.checkBody('password').exists().withMessage('Password is required');
  req.checkBody('password').exists().custom(value => {
    return value && value.length >= 8;
  }).withMessage('A password should at least be 8 characters');

  let errors = req.validationErrors();
  if (errors && errors.length > 0) {
    return res.status(422).send({
      errors: errors[0]
    });
  }

  next();

}

module.exports = validateUserInput;
