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

exports.deleteFile = async (req, res) => {
  let fileId = req.params.id;
  try {
    await drive.files.delete({
      fileId: fileId,
    });

    res.status(200).json({
      status: "success",
      data: "files deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//   try {
//     let response = await drive.files.list({
//       q: "trashed=false",
//       fields: "nextPageToken, files",
//     });
//     if (response.status === 200) {
//       res.status(200).json({
//         status: "success",
//         data: {
//           files: response.data.files,
//         },
//       });
//     } else {
//       throw new Error(response);
//     }
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
exports.getFiles = async (req, res) => {
  let fileId = req.params.id;

  try {
    let response = await drive.files.list({
      q: `trashed=false and '${fileId}' in parents`,
      fields: "nextPageToken, files",
    });
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

exports.getFile = async (req, res) => {
  const fileId = req.params.id;
  const dest = fs.createWriteStream("./downloads/aboutImg.jpg");
  const driveResponse = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  driveResponse.data
    .on("end", () => {
      res.download("./downloads/aboutImg.jpg");
    })
    .on("error", (err) => {
      console.error("Error downloading file.");
      res
        .status(500)
        .json({ status: "error", message: "Error downloading file." });
    })
    .on("data", (d) => {
      if (process.stdout.isTTY) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Downloaded ${dest.bytesWritten} bytes`);
      }
    })
    .pipe(dest);
};

exports.uploadFiles = async (req, res) => {
  const parentId = req.params.id;
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimeType,
          parents: [parentId],
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

exports.createFolder = async (req, res) => {
  let folderName = req.params.folderName;
  let parentId = req.params.parentId;

  const fileMetadata = {
    name: folderName,
    parents: [parentId],
    mimeType: "application/vnd.google-apps.folder",
  };

  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      fields: "id,parents",
    });
    res.status(200).json({
      status: "success",
      data: {
        folderId: file.data.id,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
