const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const { formattedResponse } = require("../utils/formattedResponse");

exports.createUser = async (req, res) => {
  try {
    const { email_id } = req?.body;

    const userPresent = await User.findByPk(email_id, {
      attributes: ["email_id"],
    });

    if (userPresent) {
      return formattedResponse(req, res, 404, false, "User is already present");
    }
    const newUser = await User.create(req?.body);

    return formattedResponse(
      req,
      res,
      201,
      true,
      "User created successfully",
      newUser
    );
  } catch (err) {
    return formattedResponse(
      req,
      res,
      500,
      false,
      "Error occured while creating user",
      { err }
    );
  }
};

//loginUser
exports.loginUser = async (req, res) => {
  try {
    const { email_id, password } = req?.query;
    const { password: hashPassword } = await User.findByPk(email_id, {
      attributes: ["password"],
    });

    if (!password) {
      return formattedResponse(req, res, 404, false, "User not found");
    }

    const isMatch = await bcrypt.compare(password, hashPassword);
    const loggedID = uuidv4();

    return formattedResponse(
      req,
      res,
      isMatch ? 200 : 401,
      isMatch,
      isMatch ? "Log in successful" : "Incorrect password. Please try again",
      isMatch ? { loggedID, email: email_id } : {}
    );
  } catch (err) {
    return formattedResponse(
      req,
      res,
      500,
      false,
      "Error occured while fetching user details",
      { err }
    );
  }
};
