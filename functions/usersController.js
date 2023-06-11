const knex = require("knex")(require("./knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('mysql2')

const signUp = async (event, context) => {
  const { given_name, email, password } = JSON.parse(event.body);

  if (!given_name || !email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing information from input fields",
      }),
    };
  }

  try {
    const checkUserExist = await knex("users").where({ email });

    if (checkUserExist.length > 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `User Already Exists At ${email}` }),
      };
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = {
      given_name,
      email,
      password: hash,
    };

    const [newUserId] = await knex("users").insert(newUser);
    const [createdUser] = await knex("users").where("id", newUserId);
    return {
      statusCode: 201,
      body: JSON.stringify(createdUser),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error while creating new user" }),
    };
  }
};

const login = async (event, context) => {
  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing data from input fields" }),
    };
  }

  try {
    //first checks if email exists
    const getUserCreds = await knex("users").where({ email });
    if (getUserCreds.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }
    //now check found user's password against input
    const user = getUserCreds[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Incorrect password" }),
      };
    } else {
      //if all matches, get their given name send back token + name as a claim
      const getName = await knex("users").where({ email });
      if (getName) {
        const givenName = getName[0].given_name;
        const userId = getName[0].id;
        const token = jwt.sign({ name: givenName, id: userId }, "secretKey");
        return {
          statusCode: 200,
          body: JSON.stringify({ token }),
        };
      } else {
        const token = jwt.sign({ name: "Guest" }, "secretKey");
        return {
          statusCode: 200,
          body: JSON.stringify({ token }),
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error occurred while logging in" }),
    };
  }
};

const checkNew = async (event, context) => {
  const userID = event.queryStringParameters.userID;
  try {
    const user = await knex("users").where({ id: userID }).first();
    return {
      statusCode: 200,
      body: JSON.stringify({
        isNew: user.newbie,
        progress: user.chapter,
        currentUnitToNav: user.unit,
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error checking if user is new" }),
    };
  }
};

const patchNew = async (event, context) => {
  const userID = event.queryStringParameters.userID;
  try {
    const user = await knex("users")
      .where({ id: userID })
      .first()
      .update({ newbie: false });
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "No user found" }),
    };
  }
};

const getProgress = async (event, context) => {
  const userID = event.queryStringParameters.userID;
  try {
    const user = await knex("users").where({ id: userID }).first();
    const completedChapters = await knex("units")
      .select("sections.chapter_id", knex.raw("count(*) as units_complete"))
      .join("sections", "units.section_id", "=", "sections.id")
      .where("sections.chapter_id", "<=", user.chapter)
      .where("units.id", "<=", user.current_progress)
      .groupBy("sections.chapter_id");
    const completedSections = await knex("units")
      .select("units.section_id", knex.raw("count(*) as units_complete"))
      .where("units.id", "<=", user.current_progress)
      .groupBy("units.section_id");
    const userProgress = {
      current: user.current_progress,
      unit: user.unit,
      completedChapters,
      completedSections,
    };
    return {
      statusCode: 200,
      body: JSON.stringify({ userProgress }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Cannot find user" }),
    };
  }
};

const update = async (event, context) => {
  const { userID, unitID } = event.params;
  const updateUnit = parseInt(unitID) + 1;
  try {
    const getUser = await knex("users").where({ id: userID }).first();

    if (!getUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `No User Found at ID ${userID}` }),
      };
    } else {
      //checks for current progress
      if (getUser.current_progress >= parseInt(unitID)) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message:
              "User found but no update provided as current progress is higher than current unit completed",
          }),
        };
      } else {
        //if completed unit is newest available, update their progress and unlock access to next unit
        const getSection = await knex("units")
          .where({ id: updateUnit })
          .first();
        const sectionID = getSection.section_id;

        const getChapter = await knex("sections")
          .where({ id: sectionID })
          .first();
        const chapterID = getChapter.chapter_id;

        const updatedUser = await knex("users").where({ id: userID }).update({
          current_progress: unitID,
          unit: updateUnit,
          section: sectionID,
          chapter: chapterID,
        });
        return {
          statusCode: 200,
          body: JSON.stringify(updatedUser),
        };
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Bad Request` }),
    };
  }
};

module.exports = { signUp, login, checkNew, patchNew, getProgress, update };
