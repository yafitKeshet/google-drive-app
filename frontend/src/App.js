import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import MainFolder from "./components/folder/MainFolder";
import { getFiles, createFolder, uploadFiles } from "./requests/googleDrive.ts";

const App = () => {
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const getItems = async () => {
  //     let items = await getFiles("1RFTnZZ2YoiUJVqwDLUCE_XpOoyWKrT86");
  //     // let items = await getFiles("0ACv2SIJxyS31Uk9PVA");
  //     // let items = await getFiles("1qbX9zyiCwK-9BEzfXkuFhtAXdKDDH0Ka");
  //     if (items === undefined) {
  //       alert("משהו השתבש אנא נסית שנית.");
  //     } else {
  //       setItems(items);
  //     }

  //     console.log("Items:", items);
  //   };
  //   getItems();
  // }, []);

  const fileInputRef = useRef(null);
  // const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  // const handleFileUpload = async () => {
  //   const files = inputRef.current.files;
  // const files = fileInputRef.current.files;

  console.log("app", files);
  // if (files.length > 0) {
  //   const formData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append("files", files[i]);
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/google-drive/", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const responseJSON = await response.json();
  //     console.log("uploaded", responseJSON.data.files);
  //   } catch (err) {
  //     console.log("error");
  //   }
  // }
  // };

  return (
    <div className="App">
      {/* <input
        ref={inputRef}
        type="file"
        webkitdirectory="true"
        onChange={async () => {
          let folderName = inputRef.current.files[0].webkitRelativePath
            .split("/")
            .slice(0, -1)
            .slice(-1)[0];
          console.log("name:", folderName);
          let folderId = await createFolder(
            folderName,
            "1RFTnZZ2YoiUJVqwDLUCE_XpOoyWKrT86"
          );

          console.log("pID: ", folderId);

          // handleFileUpload();
          uploadFiles(inputRef.current.files, folderId);
          // const files = Array.from(inputRef.current.files);

          // console.log(
          // await uploadFiles(
          //   inputRef.current.files,
          //   "1_0DVqaCR8TZxndhDjx7X_9lZ7eG6gYDg"
          // );
          // );
        }}
      />

      <input type="file" multiple ref={fileInputRef} />
      <button onClick={handleFileUpload}>up</button>
      <button
        onClick={() => {
          createFolder("haha", "1RFTnZZ2YoiUJVqwDLUCE_XpOoyWKrT86");
        }}
      /> */}
      <MainFolder
        id="1RFTnZZ2YoiUJVqwDLUCE_XpOoyWKrT86"
        // items={items}
        // onChange={setItems}
        // onChange={() => {}}
      />
    </div>
  );
};

export default App;
{
  /* {items.forEach((item) => {})} */
}
{
  /* <h1>upload </h1>
<input type="file" multiple ref={fileInputRef} />
<button onClick={handleFileUpload}>up</button>

<button onClick={handleGetFiles}>get</button>
<button onClick={handleDeleteFiles}>delete</button> */
}

//   const fileInputRef = useRef(null);

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
