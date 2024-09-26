// models/MessageModel.js
const moment = require("moment");
const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Message = sequelize.define(
  "Message",
  {
    message_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sent_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => moment().utc().toDate(), // moment.utc(valueVariable).local().format('YYYY-MM-DD HH:mm:ss');
    },
    sender_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reciever_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => "1",
    },
    read_timestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
    tableName: "messages",

    // Override toJSON to remove password from the response
    defaultScope: {
      attributes: { exclude: [] },
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
    await Message.sync({alter: true}); // This will create the table if it doesn't exist, and alter if it does
    console.log("Message table synced successfully.");
  } catch (error) {
    console.error("Error syncing Message table:", error);
  }
};
syncModel();

module.exports = Message;
