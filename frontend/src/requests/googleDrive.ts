export const getFiles = async (folderId) => {
  try {
    const response = await fetch(
      "http://localhost:5000/google-drive/folder/" + folderId,
      {
        method: "GET",
      }
    );
    if (response.status === 200) {
      const responseJSON = await response.json();
      // console.log("haha");
      return responseJSON.data.files;
    } else {
      console.log("ERROR: GET folder/getFiles");
      return [];
    }
  } catch (err) {
    console.log("ERROR: GET folder/getFiles", err);
    return [];
  }
};

export const deleteFile = async (fileId) => {
  try {
    const response = await fetch(
      "http://localhost:5000/google-drive/file/" + fileId,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      console.log("ERROR: DELETE file");
      return false;
    }
  } catch (err) {
    console.log("ERROR: DELETE file", err);
    return false;
  }
};

export const createFolder = async (folderName, parentId) => {
  try {
    const response = await fetch(
      "http://localhost:5000/google-drive/folder/" +
        folderName +
        "/" +
        parentId,
      {
        method: "POST",
        body: JSON.stringify({ name: "haha" }),
      }
    );
    if (response.status === 200) {
      const responseJSON = await response.json();
      console.log(responseJSON);

      return responseJSON.data.folderId;
    } else {
      console.log("ERROR: POST folder");
      return false;
    }
  } catch (err) {
    console.log("ERROR: POST folder", err);
    return false;
  }
};

export const uploadFiles = async (files, folderId) => {
  console.log("ts", files);
  console.log("ts", folderId);
  if (files.length > 0) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/google-drive/folder/" + folderId,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseJSON = await response.json();
      console.log("uploaded", responseJSON.data.files);
    } catch (err) {
      console.log("error");
    }
  }
};
