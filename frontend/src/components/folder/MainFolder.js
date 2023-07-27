import "./MainFolder.css";
import React, { useState } from "react";
import Folder from "./Folder";
import File from "../file/File";
import Card from "../UI/Card";
import PhotoIcon from "@mui/icons-material/Photo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import FolderIcon from "@mui/icons-material/Folder";
import axios from "axios";
import FileDownload from "js-file-download";

/*        
        mainItems={mainItems}
        items={items}
        setMainItems={setMainItems}
        setItems={setItems}
        filterItems={filterItems}
*/

const MainFolder = (props) => {
  const [openFile, setOpenFile] = useState({ open: false, path: "" });
  const handleGetFile = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/google-drive/file/" + id,
        {
          method: "GET",
        }
      );

      console.log(response);
      // const responseJSON = await response.json();

      // return responseJSON.data.files;
    } catch (err) {
      console.log(err);
    }
  };
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

  const handleSelectItem = (e, id) => {
    switch (e.detail) {
      case 1:
        console.log("click");
        document.getElementById(id).classList.toggle("selected");

        break;
      case 2:
        console.log("double click");
        handleOpenItem(id);
      default:
      case 3:
        console.log("triple click");
        break;
    }
    // console.log(e.detail);
  };

  const handleOpenItem = (id) => {
    console.log("opennnn");
    handleGetFile("1sr7B2XiK6-VRRDRtmBzp_8sdCBP58r7o");
    // setOpenFile({ open: true, path: "./downloads/aboutImg.jpg" });
    // axios({
    //   url: "http://localhost:5000/google-drive/download",
    //   method: "GET",
    //   responseType: "blob",
    // }).then((res) => {
    //   FileDownload(res.data, "downloaded.jpg");
    // });
  };
  return (
    <Card className="mainFolder">
      {/* <img src="./downloads/aboutImg.jpg" alt="dfs" /> */}
      {openFile.open && <img src={openFile.path} alt="dfs" />}
      {props.items.map((item) => (
        <Card
          className="mainFolder-item"
          key={item.id}
          id={item.id}
          onClick={(e) => handleSelectItem(e, item.id)}
          ondblclick={handleOpenItem}
        >
          {item["mimeType"].includes("folder") ? (
            <Folder
            // onSelect={handleSelectItem}
            // key={item.id}
            // id={item.id}
            // items={props.items}
            // setMainItems={props.setMainItems}
            // setItems={props.setItems}
            // filterItems={props.filterItems}
            />
          ) : (
            <File
            // key={item.id}
            // id={item.id}
            // item={item}
            // onSelect={handleSelectItem}
            />
          )}
        </Card>
      ))}
    </Card>
  );
};

export default MainFolder;
