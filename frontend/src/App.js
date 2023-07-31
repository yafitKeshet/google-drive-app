import React, { useState, useEffect } from "react";
import "./App.css";
import MainFolder from "./components/folder/MainFolder";

const App = () => {
  const [openFolders, setOpenFolders] = useState([]);

  useEffect(() => {
    const setOpenFoldersAsync = async () => {
      let openFolders = sessionStorage.getItem("folders");
      if (!openFolders) {
        openFolders = [
          {
            id: "1RFTnZZ2YoiUJVqwDLUCE_XpOoyWKrT86",
          },
        ];
      } else {
        openFolders = await JSON.parse(openFolders);
      }
      sessionStorage.setItem("folders", JSON.stringify(openFolders));
      setOpenFolders([...openFolders]);
    };

    setOpenFoldersAsync();
  }, []);
  const updateMainFolder = (props) => {
    setOpenFolders((prev) => {
      let newOpenFolders = [...prev];
      if (props.action === "add") newOpenFolders.unshift(props.item);
      else {
        newOpenFolders = newOpenFolders.slice(1);
      }
      sessionStorage.setItem("folders", JSON.stringify(newOpenFolders));

      return newOpenFolders;
    });
  };

  return (
    <div className="App">
      {openFolders.length > 0 && (
        <MainFolder
          id={openFolders[0].id}
          parentId={openFolders[0].parentId}
          onChangeFolder={updateMainFolder}
        />
      )}
    </div>
  );
};

export default App;
