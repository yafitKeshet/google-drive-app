import "./MainFolder.css";
import React, { useState } from "react";
// import Folder from "./Folder";
// import File from "../file/File";
import Card from "../UI/Card";
import axios from "axios";
import FileDownload from "js-file-download";
// import PdfViewer from "../PdfViewer";
import Item from "../item/Item";
import { Button, Checkbox } from "@mui/material";
import { getFiles } from "../../requests/googleDrive.ts";

const MainFolder = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectAllItems = () => {
    setSelectedItems((prev) =>
      prev.length === props.items.length
        ? []
        : props.items.map((item) => ({
            id: item.id,
            downloadUrl: item.webContentLink,
            openUrl: item.webViewLink,
          }))
    );
  };

  const toggleSelectItem = ({ downloadUrl, openUrl, id }) => {
    setSelectedItems((prev) => {
      let find = false;

      let selected = prev.filter((el) => {
        if (el.id === id) find = true;
        return el.id !== id;
      });
      if (!find) {
        selected.unshift({
          id: id,
          downloadUrl: downloadUrl,
          openUrl: openUrl,
        });
      }
      return selected;
    });
  };
  const onChange = async () => {
    let items = await getFiles(props.id);
    props.onChange(items);
  };
  return (
    <Card className="mainFolder">
      <Button onClick={toggleSelectAllItems}>בחר הכל</Button>
      {props.items.map((item) => (
        <div key={item.id}>
          <Checkbox
            onChange={() =>
              toggleSelectItem({
                id: item.id,
                downloadUrl: item.webContentLink,
                openUrl: item.webViewLink,
              })
            }
            checked={
              selectedItems.find((el) => el.id === item.id) === undefined
                ? false
                : true
            }
          />
          <Item
            key={item.id}
            id={item.id}
            parent={props.id}
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
            downloadUrl={item.webContentLink}
            openUrl={item.webViewLink}
            onDelete={onChange}
            ownedByMe={item.ownedByMe}
          />
        </div>
      ))}
    </Card>
  );
};

export default MainFolder;
