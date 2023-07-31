const express = require("express");

const {
  uploadFiles,
  getFile,
  getFiles,
  deleteFile,
  createFolder,
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

router.route("/").post(upload.array("files"), uploadFiles);

router.route("/file/:id").get(getFile).delete(deleteFile);

router
  .route("/folder/:id")
  .get(getFiles)
  .post(upload.array("files"), uploadFiles);
router.route("/folder/:folderName/:parentId").post(createFolder);

module.exports = router;
