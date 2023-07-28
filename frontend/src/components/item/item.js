// import "./Folder.css";

import React, { useState } from "react";

import PhotoIcon from "@mui/icons-material/Photo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import FolderIcon from "@mui/icons-material/Folder";

/*        
        mainItems={mainItems}
        items={items}
        setMainItems={setMainItems}
        setItems={setItems}
        filterItems={filterItems}
*/
import Card from "../UI/Card";

const Item = (props) => {
  const getIcon = () => {
    switch (props.type) {
      case "folder":
        return <FolderIcon className="itemIcon" />;
      case "JPEG":
      case ".png":
      case ".jpg":
        return <PhotoIcon className="itemIcon" />;
      case ".pdf":
        return <PictureAsPdfIcon className="itemIcon" />;
      case ".rtf":
      default:
        return <DocumentScannerIcon className="itemIcon" />;
    }
  };

  return (
    <Card>
      {getIcon()}
      <div>{props.name}</div>
      <div>{props.owners}</div>
      <div>{`${props.size ? props.size + " KB" : "-"}`}</div>
    </Card>
  );
};

export default Item;
