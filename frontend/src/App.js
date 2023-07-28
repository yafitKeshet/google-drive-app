import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import MainFolder from "./components/folder/MainFolder";
import { getFiles } from "./requests/googleDrive/folder.ts";
import { getFile } from "./requests/googleDrive/file.ts";

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
  // const [mainItems, setMainItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      let items = await getFiles("1RFTnZZ2YoiUJVqwDLUCE_XpOoyWKrT86");
      // getFile("1OBm2FEeoHTah4OTQXgmHadDQ8oycgSjz");
      // let items = await getFiles("1OBm2FEeoHTah4OTQXgmHadDQ8oycgSjz");
      setItems(items);
      console.log(items);
    };
    getItems();
  }, []);

  const fileInputRef = useRef(null);

  // const handleFileUpload = async () => {
  //   const files = fileInputRef.current.files;

  //   if (files.length > 0) {
  //     const formData = new FormData();
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append("files", files[i]);
  //     }

  //     try {
  //       const response = await fetch("http://localhost:5000/google-drive/", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const responseJSON = await response.json();
  //       console.log("uploaded", responseJSON.data.files);
  //     } catch (err) {
  //       console.log("error");
  //     }
  //   }
  // };
  return (
    <div className="App">
      <MainFolder items={items} />

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
