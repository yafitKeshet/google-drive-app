import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import MainFolder from "./components/folder/MainFolder";

const App = () => {
  const filterItems = (items, setItems, setMainItems) => {
    const mainItems = items.filter((item) => item.parents === undefined);
    items = items.filter((item) => item.parents !== undefined);
    setItems(items);
    console.log("items", items);
    console.log("main items:", mainItems);
    setMainItems(mainItems);
  };
  const [items, setItems] = useState([]);
  const [mainItems, setMainItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      let items = await handleGetFiles();
      filterItems(items, setItems, setMainItems);
      console.log(items[0]);

      // populatePre("1OBm2FEeoHTah4OTQXgmHadDQ8oycgSjz");

      // const mainItems = items.filter((item) => item.parents === undefined);
      // items = items.filter((item) => item.parents !== undefined);
      // setItems(items);
      // console.log("items", items);
      // console.log(mainItems);
      // setMainItems(mainItems);
    };
    getItems();
  }, []);

  const fileInputRef = useRef(null);

  const handleGetFiles = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/google-drive/all-files",
        {
          method: "GET",
        }
      );

      const responseJSON = await response.json();

      return responseJSON.data.files;
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;

    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        const response = await fetch("http://localhost:5000/google-drive/", {
          method: "POST",
          body: formData,
        });

        const responseJSON = await response.json();
        console.log("uploaded", responseJSON.data.files);
      } catch (err) {
        console.log("error");
      }
    }
  };
  return (
    <div className="App">
      <MainFolder
        mainItems={mainItems}
        items={items}
        setMainItems={setMainItems}
        setItems={setItems}
        filterItems={filterItems}
      />
      {/* {items.forEach((item) => {})} */}
      {/* <h1>upload </h1>
      <input type="file" multiple ref={fileInputRef} />
      <button onClick={handleFileUpload}>up</button>

      <button onClick={handleGetFiles}>get</button>
      <button onClick={handleDeleteFiles}>delete</button> */}
    </div>
  );
};

export default App;
