import React, { useRef } from "react";
import "./UploadFiles.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import { uploadFiles, createFolder } from "../../requests/googleDrive.ts";
import Cancel from "../UI/Cancel";

const UploadFiles = (props) => {
  const inputRef = useRef(null);

  const onUpload = async () => {
    let response = await uploadFiles(inputRef.current.files, props.folderId);
    if (response === undefined) {
      alert("Something went wrong, please try again.");
    } else {
      props.onCancel();
      props.onChange();
    }
  };

  return (
    <Card>
      <Cancel onClick={props.onCancel} />
      <header>
        <h2>העלאת קבצים</h2>
      </header>
      <Separator />
      <input type="file" multiple ref={inputRef} onChange={onUpload} />
    </Card>
  );
};

export default UploadFiles;
