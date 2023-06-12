const knex = require("knex")(require("./knexfile"));
require("mysql2");

const getUnit = async (event, context) => {
  const unitID = event.queryStringParameters.id;
  try {
    const unit = await knex("pages").where({ unit_id: unitID });

    return {
      statusCode: 200,
      body: JSON.stringify({ unit }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Error retrieving unit ${unitID}` }),
    };
  }
};

const getUnitList = async (event, context) => {};

const getTranscript = async (event, context) => {};

const getCloser = async (event, context) => {
  const unitID = event.queryStringParameters;
  try {
    const closerInfo = await knex("finishData").where({ id: unitID }).first();
    return {
      statusCode: 200,
      body: JSON.stringify({ closerInfo }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error retrieving closer unit ${unitID}`,
      }),
    };
  }
};

const savePage = async (event, context) => {
  const userID = event.queryStringParameters.userID;
  const slideID = event.queryStringParameters.slideID;
  try {
    const newSaved = {
      pages_id: slideID,
      userID,
    };

    await knex("saved").insert(newSaved);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Slide saved successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Unable to save slide ${slideID}` }),
    };
  }
};

const delSavedPage = async (event, context) => {
    const userID = event.queryStringParameters.userID;
  const slideID = event.queryStringParameters.slideID;
  try {
    await knex("saved").where({pages_id: slideID, user_id: userID}).del()

    return {
      statusCode: 204,
      body: JSON.stringify({ message: "Slide unsaved successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `Unable to find saved slide ${slideID}` }),
    };
  }
};

module.exports = {
  getUnit,
  getUnitList,
  getTranscript,
  getCloser,
  savePage,
  delSavedPage,
};
