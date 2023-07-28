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

exports.deleteFiles = async (req, res) => {
  try {
    req.body.forEach(async (file) => {
      await drive.files.delete({
        fileId: file.id,
      });
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
exports.getAllFiles = async (req, res) => {
  try {
    let response = await drive.files.list({
      q: "trashed=false",
      fields: "nextPageToken, files",
    });
    if (response.status === 200) {
      res.status(200).json({
        status: "success",
        data: {
          files: response.data.files,
        },
      });
    } else {
      throw new Error(response);
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getFiles = async (req, res) => {
  console.log(req.params);
  let fileId = req.params.id;

  try {
    let response = await drive.files.list({
      q: `trashed=false and '${fileId}' in parents`,
      fields: "nextPageToken, files",
    });
    if (response.status === 200) {
      res.status(200).json({
        status: "success",
        data: {
          files: response.data.files,
        },
      });
    } else {
      throw new Error(response);
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// exports.getFile = async (req, res) => {
//   console.log(
//     "******************************************************",
//     req.params
//   );

//   let fileId = req.params.id;
//   // let dest = fs.createWriteStream("../frontend/public/downloads/aboutImg.jpg");
//   // let dest = fs.createWriteStream("../frontend/downloads/aboutImg.jpg");
//   let dest = fs.createWriteStream("./downloads/aboutImg.jpg");
//   let progress = 0;

//   drive.files
//     .get({ fileId, alt: "media" }, { responseType: "stream" })
//     .then((driveResponse) => {
//       driveResponse.data
//         .on("end", () => {
//           console.log("\nDone downloading file.");
//           // const file = `${__dirname}/../../frontend/public/downloads/aboutImg.jpg`; // file path from where node.js will send file to the requested user
//           // const file = `${__dirname}/../../frontend/downloads/aboutImg.jpg`; // file path from where node.js will send file to the requested user
//           const file = `${__dirname}/../downloads/aboutImg.jpg`; // file path from where node.js will send file to the requested user
//           // res.download("./aboutImg.jpg"); // Set disposition and send it.
//           res.download("./downloads/aboutImg.jpg"); // Set disposition and send it.
//         })
//         .on("error", (err) => {
//           console.error("Error downloading file.");
//         })
//         .on("data", (d) => {
//           progress += d.length;
//           if (process.stdout.isTTY) {
//             process.stdout.clearLine();
//             process.stdout.cursorTo(0);
//             process.stdout.write(`Downloaded ${progress} bytes`);
//           }
//         })
//         .pipe(dest);

//       // res.status(200).json({
//       //   status: "success",
//       //   data: { file_name: "aboutImg.jpg" },
//       // });
//     })

//     .catch((err) => console.log(err));
//};
exports.getFile = async (req, res) => {
  const fileId = req.params.id;
  const dest = fs.createWriteStream("./downloads/aboutImg.jpg");
  const driveResponse = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  driveResponse.data
    .on("end", () => {
      console.log("\nDone downloading file.");
      // res.status(200).json({
      //   status: "success",
      //   data: { file_name: "aboutImg.jpg" },
      // });
      res.download("./downloads/aboutImg.jpg"); // Set disposition and send it.
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

exports.downloadFile = async (req, res) => {
  res.download("./downloads/aboutImg.jpg");
};

exports.watch = async (req, res) => {
  // auth.getClient()
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  const url =
    "https://drive.google.com/file/d/1GYmc2LoJw4kFgFpdmSiich0qS7qVbGgv/view?usp=drivesdk";
  const f = await client.request({ url });
  console.log(f.data);
};
