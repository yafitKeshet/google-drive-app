const { google } = require("googleapis");
const fs = require("fs");

const auth = new google.auth.GoogleAuth({
  keyFile: "key.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

exports.getFiles = async (req, res) => {
  try {
    const response = await drive.files.list({
      // pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    });
    console.log(response.data.files);

    res.status(200).json({
      status: "success",
      data: {
        files: response.data.files,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.uploadFiles = async (req, res) => {
  try {
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
      fs.writeFile(
        "../backend/uploads/files.txt",
        response.data.id + ",",
        { flag: "a+" },
        (err) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
      uploadedFiles.push(response.data);
    }

    res.status(200).json({
      status: "success",
      data: {
        files: uploadedFiles,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
