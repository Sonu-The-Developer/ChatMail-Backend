// server.js
const cors = require('cors');
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { createUser, loginUser } = require("./Api/User");

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Create a new user
app.post("/newUser", createUser);

// login user
app.get("/loginUser", loginUser);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});