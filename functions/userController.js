const knex = require("knex")(require("./knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.signup = async (req, res) => {
  const { given_name, email, password } = req.body;

  if (!given_name.length || !email.length || !password.length) {
    return res
      .status(400)
      .json({ message: "Missing information from input fields" });
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = {
    given_name,
    email,
    password: hash,
  };

  try {
    const checkUserExist = await knex("users").where({ email: email });

    if (checkUserExist.length > 0) {
      res.status(404).json({ message: `User Already Exists At ${email}` });
    } else {
      knex("users")
        .insert(newUser)
        .then((data) => {
          knex("users")
            .where({ "users.id": data[0] })
            .then((data) => {
              res.status(201).json(data);
            });
        })
        .catch((error) => {
          res.status(500).send(error + "Error while creating new user");
        });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Missing data from input fields" });
  }

  try {
    //first checks if email exists
    const getUserCreds = await knex("users").where({ email: email });
    if (getUserCreds.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    //now check found user's password against input
    const user = getUserCreds[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Incorrect password" });
    } else {
      //if all matches, get their given name send back token + name as a claim
      const getName = await knex("users").where({ email: email });
      if (getName) {
        const givenName = getName[0].given_name;
        const userId = getName[0].id;
        let token = jwt.sign({ name: givenName, id: userId }, "secretKey");
        return res.status(200).json({ token: token });
      } else {
        let token = jwt.sign({ name: "Guest" }, "secretKey");
        return res.status(200).json({ token: token });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.checkNew = async (req, res) => {
  try {
    const user = await knex("users").where({ id: req.params.userID }).first();
    // console.log(user);
    return res
      .status(200)
      .json({
        isNew: user.newbie,
        progress: user.chapter,
        currentUnitToNav: user.unit,
      });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "No user found" });
  }
};

exports.patchNew = async (req, res) => {
  try {
    const user = await knex("users")
      .where({ id: req.params.userID })
      .first()
      .update({ newbie: false });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "No user found" });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const user = await knex("users").where({ id: req.params.userID }).first();
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
    return res.status(200).json({ userProgress });
  } catch (err) {
    res.status(404).json({ message: "Cannot find user" });
  }
};

exports.update = async (req, res) => {
  const { userID, unitID } = req.params;
  const updateUnit = parseInt(unitID) + 1;
  try {
    const getUser = await knex("users").where({ id: userID }).first();

    if (!getUser) {
      return res.status(404).json({ message: `No User Found at ID ${userID}` });
    } else {
      //checks for current progress
      if (getUser.current_progress >= parseInt(unitID)) {
        return res
          .status(200)
          .json({
            message:
              "User found but no update provided as current progress is higher than current unit completed",
          });
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

        const updatedUser = await knex("users")
          .where({ id: userID })
          .update({
            current_progress: unitID,
            unit: updateUnit,
            section: sectionID,
            chapter: chapterID,
          });
        return res.status(200).json(updatedUser);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: `Bad Request` });
  }
};

//gets the user id and unit id from params, updates the user's specific unit to unitId + 1 to provide access
//then try to get the user based on param user id
