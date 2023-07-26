const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const googlDriveRouter = require("./routes/googleDriveRouter");

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use("/google-drive/", googlDriveRouter);

module.exports = app;
