const express = require("express");

const { uploadFiles } = require("../controllers/googleDriveController");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

router.route("/upload").post(upload.array("files"), uploadFiles);

module.exports = router;
