const knex = require("knex")(require("./knexfile"));
require("mysql2");

const getChapters = async (event, context) => {
  try {
    const chapterList = await knex("chapters").select("*");
    const userAccess = await knex("users")
      .where({ id: event.queryStringParameters.userID })
      .first();

    chapterList.forEach((chapter) => {
      if (chapter.id <= userAccess.chapter) {
        chapter.available = 1;
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(chapterList),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error Retrieving Chapter Data" }),
    };
  }
};

const getSections = async (event, context) => {
  try {
    const sectionList = await knex("sections")
      .select("*")
      .where({ chapter_id: event.queryStringParameters.chapterID });

    const userAccess = await knex("users")
      .where({ id: event.queryStringParameters.userID })
      .first();

    sectionList.forEach((section) => {
      if (section.id <= userAccess.section) {
        section.available = 1;
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(sectionList),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "No section found with that id" }),
    };
  }
};
const getUnits = async (event, context) => {
  try {
    const unitList = await knex("units")
      .select("*")
      .where({ section_id: event.queryStringParameters.sectionID });

    const userAccess = await knex("users")
      .where({ id: event.queryStringParameters.userID })
      .first();

    unitList.forEach((unit) => {
      if (unit.id <= userAccess.unit) {
        unit.available = 1;
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(unitList),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "No unit found with that id" }),
    };
  }
};

module.exports = { getChapters, getSections, getUnits };
