const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const googleDriveRouter = require("./routers/googleDriveRouter");

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use("/google-drive/", googleDriveRouter);

module.exports = app;
