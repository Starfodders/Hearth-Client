const userController = require('./userController');

exports.handler = async (event) => {
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/user/signup') {
      return userController.signup(event);
    }
  
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/user/login') {
      return userController.login(event);
    }
  
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/user/checkNew/:userID') {
      return userController.checkNew(event);
    }
  
    if (event.httpMethod === 'PATCH' && event.path === '/.netlify/functions/user/patchNew/:userID') {
      return userController.patchNew(event);
    }
  
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/user/progress/:userID') {
      return userController.getProgress(event);
    }
  
    if (event.httpMethod === 'PATCH' && event.path === '/.netlify/functions/user/update/:userID/:unitID') {
      return userController.update(event);
    }
  
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not found' }),
    };
  };