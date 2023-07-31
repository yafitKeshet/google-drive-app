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
      return responseJSON.data.files;
    } else {
      console.log(`ERROR: GET folder/folderId=${folderId}`);
      return undefined;
    }
  } catch (err) {
    console.log(`ERROR: GET folder/folderId=${folderId}`);
    return undefined;
  }
};

export const deleteFile = async (fileId) => {
  console.log("delete:", fileId);
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
      console.log(`ERROR: DELETE file/fileId=${fileId}`);
      return false;
    }
  } catch (err) {
    console.log(`ERROR: DELETE file/fileId=${fileId}`);
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
      }
    );
    if (response.status === 200) {
      const responseJSON = await response.json();

      return responseJSON.data.folderId;
    } else {
      console.log(
        `ERROR: POST folder/folderName=${folderName}/parentId=${parentId}`
      );
      return undefined;
    }
  } catch (err) {
    console.log(
      `ERROR: POST folder/folderName=${folderName}/parentId=${parentId}`
    );
    return undefined;
  }
};

export const uploadFiles = async (files, folderId) => {
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
      if (response.status === 200) {
        const responseJSON = await response.json();
        return responseJSON.data.files;
      } else {
        console.log(`ERROR: POST folder/folderId=${folderId}`);
        return undefined;
      }
    } catch (err) {
      console.log(`ERROR: POST folder/folderId=${folderId}`);
    }
  }
};
