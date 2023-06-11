const {signUp, login, checkNew, patchNew, getProgress, update} = require('./usersController')
const bcrypt = require("bcrypt");
require('mysql2')


exports.handler = async (event) => {
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/user/signup') {
      return signUp(event)
    }
  
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/user/login') {
      return login(event)
    }
  
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/user/checkNew') {
      const userID = event.queryStringParameters.userID;
      event.path = `/user/checkNew/${userID}`;
      return checkNew(event);
    }
  
  
    if (event.httpMethod === 'PATCH' && event.path === '/.netlify/functions/user/patchNew/:userID') {
      return patchNew(event)
    }
  
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/user/progress/:userID') {
      return getProgress(event)
    }
  
    if (event.httpMethod === 'PATCH' && event.path === '/.netlify/functions/user/update/:userID/:unitID') {
      return update(event)
    }
  
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not found' }),
    };
  };
