require('mysql2')
import {getUnit, getUnitList, getTranscript, getCloser, savePage, delSavedPage} from "./unitsController"

exports.handler = async(event) => {
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/units/single') {
        const unitID = event.queryStringParameters.id;
        event.path = `/units/single/${unitID}`
        return getUnit(event)
    }
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/units/list') {
        return
    }
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/units/transcript') {
        return
    }
    if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/units/closer') {
        const unitID = event.queryStringParameters.id;
        event.path = `/units/closer/${unitID}`
        return getCloser(event)
    }
    if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/units/save') {
        const userID = event.queryStringParameters.userID;
        const slideID = event.queryStringParameters.slideID;
        event.path = `/units/save/${userID}/${slideID}`
        return savePage(event)
    }
    if (event.httpMethod === 'DEL' && event.path === '/.netlify/functions/units/unsave') {
        const userID = event.queryStringParameters.userID;
        const slideID = event.queryStringParameters.slideID;
        event.path = `/units/save/${userID}/${slideID}`
        return delSavedPage(event)
    }
}