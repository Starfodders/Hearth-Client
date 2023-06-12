require("mysql2");
const knex = require("knex")(require("./knexfile"));

exports.handler = async (event) => {
  if (
    event.httpMethod === "GET" &&
    event.path === "/.netlify/functions/collection"
  ) {
    const userID = event.queryStringParameters.userID;
    try {
      const retrieveSave = await knex("saved")
        .where({ user_id: userID })
        .select("user_id as user_id", "pages.*") //select specifics from each table
        .join("users", "saved.user_id", "=", "users.id") //join criteria based on user id
        .join("pages", "saved.pages_id", "=", "pages.id");

      return {
        statusCode: 200,
        body: JSON.stringify(retrieveSave),
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Error retrieving saved data" }),
      };
    }
  }
};
