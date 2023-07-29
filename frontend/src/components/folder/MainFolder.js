import "./MainFolder.css";
import React, { useState } from "react";
// import Folder from "./Folder";
// import File from "../file/File";
import Card from "../UI/Card";
import axios from "axios";
import FileDownload from "js-file-download";
// import PdfViewer from "../PdfViewer";
import Item from "../item/Item";
/*        
        mainItems={mainItems}
        items={items}
        setMainItems={setMainItems}
        setItems={setItems}
        filterItems={filterItems}
*/

const MainFolder = (props) => {
  const [openFile, setOpenFile] = useState({ open: false, path: "" });

  // const handleSelectItem = (e, id) => {
  //   switch (e.detail) {
  //     case 1:
  //       console.log("click");
  //       document.getElementById(id).classList.toggle("selected");

  //       break;
  //     case 2:
  //       console.log("double click");
  //       handleOpenItem(id);
  //     default:
  //     case 3:
  //       console.log("triple click");
  //       break;
  //   }
  //   // console.log(e.detail);
  // };

  // const handleOpenItem = async (id) => {
  //   //download
  //   let url =
  //     "https://drive.google.com/uc?id=1GYmc2LoJw4kFgFpdmSiich0qS7qVbGgv&export=download";

  //   // window.open(url);
  //   console.log("opennnn");
  //   try {
  //     await fetch("http://localhost:5000/google-drive/watch", {
  //       method: "GET",
  //     });

  //     // const responseJSON = await response.json();

  //     // return responseJSON.data.files;
  //   } catch (err) {
  //     console.log("ERROR: GET folder/getFiles", err);
  //     return {};
  //   }

  // setOpenFile({ open: true, path: "./downloads/aboutImg.jpg" });
  // axios({
  // url: "http://localhost:5000/google-drive/download",
  // method: "GET",
  // responseType: "blob",
  // }).then((res) => {
  // FileDownload(res.data, "downloaded.jpg");
  // });
  // };
  return (
    <Card className="mainFolder">
      {props.items.map((item) => (
        // <Card
        //   className="mainFolder-item"
        //   key={item.id}
        //   id={item.id}
        //   onClick={(e) => handleSelectItem(e, item.id)}
        //   ondblclick={handleOpenItem}
        // >
        <Item
          key={item.id}
          id={item.id}
          name={item["name"].split(".")[0]}
          type={
            item["mimeType"].includes("folder")
              ? "folder"
              : item["name"].split(".")[1]
          }
          owner={item.ownedByMe ? "אני" : item.owners[0]["displayName"]}
          owner_image={item.owners[0]["photoLink"]}
          modified_time={item.modifiedTime.slice(0, 10).split("-")}
          modified_by={
            item.modifiedByMy ? "אני" : item.lastModifyingUser.displayName
          }
          size={Math.round(item.size / 1000)}
        />
        // </Card>
      ))}
    </Card>
  );
};

export default MainFolder;
