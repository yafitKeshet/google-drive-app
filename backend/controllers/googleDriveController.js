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

      q: "trashed=false",
      fields: "nextPageToken, files",
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
          parents: ["1RFTnZZ2YoiUJVqwDLUCE_XpOoyWKrT86"],
        },
        media: {
          body: fs.createReadStream(file.path),
        },
      });

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
