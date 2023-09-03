const {signUp, login, exists, checkNew, patchNew, getProgress, update} = require('./usersController')
const bcrypt = require("bcrypt");
require('mysql2')


exports.handler = async (event) => {
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/user/signup') {
      return signUp(event)
    }
  
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/user/login') {
      return login(event)
    }

    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/user/exists') {
      return exists(event)
    }
  
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/user/checkNew') {
      const userID = event.queryStringParameters.userID;
      event.path = `/user/checkNew/${userID}`;
      return checkNew(event);
    }
  
  
    if (event.httpMethod === 'PATCH' && event.path === '/.netlify/functions/user/patchNew') {
      const userID = event.queryStringParameters.userID;
      event.path = `/user/patchNew/${userID}`;
      return patchNew(event)
    }
  
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/user/progress') {
      const userID = event.queryStringParameters.userID;
      event.path = `/user/progress/${userID}`;
      return getProgress(event)
    }
  
    if (event.httpMethod === 'PATCH' && event.path === '/.netlify/functions/user/update') {
      const userID = event.queryStringParameters.userID;
      const unitID = event.queryStringParameters.unitID;
      event.path = `/user/update/${userID}/${unitID}`
      return update(event)
    }
  
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not found' }),
    };
  };
