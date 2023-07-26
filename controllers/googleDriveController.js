const { google } = require("googleapis");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.uploadFiles = async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "key.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    console.log(auth);

    const drive = google.drive({
      version: "v3",
      auth,
    });

    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimeType,
          parents: ["1afqJ8js4BMdZ4IlM73O7v_woPn_Sik4q"],
        },
        media: {
          body: fs.createReadStream(file.path),
        },
      });
      uploadedFiles.push(response.data);
    }

    res.json({
      files: uploadedFiles,
    });
  } catch (err) {
    console.log(err);
  }
};
