const express = require("express");

const bodyPraser = require("body-parser");

const cors = require("cors");

const sequelize = require("./utils/database");

const expenseTracker = require("./routes/expense");

const app = express();

app.use(cors());

app.use(bodyPraser.json({ extended: false }));

app.use("/expense", expenseTracker);

sequelize
  .sync()
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
