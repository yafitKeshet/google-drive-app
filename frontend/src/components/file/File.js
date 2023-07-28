import "./File.css";
import PhotoIcon from "@mui/icons-material/Photo";
import React, { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
/*        
        mainItems={mainItems}
        items={items}
        setMainItems={setMainItems}
        setItems={setItems}
        filterItems={filterItems}
*/
import Card from "../UI/Card";

const Folder = (props) => {
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    setSelected((prev) => !prev);
    props.onSelect(props.id);
  };
  //   console.log(props.item);
  const getIcon = (type) => {
    switch (type) {
      case "JPEG":
      case ".png":
      case ".jpg":
        return <PhotoIcon />;
      case ".pdf":
        return <PictureAsPdfIcon />;
      case ".rtf":
      default:
        return <DocumentScannerIcon />;
    }
  };

  return (
    // <Card className={`file ${selected && "selected"}`} onClick={toggleSelected}>
    //   {getIcon(props.item["name"].slice(-4))}
    //   <div> {props.item["name"]}</div>
    //   {/* <PhotoIcon /> */}
    // </Card>
    <div>{props.name}</div>
  );
};

export default Folder;
