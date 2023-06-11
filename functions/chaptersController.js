const knex = require("knex")(require("./knexfile"));
require("mysql2");

const getChapters = async (event, context) => {
    const userID = event.queryStringParameters.userID;

  try {
    const chapterList = await knex("chapters").select("*");
    const userAccess = await knex("users")
      .where({ id: userID })
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
    const userID = event.queryStringParameters.userID;
        const chapterID = event.queryStringParameters.chapterID;
  try {
    const sectionList = await knex("sections")
      .select("*")
      .where({ chapter_id: chapterID });

    const userAccess = await knex("users")
      .where({ id: userID })
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
    const userID = event.queryStringParameters.userID;
    const sectionID = event.queryStringParameters.sectionID;
  try {
    const unitList = await knex("units")
      .select("*")
      .where({ section_id: sectionID });

    const userAccess = await knex("users")
      .where({ id: userID })
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
