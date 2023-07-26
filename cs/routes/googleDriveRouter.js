const express = require("express");

const { uploadFiles } = require("../../controllers/googleDriveController");

const router = express.Router();

router.route("/upload").post(uploadFiles);
