import React, { useState } from "react";
import "./CreateFolder.css";
import Card from "../UI/Card";
import Separator from "../UI/Separator";
import { createFolder } from "../../requests/googleDrive.ts";
import Cancel from "../UI/Cancel";
import { Button } from "@mui/material";
import Backdrop from "../UI/Backdrop";

const CreateFolder = (props) => {
  const [folderName, setFolderName] = useState("");
  const onCreate = async () => {
    let folderId = await createFolder(folderName, props.folderId);
    if (folderId === undefined) {
      alert("Something went wrong, please try again.");
    } else {
      props.onCancel();
      props.onChange();
    }
  };

  return (
    <div>
      <Backdrop onClick={props.onCancel} />
      <Card className="create-folder-card">
        <header>
          <Cancel className="cancel-btn" onClick={props.onCancel} />
          <h2>יצירת תיקייה</h2>
        </header>
        <Separator />
        <input
          type="text"
          value={folderName}
          placeholder="הכנס שם לתיקייה"
          onChange={(e) => {
            setFolderName(e.target.value);
          }}
          required
        />
        <Button onClick={onCreate} variant="contained">
          צור
        </Button>
      </Card>
    </div>
  );
};

export default CreateFolder;
