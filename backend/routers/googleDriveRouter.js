const express = require("express");
const {
  uploadFiles,
  getFiles,
  deleteFiles,
  // getFile,
  downloadFile,
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

router
  .route("/")
  .post(upload.array("files"), uploadFiles)
  // .get(getFile)
  .delete(deleteFiles);

router.route("/all-files").get(getFiles);
// router.route("/:id").get(getFile);
router.route("/download").get(downloadFile);

module.exports = router;
