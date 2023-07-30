import React, { useRef } from "react";
import "./UploadFiles.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import { uploadFiles } from "../../requests/googleDrive.ts";
import Cancel from "../UI/Cancel";
import { Button } from "@mui/material";
import Backdrop from "../UI/Backdrop";

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
    <div>
      <Backdrop onClick={props.onCancel} />
      <Card className="upload-files-card">
        <header>
          <Cancel className="cancel-btn" onClick={props.onCancel} />
          <h2>העלאת קבצים</h2>
        </header>
        <Separator />
        <input type="file" multiple ref={inputRef} />
        <Button onClick={onUpload} variant="contained">
          העלה
        </Button>
      </Card>
    </div>
  );
};

export default UploadFiles;
