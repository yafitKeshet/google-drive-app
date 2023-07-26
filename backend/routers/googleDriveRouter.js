const express = require("express");
const {
  uploadFiles,
  getFiles,
} = require("../controllers/googleDriveController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route("/").post(upload.array("files"), uploadFiles).get(getFiles);

module.exports = router;
