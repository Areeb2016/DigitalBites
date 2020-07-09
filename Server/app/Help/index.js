const controller = require('./controller');
const router = require('express').Router();
const Authorization = require('../utils/roleAuthorization');
const nodemailer = require('nodemailer');
module.exports = function (passport) {
  
  router.get('/health', 
    // passport.authenticate('jwt', { session: false }),
    // Authorization.roleAuthorization(['admin']),
    controller.index
  );
  router.post('/contact',

  
  controller.Mail
  )
  router.post('/sms',

  controller.sms
  )
  return router;
};
