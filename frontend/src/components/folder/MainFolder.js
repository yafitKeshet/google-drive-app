import "./MainFolder.css";
import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Item from "../item/Item";
import { Button, Checkbox, Backdrop } from "@mui/material";
import { getFiles, createFolder } from "../../requests/googleDrive.ts";
import UploadFolder from "./UploadFolder";
import Menu from "../menu/Menu";

const MainFolder = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [userOptions, setUserOptions] = useState({
    createFolder: false,
    uploadFolder: false,
    uploadFile: false,
  });

  const toggleUserOptions = (option) => {
    setUserOptions((prev) => {
      return { ...prev, [option]: !prev[option] };
    });
  };

  const getItems = async () => {
    let items = await getFiles(props.id);
    if (items === undefined) {
      alert("משהו השתבש, אנא נסה שנית.");
    } else {
      setItems(items);
    }
  };

  useEffect(() => {
    const onStart = async () => {
      await getItems();
    };
    onStart();
  }, []);

  const toggleSelectAllItems = () => {
    setSelectedItems((prev) =>
      prev.length === items.length
        ? []
        : items.map((item) => ({
            id: item.id,
            downloadUrl: item.webContentLink,
            openUrl: item.webViewLink,
          }))
    );
  };
  const createNewFolder = async () => {
    await createFolder("new", props.id);
    getItems();
  };
  const options = [
    { data: "תיקייה חדשה", onClick: createNewFolder },
    {
      data: "העלאת תיקייה",
      params: "uploadFolder",
      onClick: toggleUserOptions,
    },
  ];

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

  return (
    <Card className="mainFolder">
      {userOptions.uploadFolder && (
        <UploadFolder
          folderId={props.id}
          onCancel={() => {
            toggleUserOptions("uploadFolder");
          }}
          onChange={getItems}
        />
      )}
      {/* 

      <Button onClick={toggleUploadItems} variant="contained">
        העלאת קבצים
      </Button> */}
      <Menu options={options} />

      <Button onClick={toggleSelectAllItems}>בחר הכל</Button>
      {items.map((item) => (
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
            onDelete={getItems}
            ownedByMe={item.ownedByMe}
          />
        </div>
      ))}
    </Card>
  );
};

export default MainFolder;

/*
<Button onClick={handleOpen}>Show backdrop</Button>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
  onClick={handleClose}
>
  <CircularProgress color="inherit" />
</Backdrop> */
