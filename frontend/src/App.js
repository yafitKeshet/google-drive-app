import { useRef } from "react";
import "./App.css";

function App() {
  const fileInputRef = useRef(null);
  const handleGetFiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/google-drive/", {
        method: "GET",
      });

      const responseJSON = await response.json();
      console.log("uploaded", responseJSON.data.files);
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
      <h1>upload </h1>
      <input type="file" multiple ref={fileInputRef} />
      <button onClick={handleFileUpload}>up</button>

      <button onClick={handleGetFiles}>get</button>
    </div>
  );
}

export default App;
