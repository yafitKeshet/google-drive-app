import React, { useState } from "react";

import PhotoIcon from "@mui/icons-material/Photo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import FolderIcon from "@mui/icons-material/Folder";
import Menu from "../menu/Menu";
import { deleteFile } from "../../requests/googleDrive.ts";
import "./Item.css";

import Card from "../UI/Card";

const Item = (props) => {
  /* SELECTED */
  const [selected, setSelected] = useState(false);
  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };

  /* OPTIONS */
  const onDelete = async () => {
    props.onLoad();

    let deleted = await deleteFile(props.id);
    if (deleted) props.onDelete();
    else {
      alert("משהו השתבש במחיקת הקובץ, אנא נסה שנית.");
    }
    props.onFinish();
  };

  const onOpen = () => {
    window.open(props.openUrl);
  };

  const onDownload = () => {
    if (props.downloadUrl) {
      window.open(props.downloadUrl);
    }
  };

  const options = [{ data: "צפייה", onClick: onOpen }];
  props.ownedByMe && options.push({ data: "מחק", onClick: onDelete });
  props.type !== "folder" &&
    options.unshift({ data: "הורדה", onClick: onDownload });

  /* ITEM */
  const getIcon = () => {
    switch (props.type) {
      case "folder":
        return <FolderIcon className="itemIcon" />;
      case "JPEG":
      case "png":
      case "jpg":
        return <PhotoIcon className="itemIcon" />;
      case "pdf":
        return <PictureAsPdfIcon className="itemIcon" />;
      case "rtf":
      default:
        return <DocumentScannerIcon className="itemIcon" />;
    }
  };

  const handleItemClicked = (e, id) => {
    switch (e.detail) {
      default:
      case 1:
        props.onSelectItem({
          downloadUrl: props.downloadUrl,
          openUrl: props.openUrl,
          id: props.id,
          ownedByMe: props.ownedByMe,
        });
        toggleSelected();
        break;
      case 2:
        if (props.type === "folder") props.onSelectFolder(id);
        else {
          window.open(props.openUrl);
        }
    }
  };

  return (
    <Card
      className={`item  ${props.className}`}
      id={props.id}
      onClick={(e) => handleItemClicked(e, props.id)}
    >
      <div className="two-col">
        {getIcon()}
        <div>{props.name}</div>
      </div>
      <div className="two-col">
        <img src={props.owner_image} alt="תמונה של בעלי הקובץ" />
        <span>{props.owner}</span>
      </div>
      <div className="two-col">
        <span>
          {props.modified_time[2] +
            "/" +
            props.modified_time[1] +
            "/" +
            props.modified_time[0]}
        </span>
        <span className="modified-by"> {props.modified_by}</span>
      </div>
      <span className="size">{`${props.size ? props.size + " KB" : "-"}`}</span>

      {/* OPTIONS */}
      <Menu options={options} text="..." />
    </Card>
  );
};

export default Item;
