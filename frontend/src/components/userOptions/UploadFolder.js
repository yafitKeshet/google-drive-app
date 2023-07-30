import React, { useRef } from "react";
import "./UploadFolder.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import { uploadFiles, createFolder } from "../../requests/googleDrive.ts";
import Cancel from "../UI/Cancel";
import Backdrop from "../UI/Backdrop";

const UploadFolder = (props) => {
  const inputRef = useRef(null);

  const onUpload = async () => {
    let folderName = inputRef.current.files[0].webkitRelativePath
      .split("/")
      .slice(0, -1)
      .slice(-1)[0];
    let folderId = await createFolder(folderName, props.folderId);
    if (folderId === undefined)
      alert("Something went wrong, please try again.");
    else {
      let response = await uploadFiles(inputRef.current.files, folderId);
      if (response === undefined) {
        alert("Something went wrong, please try again.");
      } else {
        props.onCancel();
        props.onChange();
      }
    }
  };
  return (
    <div>
      {" "}
      <Backdrop onClick={props.onCancel} />
      <Card className="upload-folder-card">
        <header>
          <Cancel className="cancel-btn" onClick={props.onCancel} />
          <h2>העלאת תיקייה</h2>
        </header>
        <Separator />
        <input
          ref={inputRef}
          type="file"
          webkitdirectory="true"
          onChange={onUpload}
        />
      </Card>
    </div>
  );
};

export default UploadFolder;
