require('mysql2')
const {getChapters, getSections, getUnits} = require('./chaptersController')

exports.handler = async (event) => {
    if (event.httpMethod === 'GET' && event.path === './netlify/functions/chapters/:userID') {
        const userID = event.queryStringParameters.userID;
        event.path = `/chapters/${userID}`;
        return getChapters(event)
    }
    if (event.httpMethod === 'GET' && event.path === './netlify/functions/chapters/sections/:userID/:chapterID') {
        const userID = event.queryStringParameters.userID;
        const chapterID = event.queryStringParameters.chapterID;
        event.path = `/chapters/sections/${userID}/${chapterID}`;
        return getSections(event)
    }
    if (event.httpMethod === 'GET' && event.path === './netlify/functions/chapters/units/:userID/:sectionID') {
        const userID = event.queryStringParameters.userID;
        const sectionID = event.queryStringParameters.sectionID;
        event.path = `/chapters/units/${userID}/${sectionID}`;
        return getUnits(event)
    }
  
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not found' }),
    };
  };