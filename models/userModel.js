// models/userModel.js
const moment = require("moment");
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define(
  "User",
  {
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    activeNow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => moment().utc().toDate(), // moment.utc(valueVariable).local().format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    timestamps: false,
    tableName: "users",

    // Override toJSON to remove password from the response
    defaultScope: {
      attributes: { exclude: ["password"] },
    },

    // const usersWithoutPassword = await User.findAll(); // Password is excluded
    // const usersWithPassword = await User.scope('withPassword').findAll(); // Password is included
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

// Sync the model with the database
const syncModel = async () => {
  try {
    await User.sync({ alter: true }); // This will create the table if it doesn't exist, and alter if it does
    console.log("User table synced successfully.");
  } catch (error) {
    console.error("Error syncing User table:", error);
  }
};
syncModel();

module.exports = User;
