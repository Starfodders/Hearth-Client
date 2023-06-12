require('mysql2')
const {getUnit, getUnitList, getTranscript, getCloser, savePage, delSavedPage} = require("./unitsController")

exports.handler = async(event) => {
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/units/single') {
        const unitID = event.queryStringParameters.unitID;
        event.path = `/units/single/${unitID}`
        return getUnit(event)
    }
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/units/list') {
        const currUnit = event.queryStringParameters.currUnit;
        event.path = `/units/list/${currUnit}`
        return getUnitList(event)
    }
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/units/transcript') {
        const unitID = event.queryStringParameters.unitID;
        const pageNum = event.queryStringParameters.pageNum;
        event.path = `/units/transcript/${unitID}/${pageNum}`
        return getTranscript(event)
    }
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/units/closer') {
        const unitID = event.queryStringParameters.unitID;
        event.path = `/units/closer/${unitID}`
        return getCloser(event)
    }
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/units/save') {
        const userID = event.queryStringParameters.userID;
        const slideID = event.queryStringParameters.slideID;
        event.path = `/units/save/${userID}/${slideID}`
        return savePage(event)
    }
    if (event.httpMethod === 'DELETE' && event.path === '/.netlify/functions/units/unsave') {
        const userID = event.queryStringParameters.userID;
        const slideID = event.queryStringParameters.slideID;
        event.path = `/units/unsave/${userID}/${slideID}`
        return delSavedPage(event)
    }
    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not found' }),
      };
}