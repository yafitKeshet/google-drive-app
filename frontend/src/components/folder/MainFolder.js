import "./MainFolder.css";
import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import Item from "../item/Item";
import { Button, Checkbox, Backdrop } from "@mui/material";
import { getFiles, deleteFile } from "../../requests/googleDrive.ts";
import UploadFolder from "../userOptions/UploadFolder";
import UploadFiles from "../userOptions/UploadFiles";
import CreateFolder from "../userOptions/CreateFolder";
import Menu from "../menu/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const MainFolder = (props) => {
  useEffect(() => {
    const onStart = async () => {
      await getItems();
    };
    onStart();
  }, []);

  /* ITEMS */
  const [items, setItems] = useState([]);

  const getItems = async () => {
    let items = await getFiles(props.id);
    if (items === undefined) {
      alert("משהו השתבש, אנא נסה שנית.");
    } else {
      setItems(items);
    }
  };

  /* USER OPTIONS */
  const [userOptions, setUserOptions] = useState({
    createFolder: false,
    uploadFolder: false,
    uploadFiles: false,
  });

  const toggleUserOptions = (option) => {
    setUserOptions((prev) => {
      return { ...prev, [option]: !prev[option] };
    });
  };

  const options = [
    {
      data: "תיקייה חדשה",
      params: "createFolder",
      onClick: toggleUserOptions,
    },
    {
      data: "העלאת תיקייה",
      params: "uploadFolder",
      onClick: toggleUserOptions,
    },
    {
      data: "העלאת קבצים",
      params: "uploadFiles",
      onClick: toggleUserOptions,
    },
  ];

  /* SELECT ITEMS */
  const [selectedItems, setSelectedItems] = useState([]);

  const isAllowedAction = () => {
    let sortedItems = selectedItems.filter((el) => el.ownedByMe === false);
    if (sortedItems.length > 0) return false;
    return true;
  };

  const toggleSelectAllOwnItems = () => {
    let ownItems = items.filter((el) => el.ownedByMe === true);

    setSelectedItems((prev) =>
      prev.length > 0
        ? []
        : ownItems.map((item) => ({
            id: item.id,
            downloadUrl: item.webContentLink,
            openUrl: item.webViewLink,
            ownedByMe: item.ownedByMe,
          }))
    );
  };

  const toggleSelectAllItems = () => {
    setSelectedItems((prev) =>
      prev.length === items.length
        ? []
        : items.map((item) => ({
            id: item.id,
            downloadUrl: item.webContentLink,
            openUrl: item.webViewLink,
            ownedByMe: item.ownedByMe,
          }))
    );
  };

  const toggleSelectItem = ({ downloadUrl, openUrl, id, ownedByMe }) => {
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
          ownedByMe: ownedByMe,
        });
      }
      return selected;
    });
  };

  const handleSelectedItem = async (action) => {
    if (selectedItems.length === 0) return alert("עלייך לבחור לפחות פריט אחד.");

    switch (action) {
      case "delete":
        if (isAllowedAction()) {
          for (const el of selectedItems) {
            let deleted = await deleteFile(el.id);
            if (deleted) {
              getItems();
              setSelectedItems([]);
            } else {
              alert("משהו השתבש במחיקת הקבצים, אנא נסה שנית.");
            }
          }
        } else {
          alert("ביכולתך למחוק פריטים שבבעלותך בלבד.");
        }
        break;
      case "download":
        for (const el of selectedItems) {
          if (el.downloadUrl) {
            window.open(el.downloadUrl);
          }
        }
        break;
      case "open":
        for (const el of selectedItems) {
          if (el.downloadUrl) {
            window.open(el.openUrl);
          }
        }
        break;

      default:
        return;
    }
  };

  return (
    <div className="main-folder">
      <Card className="main-folder-card">
        {/* USER OPTIONS */}
        <Card className="user-options">
          {userOptions.uploadFolder && (
            <UploadFolder
              folderId={props.id}
              onCancel={() => {
                toggleUserOptions("uploadFolder");
              }}
              onChange={getItems}
            />
          )}
          {userOptions.uploadFiles && (
            <UploadFiles
              folderId={props.id}
              onCancel={() => toggleUserOptions("uploadFiles")}
              onChange={getItems}
            />
          )}
          {userOptions.createFolder && (
            <CreateFolder
              folderId={props.id}
              onCancel={() => {
                toggleUserOptions("createFolder");
              }}
              onChange={getItems}
            />
          )}
          <Menu options={options} text="אפשרויות" />

          {/* SELECT ITEMS */}
          <Button onClick={toggleSelectAllItems}>בחר הכל</Button>
          <Button onClick={toggleSelectAllOwnItems}>
            בחר את כל הפריטים שלי
          </Button>
          <div className="user-action">
            <div className="user-action delete">
              <DeleteIcon
                className="icon-btn"
                color="primary"
                onClick={() => {
                  handleSelectedItem("delete");
                }}
              />
            </div>
            <Card className="delete hide">מחיקה</Card>
          </div>
          <div className="user-action">
            <div className="user-action download">
              <DownloadIcon
                className="icon-btn"
                color="primary"
                onClick={() => {
                  handleSelectedItem("download");
                }}
              />
            </div>
            <Card className="download hide">הורדה</Card>
          </div>
          <div className="user-action">
            <div className="user-action open">
              <OpenInNewIcon
                className="icon-btn"
                color="primary"
                onClick={() => {
                  handleSelectedItem("open");
                }}
              />
            </div>
            <Card className="open hide">צפייה בחלון נפרד</Card>
          </div>
        </Card>

        {/* ITEMS */}
        <div className="items">
          {items.map((item) => (
            <div key={item.id} className="main-folder-item">
              <Checkbox
                onChange={() =>
                  toggleSelectItem({
                    id: item.id,
                    downloadUrl: item.webContentLink,
                    openUrl: item.webViewLink,
                    ownedByMe: item.ownedByMe,
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
        </div>
      </Card>
    </div>
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
