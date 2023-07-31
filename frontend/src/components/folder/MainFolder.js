import "./MainFolder.css";
import React, { useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import Item from "../item/FolderItem";
import { Button, Checkbox } from "@mui/material";
import { getFiles, deleteFile } from "../../requests/googleDrive.ts";
import UploadFolder from "../userOptions/UploadFolder";
import UploadFiles from "../userOptions/UploadFiles";
import CreateFolder from "../userOptions/CreateFolder";
import Menu from "../menu/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ForwardIcon from "@mui/icons-material/Forward";
import Loading from "../UI/Loading";

const MainFolder = (props) => {
  useEffect(() => {
    const onStart = async () => {
      await getItems();
    };
    onStart();
  }, [props.id]);

  /* LOADING */
  const LoadingRef = useRef(null);
  const onLoad = () => {
    LoadingRef.current.onLoad();
  };
  const onFinish = () => {
    LoadingRef.current.onFinish();
  };

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
      console.log(selected);
      return selected;
    });
  };

  const handleSelectedItem = async (action) => {
    if (selectedItems.length === 0) return alert("עלייך לבחור לפחות פריט אחד.");

    switch (action) {
      case "delete":
        if (isAllowedAction()) {
          onLoad();
          for (const el of selectedItems) {
            let deleted = await deleteFile(el.id);
            if (deleted) {
              getItems();
              setSelectedItems([]);
            } else {
              alert("משהו השתבש במחיקת הקבצים, אנא נסה שנית.");
            }
          }
          onFinish();
        } else {
          alert("ביכולתך למחוק פריטים שבבעלותך בלבד.");
        }
        break;
      case "download":
        for (const el of selectedItems) {
          if (el.downloadUrl) {
            window.open(el.downloadUrl);
          } else {
            alert("התיקיה לא ירדה, ניתן להוריד קבצים בלבד.");
          }
        }
        break;
      case "open":
        for (const el of selectedItems) {
          if (el.openUrl) {
            window.open(el.openUrl);
          }
        }
        break;

      default:
        return;
    }
  };

  /* CHANGE MAIN FOLDER */
  const onChangeFolder = (folderId) => {
    setSelectedItems([]);
    props.onChangeFolder({
      item: { id: folderId, parentId: props.id },
      action: "add",
    });
  };

  const onBackFolder = () => {
    props.onChangeFolder({});
  };

  return (
    <div className="main-folder">
      <Card className="main-folder-card">
        {/* LOADING */}
        <Loading ref={LoadingRef} />

        {/* USER OPTIONS */}
        <div className={`main-menu ${props.parentId ? "open" : "close"}`}>
          {/* {props.parentId && ( */}
          <div className="user-action">
            <div className="user-action back">
              <ForwardIcon
                className="icon-btn"
                color="primary"
                onClick={onBackFolder}
              />
            </div>
            <Card className="back hide">חזרה</Card>
          </div>
          <Card className="user-options">
            {userOptions.uploadFolder && (
              <UploadFolder
                folderId={props.id}
                onCancel={() => {
                  toggleUserOptions("uploadFolder");
                }}
                onLoad={onLoad}
                onFinish={onFinish}
                onChange={getItems}
              />
            )}
            {userOptions.uploadFiles && (
              <UploadFiles
                folderId={props.id}
                onCancel={() => toggleUserOptions("uploadFiles")}
                onLoad={onLoad}
                onFinish={onFinish}
                onChange={getItems}
              />
            )}
            {userOptions.createFolder && (
              <CreateFolder
                folderId={props.id}
                onCancel={() => {
                  toggleUserOptions("createFolder");
                }}
                onLoad={onLoad}
                onFinish={onFinish}
                onChange={getItems}
              />
            )}
            <Menu options={options} text="אפשרויות" />

            {/* SELECT ITEMS */}
            <Button
              onClick={() => {
                toggleSelectAllItems();
              }}
            >
              בחר הכל
            </Button>
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
        </div>
        {/* ITEMS */}
        <div className="items">
          <Card className="items-menu">
            <span>שם</span>
            <span>בעלים</span>
            <span>השינוי האחרון</span>
            <span>גודל הקובץ</span>
          </Card>
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
                className={
                  selectedItems.find((el) => el.id === item.id) === undefined
                    ? ""
                    : "selected"
                }
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
                onLoad={onLoad}
                onFinish={onFinish}
                onDelete={getItems}
                ownedByMe={item.ownedByMe}
                onSelectItem={toggleSelectItem}
                onSelectFolder={onChangeFolder}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MainFolder;
